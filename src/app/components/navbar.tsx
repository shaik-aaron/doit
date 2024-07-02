import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center border-b-2 border-[#E4EBFA] bg-white w-full h-24 pt-5 pb-7 pr-8 pl-6 dark:bg-dark-grey dark:border-lines-dark">
      <p className="font-primary font-bold text-2xl dark:text-white">
        Platform Launch
      </p>
      <div className="flex items-center gap-6">
        <Button className="bg-main-purple rounded-3xl">+ Add New Task</Button>
        <EllipsisVertical color="#828FA3" />
      </div>
    </div>
  );
}
