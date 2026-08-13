import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";

export default function NotFoundPage() {
  return (
    <main>
      <h1>페이지를 찾을 수 없어요</h1>
      <p>주소가 잘못되었거나 사라진 페이지예요.</p>
      <Link to={ROUTES.HOME}>홈으로 돌아가기</Link>
    </main>
  );
}