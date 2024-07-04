import { bwMethodChannel } from "../constants/app";
export const sendToMethodChannel = (payload: any) => {
  // @ts-ignore
  if (bwMethodChannel && bwMethodChannel?.postMessage) {
    // @ts-ignore
    bwMethodChannel?.postMessage(JSON.stringify(payload));
  }
};
