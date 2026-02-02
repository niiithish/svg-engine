"use client";

import { ViewIcon, ViewOffSlashIcon } from "huge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Check if OAuth providers are enabled
const isGoogleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";
const isGithubEnabled = process.env.NEXT_PUBLIC_GITHUB_ENABLED === "true";
const showOAuthDivider = isGoogleEnabled || isGithubEnabled;

type LoginDialogProps = {
    children: React.ReactNode;
};

type OAuthSectionProps = {
    isLoading: boolean;
    lastUsedMethod: string | null;
    onSocialSignIn: (provider: "github" | "google") => void;
};

function OAuthSection({
    isLoading,
    lastUsedMethod,
    onSocialSignIn,
}: OAuthSectionProps) {
    if (!showOAuthDivider) {
        return null;
    }

    return (
        <>
            <div
                className={
                    isGoogleEnabled && isGithubEnabled
                        ? "grid grid-cols-2 gap-4"
                        : "grid grid-cols-1 gap-4"
                }
            >
                {isGoogleEnabled && (
                    <div className="relative">
                        {lastUsedMethod === "google" && (
                            <span className="-top-2 -right-2 fade-in zoom-in absolute z-10 flex h-5 animate-in items-center justify-center rounded-sm border border-primary bg-background px-2 font-medium text-[10px] text-primary shadow-sm duration-300">
                                Last used
                            </span>
                        )}
                        <Button
                            className="h-11 w-full"
                            disabled={isLoading}
                            onClick={() => onSocialSignIn("google")}
                            type="button"
                            variant="outline"
                        >
                            <FcGoogle className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                )}
                {isGithubEnabled && (
                    <div className="relative">
                        {lastUsedMethod === "github" && (
                            <span className="-top-2 -right-2 fade-in zoom-in absolute z-10 flex h-5 animate-in items-center justify-center rounded-full bg-primary px-2 font-medium text-[10px] text-primary-foreground shadow-sm ring-2 ring-background duration-300">
                                Last used
                            </span>
                        )}
                        <Button
                            className="h-11 w-full"
                            disabled={isLoading}
                            onClick={() => onSocialSignIn("github")}
                            type="button"
                            variant="outline"
                        >
                            <FaGithub className="mr-2 h-4 w-4" />
                            GitHub
                        </Button>
                    </div>
                )}
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">OR</span>
                </div>
            </div>
        </>
    );
}

export function LoginDialog({
    children,
    open,
    onOpenChange,
    onSignupClick,
}: LoginDialogProps & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSignupClick?: () => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");
    const [lastUsedMethod, setLastUsedMethod] = useState<string | null>(null);
    const [internalOpen, setInternalOpen] = useState(false);
    const router = useRouter();

    const isControlled = typeof open !== "undefined";
    const isOpen = isControlled ? open : internalOpen;
    const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

    useEffect(() => {
        const storedMethod = localStorage.getItem("turbomvp-last-login-method");
        if (storedMethod) {
            setLastUsedMethod(storedMethod);
        }
    }, []);

    const handleSocialSignIn = async (provider: "github" | "google") => {
        // Check if provider is enabled
        if (provider === "google" && !isGoogleEnabled) {
            toast.error("Google sign-in is not configured. Please contact support.");
            return;
        }
        if (provider === "github" && !isGithubEnabled) {
            toast.error("GitHub sign-in is not configured. Please contact support.");
            return;
        }

        localStorage.setItem("turbomvp-last-login-method", provider);

        setIsLoading(true);
        setError("");
        try {
            const data = await authClient.signIn.social({
                provider,
                callbackURL: window.location.href,
            });

            if (data?.error) {
                setError(data.error.message || "An error occurred");
                setIsLoading(false);
            }
        } catch (_err) {
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Login failed");
            } else {
                localStorage.setItem("turbomvp-last-login-method", "email");
                localStorage.setItem("turbomvp-last-login-method", "email");
                if (handleOpenChange) {
                    handleOpenChange(false);
                }
                toast.success("Logged in successfully");
            }
        } catch (_err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog onOpenChange={handleOpenChange} open={isOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-md">
                <div className="space-y-6">
                    <div className="flex flex-col items-center text-center">
                        <DialogTitle className="font-semibold text-2xl tracking-tight">
                            Welcome back
                        </DialogTitle>
                        <DialogDescription className="mt-1 text-muted-foreground text-sm">
                            Please enter your details to login.
                        </DialogDescription>
                    </div>

                    <OAuthSection
                        isLoading={isLoading}
                        lastUsedMethod={lastUsedMethod}
                        onSocialSignIn={handleSocialSignIn}
                    />

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="dialog-email">Email</Label>
                                <Input
                                    className="h-11 border-0 bg-muted/50"
                                    id="dialog-email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    type="email"
                                    value={email}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dialog-password">Password</Label>
                                <div className="relative">
                                    <Input
                                        className="h-11 border-0 bg-muted/50 pr-10"
                                        id="dialog-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                    />
                                    <button
                                        className="-translate-y-1/2 absolute top-1/2 right-3 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                        type="button"
                                    >
                                        {showPassword ? (
                                            <ViewOffSlashIcon size={20} />
                                        ) : (
                                            <ViewIcon size={20} />
                                        )}
                                    </button>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        className="text-muted-foreground text-sm hover:text-primary"
                                        href="/forgot-password"
                                        onClick={() => handleOpenChange?.(false)}
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-center text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            {lastUsedMethod === "email" && (
                                <span className="-top-2 -right-2 fade-in zoom-in absolute z-10 flex h-5 animate-in items-center justify-center rounded-sm border border-primary bg-background px-2 font-medium text-[10px] text-primary shadow-sm duration-300">
                                    Last used
                                </span>
                            )}
                            <Button
                                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading ? "Signing in..." : "Login"}
                            </Button>
                        </div>
                    </form>

                    <div className="text-center text-muted-foreground text-sm">
                        Don't have an account?{" "}
                        <Button
                            onClick={() => {
                                if (onSignupClick) {
                                    onSignupClick();
                                } else {
                                    handleOpenChange?.(false);
                                    router.push("/signup");
                                }
                            }}
                            type="button"
                            variant="link"
                        >
                            Register now
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
