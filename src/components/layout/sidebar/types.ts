
import { ReactNode } from 'react';

export type ChatItem = {
  id?: string;
  image?: { src: string; width: number; height: number };
  title: string;
  preview: string;
  time: string;
  active?: boolean;
  href: string;
};

export type NavItem = {
  icon: ReactNode;
  label: string;
  color: string;
  href: string;
};

export type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  chatItems?: ChatItem[];
  onNewChat?: () => void;
};
