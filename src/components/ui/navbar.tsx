import { Button } from "@/components/ui/button";
import { Board, Column, NavBarProps } from "@/types";
import { EllipsisVertical } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useState } from "react";
import { addNewTask } from "@/lib/indexedDB";
import { uuid } from "uuidv4";

export default function NavBar({
  db,
  board,
  columns,
  setTrigger,
}: NavBarProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [columnId, setColumnId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  function addTask() {
    addNewTask(db, { id: uuid(), taskName: taskName, columnId: columnId });
    setTrigger((prev) => !prev);
    setOpen(false);
  }

  if (board) {
    return (
      <div className="flex justify-between items-center border-b-2 border-[#E4EBFA] bg-white w-full h-24 pt-5 pb-7 pr-8 pl-6 dark:bg-dark-grey dark:border-lines-dark">
        <p className="font-primary font-bold text-2xl dark:text-white">
          {board.boardName}
        </p>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full self-end">
              <div className="flex items-center gap-6">
                <Button className="bg-main-purple rounded-3xl">
                  + Add New Task
                </Button>
                <EllipsisVertical color="#828FA3" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <p className="dark:text-white font-primary text-lg font-bold ">
                Add new task
              </p>
              <p className="dark:text-white text-xs font-primary">Task</p>
              <Input
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="e.g. Vibe"
              />
              <p className="dark:text-white text-xs font-primary">Select</p>
              <Select onValueChange={(value) => setColumnId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => {
                    return (
                      <SelectItem value={column.id}>
                        {column.columnName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                onClick={addTask}
                className="rounded-2xl hover:bg-main-purple bg-main-purple text-white text-xs font-bold font-primary"
              >
                Create Task
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center border-b-2 border-[#E4EBFA] bg-white w-full h-24 pt-5 pb-7 pr-8 pl-6 dark:bg-dark-grey dark:border-lines-dark"></div>
    );
  }
}
