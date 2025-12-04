"use client"
import Image from "next/image";
import Link from "next/link";
import {footerSite, footerContent} from "@/data/footerSite";
import {useLanguage} from "@/providers/LanguageProvider";


export default function Footer() {
    const {lang} = useLanguage();

    return (
        <footer key={lang}>
            <div className="subscribeBtn">
                <Link href="/public">{footerContent[lang]?.subscription}</Link>
            </div>

            <div>
                <div className="footerLogo">
                    <Image width={143} height={17} src="./assets/logo_white.svg" alt="yanolja research footer logo"/>
                </div>
                <div className="footerContent">
                    <Link href="/public">{footerContent[lang]?.privacy}</Link>
                    <ul>
                        {footerContent[lang]?.companyInfo.map((text, i) => (
                            <li key={i}>{text}</li>
                        ))}
                    </ul>
                    <ul>
                        {footerContent[lang]?.contactInfo.map((text, i) => (
                            <li key={i}>{i === 1 ? <a href="mailto:yanoljaresearch@yanolja.com">{text}</a> : text}</li>
                        ))}
                    </ul>
                    <p>{footerContent[lang]?.copyright}</p>
                </div>
            </div>

            <div className="selectFamilySite">
                <select name="selectFamilySite">
                    <option value="none">Family site</option>
                    {footerSite.map(({href, siteName}) => (
                        <option key={href} value={href}>{siteName}</option>
                    ))}
                </select>
            </div>
        </footer>
    );
}