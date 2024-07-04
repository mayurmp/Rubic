import { useContext } from "react";
import {
  GetTextStyle,
  SubGetText,
  TextComponent,
  ValueComponent,
} from "./container.styled";
import CurrencyContext from "../../context/currency";
import { Skeleton, Typography } from "@mui/joy";
import { convertToFiat } from "../../utils/fiatConversion";
// import Skeleton from "@mui/material/Skeleton";

export const GetText = () => {
  const { inProgress, swapAmount, fiatData } = useContext(CurrencyContext);
  const fiatValue = convertToFiat(
    Number(swapAmount),
    Number(fiatData?.toTokenPrice)
  );
  return (
    <GetTextStyle>
      <SubGetText>
        <TextComponent>To</TextComponent>
      </SubGetText>
      <ValueComponent>
        {inProgress ? (
          <Typography>
            <Skeleton>Lorem ipsum</Skeleton>
          </Typography>
        ) : swapAmount ? (
          fiatValue ? `$ ${fiatValue}` : "$ 0.00"
        ) : (
          ""
        )}
      </ValueComponent>
    </GetTextStyle>
  );
};
