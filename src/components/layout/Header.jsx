"use client"

import Image from "next/image";
import Logo from "/public/assets/logo.svg"
import Link from "next/link";
import {useState} from "react";
import {headerGnb, subMenu} from "@/data/headerGnb";
import LanguageSelector from "@/components/common/LanguageSelector";
import {useLanguage} from "@/providers/LanguageProvider";
import useIsMobile from "@/utils/hooks/useIsMobile";


export default function Header() {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showGnbMenu, setShowGnbMenu] = useState(false);
    const [activeGnb, setActiveGnb] = useState(null);
    const isMobile992 = useIsMobile(992);
    const {lang} = useLanguage();
    const closeAllMenus = () => {
        setShowGnbMenu(false);
        setActiveGnb(null);
        setShowSubMenu(false);
    };

    const handlerMouseEnter = () => {
        if(showGnbMenu) return;
        setShowSubMenu(true);
    };
    const handlerMouseLeave = () => setShowSubMenu(false);

    const handleGnbClick = (href) => {
        if (!isMobile992) return; // PC면 동작 안 함

        // 모바일에서는 페이지 이동 막고 해당 메뉴만 펼침
        setActiveGnb((prev) => (prev === href ? null : href));
        setShowSubMenu(false);
    };

    const handlerLinkClick = () => {
        handlerMouseLeave();
        if (window.innerWidth <= 992) {
            setShowGnbMenu(false);
        }
    }
    const toggleMobileMenu = () => {
        setShowGnbMenu(prev => {
            const next = !prev;

            if (!next) {
                // 모바일 메뉴 닫힐 때 서브메뉴도 초기화
                setActiveGnb(null);
                setShowSubMenu(false);
            }

            return next;
        });
    };

    return (
        <header onMouseLeave={() => setShowSubMenu(false)} key={lang}>
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
                        <li className="off"><Link onClick={closeAllMenus} href="/">HOME</Link></li>
                        {headerGnb.map(({ name, href }) => {
                            const currentSub = subMenu[lang]?.find(m => m.category === href);

                            return (
                                <li key={`${lang}-${href}-${name}`}>
                                    <Link
                                        href={href}
                                        onMouseEnter={handlerMouseEnter}
                                        onClick={(e) => {
                                            if (isMobile992) {
                                                e.preventDefault();
                                                handleGnbClick(href);
                                            } else {
                                                handlerLinkClick();
                                                closeAllMenus();
                                            }
                                        }}
                                    >
                                        {name}
                                    </Link>

                                    {/* 모바일 전용 서브메뉴 */}
                                    {isMobile992 && (
                                        <ul
                                            className="mobile-sub"
                                            style={{ display: activeGnb === href ? "flex" : "none" }}
                                        >
                                            {currentSub?.items.map(({ name, href }) => (
                                                <li key={`${lang}-${href}-${name}`}>
                                                    <Link href={href} onClick={closeAllMenus}>
                                                        {name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                        <li className="off">
                            <div className="selectLang mobileSelectLang">
                                <LanguageSelector onChangeCloseMenu={() => setShowGnbMenu(false)} />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="selectLang alignR">
                    <LanguageSelector onChangeCloseMenu={() => setShowGnbMenu(false)} />
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
                    {subMenu[lang]?.map(({category,items}) => (
                        <ul key={`${lang}-${category}`}>
                            {items.map(({ name, href}) => (
                                <li key={`${lang}-${href}-${name}`}><Link href={href} onClick={handlerMouseLeave}>{name}</Link></li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="emptyBox"></div>
            </div>
        </header>
    );
}