"use client"
import Image from "next/image";
import Link from "next/link";
import {footerSite, footerContent} from "@/data/footerSite";
import {useLanguage} from "@/providers/LanguageProvider";


export default function Footer() {
    const { lang } = useLanguage();
    const content = footerContent[lang];

    // 패밀리 사이트 링크 연결
    const handleFamilySite = (e) => {
        const url = e.target.value;
        if (url !== "none") window.open(url, "_blank");
    };
    return (
        <footer>
            <div className="subscribeBtn">
                <Link href="/">{content?.subscription}</Link>
            </div>

            <div>
                <div className="footerLogo">
                    <Image width={143} height={17} src="/assets/logo_white.svg" alt="yanolja research footer logo"/>
                </div>
                <div className="footerContent">
                    <Link href="/">{content?.privacy}</Link>
                    <ul>
                        {content?.companyInfo.map((text, i) => (
                            <li key={i}>{text}</li>
                        ))}
                    </ul>
                    <ul>
                        {content?.contactInfo.map(({text, href}, i) => (
                            <li key={i}>
                                {href ? <Link href={href} target="_blank">{text}</Link> : text}
                            </li>
                        ))}
                    </ul>
                    <p>{content?.copyright}</p>
                </div>
            </div>

            <div className="selectFamilySite">
                <select name="selectFamilySite" onChange={handleFamilySite}>
                    <option value="none">Family site</option>
                    {footerSite.map(({href, siteName}) => (
                        <option key={href} value={href}>{siteName}</option>
                    ))}
                </select>
            </div>
        </footer>
    );
}