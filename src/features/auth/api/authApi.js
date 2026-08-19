import { apiClient } from "../../../shared/api/client";
import {
    getAccessToken,
    saveToken,
    saveUser,
} from "../../../shared/utils/tokenStorage";

let guestSessionPromise = null;

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
        linkedGuestUserId: data.linkedGuestUserId,
    });

    return data;
}

export async function ensureGuestSession() {
    const accessToken = getAccessToken();

    if(accessToken) {
        return null;
    }
    
    if (guestSessionPromise) {
        return guestSessionPromise
    }
    guestSessionPromise = createGuestSession().finally(() => {
        guestSessionPromise = null;
    });

    return guestSessionPromise;
}

export async function loginWithKakao(code) {
    const response = await apiClient.post("/auth/kakao", { code });
    const data = getResponseData(response);

    saveToken(data.token);
    saveUser({
        id: data.id,
        nickname: data.nickname,
        guest: data.guest,
        linkedGuestUserId: data.linkedGuestUserId
    });

    return data;
}