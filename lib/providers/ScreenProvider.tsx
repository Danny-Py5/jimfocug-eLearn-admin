"use client";

import { createContext, useContext, useState } from "react";

type ScreenContextType = {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
};

const ScreenContext = createContext<ScreenContextType | null>(null);

export function ScreenProvider({ children }: { children: React.ReactNode }) {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  return (
    <ScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}

export function useScreen() {
  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error("useScreen must be used inside ScreenProvider");
  }

  return context;
}
