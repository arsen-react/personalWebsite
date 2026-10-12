import styles from "./Footer.module.css";

interface FooterProps {
  name: string;
  city: string;
  year?: number;
}

export function Footer({ name, city, year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          &copy; {year} {name}. Crafted with{" "}
          <span role="img" aria-label="love">
            &hearts;
          </span>{" "}
          in {city}.
        </p>
      </div>
    </footer>
  );
}
