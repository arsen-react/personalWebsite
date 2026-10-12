import { PulseDot } from "@/shared/ui/atoms";
import styles from "./Logo.module.css";

/** Brand mark: pulsing accent dot plus the site name. */
export function Logo({ brand }: { brand: string }) {
  return (
    <div className={styles.logo}>
      <PulseDot />
      {brand}
    </div>
  );
}
