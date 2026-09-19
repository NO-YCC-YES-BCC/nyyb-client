const STORAGE_KEY = "sott.routine.done";

// 한국 시간 기준 오늘 날짜 ("2026-09-19" 형식)
function getKstDate() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

function readStored() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
        return null;
    }
}

// 오늘 완료 처리한 제품 id 목록. 날짜가 바뀌었으면 비어 있다.
export function getDoneIds(slot) {
    const stored = readStored();

    if (stored?.date !== getKstDate()) return [];

    return Array.isArray(stored[slot]) ? stored[slot] : [];
}

export function saveDoneIds(slot, ids) {
    const stored = readStored();
    const today = getKstDate();
    const base = stored?.date === today ? stored : { date: today };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...base, [slot]: ids }));
    } catch {
        // 저장에 실패해도 화면 동작에는 영향이 없도록 무시한다
    }
}