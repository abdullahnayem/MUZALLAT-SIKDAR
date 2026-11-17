"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export type FilterItem = {
  key: string;
  /** Service slugs this item belongs to. */
  services: string[];
  node: React.ReactNode;
};

/** Service-category filter. Cards are rendered on the server and passed in as nodes. */
export function ProjectFilter({
  tabs,
  items,
}: {
  tabs: { value: string; label: string }[];
  items: FilterItem[];
}) {
  const t = useTranslations("projectsPage");
  const [active, setActive] = useState("all");
  const panelId = useId();

  const visible =
    active === "all" ? items : items.filter((i) => i.services.includes(active));

  return (
    <div>
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="flex flex-wrap gap-2"
      >
        {[{ value: "all", label: t("all") }, ...tabs].map((tab) => {
          const selected = active === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(tab.value)}
              className={cn(
                "label min-h-11 border px-5 py-2 transition-colors",
                selected
                  ? "border-ink bg-ink text-ivory"
                  : "border-charcoal/25 text-charcoal hover:border-ink hover:bg-ink hover:text-ivory",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        aria-live="polite"
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.length === 0 ? (
          <p className="col-span-full py-10 text-stone">{t("empty")}</p>
        ) : (
          visible.map((item, i) => (
            <Reveal key={item.key} delay={(i % 3) * 70}>
              {item.node}
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}
