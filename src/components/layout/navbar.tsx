"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Resume", href: "#resume" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useScrollSpy(
    navLinks.map((link) => link.href.substring(1)),
    { rootMargin: "0% 0% -80% 0%" }
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20">
        <Link href="/" passHref>
          <motion.div
            className="text-3xl font-medium font-smooch text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            Parisid
          </motion.div>
        </Link>
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              <Button variant="ghost" className="relative">
                {link.name}
                {activeId === link.href.substring(1) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-0 left-0 w-full bg-background border-b"
          >
            <div className="container mx-auto px-4 md:px-6 pt-20 pb-8 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} passHref>
                  <Button variant="ghost" className="w-full justify-start text-lg" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Button>
                </Link>
              ))}
              <div className="flex justify-between items-center pt-4">
                <span></span>
                <ThemeToggle />
              </div>
            </div>
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="absolute top-6 right-4">
              <X className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
