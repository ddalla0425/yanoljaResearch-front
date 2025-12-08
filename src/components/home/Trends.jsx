"use client"
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";
import {useLanguage} from "@/providers/LanguageProvider";
import {filterByCategory} from "@/utils/contentHelpers";
import {contents} from "@/data/mainContents";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import SliderProgressbar from "@/components/common/SliderProgressbar";
import useIsMobile from "@/utils/hooks/useIsMobile";


export default function Trends() {
    const swiperRef = useRef(null);
    const { lang = "kr" } = useLanguage();
    const insightItems = filterByCategory(contents[lang], "trends", lang);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        const swiper = swiperRef.current.swiper;
        swiper.on('transitionEnd', handleSlideChange);
        return () => swiper.off('transitionEnd', handleSlideChange);
    }, []);

    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper;
        setCurrentIndex(swiper.realIndex);
    };

    // ★ 모바일이면 여기서 바로 다른 UI 리턴
    if (isMobile) {
        return (
            <div className="trends">
                <h2><Link href="/public">{lang === "kr" ? "동향보고서" : "Trends"}</Link></h2>
                <SliderProgressbar items={insightItems} spaceBetween={isMobile ? 16 : 40}/>
            </div>
        );
    }

    return (
        <div className="trends">
            <h2><Link href="/public">{lang === "kr" ? "동향보고서" : "Trends"}</Link></h2>

            {/* ★ 기존 데스크탑용 Swiper 그대로 */}
            <Swiper
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                slidesPerView={'auto'}
                spaceBetween={20}
                className="mySwiper"
            >
                {insightItems.map(({category, src, alt, href, tit, date}, i) => (
                    <SwiperSlide key={i}>
                        <Link href={href}>
                            <Image src={src} alt={alt} width={250} height={350}/>
                            <div className="textArea">
                                <p>{tit}</p>
                                <small>{date}</small>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="customBtn">
                <button className="swiper-button-prev" onClick={() => {
                    swiperRef.current?.swiper.slidePrev();
                    handleSlideChange();
                }}>
                    <Image src="/assets/icon_arrow_left.svg" alt="이전" width={14} height={14}/>
                </button>

                <div style={{display: "flex", gap: "6px"}}>
                    {insightItems.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => swiperRef.current?.swiper.slideToLoop(i)}
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: currentIndex === i ? "black" : "white"
                            }}
                        />
                    ))}
                </div>

                <button className="swiper-button-next" onClick={() => {
                    swiperRef.current?.swiper.slideNext();
                }}>
                    <Image src="/assets/icon_arrow_right.svg" alt="다음" width={14} height={14}/>
                </button>
            </div>
        </div>
    );
}
