import { setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Commitments } from "@/components/sections/Commitments";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <ServicesGrid />
      <WhyUs />
      <FeaturedProjects />
      <Process />
      <GalleryPreview />
      {testimonials.length > 0 ? <Testimonials /> : <Commitments />}
      <CtaBanner />
      <LatestPosts />
    </>
  );
}
