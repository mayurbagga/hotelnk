import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Papa from 'papaparse';
import { CONFIG as BASE_CONFIG, Config } from '../config';

interface ConfigContextType {
  config: Config;
  isLoading: boolean;
  error: string | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPuIkRY2dSSUS_4K03hB0wtKJA2gjuqCW__RWzUkMovSLWG6MalyDx5HFE4sV0LzqpXa8ox11tPx8W/pub?output=csv';

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>(BASE_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data from Google Sheets');
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as any[];
            
            // Merge base config with new data
            const updatedRooms = BASE_CONFIG.rooms.map((room) => {
              const sheetRow = data.find(
                (row) => row['Room ID']?.trim().toLowerCase() === room.id.toLowerCase()
              );
              
              if (sheetRow) {
                return {
                  ...room,
                  pricePerNight: sheetRow['Price Per Night'] ? parseInt(sheetRow['Price Per Night'].replace(/,/g, ''), 10) : room.pricePerNight,
                  totalRooms: sheetRow['Total Rooms'] ? parseInt(sheetRow['Total Rooms'], 10) : room.totalRooms,
                  available: sheetRow['Is Available'] ? sheetRow['Is Available'].trim().toUpperCase() === 'TRUE' : room.available,
                  bookedDates: sheetRow['Booked Dates'] ? sheetRow['Booked Dates'].split(',').map((d: string) => d.trim()).filter(Boolean) : room.bookedDates,
                };
              }
              
              return room;
            });
            
            setConfig({
              ...BASE_CONFIG,
              rooms: updatedRooms
            });
            setIsLoading(false);
          },
          error: (error: any) => {
            console.error("Error parsing CSV:", error);
            setError("Error parsing configuration data.");
            setIsLoading(false);
          }
        });
      } catch (err: any) {
        console.error("Error fetching config:", err);
        setError(err.message || "Unknown error occurred while fetching config.");
        // Fallback to base config if it fails
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, isLoading, error }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
