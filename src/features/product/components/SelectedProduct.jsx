import styles from "../styles/SelectedProduct.module.css";
import DeleteIcon from "../../../assets/icons/product/delete.png";
import { getCategoryIcon } from "../../../shared/constants/productCategory";

export default function SelectedProduct({ product, onDelete }) {
  const categoryImage = getCategoryIcon(product.categorySub);

  return (
    <div className={styles.product}>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={onDelete}
        aria-label={`${product.name} 삭제`}
      >
        <img src={DeleteIcon} alt="" className={styles.deleteIcon} />
      </button>
      <img src={categoryImage} className={styles.img} alt="" />
      <h3 className={styles.name}>{product.name}</h3>
    </div>
  );
}
