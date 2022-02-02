import {Box, Button, Text, TextField, Image, Icon } from "@skynexui/components";
import React, {useEffect, useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";
function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>

      <style jsx>{`
        ${Tag} {
          display: flex;
          color: ${appConfig.theme.colors.neutrals[500]};
          font-size: 18px;
          font-weight: 600;
          border: 1.4px solid ${appConfig.theme.colors.neutrals[500]};
          border-radius: 5px;
          padding: 10px;
        }
      `}</style>
    </>
  );
}
export default function PaginaInicial() {
  const [github, setGithub] = useState("");
  const [username, setUsername] = useState("");
  const [fotinha, setFotinha] = useState(
    "https://github.com/LuanThierry.png"
  );
  const roteamento = useRouter();
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[950],
          backgroundImage:
            "url(https://images6.alphacoders.com/116/thumb-1920-1161813.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "column",
            },
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "5px",
            padding: "32px 0px 0px 0px",
            margin: "16px",
            boxShadow: "0 0 20px #131418",
            backgroundColor: 'rgba(19, 20, 24, 0.9)',
            border: "none",
            borderColor: appConfig.theme.colors.neutrals[500],
            height: "85vh",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              //window.location.href = '/chat' antigo e chato kkk
              roteamento.push(`/chat?username=${username}`);
              infosDoEvento.preventDefault();
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "80%" },
              textAlign: "center",
              backgroundColor:'transparent',
              padding:'0px 25px',
            }}
          >
            <Titulo>{appConfig.name}</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                margin: "25px auto 20px auto",
                display: "flex",
                fontSize: "14px",
                color: appConfig.theme.colors.neutrals[500],
                letterSpacing: "1px",
              }}
            >
              Olá {username} vem se divertir com a gente !!!
            </Text>
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "200px",
                padding: "16px",
                backgroundColor: 'transparent',
                border: "none",
                flex: 1,
                minHeight: "180px",
              }}
            >
              <Image
                styleSheet={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  marginBottom: "12px",
                  boxShadow: "0 0 30px 10px #131418",
                }}
                src={fotinha}
              />
            </Box>
            {/* Photo Area */}
            <TextField
            required
              value={username}
              onChange={function (event) {
                console.log("usuario digitou", event.target.value);
                // Mas e agora onde ta o valor?
                const valor = event.target.value;
                // temos trocar o valor da variavel
                setUsername(valor);
                if (valor.length >= 2) {
                  setFotinha(`https://github.com/${valor}.png`);
                } else {
                  setFotinha("https://github.com/LuanThierry.png");
                }
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[500],
                  mainColor: appConfig.theme.colors.neutrals[500],
                  mainColorHighlight: appConfig.theme.colors.primary[400],
                  backgroundColor: appConfig.theme.colors.neutrals[50],
                },
              }}
              placeholder="Your Github Nickname..."
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              iconName="github"
              variant="secondary"
              buttonColors={{
                contrastColor: appConfig.theme.colors.primary[400],
              }}
              styleSheet={{
                marginTop: "12px",
                border: "1px 1px 1px 1px",
                borderColor: appConfig.theme.colors.primary[500],
                color: appConfig.theme.colors.primary[500],
                hover: {
                  borderColor: appConfig.theme.colors.primary[400],
                  color: appConfig.theme.colors.primary[400],
                  border: "1px 1px 1px 1px",
                },
              }}
            />
          </Box>
          {/* Formulário */}
        </Box>
      </Box>
    </>
  );
}
