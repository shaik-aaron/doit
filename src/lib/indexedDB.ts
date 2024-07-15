import { Board, Column, Task } from "@/types";

const DB_NAME = "doit";
const DB_VERSION = 1;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest)?.result;

      // Create Boards store
      if (!db.objectStoreNames.contains("boards")) {
        const boardsStore = db.createObjectStore("boards", { keyPath: "id" });
        boardsStore.createIndex("boardName", "boardName", { unique: false });
      }

      // Create Columns store
      if (!db.objectStoreNames.contains("columns")) {
        const columnsStore = db.createObjectStore("columns", { keyPath: "id" });
        columnsStore.createIndex("boardId", "boardId", { unique: false });
        columnsStore.createIndex("columnName", "columnName", { unique: false });
      }

      // Create Tasks store
      if (!db.objectStoreNames.contains("tasks")) {
        const tasksStore = db.createObjectStore("tasks", { keyPath: "id" });
        tasksStore.createIndex("columnId", "columnId", { unique: false });
        tasksStore.createIndex("taskName", "taskName", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).result);
    };
  });
};

// Function to add a board
export const addBoard = async (
  db: IDBDatabase,
  board: Board
): Promise<Board> => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaction = db.transaction("boards", "readwrite");
      const store = transaction.objectStore("boards");
      const request = store.add(board);

      request.onsuccess = () => resolve(board);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to get all boards
export const getAllBoards = async (db: IDBDatabase): Promise<Board[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaction = db.transaction("boards", "readonly");
      const store = transaction.objectStore("boards");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to add a column
export const addColumn = async (
  db: IDBDatabase,
  column: Column
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction("columns", "readwrite");
      const store = transaction.objectStore("columns");
      const request = store.add(column);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to get all columns
export const getAllColumns = async (
  db: IDBDatabase,
  boardId: string
): Promise<Column[]> => {
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction("columns", "readonly");
      const store = transaction.objectStore("columns");
      const index = store.index("boardId");
      const request = index.getAll(boardId);

      request.onsuccess = () => {
        const columns = request.result.sort(
          (a: Column, b: Column) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        resolve(columns);
      };
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to add a task
export const addNewTask = async (
  db: IDBDatabase,
  task: Task
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaction = db.transaction("tasks", "readwrite");
      const store = transaction.objectStore("tasks");
      const request = store.add(task);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to get all tasks
export const getAllTasks = async (
  db: IDBDatabase,
  columnId: string
): Promise<Task[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaction = db.transaction("tasks", "readonly");
      const store = transaction.objectStore("tasks");
      const index = store.index("columnId");
      const request = index.getAll(columnId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};
