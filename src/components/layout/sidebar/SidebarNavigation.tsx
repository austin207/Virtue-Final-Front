
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavItem } from './types';

type SidebarNavigationProps = {
  navItems: NavItem[];
};

export const SidebarNavigation = ({ navItems }: SidebarNavigationProps) => {
  const location = useLocation();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 0'
    }}>
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to={item.href} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    backgroundColor: isActive ? '#6b7280' : '#374151',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#6b7280';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#374151';
                    }
                  }}
                >
                  <IconComponent style={{ width: '20px', height: '20px' }} />
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
