import { createContext, useState } from "react";
import { SDK } from "rubic-sdk";
import { configuration } from "../constants/sdk-config";
import useAsyncEffect from "use-async-effect";

const RubicSDKContext = createContext<SDK | null>(null);

export const RubicContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [sdk, setSdk] = useState<SDK | null>(null);
  useAsyncEffect(async () => {
    try {
      setSdk(await SDK.createSDK(configuration));
    } catch (err) {}
  }, []);

  return (
    <RubicSDKContext.Provider value={sdk}>{children}</RubicSDKContext.Provider>
  );
};

export default RubicSDKContext;
