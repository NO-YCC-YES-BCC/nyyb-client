

const INGREDIENT_NAME_EN = {
    아밀신남알: "Amyl cinnamal",
    벤질알코올: "Benzyl alcohol",
    신나밀알코올: "Cinnamyl alcohol",
    시트랄: "Citral",
    유제놀: "Eugenol",
    하이드록시시트로넬알: "Hydroxycitronellal",
    이소유제놀: "Isoeugenol",
    아밀신나밀알코올: "Amylcinnamyl alcohol",
    벤질살리실레이트: "Benzyl salicylate",
    신남알: "Cinnamal",
    쿠마린: "Coumarin",
    제라니올: "Geraniol",
    아니스알코올: "Anise alcohol",
    벤질신나메이트: "Benzyl cinnamate",
    파네솔: "Farnesol",
    부틸페닐메틸프로피오날: "Butylphenyl methylpropional",
    리날룰: "Linalool",
    벤질벤조에이트: "Benzyl benzoate",
    시트로넬올: "Citronellol",
    헥실신남알: "Hexyl cinnamal",
    리모넨: "Limonene",
    "메틸2-옥티노에이트": "Methyl 2-octynoate",
    "알파-이소메틸이오논": "Alpha-isomethyl ionone",
    참나무이끼추출물: "Evernia prunastri extract",
    나무이끼추출물: "Evernia furfuracea extract",
};


export function normalizeIngredientName(name) {
    return (name ?? "").toLowerCase().replace(/\s/g, "");
}

const NORMALIZED_MAP = Object.fromEntries(
    Object.entries(INGREDIENT_NAME_EN).map(([ko, en]) => [normalizeIngredientName(ko), en])
);

export function getIngredientNameEn(name) {
    return NORMALIZED_MAP[normalizeIngredientName(name)] ?? null;
}
