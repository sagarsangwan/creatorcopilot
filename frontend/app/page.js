import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { PlaygroundDemo } from "./components/landing/playground";
import { Features } from "./components/landing/features";
import { Steps } from "./components/landing/steps";
import { Pricing } from "./components/landing/pricing";
import { Footer } from "./components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PlaygroundDemo />
        <Features />
        <Steps />
        {/* <Pricing /> */}
      </main>
      <Footer />
    </div>
  );
}
