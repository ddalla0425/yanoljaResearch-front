"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, EffectCards} from "swiper/modules";
import {contents} from "@/data/mainContents";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useLanguage} from "@/providers/LanguageProvider";
import {filterByCategory} from "@/utils/contentHelpers";


export default function Insights() {
    const swiperRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { lang = "kr" } = useLanguage();
    const insightItems = filterByCategory(contents[lang], "insight", lang);

    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper;
        const activeIndex = swiper.activeIndex;
        const realIndex = swiper.realIndex
        setCurrentIndex(realIndex);

        swiper.slides.forEach((slide, index) => {
            if (index < activeIndex || index > activeIndex + 2) {
                slide.style.opacity = "0"; // 숨기기
            } else {
                slide.style.opacity = "1"; // 보이기
            }
        });

    };
    useEffect(() => {
        const swiper = swiperRef.current.swiper;
        swiper.on('transitionEnd', handleSlideChange); // ← 여기가 중요
        return () => swiper.off('transitionEnd', handleSlideChange);
    }, []);

    return (

        <div className="insights">
            <Swiper
                effect={'cards'}
                modules={[EffectCards, Autoplay]}
                cardsEffect={{
                    perSlideRotate: 0,
                    perSlideOffset: 8,
                    rotate: false,
                    shadow: true
                }}
                autoplay={{ delay: 1000 }}
                loop={true}
                onSlideChange={handleSlideChange}
                ref={swiperRef}
                className="mySwiper"
            >
                {insightItems.map(({category, src, alt, tit, btn, href}, i) => (
                    <SwiperSlide key={i}>
                        <div className="slide-inner">
                            <Image src={src} alt={alt} fill className="slide-img"/>
                            <div className="textArea">
                                <strong><i className="icon-dot"/>{category}</strong>
                                <h3>{tit}</h3>
                                <button><Link href={href}>{btn}</Link></button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="customBtn">
                <button onClick={() => {
                    swiperRef.current?.swiper.slidePrev();
                    handleSlideChange();
                }}><Image src="/assets/icon_arrow_left.svg" alt="insight 슬라이드 이전 버튼" width={14} height={14}/></button>
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
                <button onClick={() => swiperRef.current?.swiper.autoplay.start()}><Image src="/assets/icon_play.svg" alt="insight 슬라이드 시작 버튼" width={14} height={14}/></button>
                <button onClick={() => swiperRef.current?.swiper.autoplay.stop()}><Image src="/assets/icon_pause.svg" alt="insight 슬라이드 정지 버튼" width={14} height={14}/></button>
                <button onClick={() => {swiperRef.current?.swiper.slideNext(); } }><Image src="/assets/icon_arrow_right.svg" alt="insight 슬라이드 다음 버튼" width={14} height={14}/></button>
            </div>
        </div>

    );
}