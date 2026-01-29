import { AppSidebar } from "@/components/main-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/index";
import { iconsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { IconCard } from "@/components/icon-card";

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
                                icon.svg.length > 0 && <IconCard key={icon.id} svg={icon.svg} id={icon.id} />
                            )))}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}