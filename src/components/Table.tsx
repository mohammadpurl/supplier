import React, { useState } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  hidden?: boolean;
  sortable?: boolean;
  width?: string | number;
  resizable?: boolean;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  checkboxColumnWidth?: string | number;
};

export function Table<T extends { id: string | number }>({
  columns,
  data,
  className,
  onRowClick,
  selectable = false,
  onSelectionChange,
  checkboxColumnWidth = 36,
}: TableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [sort, setSort] = useState<{ accessor: keyof T; direction: "asc" | "desc" } | null>(null);
  const [colWidths, setColWidths] = useState<{ [key: string]: number }>({});

  // Handle column resize
  const startResize = (accessor: string, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = colWidths[accessor] || (typeof getColWidth(accessor) === 'number' ? getColWidth(accessor) : 150);
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

  // مرتب‌سازی داده‌ها
  const sortedData = React.useMemo(() => {
    if (!sort) return data;
    return [...data].sort((a, b) => {
      if (a[sort.accessor] < b[sort.accessor]) return sort.direction === "asc" ? -1 : 1;
      if (a[sort.accessor] > b[sort.accessor]) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  return (
    <table className={`min-w-full border border-gray-300 ${className ?? ""}`}>
      <thead>
        <tr>
          {selectable && (
            <th
              style={{ width: checkboxColumnWidth, minWidth: checkboxColumnWidth, maxWidth: checkboxColumnWidth }}
              className="px-2 py-2 border border-gray-300"
            ></th>
          )}
          {columns.filter(col => !col.hidden).map((col) => (
            <th
              key={col.header}
              style={{
                width: getColWidth(col.accessor as string),
                minWidth: 36,
                position: "relative",
                userSelect: "none",
              }}
              onClick={() => col.sortable && setSort(
                sort && sort.accessor === col.accessor
                  ? { accessor: col.accessor, direction: sort.direction === "asc" ? "desc" : "asc" }
                  : { accessor: col.accessor, direction: "asc" }
              )}
              className={`px-4 py-2 text-right font-bold border border-gray-300 group ${col.sortable ? "cursor-pointer select-none" : ""}`}
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
              {/* دسته resize فقط اگر resizable=true */}
              {col.resizable !== false && (
                <span
                  onMouseDown={(e) => startResize(col.accessor as string, e)}
                  className="absolute left-0 top-0 h-full w-2 cursor-col-resize z-10"
                  style={{ left: "unset", right: 0 }}
                  onClick={e => e.stopPropagation()}
                ></span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr
            key={idx}
            className="border-b border-gray-300 cursor-pointer"
            onClick={() => onRowClick?.(row)}
          >
            {selectable && (
              <td
                style={{ width: checkboxColumnWidth, minWidth: checkboxColumnWidth, maxWidth: checkboxColumnWidth }}
                className="px-2 py-2 border border-gray-300"
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
              <td key={col.header} className="px-4 py-2 border border-gray-300">
                {col.render
                  ? col.render(row[col.accessor], row)
                  : (row[col.accessor] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 