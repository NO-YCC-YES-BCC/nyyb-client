import styles from "../styles/SelectedProduct.module.css";
import Img from "../../../assets/images/product/image.png";
import DeleteIcon from "../../../assets/icons/product/delete.png";

export default function SelectedProduct({ product, onDelete }) {
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
      <img src={Img} className={styles.img} alt="" />
      <h3 className={styles.name}>{product.name}</h3>
    </div>
  );
}
