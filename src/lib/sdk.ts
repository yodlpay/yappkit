import { CONFIG } from "@/constants";
import YappSDK from "@yodlpay/yapp-sdk";

export const sdk = new YappSDK({
  origin: CONFIG.IS_DEV ? "http://localhost:3000" : CONFIG.PARENT_URL,
});
