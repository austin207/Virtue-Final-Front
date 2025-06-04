
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { SearchModal } from './SearchModal';

export const SearchModalTrigger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="h-8 px-3"
      >
        <Search className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Search</span>
      </Button>
      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
