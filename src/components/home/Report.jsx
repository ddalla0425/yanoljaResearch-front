"use client"
import SliderProgressbar from "@/components/common/SliderProgressbar";
import {contents} from "@/data/mainContents";
import {useLanguage} from "@/providers/LanguageProvider";
import Link from "next/link";
import useIsMobile from "@/utils/hooks/useIsMobile";

export default function Report() {
    const { lang = "kr" } = useLanguage();
    const inMobile = useIsMobile();
    const titles = {
        kr: "연구보고서",
        en: "report"
    };
    const items = contents[lang]?.filter(c =>
        ["연구보고서", "report"].includes(c.category)
    );

    return (
        <div className="report">
            <h2><Link href="/public">{titles[lang]}</Link></h2>
            <SliderProgressbar items={items} spaceBetween={useIsMobile ? 16 : 40}/>
        </div>
    );
}