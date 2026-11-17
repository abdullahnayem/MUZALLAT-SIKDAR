"use client";

import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";
import {
  validateContact,
  type ContactInput,
  type FieldErrors,
  type FieldName,
} from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

const empty: ContactInput = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  website: "",
};

const fieldOrder: FieldName[] = ["name", "phone", "email", "service", "message"];

const inputClass =
  "block w-full border bg-white px-4 py-3 text-base text-charcoal placeholder:text-stone/70 focus:border-gold-deep focus:outline-none focus:ring-1 focus:ring-gold-deep";

export function ContactForm({
  serviceOptions,
  whatsappNumber,
}: {
  serviceOptions: { value: string; label: string }[];
  whatsappNumber: string;
}) {
  const t = useTranslations("contact.form");
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const id = (field: string) => `${uid}-${field}`;
  const update = (field: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field as FieldName]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const serviceLabel =
    serviceOptions.find((o) => o.value === values.service)?.label ?? t("serviceOther");

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    t("whatsappPrefill", {
      service: serviceLabel,
      name: values.name.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
    }),
  )}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setValues(empty);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-gold-deep/40 bg-white p-8 text-center sm:p-12"
      >
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-gold-deep" strokeWidth={1.3} />
        <h3 className="display mt-5 text-3xl">{t("successTitle")}</h3>
        <p className="mt-3 text-stone">{t("successText")}</p>
      </div>
    );
  }

  const fields: { name: FieldName; label: string }[] = [
    { name: "name", label: t("name") },
    { name: "phone", label: t("phone") },
    { name: "email", label: t("email") },
  ];

  const errorText = (field: FieldName) => (errors[field] ? t(errors[field]!) : null);
  const describedBy = (field: FieldName) =>
    errors[field] ? `${id(field)}-error` : undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot: real visitors never see or fill this. */}
      <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map(({ name, label }) => (
          <div key={name} className={name === "name" ? "sm:col-span-2" : undefined}>
            <label htmlFor={id(name)} className="mb-2 block text-sm font-semibold">
              {label}
            </label>
            <input
              id={id(name)}
              name={name}
              type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
              inputMode={name === "phone" ? "tel" : undefined}
              autoComplete={name === "name" ? "name" : name === "phone" ? "tel" : "email"}
              dir={name === "name" ? undefined : "ltr"}
              value={values[name]}
              onChange={update(name)}
              aria-invalid={errors[name] ? true : undefined}
              aria-describedby={describedBy(name)}
              className={cn(
                inputClass,
                name !== "name" && "rtl:text-end",
                errors[name] ? "border-red-700" : "border-charcoal/25",
              )}
            />
            {errors[name] && (
              <p id={`${id(name)}-error`} className="mt-2 text-sm text-red-700">
                {errorText(name)}
              </p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor={id("service")} className="mb-2 block text-sm font-semibold">
            {t("service")}
          </label>
          <select
            id={id("service")}
            name="service"
            value={values.service}
            onChange={update("service")}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy("service")}
            className={cn(
              inputClass,
              errors.service ? "border-red-700" : "border-charcoal/25",
            )}
          >
            <option value="">{t("servicePlaceholder")}</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id={`${id("service")}-error`} className="mt-2 text-sm text-red-700">
              {errorText("service")}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="mb-2 block text-sm font-semibold">
            {t("message")}
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            value={values.message}
            onChange={update("message")}
            placeholder={t("messagePlaceholder")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            className={cn(
              inputClass,
              "resize-y",
              errors.message ? "border-red-700" : "border-charcoal/25",
            )}
          />
          {errors.message && (
            <p id={`${id("message")}-error`} className="mt-2 text-sm text-red-700">
              {errorText("message")}
            </p>
          )}
        </div>
      </div>

      {Object.keys(errors).some((k) => errors[k as FieldName]) && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {t("fixErrors")}
        </p>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="flex gap-4 border border-red-700/40 bg-red-50 p-5 text-red-900"
        >
          <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">{t("errorTitle")}</p>
            <p className="mt-1 text-sm">{t("errorText")}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 bg-[#1f9d55] px-4 py-2 text-sm font-semibold text-white"
            >
              <WhatsAppIcon bare className="size-5" />
              {t("whatsappFallback")}
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="label inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ink px-8 py-3 text-ivory transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}
