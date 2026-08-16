import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@monorepo/ui";
import type { FC } from "react";
import { AppAvatar } from "../../../shared/components/AppAvatar";
import { showComingSoon } from "../../../utils/toast";
interface IAvatarMenuProps {}

export const AvatarMenu: FC<IAvatarMenuProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AppAvatar name="Trung"></AppAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              showComingSoon();
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {/* DropdownMenuGroupp, DropdownMenuLabel,DropdwonMenuSep */}
    </DropdownMenu>
  );
};
