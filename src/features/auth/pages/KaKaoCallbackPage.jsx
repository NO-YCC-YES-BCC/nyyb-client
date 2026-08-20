import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { loginWithKakao } from "../api/authApi";

export default function KakaoCallbackPage() {
    const navigate = useNavigate();
    const [failed, setFailed] = useState(false);

    // 인가 코드는 1회용이다. StrictMode 가 effect 를 두 번 실행하므로
    // 두 번째 호출을 막지 않으면 두 번째가 401 로 떨어진다.
    const requested = useRef(false);

    useEffect(() => {
        if (requested.current) return;
        requested.current = true;

        const code = new URLSearchParams(window.location.search).get("code");

        if (!code) {
        navigate(ROUTES.LOGIN, { replace: true });
        return;
        }

        async function run() {
        try {
            await loginWithKakao(code);
            navigate(ROUTES.HOME, { replace: true });
        } catch {
            setFailed(true);
        }
        }

        run();
    }, [navigate]);

    return (
        <main className="page">
        {failed ? (
            <>
            <p>로그인에 실패했어요. 다시 시도해주세요.</p>
            <button type="button" onClick={() => navigate(ROUTES.LOGIN, { replace: true })}>
                로그인으로 돌아가기
            </button>
            </>
        ) : (
            <p>로그인 중이에요...</p>
        )}
        </main>
    );
}
