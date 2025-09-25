"use client";

import { Server, Copy } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string; // ex: GET, POST
  description: string; // URL complet
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard.");
  };

  return (
    <Alert className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-2">
        <Server className="h-5 w-5" />
        <AlertTitle className="flex items-center gap-2 text-base font-semibold">
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
      </div>

      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-sm break-words flex-1">{description}</code>
        <Button
          onClick={onCopy}
          variant="outline"
          size="icon"
          className="h-4 w-4 flex-shrink-0"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
};
