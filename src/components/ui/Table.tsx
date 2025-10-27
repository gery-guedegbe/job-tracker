import { forwardRef } from "react";
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={`w-full caption-bottom text-sm ${className}`}
          {...props}
        />
      </div>
    );
  },
);

Table.displayName = "Table";

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className = "", ...props }, ref) => {
  return <thead ref={ref} className={`border-b ${className}`} {...props} />;
});

TableHeader.displayName = "TableHeader";

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={`[&_tr:last-child]:border-0 ${className}`}
        {...props}
      />
    );
  },
);

TableBody.displayName = "TableBody";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ${className}`}
        {...props}
      />
    );
  },
);

TableRow.displayName = "TableRow";

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={`text-muted-foreground h-12 px-4 text-left align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      />
    );
  },
);

TableHead.displayName = "TableHead";

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      />
    );
  },
);

TableCell.displayName = "TableCell";
