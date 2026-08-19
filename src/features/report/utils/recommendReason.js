const OVERLAP_PATTERN = /제품\s*(\d+)\s*번과\s*(\d+)\s*개\s*성분\s*중복/;

export function parseRecommendReason(reason) {
    if (!reason) return { overlaps: [], summary: "" };

    const parts = reason
        .split(/[\n/]/)
        .map((part) => part.trim())
        .filter(Boolean);

    const overlaps = [];
    const rest = [];

    parts.forEach((part) => {
        const matched = part.match(OVERLAP_PATTERN);

        if (matched) {
        overlaps.push({
            productNumber: Number(matched[1]),
            count: Number(matched[2]),
        });
        } else {
        rest.push(part);
        }
    });

    return { overlaps, summary: rest.join(" ") };
}
