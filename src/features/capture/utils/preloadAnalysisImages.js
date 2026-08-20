import myProductsImage from "../../../assets/images/modal/my-products.png";
import newPurchaseImage from "../../../assets/images/modal/new-purchase.png";

// 촬영 모달이 열리기 전에 카드 이미지를 미리 받아둬 첫 오픈 시 늦게 뜨는 것을 막는다.
export function preloadAnalysisStartImages() {
    [myProductsImage, newPurchaseImage].forEach((src) => {
        const image = new Image();
        image.src = src;
    });
}
