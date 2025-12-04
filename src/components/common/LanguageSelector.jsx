"use client";

import { useLanguage } from "@/providers/LanguageProvider";

export default function LanguageSelector({ className, onChangeCloseMenu }) {
    const { lang, changeLang } = useLanguage();

    const handleChange = (e) => {
        if (onChangeCloseMenu) onChangeCloseMenu();
        changeLang(e.target.value);
    };

    return (
        <select className={className} onChange={handleChange} value={lang}>
            <option value="kr">KR</option>
            <option value="en">EN</option>
        </select>
    );
}
