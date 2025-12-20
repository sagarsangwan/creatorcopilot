"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[#111111] text-lg tracking-tight">
            CreatorCoPilot
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-[#1A1A1A]/70 hover:text-[#111111] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-[#1A1A1A]/70 hover:text-[#111111] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm text-[#1A1A1A]/70 hover:text-[#111111] transition-colors"
          >
            Login
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block"></div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-[#111111]" />
          ) : (
            <Menu className="w-5 h-5 text-[#111111]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F5F5F5] px-6 py-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm text-[#1A1A1A]/70 hover:text-[#111111] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-[#1A1A1A]/70 hover:text-[#111111] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm text-[#1A1A1A]/70 hover:text-[#111111] transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
