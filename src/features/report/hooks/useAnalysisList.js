import { useCallback, useEffect, useState } from "react";
import { getAnalysisList, resolveAnalysisErrorStatus } from "../api/analysisApi";

const INITIAL_STATE = { analyses: [], status: "loading" };

// status: "loading" | "success" | "unauthorized" | "error"
export function useAnalysisList({ size = 20 } = {}) {
    const [state, setState] = useState(INITIAL_STATE);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function run() {
        try {
            const data = await getAnalysisList({ page: 0, size });
            if (!cancelled) setState({ analyses: data, status: "success" });
        } catch (error) {
            if (!cancelled) setState({ analyses: [], status: resolveAnalysisErrorStatus(error) });
        }
        }

        run();

        return () => {
        cancelled = true;
        };
    }, [size, reloadKey]);

    const reload = useCallback(() => {
        setState((prev) => ({ ...prev, status: "loading" }));
        setReloadKey((key) => key + 1);
    }, []);

    return { ...state, reload };
}
