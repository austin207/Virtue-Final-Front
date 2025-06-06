
import { ReactNode } from 'react';
import { LucideProps } from 'lucide-react';

export type ChatItem = {
  id?: string;
  image?: { src: string; width: number; height: number };
  icon?: ReactNode;
  title: string;
  preview: string;
  time: string;
  active?: boolean;
  href: string;
};

export type NavItem = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  label: string;
  color: string;
  href: string;
};

export type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  chatItems?: ChatItem[];
  onNewChat?: () => void;
  advancedMode?: boolean;
  setAdvancedMode?: (mode: boolean) => void;
};
