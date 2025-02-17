import { INDEXER_URL } from '@/constants';
import { QueryParams } from '@/providers/PlaygroundProvider';

export const buildQueryString = (params: Record<string, any>) => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    let keyToUse = key;
    if (["sender", "receiver"].includes(key)) {
      const valueStr = Array.isArray(value) ? value[0] : value;
      keyToUse = valueStr?.startsWith("0x") ? key : key + "EnsPrimaryName";
    }

    if (value) {
      if (Array.isArray(value)) {
        const joinedValue = value.filter(v => v.trim()).join(",");
        if (joinedValue) {
          urlParams.append(keyToUse, joinedValue);
        }
      } else if (typeof value === "string" && value.trim() !== "") {
        urlParams.append(keyToUse, value);
      }
    }
  });
  return urlParams.toString() ? `?${urlParams.toString()}` : "";
};

// export const fetchIndexerData = async (endpoint: string, params: Record<string, any>) => {
export const fetchIndexerData = async (endpoint: string, params: QueryParams) => {
  const queryString = buildQueryString(params);
  const url = `${INDEXER_URL}${endpoint}${queryString}`;
  const response = await fetch(url);
  return {
    status: response.status,
    data: await response.json(),
  };
};
