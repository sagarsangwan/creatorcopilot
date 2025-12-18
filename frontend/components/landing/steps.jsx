import { Upload, Wand2, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload media",
    description: "Drop your video or image into the editor.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI generates captions",
    description: "Get optimized captions for each platform instantly.",
  },
  {
    number: "03",
    icon: Send,
    title: "Publish to multiple platforms",
    description: "Post everywhere with a single click.",
  },
];

export function Steps() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#111111] tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-[#1A1A1A]/60 text-lg">
            Three simple steps to publish across all platforms.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-[2px] bg-[#E5E5E5]" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Step Number Circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-5 h-5 text-white" />
                </div>

                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] mb-4">
                  <span className="text-xs font-semibold text-[#4C6FFF]">
                    Step {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#111111] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#1A1A1A]/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
