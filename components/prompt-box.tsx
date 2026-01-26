"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestions = [
  "User profile avatar",
  "Settings gear",
  "Open book for documentation",
  "Cloud upload arrow",
  "Secure lock",
  "Lightbulb for ideas",
];

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-3">
        <Input
          placeholder="e.g., 'A rocket ship launching'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button variant="default">Generate Icon</Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setPrompt(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
