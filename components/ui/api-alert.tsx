"use client";

import { Server, Copy } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
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

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant,
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard.");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-mono text-sm whitespace-nowrap overflow-x-auto">
          {description}
        </p>
        <Button
          onClick={onCopy}
          variant="outline"
          size="icon"
          className="ml-2 h-8 w-8"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
};
