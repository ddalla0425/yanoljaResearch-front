import Image from "next/image";
import Logo from "/public/assets/logo.svg"
import Link from "next/link";
import {useState} from "react";
import {gnbMenu, subMenu} from "@/data/gnbMenu";
import {useLanguage} from "@/hooks/useLanguage";
import {useRouter} from "next/router";


export default function Header() {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showGnbMenu, setShowGnbMenu] = useState(false);

    const handlerMouseEnter = () => {
        if(showGnbMenu) return;
        setShowSubMenu(true);
    };
    const handlerMouseLeave = () => setShowSubMenu(false);

    const router = useRouter();
    const lang = useLanguage();

    const handlerLangChange = (e) => {
        if (showGnbMenu) setShowGnbMenu(false);
        const selectedLang = e.target.value;
        router.push(`/?lang=${selectedLang}`);
    }
    const handlerLinkClick = () => {
        handlerMouseLeave();
        if (window.innerWidth <= 992) {
            setShowGnbMenu(false);
        }
    }
    const toggleMobileMenu = () => {
        setShowGnbMenu(prev => !prev);
    };

    return (
        <header onMouseLeave={() => setShowSubMenu(false)}>
            <nav>
                <h1 className="logo"><Link href="/">
                    <Image
                        src={Logo}
                        alt="yanolja research logo"
                        priority
                        style={{objectFit: "contain"}}
                    />
                </Link></h1>
                <div className="gnb" style={{display : showGnbMenu ? "flex" : ""}}>
                    <ul className="flex">
                        <li className="off"><Link href="/">HOME</Link></li>
                        {gnbMenu.map(({name, href}) => (
                            <li key={href}>
                                <Link href={href} onMouseEnter={handlerMouseEnter}
                                      onClick={handlerLinkClick}>{name}</Link>
                            </li>
                        ))}
                        <li className="off">
                            <div className="selectLang mobileSelectLang">
                                <select name="selectLang" onChange={handlerLangChange}
                                        value={router.query.lang || "kr"}>
                                    <option value="kr">KR</option>
                                    <option value="en">EN</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="selectLang alignR">
                    <select name="selectLang" onChange={handlerLangChange} value={router.query.lang || "kr"}>
                        <option value="kr">KR</option>
                        <option value="en">EN</option>
                    </select>
                </div>
                <button className={`mobileBtn ${showGnbMenu ? "closeBtn" : ""}`} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="sr-only">모바일 전용 메뉴 버튼</span>
                </button>
            </nav>
            <div className="subMenu" style={{display: showSubMenu ? 'flex' : 'none'}}>
                <div className="emptyBox"></div>
                <div className="flex">
                    {subMenu[lang].map(({category,items}) => (
                        <ul key={category}>
                            {items.map((item) => (
                                <li key={item}><Link href={category} onClick={handlerMouseLeave}>{item}</Link></li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="emptyBox"></div>
            </div>
        </header>
    );
}