import { Button } from "@/components/ui/button";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";

export default function Home() {
  return (
    <div className="bg-light-grey flex w-screen h-screen">
      <SideBar />
      <div className="w-full">
        <NavBar />
        <div className="h-[calc(100%-96px)] w-full flex justify-center items-center dark:bg-very-dark-grey">
          <Button className="bg-main-purple rounded-3xl">
            + Add New Column
          </Button>
        </div>
      </div>
    </div>
  );
}
