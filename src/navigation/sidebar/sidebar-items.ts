import {
  Activity,
  Blocks,
  Cable,
  CreditCard,
  GitPullRequestArrow,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  SquareLibrary,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Workspace",
    items: [
      { id: "overview", title: "Overview", url: "/dashboard", icon: LayoutDashboard },
      { id: "repos", title: "Repositories", url: "/dashboard/repos", icon: SquareLibrary },
      { id: "agents", title: "Agents", url: "/dashboard/agents", icon: Blocks },
      { id: "runs", title: "Runs", url: "/dashboard/runs", icon: GitPullRequestArrow },
      { id: "usage", title: "Usage", url: "/dashboard/usage", icon: Activity },
    ],
  },
  {
    id: 2,
    label: "Account",
    items: [
      { id: "setup", title: "GitHub App", url: "/dashboard/setup", icon: Cable },
      { id: "settings", title: "Settings", url: "/dashboard/settings", icon: Settings },
      { id: "pricing", title: "Pricing", url: "/dashboard/pricing", icon: CreditCard },
    ],
  },
];
