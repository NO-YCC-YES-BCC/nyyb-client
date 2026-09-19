import { useCallback, useEffect, useState } from "react";
import { getAnalysisDetail, resolveAnalysisErrorStatus } from "../api/analysisApi";
import { getMatchedIngredients } from "../api/reportApi";
import { getStoredAnalysisResult } from "../../analysis/api/analysisApi";


export const FRESH_ANALYSIS_PARAM = "result";

const EMPTY_MATCH = { ingredients: [], allergics: [] };
const INITIAL_STATE = { analysis: null, matched: EMPTY_MATCH, status: "loading" };

// status: "loading" | "success" | "unauthorized" | "notFound" | "error"
export function useAnalysisReport(analysisId) {
    const [state, setState] = useState(INITIAL_STATE);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
    let cancelled = false;

    // 항상 await 를 한 번 거치게 해서, setState 가 effect 본문에서 동기적으로 불리지 않게 한다.
    async function loadDetail() {
        if (analysisId === FRESH_ANALYSIS_PARAM) return getStoredAnalysisResult();
        return getAnalysisDetail(analysisId);
    }

    async function run() {
        try {
        const detail = await loadDetail();

        if (!detail) {
            if (!cancelled) setState({ ...INITIAL_STATE, status: "notFound" });
            return;
        }

        const productIds = (detail.products ?? [])
        .map((product) => product.masterProductId)
        .filter((id) => id != null);

        // 성분 조회 실패는 리포트 전체를 막지 않는다. 주의 성분 섹션만 비어 보인다.
        const matched =
            productIds.length > 0
                ? await getMatchedIngredients(productIds).catch((error) => {
                    console.error("주의 성분 조회 실패", error);
                    return EMPTY_MATCH;
                })
            : EMPTY_MATCH;

        if (!cancelled) {
            setState({ analysis: detail, matched: matched ?? EMPTY_MATCH, status: "success" });
            }
        } catch (error) {
            if (!cancelled) {
            setState({ ...INITIAL_STATE, status: resolveAnalysisErrorStatus(error) });
            }
        }
    }

    run();

    return () => {
        cancelled = true;
        };
    }, [analysisId, reloadKey]);

    const reload = useCallback(() => {
        setState((prev) => ({ ...prev, status: "loading" }));
        setReloadKey((key) => key + 1);
    }, []);

    return { ...state, reload };
}
