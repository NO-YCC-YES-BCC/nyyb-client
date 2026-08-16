const CAPTURE_PRODUCTS_STORAGE_KEY = "sott.capture.products";

function createMockProduct(file) {
    return {
        productId: Date.now(),
        imageUrl: URL.createObjectURL(file),
        productName: "촬영한 제품",
        category: "ETC",
        ingredientCount: 0,
        userRoutineSlot: "BOTH",
    };
}

export function getStoredCaptureProducts() {
    const storedProducts = sessionStorage.getItem(CAPTURE_PRODUCTS_STORAGE_KEY);

    if(!storedProducts) return [];

    try {
        return JSON.parse(storedProducts);
    } catch {
        return [];
    }
}

export function saveStoredCaptureProducts(products) {
    sessionStorage.setItem(CAPTURE_PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

export async function uploadProductImage(file) {
    // TODO: 실제 API 연결 시 POST /analyses/ocr multipart/form-data 요청으로 교체
    return createMockProduct(file);
}

export async function addProductImage(file) {
    const product = await uploadProductImage(file);
    const nextProducts = [...getStoredCaptureProducts(), product];

    saveStoredCaptureProducts(nextProducts);

    return nextProducts;
    
}