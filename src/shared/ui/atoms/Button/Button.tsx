import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Button.module.css";

interface CommonProps {
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

/** Renders a link when given `href`, otherwise a native button. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = "primary", className, children, ...linkProps } = props;
    return (
      <a className={cn(styles.button, styles[variant], className)} {...linkProps}>
        {children}
      </a>
    );
  }

  const { variant = "primary", className, children, type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={cn(styles.button, styles[variant], className)} {...buttonProps}>
      {children}
    </button>
  );
}
