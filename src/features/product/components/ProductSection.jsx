import Button from "../../../shared/components/Button";
import styles from "../styles/ProductSection.module.css";
import ProductItem from "./ProductItem";
import SelectedProduct from "./SelectedProduct";

export default function ProductSection({ products }) {
  const count = products.length;

  return (
    <section className={styles.productSection}>
      <div>
        <p className={styles.counter}>{count}개 찾음</p>
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductItem key={product.productId} product={product} />
          ))}
        </div>
      </div>

      {/* <div className={styles.selectedList}>
        <SelectedProduct />
        <SelectedProduct />
        <SelectedProduct />
        <SelectedProduct />
        <SelectedProduct />
        <SelectedProduct />
        <SelectedProduct />
      </div> */}

      <div className={styles.buttonBox}>
        <Button disabled>선택한 제품으로 분석 진행하기</Button>
      </div>
    </section>
  );
}
