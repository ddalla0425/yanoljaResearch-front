"use client"
import {useLanguage} from "@/providers/LanguageProvider";
import {attractive} from "@/data/mainContents";
import Link from "next/link";

export default function Attractive() {
    const { lang = "kr" } = useLanguage();
    return(
        <ul className="attractive">
            {attractive[lang]?.map(({txt, btn, href}, i) => (
                <li key={i}>
                    <strong className="text_20">{txt}</strong>
                    <Link href={href}>{btn}</Link>
                </li>
            ))}
        </ul>
    );
}