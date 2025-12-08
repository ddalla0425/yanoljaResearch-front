"use client";

import Link from "next/link";
import {useLanguage} from "@/providers/LanguageProvider";
import {contents} from "@/data/mainContents";
import SliderProgressbar from "@/components/common/SliderProgressbar";


export default function Brief() {
    const { lang = "kr" } = useLanguage();

    const titles = {
        kr: "인사이트 / 브리프",
        en: "Insights / Brief"
    };

    const latestItems = contents[lang]
        .filter(c => ["인사이트","브리프"].includes(c.category) || ["insights","brief"].includes(c.category))
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0,5);

    return (
        <div className="brief">
            <h2><Link href="/public">{titles[lang]}</Link></h2>
            <SliderProgressbar items={latestItems}/>
        </div>
    );
}
