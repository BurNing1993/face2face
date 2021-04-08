import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>F2F</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="face2face" />
        <meta name="description" content="face2face" />
      </Head>
      <div className="container mx-auto h-screen text-center text-sm md:text-base">
        <Component {...pageProps} />
      </div>
    </>
  )


}

export default MyApp
