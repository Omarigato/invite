import { AmbientBackground } from "@/components/landing/ambient-background";
import { Hero } from "@/components/landing/hero";
import { CategoryGrid } from "@/components/landing/category-grid";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="relative mx-auto flex min-h-dvh max-w-7xl flex-col">
      <AmbientBackground />
      <section className="relative mx-auto flex w-full max-w-screen-xl flex-1 flex-col px-4 pb-8 pt-0 sm:px-5 sm:pt-4 lg:px-8 lg:pb-12 lg:pt-8 xl:px-10">
        <Header />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-12">
          <Hero />
          <div className="relative w-full shrink-0 lg:w-[42%] xl:w-2/5 order-2">
            <CategoryGrid />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
