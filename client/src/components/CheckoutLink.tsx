"use client";

import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import { trackEvent } from "@/lib/analytics";

type CheckoutLinkProps = {
  href?: string | null;
  fallbackHref?: string;
  label: string;
  cta: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  className?: string;
};

export function CheckoutLink({
  href,
  fallbackHref = "/contact",
  label,
  cta,
  variant = "default",
  size = "lg",
  className,
}: CheckoutLinkProps) {
  const normalizedHref = href?.trim();
  const effectiveHref = normalizedHref || fallbackHref;
  const isExternal = effectiveHref.startsWith("http");

  const handleClick = () => {
    trackEvent("checkout_click", {
      cta,
      destination: isExternal ? "stripe" : effectiveHref,
      has_checkout: Boolean(normalizedHref),
      entry_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  };

  if (isExternal) {
    return (
      <a href={effectiveHref} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        <Button variant={variant} size={size} className={className}>
          {label}
        </Button>
      </a>
    );
  }

  return (
    <Link href={effectiveHref} onClick={handleClick}>
      <Button variant={variant} size={size} className={className}>
        {label}
      </Button>
    </Link>
  );
}

