import PromptBox from "./prompt-box";
import Image from "next/image";

const Sidebar = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <h1 className="flex items-center gap-2 text-xl font-bold">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                    SVG Engine
                </h1>
                <p className="text-muted-foreground">
                    Describe an icon, and let AI generate it for you
                </p>
            </div>
            <PromptBox />
        </div>
    );
};

export default Sidebar;
