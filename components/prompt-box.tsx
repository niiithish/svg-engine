"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { ArrowUp02Icon, PlusSignIcon, Settings01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface IconOptions {
  strokeWidth?: number;
  color?: string;
  style?: "stroke" | "solid" | "duotone";
}

interface PromptBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  options?: IconOptions;
  onOptionsChange?: (options: IconOptions) => void;
}

const PromptBox = ({ value = "", onChange, onSubmit, isLoading, options, onOptionsChange }: PromptBoxProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <InputGroup className="bg-background">
        <InputGroupTextarea
          placeholder="Ask me anything..."
          value={value || internalValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={isLoading}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton size="icon-xs" variant="ghost">
            <HugeiconsIcon icon={PlusSignIcon} />
          </InputGroupButton>
          <Popover>
            <PopoverTrigger className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-6 w-6 p-0 shadow-none text-muted-foreground")}>
              <HugeiconsIcon icon={Settings01Icon} className="size-3" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Customize Icon</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust the appearance of the generated icon.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="style">Style</Label>
                  <Select
                    value={options?.style || "stroke"}
                    onValueChange={(val) => onOptionsChange?.({ ...options, style: val as any })}
                  >
                    <SelectTrigger id="style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stroke">Stroke</SelectItem>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="duotone">Duotone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stroke-width">Stroke Width: {options?.strokeWidth || 1.5}px</Label>
                  <Slider
                    id="stroke-width"
                    min={0.5}
                    max={5}
                    step={0.1}
                    value={[options?.strokeWidth || 1.5]}
                    onValueChange={(val) => {
                      const newVal = Array.isArray(val) ? val[0] : val;
                      onOptionsChange?.({ ...options, strokeWidth: newVal });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      </div>
                      <input
                        type="color"
                        value={options?.color && options.color !== "currentColor" ? options.color : "#000000"}
                        onChange={(e) => onOptionsChange?.({ ...options, color: e.target.value })}
                        className="h-10 w-10 cursor-pointer rounded-md border border-input p-1"
                      />
                    </div>
                    <Input
                      type="text"
                      value={options?.color || ""}
                      onChange={(e) => onOptionsChange?.({ ...options, color: e.target.value })}
                      className="flex-1"
                      placeholder="currentColor"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <InputGroupText className="ml-auto">0/3</InputGroupText>
          <Separator className="h-4" orientation="vertical" />
          <InputGroupButton
            className="rounded-full"
            size="icon-xs"
            variant="default"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <HugeiconsIcon icon={ArrowUp02Icon} />
            )}
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default PromptBox;
