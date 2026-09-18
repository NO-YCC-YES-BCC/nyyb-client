import styles from "../styles/ProductItem.module.css";
import Img from "../../../assets/images/product/image.png";
import AddIcon from "../../../assets/icons/product/add.png";
import SelectIcon from "../../../assets/icons/product/select.png";

export default function ProductItem({ product, selected = false, onClick }) {
  return (
    <div className={styles.itemBox}>
      <div className={styles.productBox}>
        <div className={styles.imgBox}>
          <img src={Img} className={styles.img} />
        </div>
        <div className={styles.textBox}>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.descrptionBox}>
            <p className={styles.descrptionText}>{product.categoryMain}</p>
            <p className={styles.descrptionText}>
              성분 {product.ingredientCount}개
            </p>
          </div>
        </div>
      </div>
      {selected ? (
        <img src={SelectIcon} className={styles.icon} alt="selected" />
      ) : (
        <img
          src={AddIcon}
          className={styles.icon}
          alt="add"
          onClick={onClick}
        />
      )}
    </div>
  );
}
