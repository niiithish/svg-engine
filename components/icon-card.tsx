"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy02Icon, Download01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";

interface IconCardProps {
    svg: string;
    id: number;
}

export function IconCard({ svg, id }: IconCardProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(svg);
            setIsCopied(true);
            toast.success("SVG copied to clipboard");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            toast.error("Failed to copy SVG");
            console.error(error);
        }
    };

    const handleDownload = () => {
        try {
            const blob = new Blob([svg], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `icon-${id}.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            toast.success("Download started");
        } catch (error) {
            toast.error("Failed to download SVG");
            console.error(error);
        }
    };

    return (
        <Card>
            <CardContent className="flex items-center justify-center p-8">
                <div
                    className="h-24 w-24 [&_svg]:size-full"
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-center gap-2">
                <Button
                    variant="outline"
                    className="flex-1 group"
                    onClick={handleCopy}
                >
                    <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                        <HugeiconsIcon icon={isCopied ? Tick02Icon : Copy02Icon} />
                    </span>
                    {isCopied ? "Copied" : "Copy"}
                </Button>
                <Button
                    className="flex-1 group"
                    onClick={handleDownload}
                >
                    <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                        <HugeiconsIcon icon={Download01Icon} />
                    </span>
                    Download
                </Button>
            </CardFooter>
        </Card>
    );
}
