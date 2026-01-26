import Sidebar from "@/components/Sidebar";

export default function Page() {
    return (
        <div className="flex h-screen">
            <div className="flex-1 p-10 border-r">
                <Sidebar />
            </div>
            <div className="flex-2">
            </div>
        </div>
    );
}