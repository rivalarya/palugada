"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueLabel?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueLabel, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {label}
            </label>
            {valueLabel && (
              <span className="text-sm text-muted-foreground">
                {valueLabel}
              </span>
            )}
          </div>
        )}
        <input
          type="range"
          className={cn(
            "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };