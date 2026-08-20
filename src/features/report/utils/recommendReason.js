const OVERLAP_PATTERN = /(.+?(?:와|과))\s*(\d+)\s*개\s*성분\s*중복/g;

export function parseRecommendReason(reason) {
    if (!reason) return { overlaps: [], summary: "" };

    const overlaps = [...reason.matchAll(OVERLAP_PATTERN)].map((match) => {
        const prefix = match[1].trim();
        return {
            prefix,
            // 접속조사(와/과)를 뗀 순수 제품명. 긴 이름을 말줄임 처리할 때 사용한다.
            name: prefix.replace(/[와과]$/, ""),
            count: Number(match[2]),
        };
    });

    const summary = reason
        .replace(OVERLAP_PATTERN, "")
        .split(/[\n/]/)
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" ");

    return { overlaps, summary };
}
