"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import {useRef} from "react";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

export default function SliderProgressbar({ items, spaceBetween = 20 }) {
    const swiperRef = useRef(null);

    return (
        <div className="slider_module">
            <Swiper
                key={items?.length}
                ref={swiperRef}
                observer={true}
                observeParents={true}
                slidesPerView="auto"
                spaceBetween={spaceBetween}
                pagination={{ type: "progressbar" }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {items.map(({ category, src, alt, tit, href, date }, i) => (
                    <SwiperSlide key={i}>
                        <Link href={href}>
                            <Image src={src} alt={alt} width={270} height={180} />
                            <strong className="color_orange">{category}</strong>
                            <p>{tit}</p>
                            <small className="color_lightGray">{date}</small>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="swiper-button-prev" onClick={() => swiperRef.current.swiper?.slidePrev()}>
                <Image src="/assets/icon_arrow_left.svg" alt="인사이트/브리프 슬라이드 이전 버튼" width={15} height={14}/>
            </button>
            <button className="swiper-button-next" onClick={() => swiperRef.current.swiper?.slideNext()}>
                <Image src="/assets/icon_arrow_right.svg" alt="인사이트/브리프 슬라이드 다음 버튼" width={15} height={14}/>
            </button>
        </div>
    );
}
