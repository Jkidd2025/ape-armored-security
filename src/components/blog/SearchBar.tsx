
import React from 'react';
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClearSearch: () => void;
  setIsSearchFocused: (focused: boolean) => void;
}

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  onClearSearch, 
  setIsSearchFocused 
}: SearchBarProps) => {
  return (
    <div className="flex justify-center items-center w-full max-w-5xl mx-auto mb-8">
      <div className="w-full max-w-3xl relative">
        <Command className="rounded-lg border-apearmor-darkbronze overflow-visible">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search articles..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearSearch}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Command>
      </div>
    </div>
  );
};

export default SearchBar;
