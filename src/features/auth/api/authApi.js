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

/*
    카카오 인가 코드로 로그인한다.
    게스트 accessToken 은 client.js 인터셉터가 자동으로 붙이므로
    여기서 헤더를 직접 만들지 않는다. 서버가 그 토큰을 보고 게스트 데이터를 귀속시킨다.
*/
export async function loginWithKakao(code) {
    const response = await apiClient.post("/auth/kakao", { code });
    const data = getResponseData(response);

    // 게스트 토큰을 카카오 유저 토큰으로 교체한다.
    saveToken(data.token);
    saveUser({
        id: data.id,
        nickname: data.nickname,
        guest: data.guest,
        linkedGuestUserId: data.linkedGuestUserId,
    });

    return data;
}
