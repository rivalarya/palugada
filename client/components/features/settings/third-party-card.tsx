"use client";

import { Download, Trash2, CheckCircle, XCircle } from "lucide-react";

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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            {installed ? (
              <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                <CheckCircle className="h-3 w-3" />
                Installed
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                <XCircle className="h-3 w-3" />
                Not Installed
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        
        <div className="ml-4">
          {installed ? (
            <button
              onClick={onRemove}
              disabled={disabled}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </button>
          ) : (
            <button
              onClick={onInstall}
              disabled={disabled}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}