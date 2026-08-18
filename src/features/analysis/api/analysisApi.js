import { apiClient } from "../../../shared/api/client";

const ANALYSIS_REQUEST_STORAGE_KEY = "sott.analysis.result";

export function getStoredAnalysisResult() {
    const storedResult = sessionStorage.getItem(ANALYSIS_REQUEST_STORAGE_KEY);
    
    if( !storedResult) return null;

    try {
        return JSON.parse(storedResult);
    } catch {
        return null;
    }
}

export function saveStoredAnalysisResult(result) {
    sessionStorage.setItem(ANALYSIS_REQUEST_STORAGE_KEY, JSON.stringify(result));
}

export async function startAnalysis(products) {
    const payload = {
        products: products.map((product) => ({
            productId: product.productId,
            userRoutineSlot: product.userRoutineSlot,
        })),
    };

    const response = await apiClient.post("/analyses", payload);

    return response.data?.data ?? response.data;
}

