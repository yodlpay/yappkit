"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type BaseQueryParams = {
  tokenOutSymbols?: string;
  sourceChainIds?: string[];
};

export type QueryParams = BaseQueryParams & ({ sender: string; receiver?: string } | { sender?: string; receiver: string });
export type QueryParamKey = keyof QueryParams;

type PlaygroundContextType = {
  queryParams: QueryParams;
  setQueryParams: (params: QueryParams) => void;
  response: any;
  setResponse: (response: any) => void;
  responseStatusCode: number | null;
  setResponseStatusCode: (code: number | null) => void;
};

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

const DEFAULT_QUERY_PARAMS: QueryParams = { sender: "", sourceChainIds: ["all"] };

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [queryParams, setQueryParams] = useState<QueryParams>(DEFAULT_QUERY_PARAMS);
  const [response, setResponse] = useState<any>(null);
  const [responseStatusCode, setResponseStatusCode] = useState<number | null>(null);

  return (
    <PlaygroundContext.Provider
      value={{
        queryParams,
        setQueryParams,
        response,
        setResponse,
        responseStatusCode,
        setResponseStatusCode,
      }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (context === undefined) {
    throw new Error("usePlayground must be used within a PlaygroundProvider");
  }
  return context;
}
