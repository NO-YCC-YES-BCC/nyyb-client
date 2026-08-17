import { apiClient } from "../../../shared/api/client";
import {
    getAccessToken,
    saveToken,
    saveUser,
} from "../../../shared/utils/tokenStorage";

function getResponseData(response) {
    return response.data?.data ?? response.data;
}

export async function createGuestSession() {
    const response = await apiClient.post("/auth/guest");
    const data = getResponseData(response);

    saveToken(data.token);
    saveUser({
        id: data.id,
        nickname: data.nickname,
        guest: data.guest,
    });

    return data;
}

export async function ensureGuestSession() {
    const accessToken = getAccessToken();

    if(accessToken) {
        return null;
    }
    return createGuestSession();
}