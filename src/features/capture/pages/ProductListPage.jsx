import Button from "../../../shared/components/Button";
import kakaoIcon from "../../../assets/icons/kakao.svg";

export default function ProductListPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <Button variant="primary">분석 시작하기</Button>

      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="secondaryDashed">+ 제품 추가 촬영하기</Button>
        <Button variant="secondarySolid">루틴으로 저장하기</Button>
      </div>

      <Button variant="kakao" leftIcon={kakaoIcon}>
        카카오로 시작하기
      </Button>

      <Button variant="kakaoLight">
        테스트 계정으로 로그인
      </Button>
    </main>
  );
}