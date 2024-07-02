"use client";
import { Switch } from "@/components/ui/switch";
import { EyeOff, MoonStar, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="pt-7 pr-6 w-[300px] flex flex-col justify-between bg-white h-full border-r border-[#E4EBFA] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] dark:bg-dark-grey dark:border-lines-dark">
      <div>
        <div className="pl-7 flex items-center gap-4">
          <Image src={"/logo/logo.png"} alt="Logo" width={24} height={24} />
          <p className="font-primary font-extrabold text-xl dark:text-white">
            doit.
          </p>
        </div>
        <div className="mt-14 tracking-[2.4px]">
          <p className="pl-7 font-primary text-md-grey font-bold">
            ALL BOARDS (3)
          </p>
        </div>
      </div>
      <div>
        <div className=" drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex gap-6 justify-center items-center rounded-md py-3 ml-6 mb-5 bg-[#F4F7FD] dark:bg-very-dark-grey">
          <Sun color="#828FA3" />
          <Switch
            checked={isDarkMode}
            onCheckedChange={() => setIsDarkMode(!isDarkMode)}
            className="bg-[#635FC7]"
            color="#635FC7"
          />
          <MoonStar color="#828FA3" />
        </div>
        <div className="gap-4 mb-12 pl-6 flex items-center">
          <EyeOff color="#828FA3" />
          <p className="text-sm text-md-grey font-bold font-primary">
            {" "}
            Hide Sidebar
          </p>
        </div>
      </div>
    </div>
  );
}
