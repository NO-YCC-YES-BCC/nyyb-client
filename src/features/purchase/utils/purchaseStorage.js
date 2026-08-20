const PURCHASE_PRODUCT_KEY = "sott.purchase.product";

export function savePurchaseProduct(product) {
    sessionStorage.setItem(PURCHASE_PRODUCT_KEY, JSON.stringify(product));
    }

    export function getPurchaseProduct() {
    const raw = sessionStorage.getItem(PURCHASE_PRODUCT_KEY);
    return raw ? JSON.parse(raw) : null;
    }

    export function clearPurchaseProduct() {
    sessionStorage.removeItem(PURCHASE_PRODUCT_KEY);
}