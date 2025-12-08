"use client"
import List from "@/components/common/List";
import {useLanguage} from "@/providers/LanguageProvider";
import {contents} from "@/data/mainContents";
import {useState} from "react";
import Link from "next/link";
import {CATEGORY_MAP} from "@/utils/contentHelpers";

export default function Press() {
    const { lang = "kr" } = useLanguage();
    const [tab, setTab] = useState("press")
    const items = contents[lang].filter(
        item => item.category.toLowerCase() === CATEGORY_MAP[lang][tab].toLowerCase()
    );

    return (
        <div className="press">
            <div>
                <ul className="tabBtn">
                    <li>
                        <h2>
                            <button
                                onClick={() => setTab("press")}
                                style={{color: tab === "press" ? "#000" : "#999"}}
                            >
                                {lang === "kr" ? `${CATEGORY_MAP.kr.press}보도` : CATEGORY_MAP.en.press}
                            </button>
                        </h2>
                    </li>
                    <li>
                        <h2>
                            <button
                                onClick={() => setTab("release")}
                                style={{color: tab === "release" ? "#000" : "#999"}}
                            >
                                {CATEGORY_MAP[lang].release}
                            </button>
                        </h2>
                    </li>
                </ul>
                <Link href="/public">더보기</Link>
            </div>
            <List items={items}/>
        </div>
    );
}