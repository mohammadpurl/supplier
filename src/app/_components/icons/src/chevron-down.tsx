import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIcont } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props: SvgIcont) {
  return (
    <BaseIcon {...props}>
      <path d="M21 7.5L12 16.5L3 7.5" />
    </BaseIcon>
  );
}
