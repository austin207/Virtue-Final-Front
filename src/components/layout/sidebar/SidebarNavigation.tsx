
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavItem } from './types';

type SidebarNavigationProps = {
  navItems: NavItem[];
};

export const SidebarNavigation = ({ navItems }: SidebarNavigationProps) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col items-center space-y-4 py-4">
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to={item.href} 
                  className={cn(
                    "sidebar-button-colored",
                    location.pathname === item.href && "sidebar-button-active",
                    item.color
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};
