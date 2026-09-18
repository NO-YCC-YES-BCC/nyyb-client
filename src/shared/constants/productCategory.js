import ampoule from "../../assets/images/category/ampoule.svg";
import balm from "../../assets/images/category/balm.svg";
import baseMakeup from "../../assets/images/category/base-makeup.svg";
import bodyCream from "../../assets/images/category/body-cream.svg";
import bodyLotion from "../../assets/images/category/body-lotion.svg";
import cleansingFoam from "../../assets/images/category/cleansing-foam.svg";
import cream from "../../assets/images/category/cream.svg";
import deodorant from "../../assets/images/category/deodorant.svg";
import essence from "../../assets/images/category/essence.svg";
import etc from "../../assets/images/category/etc.svg";
import eyeMakeup from "../../assets/images/category/eye-makeup.svg";
import faceTool from "../../assets/images/category/face-tool.svg";
import facialPack from "../../assets/images/category/facial-pack.svg";
import footCare from "../../assets/images/category/foot-care.svg";
import hairDye from "../../assets/images/category/hair-dye.svg";
import hairEssence from "../../assets/images/category/hair-essence.svg";
import hairPack from "../../assets/images/category/hair-pack.svg";
import handCare from "../../assets/images/category/hand-care.svg";
import homeFragrance from "../../assets/images/category/home-fragrance.svg";
import lipMakeup from "../../assets/images/category/lip-makeup.svg";
import lotion from "../../assets/images/category/lotion.svg";
import miniPerfume from "../../assets/images/category/mini-perfume.svg";
import mist from "../../assets/images/category/mist.svg";
import nailCare from "../../assets/images/category/nail-care.svg";
import normalNail from "../../assets/images/category/normal-nail.svg";
import oil from "../../assets/images/category/oil.svg";
import pad from "../../assets/images/category/pad.svg";
import patch from "../../assets/images/category/patch.svg";
import peeling from "../../assets/images/category/peeling.svg";
import perfume from "../../assets/images/category/perfume.svg";
import remover from "../../assets/images/category/remover.svg";
import scalpEssence from "../../assets/images/category/scalp-essence.svg";
import scrub from "../../assets/images/category/scrub.svg";
import serum from "../../assets/images/category/serum.svg";
import shampoo from "../../assets/images/category/shampoo.svg";
import sheetPack from "../../assets/images/category/sheet-pack.svg";
import shower from "../../assets/images/category/shower.svg";
import skin from "../../assets/images/category/skin.svg";
import skinCareSet from "../../assets/images/category/skin-care-set.svg";
import solidPerfume from "../../assets/images/category/solid-perfume.svg";
import styling from "../../assets/images/category/styling.svg";
import sunCream from "../../assets/images/category/sun-cream.svg";
import sunCushion from "../../assets/images/category/sun-cushion.svg";
import sunPatch from "../../assets/images/category/sun-patch.svg";
import sunSpray from "../../assets/images/category/sun-spray.svg";
import sunStick from "../../assets/images/category/sun-stick.svg";
import toner from "../../assets/images/category/toner.svg";
import treatment from "../../assets/images/category/treatment.svg";
import water from "../../assets/images/category/water.svg";

// 대분류(categoryMain) 전체 목록 — /products API 문서 기준
export const CATEGORY_MAIN_LIST = [
  "스킨케어",
  "마스크팩",
  "클렌징",
  "선케어",
  "메이크업",
  "뷰티소품",
  "네일",
  "헤어케어",
  "바디케어",
  "향수",
];

// 소분류(categorySub) → 아이콘. 소분류는 대분류에 종속되지 않는다 (예: 오일은 스킨케어·클렌징·바디케어에 모두 쓰임)
const CATEGORY_ICON_MAP = {
  ETC: etc,
  // 스킨케어
  스킨: skin,
  토너: toner,
  에센스: essence,
  세럼: serum,
  앰플: ampoule,
  크림: cream,
  로션: lotion,
  미스트: mist,
  오일: oil,
  스킨케어세트: skinCareSet,
  // 마스크팩
  시트팩: sheetPack,
  패드: pad,
  페이셜팩: facialPack,
  패치: patch,
  // 클렌징
  클렌징폼: cleansingFoam,
  밤: balm,
  워터: water,
  필링: peeling,
  스크럽: scrub,
  리무버: remover,
  // 선케어
  선크림: sunCream,
  선스틱: sunStick,
  선쿠션: sunCushion,
  선스프레이: sunSpray,
  선패치: sunPatch,
  // 메이크업·뷰티소품·네일
  립메이크업: lipMakeup,
  베이스메이크업: baseMakeup,
  아이메이크업: eyeMakeup,
  "페이스 툴": faceTool,
  일반네일: normalNail,
  네일케어: nailCare,
  // 헤어케어
  샴푸: shampoo,
  트리트먼트: treatment,
  헤어팩: hairPack,
  두피에센스: scalpEssence,
  헤어에센스: hairEssence,
  염모제: hairDye,
  스타일링: styling,
  // 바디케어
  샤워: shower,
  바디로션: bodyLotion,
  바디크림: bodyCream,
  데오드란트: deodorant,
  핸드케어: handCare,
  풋케어: footCare,
  // 향수
  미니향수: miniPerfume,
  고체향수: solidPerfume,
  홈프래그런스: homeFragrance,
  향수: perfume,
};

export function getCategoryIcon(categorySub) {
  return CATEGORY_ICON_MAP[categorySub] ?? etc;
}

// API가 이미 한글 라벨을 그대로 내려주므로(categorySub === 라벨), 빈 값일 때만 대체 문구를 채운다.
export function getCategoryLabel(categorySub) {
  return categorySub || "미분류";
}
