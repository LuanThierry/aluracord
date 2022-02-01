import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzYwMzU0NywiZXhwIjoxOTU5MTc5NTQ3fQ.fN1CudYQOGz4IjVbd7gFCHjAfFuv906hQOrVKLL_ucU";
const SUPABASE_URL = "https://nwigxxcksrvqcvhlancg.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  console.log("usuario logado", usuarioLogado);
  console.log("roteamento.query:", roteamento.query);
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        console.log("dados da consulta: ", data);
        setListaDeMensagens(data);
      });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        console.log("Criando Mensagem: ", data);
        setListaDeMensagens([data[0], ...listaDeMensagens]);
      });

    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[999],
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[1000],
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100vh",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[1000],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "0 17px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'spaceBetween',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                console.log(event);
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "80%",
                resize: "none",
                border: "0px",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[999],
                color: appConfig.theme.colors.neutrals[200],
                letterSpacing: "1.5px",
                marginRight: '14px',
              }}
            />
            <ButtonSendSticker />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Text
          variant="heading5"
          styleSheet={{
            border: "2px solid",
            borderRadius: "0px 10px ",
            padding: "10px",
            borderColor: appConfig.theme.colors.neutrals[800],
            color: appConfig.theme.colors.neutrals[800],
          }}
        >
          Luanzincord Chat
        </Text>

        <Button
        label="Sair?"
          variant="tertiary"
  
          href="/"
          buttonColors={{
              mainColor: appConfig.theme.colors.neutrals[800],

          }}
          styleSheet={{
              marginRight:'15px',
              width: '50px',
              height: '30px',
              hover:{
                  color: appConfig.theme.colors.neutrals[600],
                  border: '1px solid',
                  
              }
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["050"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              position: "inherit",
              width: "100%",
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "20px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[999],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "spaceBetween",
              }}
            >
              <Image
                styleSheet={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10.1px",
                  marginLeft: "12px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
