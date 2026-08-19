import { useEffect , useRef, useState } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";
import { loginWithKakao } from "../api/authApi";
import { ROUTES } from "../../../shared/constants/routes";

export default function KakaoCallbackPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = useState("");
    const hasRequestedRef = useRef(false);

    const code = searchParams.get("code");

    useEffect( () => {
        if (!code) return;
        if (hasRequestedRef.current) return;

        hasRequestedRef.current = true;

        async function handleKakaoCallback() {
            try {
                await loginWithKakao(code);
                navigate(ROUTES.HOME, { replace: true });
            } catch (error) {
                console.error("[KakaoCallbackPage] 카카오 로그인 실패", error);
                setErrorMessage("카카오 로그인에 실패했어요. 다시 시도해주세요.");
            }
        }
        
        handleKakaoCallback();
    }, [code, navigate]);

    if (!code) {
        return (
            <main className="page">
                <p>카카오 로그인 정보를 찾을 수 없어요.</p>
            </main>
        );
    }

    return (
        <main className="page">
            <p>카카오 로그인 처리 중이에요...</p>
            {errorMessage && <p>{errorMessage}</p>}
        </main>
    )
}