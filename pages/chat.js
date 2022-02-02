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

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}
export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });
    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log("Nova mensagem:", novaMensagem);
      console.log("listaDeMensagens:", listaDeMensagens);

      setListaDeMensagens((valorAtualDaLista) => {
        console.log("valorAtualDaLista:", valorAtualDaLista);
        return [novaMensagem, ...valorAtualDaLista];
      });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        console.log("Criando mensagem: ", data);
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
          width: "100%",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "85%",
            backgroundColor: appConfig.theme.colors.neutrals[1000],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "0px 8px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              padding: "0px 0px 25px 0px",
              justifyContent: "space-between",
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
              placeholder="Digite..."
              type="textarea"
              styleSheet={{
                display: "flex",
                justifyContent: "center",
                width: "99%",
                resize: "none",
                border: "0px",
                borderRadius: "5px 0px 0px 5px",
                padding: "5px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[999],
                color: appConfig.theme.colors.neutrals[200],
                letterSpacing: "1.5px",
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNovaMensagem(":sticker: " + sticker);
              }}
            />
            <Button
              styleSheet={{
                borderRadius: "0px 5px 5px 0px",
                padding: "20px 10px",
                minWidth: "20px",
                minHeight: "20px",
                fontSize: "20px",
                margin: "0px",
                marginBottom: "8px",
                lineHeight: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: appConfig.theme.colors.neutrals[999],
                focus: {
                  backgroundColor: appConfig.theme.colors.neutrals[999],
                },
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals["700"],
                  color: appConfig.theme.colors.neutrals["400"],
                },
              }}
              label="&#8594;"
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )}
function Header() {
  const roteamento = useRouter();
  const usuario = roteamento.query.username;
  return (
    <>
        <Box
          styleSheet={{
            width: "100%",
            maxWidth: "100vw",
            padding: "15px",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            justifyContent: "space-between",
            borderBottom: "2px solid ",
            borderColor: appConfig.theme.colors.neutrals[800],
          }}
        >
          <Box
            styleSheet={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
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
              src={`https://github.com/${usuario}.png`}
            />
            <Text
              styleSheet={{
                fontSize: "0.8rem",
              }}
            >
              {usuario}
            </Text>
          </Box>
          <Text
            variant="heading5"
            styleSheet={{
              border: "2px solid",
              borderRadius: "0px 10px ",
              padding: "9px",
              marginRight: "24.8px",
              borderColor: appConfig.theme.colors.neutrals[800],
              color: appConfig.theme.colors.neutrals[800],
              hover: {
                borderColor: appConfig.theme.colors.neutrals[500],
                color: appConfig.theme.colors.neutrals[500],
              },
            }}
          >
            Luanzinchat
          </Text>
          <Button
            label="Sair?"
            variant="tertiary"
            href="/"
            buttonColors={{
              mainColor: appConfig.theme.colors.neutrals[800],
            }}
            styleSheet={{
              marginRight: "15px",
              width: "50px",
              height: "30px",
              hover: {
                color: appConfig.theme.colors.neutrals[600],
                border: "1px solid",
              },
            }}
          />
        </Box>
    </>
  );
}
function MessageList(props) {
  return (
    <Box
        tag="ul"
        styleSheet={{
          overflow: "auto",
          display: "flex",
          maxWidth: "100vw",
          flexDirection: "column-reverse",
          flex: 1,
          color: appConfig.theme.colors.neutrals["050"],
          marginBottom: "10px",
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
                padding: "10px",
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
              {/* [Declarativo] */}
              {mensagem.texto.startsWith(":sticker:") ? (
                <Image
                  src={mensagem.texto.replace(":sticker:", "")}
                  styleSheet={{
                    maxWidth: "50vh",
                  }}
                />
              ) : (
                mensagem.texto
              )}
            </Text>
          );
        })}
    </Box>
  );
}