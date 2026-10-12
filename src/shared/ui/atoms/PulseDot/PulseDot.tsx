import { cn } from "@/shared/lib/cn";
import styles from "./PulseDot.module.css";

/** Small glowing accent dot that pulses slowly. Decorative. */
export function PulseDot({ className }: { className?: string }) {
  return <span className={cn(styles.dot, className)} aria-hidden="true" />;
}
