import { Avatar, AvatarImage, AvatarFallback } from "@monorepo/ui";

type AppAvatarProps = {
  src?: string;
  name?: string;
  className?: string;
  textAvatarClassName?: string;
};

export function AppAvatar({
  src,
  name,
  className,
  textAvatarClassName,
}: AppAvatarProps) {
  return (
    <Avatar className={className}>
      {src ? <AvatarImage src={src} /> : null}
      <AvatarFallback className={textAvatarClassName}>
        {name?.charAt(0).toUpperCase() || "?"}
      </AvatarFallback>
    </Avatar>
  );
}
