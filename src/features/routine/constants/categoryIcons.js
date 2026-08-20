import ampoule from '../../../assets/images/category/ampoule.png';
import cleanser from '../../../assets/images/category/cleanser.png';
import cream from '../../../assets/images/category/cream.png';
import essence from '../../../assets/images/category/essence.png';
import etc from '../../../assets/images/category/etc.png';
import eyeCream from '../../../assets/images/category/eye-cream.png';
import lotion from '../../../assets/images/category/lotion.png';
import mask from '../../../assets/images/category/mask.png';
import oil from '../../../assets/images/category/oil.png';
import serum from '../../../assets/images/category/serum.png';
import skin from '../../../assets/images/category/skin.png';
import sunscreen from '../../../assets/images/category/sunscreen.png';
import toner from '../../../assets/images/category/toner.png';

const CATEGORY_ICON_MAP = {
  TONER: toner,
  SKIN: skin,
  ESSENCE: essence,
  SERUM: serum,
  AMPOULE: ampoule,
  LOTION: lotion,
  CREAM: cream,
  EYE_CREAM: eyeCream,
  OIL: oil,
  SUNSCREEN: sunscreen,
  CLEANSER: cleanser,
  MASK: mask,
  ETC: etc,
};

export function getCategoryIcon(category) {
  return CATEGORY_ICON_MAP[category] ?? CATEGORY_ICON_MAP.ETC;
}