import {useSearchParams} from "next/navigation";

export function useLanguage(){
    const params = useSearchParams();
    return params.get("lang") || "kr";
}