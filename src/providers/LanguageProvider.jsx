"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const router = useRouter();
    const params = useSearchParams();
    const initialLang = params.get("lang") || "kr";

    const [lang, setLang] = useState(initialLang);

    // URL과 state 동기화
    useEffect(() => {
        const currentLang = params.get("lang") || "kr";
        if (currentLang !== lang) {
            setLang(currentLang);
        }
    }, [params]);

    const changeLang = (newLang) => {
        setLang(newLang);
        router.push(`/?lang=${newLang}`, { scroll: false });
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
