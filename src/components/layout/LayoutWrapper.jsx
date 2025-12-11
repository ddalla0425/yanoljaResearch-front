"use client"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {useLanguage} from "@/providers/LanguageProvider";

export default function LayoutWrapper({ children }) {
    const { lang = "kr" } = useLanguage();
    return (
        <>
            <Header/>
            <main key={lang}>{children}</main>
            <Footer/>
        </>
    );
}