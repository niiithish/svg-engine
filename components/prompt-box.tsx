"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Sparkles, ArrowUp02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

interface PromptBoxProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PromptBox = ({ value = "", onChange }: PromptBoxProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <InputGroup className="bg-background">
        <InputGroupTextarea
          placeholder="Ask me anything..."
          value={value || internalValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton size="icon-xs" variant="ghost">
            <HugeiconsIcon icon={Sparkles} />
          </InputGroupButton>
          <InputGroupText className="ml-auto">0/3</InputGroupText>
          <Separator className="h-4" orientation="vertical" />
          <InputGroupButton
            className="rounded-full"
            size="icon-xs"
            variant="default"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default PromptBox;
