"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("error");
  return (
    <section className="on-dark bg-ink py-32 text-ivory">
      <Container narrow className="text-center">
        <h1 className="display text-4xl sm:text-5xl">{t("title")}</h1>
        <div className="rule-gold mx-auto mt-6 w-24" aria-hidden />
        <p className="mx-auto mt-6 max-w-md text-lg text-mist">{t("text")}</p>
        <div className="mt-10">
          <Button onClick={reset}>{t("retry")}</Button>
        </div>
      </Container>
    </section>
  );
}
