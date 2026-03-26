import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";
import Logo from "./ui/logo";
import Link from "next/link";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Products",
    links: [
      { name: "Browse Medicines", href: "#" },
      { name: "Healthcare Devices", href: "#" },
      { name: "Vitamins & Supplements", href: "#" },
      { name: "Baby & Child", href: "#" },
      { name: "Offers & Deals", href: "#" },
    ],
  },
  {
    title: "SELLERS",
    links: [
      { name: "Become a Seller", href: "#" },
      { name: "Seller Dashboard", href: "#" },
      { name: "Seller Guidelines", href: "#" },
      { name: "DGDA Compliance", href: "#" },
      { name: "Seller Support", href: "#" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Track Order", href: "#" },
      { name: "Return Policy", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  {
    icon: <FaFacebook className="size-5" />,
    href: "https://www.facebook.com/ahir.anto.2025",
    label: "Facebook",
  },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
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
    <section className={cn("py-32", className)}>
      <div className="w-full lg:px-20 py-16 px-6 bg-[#0f1f1b]">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <span className="font-bold text-3xl text-white">
              Medi<span className="font-black text-[#60d4bb]">Care</span>{" "}
            </span>
            <p className="max-w-[70%] text-sm text-[#7a7c79]">{description}</p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li
                  key={idx}
                  className="font-medium transition-colors duration-300 hover:text-[#31ddbb]"
                >
                  <a href={social.href} target="_blank">
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-gray-300 uppercase text-sm font-bold">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className=" hover:text-gray-200 font-md transition-colors duration-300"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[#53514c80] py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p>Made with ❤️ for Bangladesh</p>
          <p className="order-2 lg:order-1">{copyright}</p>
        </div>
      </div>
    </section>
  );
};

export { Footer };
