import { describe, expect, it } from "vitest";
import { cn } from "./cn";
import { hexToRgb, rgba } from "./color";
import { externalLinkProps, isExternalHref, mailHref, telHref } from "./links";

describe("cn", () => {
  it("joins truthy class names and skips the rest", () => {
    const isOpen = false;
    expect(cn("menu", isOpen && "open", undefined, null, "dark")).toBe("menu dark");
  });
});

describe("links", () => {
  it("recognises external URLs", () => {
    expect(isExternalHref("https://github.com/arsen-react")).toBe(true);
    expect(isExternalHref("#contact")).toBe(false);
    expect(isExternalHref("mailto:a@b.c")).toBe(false);
  });

  it("opens external links safely", () => {
    expect(externalLinkProps).toEqual({ target: "_blank", rel: "noopener noreferrer" });
  });

  it("builds mail and phone hrefs", () => {
    expect(mailHref("arsen.front@gmail.com")).toBe("mailto:arsen.front@gmail.com");
    expect(telHref("+374 44 18 11 61")).toBe("tel:+37444181161");
  });
});

describe("color", () => {
  it("parses #rrggbb, ignoring surrounding whitespace", () => {
    expect(hexToRgb(" #d4a04a ")).toEqual({ r: 212, g: 160, b: 74 });
  });

  it("returns the fallback for anything else", () => {
    const fallback = { r: 1, g: 2, b: 3 };
    expect(hexToRgb("var(--accent)", fallback)).toBe(fallback);
    expect(hexToRgb("#fff", fallback)).toBe(fallback);
  });

  it("formats rgba()", () => {
    expect(rgba({ r: 212, g: 160, b: 74 }, 0.25)).toBe("rgba(212,160,74,0.25)");
  });
});
