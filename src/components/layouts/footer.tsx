"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ReactElement;
  href: string;
  label: string;
}

interface LegalLink {
  name: string;
  href: string;
}

interface Footer7Props {
  className?: string;
  sections?: FooterSection[];
  description?: string;
  socialLinks?: SocialLink[];
  copyright?: string;
  legalLinks?: LegalLink[];
}

// Fully Functional Support & Category Navigation Schema
const defaultSections: FooterSection[] = [
  {
    title: "Products",
    links: [
      { name: "Browse Medicines", href: "/medicine" },
      { name: "Healthcare Devices", href: "/blog" },
      { name: "Vitamins & Supplements", href: "/medicine" },
      { name: "Baby & Child", href: "/medicine" },
      { name: "Offers & Deals", href: "/offers" },
    ],
  },
  {
    title: "SELLERS",
    links: [
      { name: "Become a Seller", href: "/seller-dashboard" },
      { name: "Seller Dashboard", href: "/seller-dashboard" },
      { name: "Seller Guidelines", href: "/seller-dashboard" },
      { name: "DGDA Compliance", href: "/seller-dashboard" },
      { name: "Seller Support", href: "/seller-dashboard" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { name: "Help Center", href: "/support/help" },
      { name: "Track Order", href: "/orders/track" },
      { name: "Return Policy", href: "/support/return-policy" },
      { name: "Privacy Policy", href: "/support/privacy-policy" },
      { name: "Contact Us", href: "/support/contact" },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { icon: <FaInstagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  {
    icon: <FaFacebook className="h-5 w-5" />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  { icon: <FaTwitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks: LegalLink[] = [
  { name: "Terms and Conditions", href: "/support/terms" },
  { name: "Privacy Policy", href: "/support/privacy-policy" },
];

const Footer = ({
  sections = defaultSections,
  description = "Bangladesh's most trusted online pharmacy platform. We connect patients with verified pharmacies for fast, safe, and affordable medicine delivery.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 MediCare Bangladesh. All rights reserved. DGDA Compliant.",
  legalLinks = defaultLegalLinks,
  className,
}: Footer7Props) => {
  return (
    <footer className={cn("w-full bg-[#0b1512] text-slate-300 border-t border-emerald-950/40", className)}>
      <div className="mx-auto w-11/12 max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-3 xl:gap-8 pb-12 border-b border-emerald-900/30">
          
          {/* Brand/Logo Info Section */}
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg">
              <span className="font-bold text-3xl text-white tracking-tight select-none">
                Medi<span className="font-black text-emerald-400">Care</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              {description}
            </p>
            
            {/* Social Connection Registry */}
            <div className="flex items-center space-x-5">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-900/30 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links Mapping Section */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-4">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider select-none">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-emerald-400 font-medium transition-colors duration-200 inline-block py-0.5 outline-none focus-visible:text-emerald-400"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Utility Metadata Footer Section */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-6 order-2 sm:order-1 text-center sm:text-left">
            <p>{copyright}</p>
            <div className="hidden md:flex items-center gap-4">
              {legalLinks.map((legal, index) => (
                <Link 
                  key={index} 
                  href={legal.href}
                  className="hover:text-slate-400 transition-colors duration-150"
                >
                  {legal.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="flex items-center gap-1.5 order-1 sm:order-2 bg-emerald-950/30 border border-emerald-900/20 px-3 py-1.5 rounded-full text-slate-400">
            Made with <span className="text-emerald-500 animate-pulse text-sm">❤️</span> for Bangladesh
          </p>
        </div>

      </div>
    </footer>
  );
};

export { Footer };
