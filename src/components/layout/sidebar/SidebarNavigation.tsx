
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
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0'
  };

  const linkBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    width: '40px',
    height: '40px',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    backgroundColor: '#6b7280',
    color: '#ffffff'
  };

  const linkActiveStyle = {
    ...linkBaseStyle,
    backgroundColor: '#7f8a96'
  };

  const linkHoverStyle = {
    backgroundColor: '#7f8a96'
  };

  const iconStyle = {
    width: '20px',
    height: '20px'
  };
  
  return (
    <div style={containerStyle}>
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to={item.href} 
                  style={isActive ? linkActiveStyle : linkBaseStyle}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      Object.assign(e.currentTarget.style, linkHoverStyle);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      Object.assign(e.currentTarget.style, linkBaseStyle);
                    }
                  }}
                >
                  <IconComponent style={iconStyle} />
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
