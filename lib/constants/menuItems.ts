import {
  Home,
  UsersRound,
  BookOpen,
  LibraryBig,
  Phone,
  Briefcase,
  TrafficCone,
  User,
  Octagon,
  OctagonAlert,
  LayoutDashboard,
  DollarSign,
  MailOpen,
  Library,
  Users,
  ShieldAlert,
  FileKey2,
  UserRoundPen,
  History,
  Share,
  ArrowDownLeft
} from "lucide-react";

export const menuItems = [
  { label: "Home", href: "#home", icon: Home, desc:"Welcome" },
  { label: "Features", href: "#features", icon: UsersRound, desc:"What we offer" },
  { label: "How it works", href: "#how-it-works", icon: OctagonAlert , desc:"Safety Services"},
  { label: "Vision", href: "#vision", icon: User , desc:"Testimonials"},
  { label: "Get Started", href: "#get-started", icon: Phone , desc:"For Quick Queries"},
];


export const NAV_DATA = [
  {
    label: "User MENU",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
       {
        title: "Text Security",
        icon: ShieldAlert,
        items: [
          { title: "Encryption", url: "/dashboard/text-encryption", icon: Users },
          { title: "Decryption", url: "/dashboard/text-decryption", icon: Users },
        ],
      },
      {
        title: "File Security",
        icon: FileKey2,
        items: [
          { title: "Encryption", url: "/dashboard/file-encryption", icon: Users },
          { title: "Decryption", url: "/dashboard/file-decryption", icon: Users },
        ],
      },
      { title: "Shared Files", url: "/dashboard/shared-files", icon: ArrowDownLeft },
      { title: "Encryption History", url: "/dashboard/encryption-history", icon: History },
      { title: "Profile", url: "/dashboard/profile", icon: UserRoundPen },
    ],
  },
];
