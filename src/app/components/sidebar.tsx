"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { EyeOff, MoonStar, Sun, Table, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [columns, setColumns] = useState<any>([
    {
      id: 0,
      name: "To do",
    },
    {
      id: 1,
      name: "Doing",
    },
  ]);
  const [boardName, setBoardName] = useState<string>("");
  const [boards, setBoards] = useState<string[]>([]);

  function handleChange(index: number, val: string) {
    const temp = columns.map((column: any, i: number) => {
      if (i === index) {
        return { ...column, name: val };
      } else {
        return column;
      }
    });
    setColumns(temp);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="pt-7 pr-6 min-w-[300px] flex flex-col justify-between bg-white h-full border-r border-[#E4EBFA] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] dark:bg-dark-grey dark:border-lines-dark">
      <div>
        <div className="pl-7 flex items-center gap-4">
          <Image src={"/logo/logo.png"} alt="Logo" width={24} height={24} />
          <p className="font-primary font-extrabold text-xl dark:text-white">
            doit.
          </p>
        </div>
        <div className="mt-14">
          <p className="pl-7 tracking-[2.4px] mb-5 font-primary text-md-grey font-bold">
            ALL BOARDS (3)
          </p>
          {boards.map((board: string, i: number) => {
            return (
              <div
                key={i}
                className="flex gap-4 py-4 pl-7 rounded-r-full cursor-pointer text-md-grey hover:text-white hover:bg-main-purple"
              >
                <Table />
                <p className="text-base dark:text-base font-primary font-bold">
                  {board}
                </p>
              </div>
            );
          })}
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="flex gap-4 py-4 pl-7 rounded-r-full cursor-pointer text-main-purple hover:text-white hover:bg-main-purple">
                <Table />
                <p className="text-base dark:text-base font-primary font-bold">
                  + Create New Board
                </p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <p className="dark:text-white font-primary text-lg font-bold ">
                Add New Board
              </p>
              <p className="dark:text-white text-xs font-primary">Board Name</p>
              <Input
                onChange={(e) => setBoardName(e.target.value)}
                className="border border-md-grey"
                placeholder="e.g. Web Design"
              />
              <p className="dark:text-white text-xs font-primary">
                Board Columns
              </p>
              {columns.map((column: any, i: number) => {
                return (
                  <div key={i} className="flex w-full items-center gap-4">
                    <Input
                      className="border border-md-grey"
                      onChange={(e) => handleChange(i, e.target.value)}
                      value={column.name}
                    />
                    <X
                      onClick={() =>
                        setColumns((prev: any) =>
                          prev.filter((_: any, index: number) => i !== index)
                        )
                      }
                      className="cursor-pointer"
                      color="#828FA3"
                    />
                  </div>
                );
              })}
              <Button
                onClick={(e) => setColumns((prev: any) => [...prev, ""])}
                className="rounded-2xl hover:bg-white bg-white text-main-purple text-xs font-bold font-primary"
              >
                + Add New Column
              </Button>
              <Button
                onClick={() => setBoards((prev) => [...prev, boardName])}
                className="rounded-2xl hover:bg-main-purple bg-main-purple text-white text-xs font-bold font-primary"
              >
                Create New Board
              </Button>
            </DialogContent>
          </Dialog>
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
