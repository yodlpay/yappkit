export type BaseQueryParams = {
  tokenOutSymbols?: string;
  sourceChainIds?: string[];
};

export type QueryParams = BaseQueryParams &
  (
    | {
        sender: string;
        receiver?: string;
      }
    | {
        sender?: string;
        receiver: string;
      }
  );

export type QueryParamKey = keyof QueryParams;
