import { apiClient } from "../../../shared/api/client";

const CAPTURE_PRODUCTS_STORAGE_KEY = "sott.capture.products";

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
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/analyses/ocr", formData);
    const data = response.data?.data ?? response.data;

    return {
        productId: data.productId,
        imageUrl: URL.createObjectURL(file),
        productName: data.productName || "촬영한 제품",
        category: data.category,
        ingredientCount: data.ingredientCount,
        ingredients: data.ingredients ?? [],
        userRoutineSlot: "BOTH",
    };
}

export async function addProductImage(file) {
    const product = await uploadProductImage(file);
    const nextProducts = [...getStoredCaptureProducts(), product];

    saveStoredCaptureProducts(nextProducts);

    return nextProducts;
    
}