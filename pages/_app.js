import Head from 'next/head';

function GlobalStyle() {
    return (
        <style global jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap'); 
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
            font-family: 'Roboto Slab', serif;
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
    );
}

export default function CustomApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>GH App</title>
                <link rel="icon" type="image/png" href="http://www.pngall.com/wp-content/uploads/2016/04/Github-PNG-Image-180x180.png" />
                <meta charSet="utf-8" />
                <meta name="description" content="A Next.js app to get and display a GitHub user's info." />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
  }