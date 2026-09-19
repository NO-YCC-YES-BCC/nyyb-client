import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ROUTES } from "../../../shared/constants/routes";
import {
  getStoredCaptureProducts,
  saveStoredCaptureProducts,
} from "../../capture/api/captureApi";
import styles from "../styles/ProductSection.module.css";
import ProductItem from "./ProductItem";
import NotFound from "./NotFound";
import SelectedProduct from "./SelectedProduct";

export default function ProductSection({ products }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => getStoredCaptureProducts());
  const count = products.length;

  const addProduct = (product) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.some(
        (selectedProduct) => selectedProduct.productId === product.productId,
      );

      return isAlreadySelected ? prev : [...prev, product];
    });
  };

  const deleteProduct = (productId) => {
    setSelected((prev) =>
      prev.filter((product) => product.productId !== productId),
    );
  };

  const handleProceed = () => {
    const analysisProducts = selected.map((product) => ({
      ...product,
      productName: product.name,
      userRoutineSlot: product.userRoutineSlot ?? "BOTH",
    }));

    saveStoredCaptureProducts(analysisProducts);
    navigate(ROUTES.CAPTURE_PRODUCTS);
  };

  if (count === 0) {
    return <NotFound />;
  }

  return (
    <section className={styles.productSection}>
      <div>
        <p className={styles.counter}>{count}개 찾음</p>
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              selected={selected.some(
                (selectedProduct) =>
                  selectedProduct.productId === product.productId,
              )}
              onClick={() => addProduct(product)}
            />
          ))}
        </div>
      </div>

      <div className={styles.selectedList}>
        {selected.map((selectedProduct) => (
          <SelectedProduct
            key={selectedProduct.productId}
            product={selectedProduct}
            onDelete={() => deleteProduct(selectedProduct.productId)}
          />
        ))}
      </div>

      <div className={styles.buttonBox}>
        <Button disabled={selected.length === 0} onClick={handleProceed}>
          다음으로
        </Button>
      </div>
    </section>
  );
}
