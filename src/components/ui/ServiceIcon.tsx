import { Car, DoorOpen, Hammer, Sun, Umbrella, type LucideProps } from "lucide-react";
import type { ServiceIconName } from "@/data/services";

const icons = {
  sun: Sun,
  car: Car,
  umbrella: Umbrella,
  hammer: Hammer,
  door: DoorOpen,
} as const;

export function ServiceIcon({
  name,
  ...props
}: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.4} {...props} />;
}
