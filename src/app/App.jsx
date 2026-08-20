import { useEffect } from "react";
import AppRouter from "./Router";
import { ensureGuestSession } from "../features/auth/api/authApi";


export default function App() {
  useEffect( () => {
    ensureGuestSession().catch((error) => {
      console.error("게스트 세션 생성 실패", error);
    });
  }, []);
  
  return (
  <div className="app-shell">
    <AppRouter />
  </div>
  );
}