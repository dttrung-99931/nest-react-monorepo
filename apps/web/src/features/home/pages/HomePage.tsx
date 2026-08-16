import { type FC } from "react";
import { Vertical } from "@monorepo/ui";
import { HomeHeader } from "../components/HomeHeader";
import { HomeSideBar } from "../components/HomeSideBar";

export const HomePage: FC = () => {
  return (
    <div className="h-full w-full flex">
      <HomeSideBar />
      <Vertical className="flex-1 items-left min-h-0">
        <HomeHeader />
        <div className="flex-1 min-h-0 overflow-hidden" />
      </Vertical>
    </div>
  );
};
