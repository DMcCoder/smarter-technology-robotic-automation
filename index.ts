const BULKY_VOLUME_THRESHOLD = 1_000_000;
const BULKY_DIMENSION_THRESHOLD = 150;
const HEAVY_MASS_THRESHOLD = 20;

export type Stack = "STANDARD" | "SPECIAL" | "REJECTED";

export function sort(
  width: number,
  height: number,
  length: number,
  mass: number,
): Stack {
  const volume = width * height * length;
  const isBulky =
    volume >= BULKY_VOLUME_THRESHOLD ||
    width >= BULKY_DIMENSION_THRESHOLD ||
    height >= BULKY_DIMENSION_THRESHOLD ||
    length >= BULKY_DIMENSION_THRESHOLD;
  const isHeavy = mass >= HEAVY_MASS_THRESHOLD;

  if (isBulky && isHeavy) {
    return "REJECTED";
  }

  if (isBulky || isHeavy) {
    return "SPECIAL";
  }

  return "STANDARD";
}
