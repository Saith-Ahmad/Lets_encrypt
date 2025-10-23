"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, Menu, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { NAV_DATA } from "@/lib/constants/menuItems";

export type NavItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: NavItem[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};



export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const navData: NavSection[] = NAV_DATA;

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  useEffect(() => {
    navData.forEach((section) => {
      section.items.forEach((item) => {
        if (item.items?.some((sub) => sub.url === pathname)) {
          if (!expandedItems.includes(item.title)) {
            setExpandedItems((prev) => [...prev, item.title]);
          }
        }
      });
    });
  }, [pathname, navData]);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const proceedNavigation = () => {
    if (pendingNavigation) {
      router.push(pendingNavigation);
      setPendingNavigation(null);
      setShowAlert(false);
      setIsOpen(false);
    }
  };

  const cancelNavigation = () => {
    setPendingNavigation(null);
    setShowAlert(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-md bg-[#1e293b] p-2 hover:bg-[#334155]"
      >
        <Menu className="h-6 w-6 text-gray-200" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 border-r border-[#1e293b] bg-[#0f172a] text-gray-200 transition-transform lg:sticky lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full min-h-[100vh] flex-col py-6 px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/")}
              className="text-xl font-semibold text-[#facc15] hover:text-yellow-400 transition"
            >
              Let’s Encrypt 
            </button>
            {/* Close button (mobile) */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden rounded-md p-1 hover:bg-[#1e293b]"
            >
              <X className="h-6 w-6 text-gray-300" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {navData.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {section.label}
                </h2>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      {item.items ? (
                        <div>
                          <button
                            onClick={() => toggleExpanded(item.title)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-gray-300 hover:bg-[#1e293b] transition",
                              item.items.some((sub) => sub.url === pathname) &&
                                "bg-[#1e293b] text-[#facc15] font-medium"
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                            <ChevronUp
                              className={cn(
                                "ml-auto h-4 w-4 transition-transform",
                                expandedItems.includes(item.title)
                                  ? "rotate-0"
                                  : "rotate-180"
                              )}
                            />
                          </button>
                          {expandedItems.includes(item.title) && (
                            <ul className="ml-8 mt-1 space-y-1">
                              {item.items.map((sub: NavItem) => (
                                <li key={sub.title}>
                                  <button
                                    onClick={() =>
                                      handleNavigation(sub.url ?? "#")
                                    }
                                    className={cn(
                                      "block w-full text-left rounded-md px-3 py-1.5 text-sm text-gray-400 hover:bg-[#1e293b] hover:text-white transition",
                                      pathname === sub.url &&
                                        "bg-[#1e293b] text-[#facc15] font-medium"
                                    )}
                                  >
                                    {sub.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleNavigation(item.url ?? "#")}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-[#1e293b] transition",
                            pathname === item.url &&
                              "bg-[#1e293b] text-[#facc15] font-medium"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* AlertDialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-[#0f172a] border border-[#1e293b] text-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#facc15]">
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              You have unsaved changes. If you leave this page, your changes will
              be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1e293b] text-gray-200 hover:bg-[#334155]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-[#facc15] text-black hover:bg-yellow-400">
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
