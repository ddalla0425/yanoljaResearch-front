import { useEffect, useRef, useState } from "react";

export default function useScrollRevealAdvanced() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    // 스크롤 방향 체크용
    let lastScroll = useRef(0);
    const [direction, setDirection] = useState("down");

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;

            if (current > lastScroll.current) {
                setDirection("down");
            } else {
                setDirection("up");
            }
            lastScroll.current = current;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const revealPoint = window.innerHeight * 0.8; // threshold 0.8

        const onScroll = () => {
            const top = element.getBoundingClientRect().top;

            // 나타나는 조건
            if (direction === "down" && top < revealPoint) {
                setVisible(true);
            }

            // 사라지는 조건
            if (direction === "up" && top > revealPoint) {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        onScroll(); // 초기 호출

        return () => window.removeEventListener("scroll", onScroll);
    }, [direction]);

    return { ref, visible };
}
