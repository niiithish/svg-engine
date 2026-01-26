"use client";

import PromptBox, { IconOptions } from "./prompt-box";
import Image from "next/image";
import { Button } from "./ui/button";
import { generateSvg } from "@/app/actions";
import { useState, useTransition } from "react";

const suggestions = [
    "User profile avatar",
    "Settings gear",
    "Open book for documentation",
    "Cloud upload arrow",
    "Secure lock",
    "Lightbulb for ideas",
];

import { toast } from "sonner";

const Sidebar = () => {
    const [promptValue, setPromptValue] = useState("");
    const [options, setOptions] = useState<IconOptions>({ strokeWidth: 1.5, style: "stroke" });
    const [isPending, startTransition] = useTransition();

    const handleSuggestionClick = (suggestion: string) => {
        setPromptValue(suggestion);
    };

    const handleSubmit = () => {
        if (!promptValue.trim()) return;
        startTransition(async () => {
            const result = await generateSvg(promptValue, options);
            if (result && !result.success) {
                toast.error(result.message);
            } else {
                setPromptValue("");
            }
        });
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <h1 className="flex items-center gap-2 text-xl font-bold">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                    SVG Engine
                </h1>
                <p className="text-sm text-muted-foreground">
                    Describe an icon, and let AI generate it for you
                </p>
            </div>
            <PromptBox
                value={promptValue}
                onChange={setPromptValue}
                onSubmit={handleSubmit}
                isLoading={isPending}
                options={options}
                onOptionsChange={setOptions}
            />
            <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold">Suggestions:</h2>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="flex rounded-full"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
