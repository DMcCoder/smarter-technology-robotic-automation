const BULKY_VOLUME_THRESHOLD = 1_000_000;
const BULKY_DIMENSION_THRESHOLD = 150;
const HEAVY_MASS_THRESHOLD = 20;

export type Stack = "STANDARD" | "SPECIAL" | "REJECTED";

export type SortOptions = {
  debug?: boolean;
  logger?: (message: string) => void;
  now?: () => number;
};

export function sort(
  width: number,
  height: number,
  length: number,
  mass: number,
  options: SortOptions = {},
): Stack {
  const now = options.now ?? (() => performance.now());
  const logger = options.logger ?? console.log;
  const startTime = now();
  const volume = width * height * length;
  const isBulky =
    volume >= BULKY_VOLUME_THRESHOLD ||
    width >= BULKY_DIMENSION_THRESHOLD ||
    height >= BULKY_DIMENSION_THRESHOLD ||
    length >= BULKY_DIMENSION_THRESHOLD;
  const isHeavy = mass >= HEAVY_MASS_THRESHOLD;
  let stack: Stack;

  if (isBulky && isHeavy) {
    stack = "REJECTED";
  } else if (isBulky || isHeavy) {
    stack = "SPECIAL";
  } else {
    stack = "STANDARD";
  }

  if (options.debug) {
    const elapsedTime = now() - startTime;

    logger(
      `[sort] input width=${width} height=${height} length=${length} mass=${mass}`,
    );
    logger(
      `[sort] volume=${volume} bulky=${isBulky} heavy=${isHeavy} stack=${stack}`,
    );
    logger(`[sort] runtime_ms=${elapsedTime.toFixed(3)}`);
  }

  return stack;
}
