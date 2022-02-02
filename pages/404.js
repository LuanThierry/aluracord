import {
  Box,
  Button,
  Text,
  TextField,
  Image,
  Icon,
} from "@skynexui/components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";

export default function errorPage() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[950],
          backgroundImage: "url(https://wallpapercave.com/wp/wp7487015.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "100vw",
            border: "none",
            height: "100vh",
            backgroundColor: 'rgba(19, 20, 24, 0.4)',

          }}
        >
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              
              backgroundColor: "transparent",
              padding: "0xp  0px 10rem 0px",
              margin: '0px auto 10rem auto',


            }}
          >
            <Text
              styleSheet={{
                fontSize: "5rem",
                fontWeight: "700",
                marginBottom:'2rem',
              }}
            >
              \(o_o)/
            </Text>
            <Text
              styleSheet={{
                fontSize: "2rem",
                fontWeight: "300",
                textDecoration: 'underline',
                color: appConfig.theme.colors.neutrals[200],
              }}
            >
              Página não encontrada! Que tal recarregar denovo?
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
