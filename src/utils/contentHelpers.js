export const CATEGORY_MAP = {
    kr: { insight: "인사이트", brief: "브리프", trends: "동향보고서", report: "연구보고서", press: "언론", release: "보도자료", data: "데이터" },
    en: { insight: "insights", brief: "brief", trends: "trends", report: "report", press: "Media coverage", release: "Press Release", data: "Data" }
};

/**
 * 특정 카테고리 항목만 가져오기
 * @param {Array} contentArr - contents[lang]
 * @param {string} categoryKey - "insight" | "brief" | "trends" | "report"
 * @param {string} lang - "kr" | "en"
 */
export function filterByCategory(contentArr = [], categoryKey, lang) {
    const targetCategory = CATEGORY_MAP?.[lang]?.[categoryKey];
    if (!targetCategory) return []; // 안전하게 빈 배열 반환
    return contentArr.filter(c => c.category === targetCategory);
}


/**
 * 최신순 N개 가져오기
 */
export function getLatest(contentArr, count = 5) {
    return [...contentArr]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}
