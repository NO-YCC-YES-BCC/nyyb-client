import { getUser } from "../../../shared/utils/tokenStorage";

export function getHomeUser() {
    const user = getUser();
    const isGuest = !user || user.guest === true;

    return {
        isGuest,
        nickname: isGuest ? "게스트" : user.nickname ?? "회원",
    };
}