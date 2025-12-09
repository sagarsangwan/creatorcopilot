import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For creators just getting started.",
    features: [
      "5 posts per month",
      "2 platform connections",
      "Basic AI captions",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professional content creators.",
    features: [
      "Unlimited posts",
      "All platform connections",
      "Advanced AI captions",
      "Priority support",
      "Analytics dashboard",
      "Custom brand voice",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$79",
    period: "/month",
    description: "For agencies and teams.",
    features: [
      "Everything in Pro",
      "5 team members",
      "Collaboration tools",
      "White-label exports",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#1A1A1A]/60 text-lg">
            Choose the plan that fits your needs. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`rounded-xl p-6 ${
                plan.highlighted
                  ? "bg-[#111111] border-[#111111] ring-2 ring-[#4C6FFF] ring-offset-2"
                  : "bg-white border-[#E5E5E5]"
              }`}
            >
              {/* Plan Name */}
              <div className="mb-6">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    plan.highlighted ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.highlighted ? "text-white/60" : "text-[#1A1A1A]/60"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`text-4xl font-semibold ${
                    plan.highlighted ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlighted ? "text-white/60" : "text-[#1A1A1A]/60"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.highlighted ? "bg-[#4C6FFF]" : "bg-[#F5F5F5]"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.highlighted ? "text-white" : "text-[#4C6FFF]"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-white/80" : "text-[#1A1A1A]/70"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full h-11 rounded-lg font-medium ${
                  plan.highlighted
                    ? "bg-[#4C6FFF] hover:bg-[#3B5CE9] text-white"
                    : "bg-[#111111] hover:bg-[#1A1A1A] text-white"
                }`}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
