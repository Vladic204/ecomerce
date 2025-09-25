"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export interface CategoryColumn  {
  id: string;
  name: string;
  billboardLabel: string; // doar string, nu obiect
  createdAt: string;      // string pentru că e formatat
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel", // exact ca în page.tsx
    header: "Billboard",
  },
  {
    accessorKey: "createdAt", // nu createAt
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
