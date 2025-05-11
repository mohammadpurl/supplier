import React, { useState } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  hidden?: boolean;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
};

export function Table<T extends { id: string | number }>({
  columns,
  data,
  className,
  onRowClick,
  selectable = false,
  onSelectionChange,
}: TableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

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

  return (
    <table className={`min-w-full divide-y divide-gray-200 ${className ?? ""}`}>
      <thead>
        <tr>
          {selectable && <th className="px-2 py-2"></th>}
          {columns.filter(col => !col.hidden).map((col) => (
            <th key={col.header} className="px-4 py-2 text-right font-bold">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="border-b cursor-pointer"
            onClick={() => onRowClick?.(row)}
          >
            {selectable && (
              <td className="px-2 py-2">
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
              <td key={col.header} className="px-4 py-2">
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