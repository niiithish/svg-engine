import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy02Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex h-screen">
            <div className="flex-1 p-10 border-r">
                <Sidebar />
            </div>
            <div className="flex-2 p-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 items-start content-start">
                <Card>
                    <CardContent className="flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-center gap-2">
                        <Button variant="outline" className="flex-1 group">
                            <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                                <HugeiconsIcon icon={Copy02Icon} />
                            </span>
                            Copy
                        </Button>
                        <Button className="flex-1 group">
                            <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                                <HugeiconsIcon icon={Download01Icon} />
                            </span>
                            Download
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardContent className="flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-center gap-2">
                        <Button variant="outline" className="flex-1 group">
                            <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                                <HugeiconsIcon icon={Copy02Icon} />
                            </span>
                            Copy
                        </Button>
                        <Button className="flex-1 group">
                            <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                                <HugeiconsIcon icon={Download01Icon} />
                            </span>
                            Download
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardContent className="flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-center gap-2">
                        <Button variant="outline" className="flex-1 group">
                            <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                                <HugeiconsIcon icon={Copy02Icon} />
                            </span>
                            Copy
                        </Button>
                        <Button className="flex-1 group">
                            <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover: transition-all duration-300 ease-in-out">
                                <HugeiconsIcon icon={Download01Icon} />
                            </span>
                            Download
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}