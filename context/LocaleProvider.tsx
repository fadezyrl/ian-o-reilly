"use client";

import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { en, type Dictionary } from "@/data/dictionary/en";

type Locale = "EN" | "UR";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "EN",
  dictionary: en,
});

type LocaleProviderProps = {
  children: ReactNode;
};

export const LocaleProvider = ({
  children,
}: LocaleProviderProps): ReactElement => {
  return (
    <LocaleContext.Provider value={{ locale: "EN", dictionary: en }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useDictionary = (): Dictionary => {
  return useContext(LocaleContext).dictionary;
};

export const useLocale = (): LocaleContextValue => {
  return useContext(LocaleContext);
};
