"use client";
import { Button } from "@/components/ui/button";
import NavBar from "../components/ui/navbar";
import SideBar from "../components/ui/sidebar";
import { useEffect, useState } from "react";
import { getAllBoards, getAllColumns, openDB } from "@/lib/indexedDB";
import { Board, Column } from "@/types";
import MainBoard from "@/components/ui/board";

export default function Home() {
  const [db, setDb] = useState<IDBDatabase | any>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [board, setBoard] = useState<Board | any>();

  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (board && db) {
      getAllColumns(db, board.id).then((data) => setColumns(data));
    }
  }, [board, trigger]);

  useEffect(() => {
    openDB()
      .then((data) => {
        setDb(data);
        getAllBoards(data).then((res) => setBoards(res));
      })
      .catch((error) => console.error("Error opening database:", error));
  }, [trigger]);

  return (
    <div className="bg-light-grey flex w-screen h-screen">
      <SideBar
        db={db}
        setTrigger={setTrigger}
        boards={boards}
        selectedBoard={board}
        setSelectedBoard={setBoard}
      />
      <div className="w-full">
        <NavBar
          setTrigger={setTrigger}
          db={db}
          board={board}
          columns={columns}
        />
        <MainBoard db={db} columns={columns} />
      </div>
    </div>
  );
}
