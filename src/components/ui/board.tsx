import { getAllTasks } from "@/lib/indexedDB";
import { Column, MainBoardProps, Task } from "@/types";
import { useEffect, useState } from "react";

export default function MainBoard({ columns, db }: MainBoardProps) {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});

  useEffect(() => {
    columns.forEach((column) => {
      getAllTasks(db, column.id).then((res) => {
        setTasks((prev) => ({ ...prev, [column.id]: res }));
      });
    });
  }, [columns, db]);

  console.log(columns);
  console.log(tasks);

  return (
    <div className="h-[calc(100%-96px)] p-6 w-full flex gap-6 dark:bg-very-dark-grey">
      {columns?.map((column) => {
        return (
          <div key={column.id}>
            <p className=" w-72 tracking-[2.4px] mb-5 font-primary text-md-grey uppercase font-bold">
              {column.columnName}
            </p>
            {tasks[column.id]?.map((task) => {
              return (
                <div
                  key={task.id}
                  className="font-primary font-bold px-4 mb-4 py-6 rounded-lg w-full dark:bg-dark-grey dark:text-white"
                >
                  <p className="text-white">{task.taskName}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
