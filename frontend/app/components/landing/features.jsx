import { Card } from "@/components/ui/card";
import { Sparkles, LayoutGrid, History } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Caption Generator",
    description: "Platform-specific tone and formatting.",
  },
  {
    icon: LayoutGrid,
    title: "Multi-Platform Editor",
    description: "Edit caption per platform in one interface.",
  },
  {
    icon: History,
    title: "Upload History",
    description: "Track past uploads and see where each post was published.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-[#1A1A1A]/60 text-lg">
            Powerful features designed to streamline your content workflow.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border-[#E5E5E5] rounded-xl p-6 hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-[#4C6FFF]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
