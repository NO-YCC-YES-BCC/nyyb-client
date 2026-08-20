import { apiClient } from "../../../shared/api/client";

export async function getRoutineCandidates() {
    const response = await apiClient.get("/routines", {
        params: {
        page: 0,
        size: 3,
        },
    });

    return response.data?.data ?? [];
    }

    export async function compareProductWithRoutine({ productId, routineId }) {
    const response = await apiClient.post("/analyses/compatibility", {
        productId,
        routineId,
    });

    return response.data?.data;
}