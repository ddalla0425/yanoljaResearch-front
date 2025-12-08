"use client"
import Link from "next/link";
import {contents} from "@/data/mainContents";
import {useLanguage} from "@/providers/LanguageProvider";
import {filterByCategory} from "@/utils/contentHelpers";
import Image from "next/image";

export default function Data() {
    const { lang  = "kr" } = useLanguage();
    const items = filterByCategory(contents[lang], "data", lang);
    console.log("어딨어!!!", items)
    return(
        <>
            {items.map(({category, src, alt, href, tit}, i )=> (
                <div className="data" key={i}>
                    <h2>
                        <Link href={href}>{category}</Link>
                    </h2>
                    <button>
                        <Image src={src} alt={alt} width={118} height={103} />
                        <p>{tit}</p>
                    </button>
                </div>
                
            ))}
        </>
    );
}