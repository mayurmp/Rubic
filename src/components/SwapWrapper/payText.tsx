import { useContext } from "react";
import {
  PayTextStyle,
  SubPayText,
  TextComponent,
  ValueComponent,
} from "./container.styled";
import CurrencyContext from "../../context/currency";
import { convertToFiat } from "../../utils/fiatConversion";

export const PayText = () => {
  const { inputAmount, fiatData } = useContext(CurrencyContext);
  const fiatValue = convertToFiat(
    Number(inputAmount),
    Number(fiatData?.fromTokenPrice)
  );
  return (
    <PayTextStyle>
      <SubPayText>
        <TextComponent>From</TextComponent>
      </SubPayText>
      <ValueComponent>
        {fiatValue ? `$ ${fiatValue}` : inputAmount ? "$ 0.0" : ""}
      </ValueComponent>
    </PayTextStyle>
  );
};
