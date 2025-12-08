"use client"
import Insights from "@/components/home/Insights";
import Brief from "@/components/home/Brief";
import Trends from "@/components/home/Trends";
import Attractive from "@/components/home/Attractive";
import Report from "@/components/home/Report";
import Press from "@/components/home/Press";
import Data from "@/components/home/Data";
import Sns from "@/components/home/Sns";
import FadeSection from "@/components/common/FadeSection";
import {useEffect, useState} from "react";
import {useLanguage} from "@/providers/LanguageProvider";
export default function Home() {
    const { lang = "kr" } = useLanguage();
    const [start, setStart] = useState(false);

    useEffect(() => {

        const t = setTimeout(() => {
            setStart(true);
        }, 30);

        return () => clearTimeout(t);
    }, [lang]);
    return (
        <div className="mainPage">
            <section className={`fade-header ${start ? "show" : ""}`}>
                <Insights/>
                <Attractive/>
            </section>
            <section className={`fade-header ${start ? "show" : ""}`}>
                <Brief/>
                <Trends/>
            </section>
            <FadeSection>
                <Report/>
            </FadeSection>
            <FadeSection>
                <Press/>
                <Data/>
            </FadeSection>
            <FadeSection>
                <Sns/>
            </FadeSection>
        </div>
    );
}
