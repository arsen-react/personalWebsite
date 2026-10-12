import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Crafted with{" "}
          <span>&hearts;</span> in Yerevan.
        </p>
      </div>
    </footer>
  );
}
