export function resolveRoutineSlot(routine) {
    if (routine?.evening?.length > 0) return "evening";
    if (routine?.morning?.length > 0) return "morning";

    return getKstSlot();
}

export function getKstSlot(now = new Date()) {
    const kstHour = Number(
        new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Seoul" ,
            hour: "2-digit",
            hourCycle: "h23",
        }).format(now)
    );

    return kstHour < 12 ? "morning" : "evening";
}

export const SLOT_LABEL = {
    morning: "아침",
    evening: "저녁",
};

const ORDINALS = ["첫", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열"];

// 같은 대분류 안에서의 순서를 센다. 예: 스킨케어 첫 번째, 스킨케어 두 번째, 헤어케어 첫 번째
export function getStepLabels(products) {
    const counts = {};

    return products.map((product, index) => {
        const group = product.categoryMain;

        // 분류가 없으면 전체 순서로 표시한다
        if (!group || group === "미분류") return `${index + 1}번째`;

        counts[group] = (counts[group] ?? 0) + 1;
        const order = counts[group];
        const ordinal = ORDINALS[order - 1];

        return ordinal ? `${group} ${ordinal} 번째` : `${group} ${order}번째`;
    });
}