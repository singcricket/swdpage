import { Hero } from "@/components/site/sections/hero";
import { About } from "@/components/site/sections/about";
import { Services } from "@/components/site/sections/services";
import { Why } from "@/components/site/sections/why";
import { Team } from "@/components/site/sections/team";
import { Facility } from "@/components/site/sections/facility";
import { Visit } from "@/components/site/sections/visit";
import { CTA } from "@/components/site/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Why />
      <Team />
      <Facility />
      <Visit />
      <CTA />
    </>
  );
}
