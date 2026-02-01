"use client";

import { Download, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThirdPartyCardProps {
  name: string;
  description: string;
  installed: boolean;
  onInstall: () => void;
  onRemove: () => void;
  disabled: boolean;
}

export default function ThirdPartyCard({
  name,
  description,
  installed,
  onInstall,
  onRemove,
  disabled,
}: ThirdPartyCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>{name}</CardTitle>
          {installed ? (
            <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200">
              <CheckCircle className="h-3 w-3" />
              Installed
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
              <XCircle className="h-3 w-3" />
              Not Installed
            </span>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          {installed ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onRemove}
              disabled={disabled}
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={onInstall}
              disabled={disabled}
            >
              <Download className="h-4 w-4" />
              Install
            </Button>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
}