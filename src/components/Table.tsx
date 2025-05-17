import React, { useState, useTransition } from "react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  hidden?: boolean;
  sortable?: boolean;
  width?: string | number;
  resizable?: boolean;
  searchable?: boolean;
};

type RowActions<T> = {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void>;
  showEdit?: boolean;
  showDelete?: boolean;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  checkboxColumnWidth?: string | number;
  pagination?: PaginationProps;
  onPageChange?: (page: number, pageSize: number) => Promise<void>;
  pageSizeOptions?: number[];
  rowActions?: RowActions<T>;
};

export function Table<T extends { id: string | number }>({
  columns,
  data,
  className,
  onRowClick,
  selectable = false,
  onSelectionChange,
  checkboxColumnWidth = 36,
  pagination,
  onPageChange,
  pageSizeOptions = [10, 20, 50, 100],
  rowActions,
}: TableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [sort, setSort] = useState<{ accessor: keyof T; direction: "asc" | "desc" } | null>(null);
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<T | null>(null);

  // Handle column resize
  const startResize = (accessor: string, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const currentWidth = colWidths[accessor] || (typeof getColWidth(accessor) === 'number' ? getColWidth(accessor) : 150);
    const startWidth = typeof currentWidth === 'number' ? currentWidth : parseInt(currentWidth as string, 10);
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(36, startWidth + moveEvent.clientX - startX);
      setColWidths((prev) => ({ ...prev, [accessor]: newWidth }));
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  function getColWidth(accessor: string) {
    const col = columns.find(c => c.accessor === accessor);
    return colWidths[accessor] || col?.width || 150;
  }

  const handleCheckboxChange = (row: T) => {
    let newSelected: (string | number)[];
    if (selectedIds.includes(row.id)) {
      newSelected = selectedIds.filter((id) => id !== row.id);
    } else {
      newSelected = [...selectedIds, row.id];
    }
    setSelectedIds(newSelected);
    if (onSelectionChange) {
      onSelectionChange(data.filter((r) => newSelected.includes(r.id)));
    }
  };

  const handleSearch = (accessor: keyof T, value: string) => {
    startTransition(() => {
      setSearchValues(prev => ({ ...prev, [accessor]: value }));
    });
  };

  const handleDelete = async (row: T) => {
    if (rowActions?.onDelete) {
      try {
        await rowActions.onDelete(row);
        setRowToDelete(null);
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    }
  };

  // Handle pagination
  const handlePageChange = async (newPage: number) => {
    if (!onPageChange || !pagination || isLoadingPage) return;
    
    try {
      setIsLoadingPage(true);
      await onPageChange(newPage, pagination.pageSize);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handlePageSizeChange = async (newPageSize: number) => {
    if (!onPageChange || !pagination || isLoadingPage) return;
    
    try {
      setIsLoadingPage(true);
      await onPageChange(1, newPageSize);
    } finally {
      setIsLoadingPage(false);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return [];
    
    const pages: (number | string)[] = [];
    const { currentPage, totalPages } = pagination;
    
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    
    return pages;
  };

  // Filter and sort data
  const filteredAndSortedData = React.useMemo(() => {
    let filteredData = data;

    // Apply search filters
    Object.entries(searchValues).forEach(([accessor, searchValue]) => {
      if (searchValue) {
        filteredData = filteredData.filter(item => {
          const value = item[accessor as keyof T];
          return String(value).toLowerCase().includes(searchValue.toLowerCase());
        });
      }
    });

    // Apply sorting
    if (!sort) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sort.accessor] < b[sort.accessor]) return sort.direction === "asc" ? -1 : 1;
      if (a[sort.accessor] > b[sort.accessor]) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort, searchValues]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className={`min-w-full border border-iconSecondry-50 ${className ?? ""}`}>
          <thead>
            <tr>
              {selectable && (
                <th
                  style={{ width: checkboxColumnWidth, minWidth: checkboxColumnWidth, maxWidth: checkboxColumnWidth }}
                  className="px-2 py-2 border border-iconSecondry-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.length === data.length}
                    onChange={() => {
                      const newSelected = selectedIds.length === data.length
                        ? []
                        : data.map(row => row.id);
                      setSelectedIds(newSelected);
                      if (onSelectionChange) {
                        onSelectionChange(data.filter(r => newSelected.includes(r.id)));
                      }
                    }}
                  />
                </th>
              )}
              {columns.filter(col => !col.hidden).map((col) => (
                <th
                  key={col.header}
                  style={{
                    width: getColWidth(col.accessor as string),
                    minWidth: 36,
                    position: "relative",
                    userSelect: "none",
                    padding: 0,
                  }}
                  className="border border-iconSecondry-50 group"
                >
                  <div className="flex flex-col">
                    {/* Search Input */}
                    <div className="px-2 py-1 border-b border-iconSecondry-50">
                      <input
                        type="text"
                        placeholder={`جستجو در ${col.header}`}
                        value={searchValues[col.accessor as string] || ''}
                        onChange={(e) => handleSearch(col.accessor, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 text-sm bg-white border border-iconSecondry-50 rounded focus:outline-none focus:border-iconSecondry-50 focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    {/* Column Header */}
                    <div
                      onClick={() => col.sortable && setSort(
                        sort && sort.accessor === col.accessor
                          ? { accessor: col.accessor, direction: sort.direction === "asc" ? "desc" : "asc" }
                          : { accessor: col.accessor, direction: "asc" }
                      )}
                      className={`px-4 py-2 text-right font-bold ${col.sortable ? "cursor-pointer select-none" : ""}`}
                    >
                      <span className="flex items-center">
                        {col.header}
                        {col.sortable && (
                          <span className="ml-1 text-xs opacity-70 group-hover:opacity-100">
                            {sort?.accessor === col.accessor
                              ? (sort.direction === "asc"
                                ? <svg width="10" height="10" style={{display: "inline"}}><polygon points="5,0 10,10 0,10" fill="currentColor"/></svg>
                                : <svg width="10" height="10" style={{display: "inline"}}><polygon points="0,0 10,0 5,10" fill="currentColor"/></svg>)
                              : <svg width="10" height="10" style={{display: "inline"}}><rect width="10" height="2" y="4" fill="currentColor"/></svg>
                            }
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  {col.resizable !== false && (
                    <span
                      onMouseDown={(e) => startResize(col.accessor as string, e)}
                      className="absolute left-0 top-0 h-full w-2 cursor-col-resize z-10"
                      style={{ left: "unset", right: 0 }}
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                </th>
              ))}
              {(rowActions?.showEdit || rowActions?.showDelete) && (
                <th className="px-4 py-2 border border-iconSecondry-50 text-right" style={{ width: 100 }}>
                  عملیات
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${isPending || isLoadingPage ? 'opacity-50' : ''}`}>
            {filteredAndSortedData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-iconSecondry-50 hover:bg-gray-50"
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <td
                    style={{ width: checkboxColumnWidth, minWidth: checkboxColumnWidth, maxWidth: checkboxColumnWidth }}
                    className="px-2 py-2 border border-iconSecondry-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(row);
                      }}
                    />
                  </td>
                )}
                {columns.filter(col => !col.hidden).map((col) => (
                  <td key={col.header} className="px-4 py-2 border border-iconSecondry-50">
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {(rowActions?.showEdit || rowActions?.showDelete) && (
                  <td className="px-4 py-2 border border-iconSecondry-50">
                    <div className="flex items-center gap-2 justify-end">
                      {rowActions.showEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            rowActions.onEdit?.(row);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-iconPrimary-50"  viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      )}
                      {rowActions.showDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRowToDelete(row);
                          }}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog.Root open={!!rowToDelete} onOpenChange={() => setRowToDelete(null)}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <AlertDialog.Title className="text-lg font-bold mb-4">
              تایید حذف
            </AlertDialog.Title>
            <AlertDialog.Description className="text-gray-600 mb-6">
              آیا از حذف این مورد اطمینان دارید؟
            </AlertDialog.Description>
            <div className="flex justify-end gap-3">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 text-sm border border-iconSecondry-50 rounded hover:bg-gray-50">
                  انصراف
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={() => rowToDelete && handleDelete(rowToDelete)}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  حذف
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-iconSecondry-50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              نمایش {((pagination.currentPage - 1) * pagination.pageSize) + 1} تا{' '}
              {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} از{' '}
              {pagination.totalItems} مورد
            </span>
            <select
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-iconSecondry-50 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size} در هر صفحه
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1 || isLoadingPage}
              className="px-3 py-1 text-sm bg-white border border-iconSecondry-50 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              قبلی
            </button>
            
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {typeof page === 'string' ? (
                  <span className="px-3 py-1">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page)}
                    disabled={page === pagination.currentPage || isLoadingPage}
                    className={`px-3 py-1 text-sm border rounded
                      ${page === pagination.currentPage
                        ? 'bg-primary text-white border-iconSecondry-50'
                        : 'bg-white border-iconSecondry-50 hover:bg-gray-50'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed`
                    }
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages || isLoadingPage}
              className="px-3 py-1 text-sm bg-white border border-iconSecondry-50 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 