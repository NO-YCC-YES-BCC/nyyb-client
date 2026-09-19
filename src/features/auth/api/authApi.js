import { apiClient } from "../../../shared/api/client";
import {
  clearAuthStorage,
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

  if (accessToken) {
    return null;
  }

  if (guestSessionPromise) {
    return guestSessionPromise;
  }
  guestSessionPromise = createGuestSession().finally(() => {
    guestSessionPromise = null;
  });

  return guestSessionPromise;
}

export async function loginWithGuest() {
  clearAuthStorage();
  return ensureGuestSession();
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

/*
    서버는 accessToken 을 무효화하지 않아서(로그아웃·탈퇴 후에도 만료 전까지 유효)
    로컬에 저장된 토큰은 항상 여기서 직접 지운다.
*/
export async function logout() {
  try {
    await apiClient.post("/auth/logout");
  } catch (error) {
    // 서버 요청이 실패해도(만료 토큰 등) 사용자는 로그아웃된 상태가 되어야 한다.
    console.error("로그아웃 요청 실패", error);
  } finally {
    clearAuthStorage();
  }
}

export async function withdraw() {
  await apiClient.delete("/auth/user/me");
  clearAuthStorage();
}
