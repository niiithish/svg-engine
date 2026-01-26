"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { db } from "@/index";
import { iconsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function generateSvg(prompt: string, options?: { strokeWidth?: number; color?: string; style?: "stroke" | "solid" | "duotone" }) {
    if (!prompt) throw new Error("Prompt is required");

    let styleInstruction = "";
    if (options) {
        if (options.color) styleInstruction += ` Use color ${options.color}.`;
        if (options.strokeWidth) styleInstruction += ` Use stroke width ${options.strokeWidth}px.`;
        if (options.style) styleInstruction += ` Use ${options.style} style.`;
    }

    try {
        console.log("Generating SVG with prompt:", prompt);
        console.log("Using model: gemini-3-flash-preview");

        const { text: svgContent } = await generateText({
            model: google("gemini-3-flash-preview"),
            system: "You are an expert SVG designer. Generate the SVG code for the requested icon. Return ONLY the SVG code, starting with <svg and ending with </svg>. Do not include markdown code blocks or any other text. Ensure the SVG is scalable and looks good." + (styleInstruction ? ` ${styleInstruction}` : ""),
            prompt: `Generate an SVG icon for: ${prompt}`,
        });

        console.log("SVG generated successfully");

        // Clean up potential markdown code blocks
        const cleanSvg = svgContent.replace(/```xml|```svg|```/g, "").trim();

        await db.insert(iconsTable).values({
            prompt,
            svg: cleanSvg,
        });

        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Error generating SVG:", error);

        if (error.message?.includes("Quota exceeded") || error.message?.includes("429")) {
            return { success: false, message: "Usage limit exceeded. Please try again later." };
        }

        return { success: false, message: "Failed to generate SVG. Please try again." };
    }
}
