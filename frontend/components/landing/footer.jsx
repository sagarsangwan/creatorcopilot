import { Zap } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-[#111111] tracking-tight">
              CreatorCoPilot
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-[#1A1A1A]/40">
            © {new Date().getFullYear()} CreatorCoPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
