export function extractAnalysisDate(title) {
    if (!title) return "";


    return title.replace(/\s*\d+개의\s*제품\s*$/, "").trim();
}
