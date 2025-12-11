"use client";

import Image from "next/image";
import Logo from "/public/assets/logo.svg";
import Link from "next/link";
import { useState } from "react";
import { headerGnb, subMenu } from "@/data/headerGnb";
import LanguageSelector from "@/components/common/LanguageSelector";
import { useLanguage } from "@/providers/LanguageProvider";
import useIsMobile from "@/utils/hooks/useIsMobile";

export default function Header() {
    const [showSubMenu, setShowSubMenu] = useState(false);  // PC 서브메뉴
    const [showGnbMenu, setShowGnbMenu] = useState(false);  // Mobile 전체 메뉴
    const [activeGnb, setActiveGnb] = useState(null);       // Mobile 서브메뉴
    const isMobile992 = useIsMobile(992);
    const { lang } = useLanguage();

    // 전체 메뉴 닫기
    const closeAllMenus = () => {
        setShowGnbMenu(false);
        setActiveGnb(null);
        setShowSubMenu(false);
    };

    // PC 호버할 때 submenu 열기
    const handleMouseEnter = () => {
        if (isMobile992 || showGnbMenu) return;
        setShowSubMenu(true);
    };

    // PC 호버할 때 submenu 닫기
    const handleMouseLeave = () => {
        if (!isMobile992) setShowSubMenu(false);
    };

    // Mobile GNB 클릭 → 페이지 이동 막고 서브메뉴만 열기
    const handleGnbClick = (href) => {
        if (!isMobile992) return;
        setActiveGnb((prev) => (prev === href ? null : href));
        setShowSubMenu(false);
    };

    // Mobile 메뉴 열고 닫기(토글!)
    const toggleMobileMenu = () => {
        setShowGnbMenu((prev) => {
            const next = !prev;
            if (!next) closeAllMenus();
            return next;
        });
    };

    return (
        <header onMouseLeave={handleMouseLeave} key={lang}>
            <nav>
                <h1 className="logo">
                    <Link href="/" onClick={closeAllMenus}>
                        <Image
                            src={Logo}
                            alt="yanolja research logo"
                            priority
                            style={{ objectFit: "contain" }}
                        />
                    </Link>
                </h1>

                {/* GNB 영역 */}
                <div className="gnb" style={{ display: showGnbMenu ? "flex" : "" }}>
                    <ul className="flex">
                        <li className="off">
                            <Link href="/" onClick={closeAllMenus}>HOME</Link>
                        </li>

                        {headerGnb.map(({ name, href }) => {
                            const currentSub = subMenu[lang]?.find(s => s.category === href);

                            return (
                                <li key={`gnb-${lang}-${href}-${name}`}>
                                    <Link
                                        href={href}
                                        onMouseEnter={handleMouseEnter}
                                        onClick={(e) => {
                                            if (isMobile992) {
                                                e.preventDefault();
                                                handleGnbClick(href);
                                            } else {
                                                closeAllMenus();
                                            }
                                        }}
                                    >
                                        {name}
                                    </Link>

                                    {/* Mobile 전용 submenu */}
                                    {isMobile992 && (
                                        <ul
                                            className={`mobile-sub ${
                                                activeGnb === href ? "open" : ""
                                            }`}
                                        >
                                            {currentSub?.items.map(({ name: subName, href: subHref }) => (
                                                <li key={`mobile-${lang}-${subHref}-${subName}`}>
                                                    <Link href={subHref} onClick={closeAllMenus}>
                                                        {subName}
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
                                <LanguageSelector onChangeCloseMenu={closeAllMenus} />
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="selectLang alignR">
                    <LanguageSelector onChangeCloseMenu={closeAllMenus} />
                </div>

                {/* Mobile 메뉴 버튼 */}
                <button
                    className={`mobileBtn ${showGnbMenu ? "closeBtn" : ""}`}
                    onClick={toggleMobileMenu}
                >
                    <span></span><span></span><span></span>
                    <span className="sr-only">모바일 전용 메뉴 버튼</span>
                </button>
            </nav>

            {/* PC 전용 submenu */}
            <div className="subMenu" style={{ display: showSubMenu ? "flex" : "none" }}>
                <div className="emptyBox"></div>
                <div className="flex">
                    {subMenu[lang]?.map(({ category, items }) => (
                        <ul key={`pc-${lang}-${category}`}>
                            {items.map(({ name: subName, href: subHref }) => (
                                <li key={`pc-${lang}-${subHref}-${subName}`}>
                                    <Link href={subHref} onClick={closeAllMenus}>
                                        {subName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div className="emptyBox"></div>
            </div>
        </header>
    );
}