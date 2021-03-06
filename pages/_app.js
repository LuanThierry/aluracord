function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        background: transparent;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        word-wrap: break-word;
        list-style: none;
        text-decoration: none;
        border-radius: 0;
        scroll-behavior: smooth;
      }
      *::-webkit-scrollbar {
        width: 7px;
        height: 10px;
      }
      *::-webkit-scrollbar-track {
        background: #1d1d1d;
      }
      *::-webkit-scrollbar-thumb {
        background-color: #764eff;
        border-radius: 20px;
        border: none;
        width: 10px;
      }
      body {
        font-family: Arial;
      }

      /* App fit Height */
      html,
      body,
      #__next {
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
  );
}

export default function MyApp({ Component, pageProps }) {
  console.log("roda em ambas as pages!");
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
