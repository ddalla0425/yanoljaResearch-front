import "@/styles/globals.css";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
      <MainLayout>
          <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <meta property="og:title" content="야놀자 리서치(제출용)"/>
              <meta property="og:site_name" content="야놀자 리서치(제출용)"/>
              <meta property="og:image" content="/og_image.png"/>
              <meta property="og:type" content="website"/>
              <meta property="og:description" content="배다른 남매 지원 제출용 야놀자리서치 메인 페이지입니다."/>
              <link rel="icon" href="/favicon.ico"/>
          </Head>
          <Component {...pageProps} />
      </MainLayout>
  );
}
