import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { PlaygroundDemo } from "./components/landing/playground";
import { Features } from "./components/landing/features";
import { Steps } from "./components/landing/steps";
import { Pricing } from "./components/landing/pricing";
import { Footer } from "./components/landing/footer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
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
