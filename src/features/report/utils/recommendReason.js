const OVERLAP_PATTERN = /(.+?(?:와|과))\s*(\d+)\s*개\s*성분\s*중복/g;

export function parseRecommendReason(reason) {
    if (!reason) return { overlaps: [], summary: "" };

    const overlaps = [...reason.matchAll(OVERLAP_PATTERN)].map((match) => ({
        prefix: match[1].trim(),
        count: Number(match[2]),
    }));

    const summary = reason
        .replace(OVERLAP_PATTERN, "")
        .split(/[\n/]/)
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" ");

    return { overlaps, summary };
}
