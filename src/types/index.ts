import { Dispatch, SetStateAction } from "react";

export interface Board {
  id: string;
  boardName: string;
}

export interface Column {
  id: string;
  boardId: string;
  columnName: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  columnId: string;
  taskName: string;
}

export interface SideBarProps {
  db: IDBDatabase | null;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  boards: Board[];
  selectedBoard: Board;
  setSelectedBoard: Dispatch<SetStateAction<Board | undefined>>;
}

export interface NavBarProps {
  db: IDBDatabase;
  board: Board;
  columns: Column[];
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

export interface MainBoardProps {
  columns: Column[];
  db: IDBDatabase;
}
