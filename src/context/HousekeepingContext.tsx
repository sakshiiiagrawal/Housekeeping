import React, { createContext, useState, useContext, ReactNode } from 'react';
import * as HousekeepingTypes from '../types/housekeeping';
import { ALL_ROOMS, TEAMS } from '../utils/housekeepingData';

interface HousekeepingContextType {
  availableRooms: HousekeepingTypes.Room[];
  setAvailableRooms: React.Dispatch<React.SetStateAction<HousekeepingTypes.Room[]>>;
  activeTeams: HousekeepingTypes.Team[];
  setActiveTeams: React.Dispatch<React.SetStateAction<HousekeepingTypes.Team[]>>;
}

const HousekeepingContext = createContext<HousekeepingContextType | undefined>(undefined);

export const HousekeepingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableRooms, setAvailableRooms] = useState<HousekeepingTypes.Room[]>(ALL_ROOMS);
  const [activeTeams, setActiveTeams] = useState<HousekeepingTypes.Team[]>(TEAMS);

  return (
    <HousekeepingContext.Provider value={{ availableRooms, setAvailableRooms, activeTeams, setActiveTeams }}>
      {children}
    </HousekeepingContext.Provider>
  );
};

export const useHousekeeping = () => {
  const context = useContext(HousekeepingContext);
  if (context === undefined) {
    throw new Error('useHousekeeping must be used within a HousekeepingProvider');
  }
  return context;
}; 