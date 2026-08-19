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

export function getStepLabel(index) {
    const ordinal = ORDINALS[index];
    return ordinal ? `스킨케어 ${ordinal} 번쨰 ` :  `스킨케어 ${index +1}번째`;
}