import Head from "next/head";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <>
        <Head>
            <title>야놀자 리서치(제출용)</title>
            <meta name="description" content="배다른 남매 지원 제출용 야놀자리서치 메인 페이지입니다."/>
        </Head>
        <MainContent/>
    </>
  );
}
