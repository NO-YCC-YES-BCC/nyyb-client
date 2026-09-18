import { useState } from "react";
import Button from "../../../shared/components/Button";
import styles from "../styles/ProductSection.module.css";
import ProductItem from "./ProductItem";
import NotFound from "./NotFound";
import SelectedProduct from "./SelectedProduct";

export default function ProductSection({ products }) {
  const [selected, setSelected] = useState([]);
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
        <Button disabled={selected ? false : true}>
          선택한 제품으로 분석 진행하기
        </Button>
      </div>
    </section>
  );
}
