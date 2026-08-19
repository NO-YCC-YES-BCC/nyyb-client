import { useCallback, useEffect, useState } from "react";
import { getLatestRoutine, resolveRoutineErrorStatus } from "../api/homeApi";

const INITIAL_STATE = { routine: null, status: "loading" };

// status: "loading" | "success" | "empty" | "unauthorized" | "error"
export function useLatestRoutine() {
    const [state, setState] = useState(INITIAL_STATE);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function run() {
        try {
            const data = await getLatestRoutine();
            if (!cancelled) setState({ routine: data, status: "success" });
        } catch (error) {
            // 404 는 "아직 분석한 적 없음"이라 에러가 아니라 empty 로 다룬다.
            if (!cancelled) setState({ routine: null, status: resolveRoutineErrorStatus(error) });
        }
        }

        run();

        return () => {
        cancelled = true;
        };
    }, [reloadKey]);

    const reload = useCallback(() => {
        setState((prev) => ({ ...prev, status: "loading" }));
        setReloadKey((key) => key + 1);
    }, []);

    return { ...state, reload };
}
