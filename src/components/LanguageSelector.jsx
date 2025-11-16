import { useRouter } from "next/router";

export default function LanguageSelector({ className, onChangeCloseMenu }) {
    const router = useRouter();

    const handleChange = (e) => {
        if (onChangeCloseMenu) onChangeCloseMenu();
        router.push(`/?lang=${e.target.value}`);
    };

    return (
        <select
            className={className}
            onChange={handleChange}
            value={router.query.lang || "kr"}
        >
            <option value="kr">KR</option>
            <option value="en">EN</option>
        </select>
    );
}