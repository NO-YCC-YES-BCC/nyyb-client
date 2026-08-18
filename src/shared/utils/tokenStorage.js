const ACCESS_TOKEN_KEY = "sott.accessToken";
const REFRESH_TOKEN_KEY = "sott.refreshToken";
const USER_KEY = "sott.user";

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function saveToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
}

export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
    const storedUser = localStorage.getItem(USER_KEY);

    if(!storedUser) return null;

    try {
        return JSON.parse(storedUser);
    } catch {
        return null;
    }
}

export function clearAuthStorage() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

