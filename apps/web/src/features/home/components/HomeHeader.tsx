import { Horizontal } from "@monorepo/ui";
import type { FC } from "react";
import { AvatarMenu } from "./AvatarMenu";
interface IHomeHeaderProps {}

export const HomeHeader: FC<IHomeHeaderProps> = () => {
  return (
    <Horizontal className="h-14 bg-primary/50 flex px-4">
      <div className="flex-1"></div>
      <AvatarMenu></AvatarMenu>
    </Horizontal>
  );
};
