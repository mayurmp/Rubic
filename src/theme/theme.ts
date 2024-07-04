import * as React from "react";
import { extendTheme } from "@mui/joy/styles";
// import Box from '@mui/joy/Box';
import Button from "@mui/joy/Button";

export const palette = {
  primary: {
    solidBg: "#6870FA",
    solidBorder: "#6870FA",
    solidHoverBg: "#565cd1",
    solidHoverBorder: "#565cd1",
    solidActiveBg: "#565cd1",
    solidActiveBorder: "#565cd1",
    solidDisabledBg: "#9ca1ff",
    solidDisabledBorder: "#9ca1ff",
  },
  neutral: {
    solidBg: "#ebebff",
    solidBorder: "#6870FA",
    solidHoverBg: "#cacae8",
    solidHoverBorder: "#565cd1",
    solidActiveBg: "#cacae8",
    solidActiveBorder: "#565cd1",
    solidDisabledBg: "#6c757d",
    solidDisabledBorder: "#6c757d",
    solidColor: "#344054",
    // btn-light
    softColor: "#344054",
    softBg: "#ebebff",
    softBorder: "#6870FA",
    softHoverBg: "#cacae8",
    softHoverBorder: "#6870FA",
    softActiveBg: "#cacae8",
    softActiveBorder: "#6870FA",
    softDisabledBg: "#6c757d",
    softDisabledBorder: "#6c757d",
  },
  success: {
    solidBg: "#198754",
    solidBorder: "#198754",
    solidHoverBg: "#157347",
    solidHoverBorder: "#146c43",
    solidActiveBg: "#146c43",
    solidActiveBorder: "#13653f",
    solidDisabledBg: "#198754",
    solidDisabledBorder: "#198754",
  },
  danger: {
    solidBg: "#dc3545",
    solidBorder: "#dc3545",
    solidHoverBg: "#bb2d3b",
    solidHoverBorder: "#b02a37",
    solidActiveBg: "#b02a37",
    solidActiveBorder: "#a52834",
    solidDisabledBg: "#dc3545",
    solidDisabledBorder: "#dc3545",
  },
  warning: {
    solidColor: "#000",
    solidBg: "#ffc107",
    solidBorder: "#ffc107",
    solidHoverBg: "#ffca2c",
    solidHoverBorder: "#ffc720",
    solidActiveBg: "#ffcd39",
    solidActiveBorder: "#ffc720",
    solidDisabledBg: "#ffc107",
    solidDisabledBorder: "#ffc107",
  },
  info: {
    solidColor: "#000",
    solidBg: "#0dcaf0",
    solidBorder: "#0dcaf0",
    solidHoverBg: "#31d2f2",
    solidHoverBorder: "#25cff2",
    solidActiveBg: "#3dd5f3",
    solidActiveBorder: "#25cff2",
    solidDisabledBg: "#0dcaf0",
    solidDisabledBorder: "#0dcaf0",
  },
  customPallet: {
    white: "white", // #fff
    black: "black",
    warning: "#F04438",
    // darkGrey: "#696666",
    fontColorGrey: "#344054",
    fontColorPrimary: "#98a2b3",
    fontColorSecondary: "#667085",
    fontColorPlaceholder: '#667085',
    fontColorDark: "#d0d5dd",
    fontColorBlue: "#3538cd",
    fontColorGreen: "#12B76A",
    fontColorRed: "#FFE8EF",
    backGroundColor: "#0000004d",
    backGroundColorPrimary: "#f9fafb",
    backGroundColorSecondary: "#0000001a",
    backGroundColorBlue: "#fcfcfd",
    backGroundColorBlueShade: "#eef4ff",
    backGroundColorGrey: "#F2F4F7",
    backGroundColorDark: "#f2f2ff",
    backGroundColorBg: "#5A63FF",
    backGroundColorAthens: "#eaecf0",
    borderColor: "#6870fa",
  },
};

export const bootstrapTheme = extendTheme({
  cssVarPrefix: "bs",
  typography: {},
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          letterSpacing: "normal",
          fontWeight: theme.vars.fontWeight.sm,
          fontFamily: theme.vars.fontFamily.fallback,
          outlineWidth: 0,
          borderRadius: "8px",
          borderWidth: "0.14rem",
          transition:
            "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
          ...(ownerState.size === "md" && {
            paddingInline: "0.75rem",
            minHeight: 38,
          }),
        }),
        endDecorator: ({ ownerState, theme }) => ({
          margin: 0,
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontFamily: "Poppins",
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          border: "0px",
          boxShadow: "none",
        }),
      },
    },
  },
});
