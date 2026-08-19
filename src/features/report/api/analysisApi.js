import { apiClient } from "../../../shared/api/client";

export async function getAnalysisList({ page = 0, size = 20 } = {}) {
    const response = await apiClient.get("/analyses", {
        params: { page, size },
    });

    const data = response.data?.data ?? response.data;
    return Array.isArray(data) ? data : [];
}

// GET /analyses/{analysisId}
// POST /analyses 와 동일한 형식({ routineId, title, products })으로 재구성해서 내려준다.
export async function getAnalysisDetail(analysisId) {
    const response = await apiClient.get(`/analyses/${analysisId}`);

    return response.data?.data ?? response.data;
}

// 401 은 GlobalResponse 형식이 아니라 code 가 없으므로 HTTP 상태로만 판별한다.
export function resolveAnalysisErrorStatus(error) {
    const httpStatus = error?.response?.status;

    if (httpStatus === 401) return "unauthorized";
    if (httpStatus === 404) return "notFound"; // 없는 분석이거나 남의 분석
    return "error";
}
