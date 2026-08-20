import { apiClient} from "../../../shared/api/client";

export async function getLatestRoutine() {
    const response = await apiClient.get("/routines/latest");
    return response.data?.data ?? response.data;
}

export function resolveRoutineErrorStatus(error) {
    const httpStatus = error?.response?.status;

    if ( httpStatus === 401) return "unauthorized";
    if ( httpStatus === 404) return "empty";
    return "error";
}