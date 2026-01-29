"use client";

import PromptBox, { IconOptions } from "./prompt-box";
import Image from "next/image";
import { Button } from "./ui/button";
import { generateSvg } from "@/app/actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarSeparator,
} from "@/components/ui/sidebar";

const suggestions = [
    "User profile avatar",
    "Settings gear",
    "Open book for documentation",
    "Cloud upload arrow",
    "Secure lock",
    "Lightbulb for ideas",
];

export function AppSidebar() {
    const [promptValue, setPromptValue] = useState("");
    const [options, setOptions] = useState<IconOptions>({ strokeWidth: 1, style: "stroke" });
    const [isPending, startTransition] = useTransition();

    const handleSuggestionClick = (suggestion: string) => {
        setPromptValue(suggestion);
    };

    const handleSubmit = () => {
        if (!promptValue.trim()) return;
        const currentPrompt = promptValue;
        setPromptValue(""); // Clear immediately for better UX
        startTransition(async () => {
            const result = await generateSvg(currentPrompt, options);
            if (result && !result.success) {
                toast.error(result.message);
                setPromptValue(currentPrompt); // Restore input on error
            }
        });
    };

    return (
        <Sidebar className="border-r-0">
            <SidebarHeader className="h-16 justify-center">
                <div className="flex items-center gap-2 px-2">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                    <span className="text-xl font-bold">SVG Engine</span>
                </div>
            </SidebarHeader>
            {/* <SidebarSeparator /> */}
            <SidebarContent className="p-4 gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                        Describe an icon, and let AI generate it for you
                    </p>
                    <PromptBox
                        value={promptValue}
                        onChange={setPromptValue}
                        onSubmit={handleSubmit}
                        isLoading={isPending}
                        options={options}
                        onOptionsChange={setOptions}
                    />
                </div>

                <SidebarGroup className="p-0">
                    <h2 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Suggestions</h2>
                    <SidebarGroupContent>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="flex rounded-full text-xs h-7"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
