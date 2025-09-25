"use client";

import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { CategoryColumn} from "./columns";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Copiază ID-ul în clipboard
  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Category Id copied to the clipboard.");
  };

  // Șterge billboard-ul
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      router.refresh();
      toast.success("Category deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products using this category first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Modal de confirmare ștergere */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      {/* Dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Copy ID */}
          <DropdownMenuItem onClick={onCopy} disabled={loading}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>

          {/* Update */}
          <DropdownMenuItem 
            onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)} 
            disabled={loading}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem onClick={() => setOpen(true)} disabled={loading}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
