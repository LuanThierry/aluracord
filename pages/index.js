import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components';
import appConfig from '../config.json';

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        background: #131418;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style:none;
        text-decoration: none;
      }

      body{
        font-family: Arial;
      }

       /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  )
}

function Titulo( props ) {
  const Tag = props.tag || 'h1';
  return (

    <>
       <Tag>{props.children}</Tag>

       <style jsx>{`
        ${Tag} {
          display: flex;
          color: ${appConfig.theme.colors.primary[400]};
          font-size: 18px;
          font-weight: 600;
          border: 1px solid;
          border-radius: 5px;
          padding: 10px;
        }
        `}</style>
    </>

   );
}

{/* React component
function HomePage() {
  // JSX
  return (
    <div>
      <GlobalStyle />
      <Titulo tag="h2">Boas vindas de volta!</Titulo>
      <h2>Discord - Luan</h2>
    </div>
  )
}
export default HomePage*/}

export default function PaginaInicial() {
  const username = 'LuanThierry';

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[1000],
          backgroundImage: 'url(https://images6.alphacoders.com/116/thumb-1920-1161813.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 0 10px #131418',
            backgroundColor: appConfig.theme.colors.primary[1000],
            border: '1px solid',
            borderColor: appConfig.theme.colors.primary[400],

          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', backgroundColor: appConfig.theme.colors.primary[1000],
            }}
          >
            <Titulo>{appConfig.name}</Titulo>
            <Text variant="body3" styleSheet={{ margin: '15px auto 40px auto', display: 'flex', fontSize: '14px', color: appConfig.theme.colors.primary[400], backgroundColor: appConfig.theme.colors.primary[1000],
            borderColor: appConfig.theme.colors.primary[400]}}>
              Bem-vindo de volta {username}!
            </Text>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary[500],
                  mainColor: appConfig.theme.colors.primary[400],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.primary[50],
                  
                },

              }}
              placeholder="Your Github Nickname..."
            />
            <Button
              buttonColors={{
                contrastColor:appConfig.theme.colors.primary[500],

              }}
              styleSheet={{
                border: '0 0 1px 0',
                borderColor: appConfig.theme.colors.primary[400],
                hover: {
                  borderColor: appConfig.theme.colors.primary[500],
                  border: '0 0 1px 0',
                }
              }}
              fullWidth
              iconName="arrowRight"
              variant="secondary"
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.primary['1000'],
              border: 'none',
              flex: 1,
              minHeight: '260px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '22px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.primary['1000'],
                backgroundColor: appConfig.theme.colors.primary['400'],
                padding: '5px 15px',
                borderRadius: '1000px',
                margin: '0',
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}