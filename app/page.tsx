import { AppSidebar } from "@/components/main-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy02Icon, Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { db } from "@/index";
import { iconsTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Page() {
    const icons = await db.select().from(iconsTable).orderBy(desc(iconsTable.createdAt));

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="flex-1 p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 items-start content-start">
                        {icons.length === 0 ? (
                            <p className="text-sm">No icons found</p>
                        ) : (
                            icons.map((icon) => (
                                icon.svg.length > 0 && <Card key={icon.id}>
                                    <CardContent className="flex items-center justify-center p-8">
                                        <div
                                            className="h-24 w-24 [&_svg]:size-full"
                                            dangerouslySetInnerHTML={{ __html: icon.svg }}
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
                            )))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}