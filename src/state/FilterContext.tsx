import { createContext, useState } from 'react';
import { Filters } from '../types';

interface FilterContextType {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: {},
  setFilters: () => {}
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({});
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
