import styles from "../styles/SelectedProduct.module.css";
import Img from "../../../assets/images/product/image.png";
import DeleteIcon from "../../../assets/icons/product/delete.png";

export default function SelectedProduct() {
  return (
    <div className={styles.product}>
      <img src={DeleteIcon} alt="delete" className={styles.deleteIcon} />
      <img src={Img} className={styles.img} />
      <h3 className={styles.name}>독도 토너</h3>
    </div>
  );
}
