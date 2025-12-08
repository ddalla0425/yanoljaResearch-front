"use client"
import List from "@/components/common/List";
import {useLanguage} from "@/providers/LanguageProvider";
import {sns} from "@/data/mainContents";
import Link from "next/link";

export default function Sns() {
    const { lang = "kr" } = useLanguage();
    const items = sns[lang]
    return(
        <div className="sns">
            <div>
                <h2>
                    {items.common.tit}
                </h2>
                <List items={items.items}/>
            </div>
            <button>
                <Link href="/public" target="_blank">{items.common.btn}</Link>
            </button>
        </div>
    );
}