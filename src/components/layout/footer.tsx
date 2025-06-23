"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const socialLinks = [
  {
    icon: <Github size={20} />,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:developer@example.com",
    label: "Email",
  },
];

const MotionLink = motion(Link);

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} Abinesh. All Rights Reserved.
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <MotionLink
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-3 rounded-full bg-primary hover:bg-accent hover:text-accent-foreground transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </MotionLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
