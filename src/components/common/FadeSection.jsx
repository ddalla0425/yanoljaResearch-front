import useScrollRevealAdvanced from "@/utils/hooks/useScrollRevealAdvanced";

export default function FadeSection({ children }) {
    const { ref, visible } = useScrollRevealAdvanced();

    return (
        <section
            ref={ref}
            className={`scroll-fade-section ${visible ? "visible" : ""}`}
        >
            {children}
        </section>
    );
}
