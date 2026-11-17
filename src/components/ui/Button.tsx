import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "gold" | "light" | "outline-light" | "outline-dark" | "dark";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-ivory border border-gold hover:border-ivory",
  light: "bg-ivory text-ink hover:bg-gold border border-ivory hover:border-gold",
  dark: "bg-ink text-ivory hover:bg-gold hover:text-ink border border-ink hover:border-gold",
  "outline-light":
    "border border-white/45 text-ivory hover:bg-ivory hover:text-ink hover:border-ivory",
  "outline-dark":
    "border border-charcoal/60 text-charcoal hover:bg-ink hover:text-ivory hover:border-ink",
};

const base =
  "label inline-flex min-h-12 items-center justify-center gap-2.5 px-7 py-3 text-center transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

/** Internal (locale-aware) link styled as a button. */
export function ButtonLink({
  href,
  variant = "gold",
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

/** External / tel: link styled as a button. */
export function ButtonAnchor({
  href,
  variant = "gold",
  className,
  children,
  external,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Button({
  variant = "gold",
  className,
  children,
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
