"use client";

import PromptBox from "./prompt-box";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

const suggestions = [
    "User profile avatar",
    "Settings gear",
    "Open book for documentation",
    "Cloud upload arrow",
    "Secure lock",
    "Lightbulb for ideas",
];

const Sidebar = () => {
    const [promptValue, setPromptValue] = useState("");

    const handleSuggestionClick = (suggestion: string) => {
        setPromptValue(suggestion);
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
            <PromptBox value={promptValue} onChange={setPromptValue} />
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
