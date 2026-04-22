import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-soft border border-ink",
  secondary:
    "bg-transparent text-ink hover:bg-ink hover:text-paper border border-ink",
  ghost:
    "bg-transparent text-ink hover:bg-paper-muted border border-black/15",
};

const base =
  "group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300";

export default function Button(props: LinkButtonProps | ButtonProps) {
  const { children, variant = "primary", className } = props;
  const classes = cn(base, styles[variant], className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noreferrer"
          className={classes}
        >
          {children}
          <Arrow />
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
        <Arrow />
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
      <Arrow />
    </button>
  );
}

function Arrow() {
  return (
    <span
      className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
      aria-hidden
    >
      →
    </span>
  );
}
