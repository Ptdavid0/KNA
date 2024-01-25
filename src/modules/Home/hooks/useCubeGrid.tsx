import { useCallback, useMemo, useState } from "react";
import useWindowSize from "./useWindowSize";

export const useCubeGrid = () => {
  const [width, height] = useWindowSize();
  const [randomActiveCubes, setRandomActiveCubes] = useState<number[]>([]);

  const numberOfCubes = useMemo(() => {
    const cubeSize = 20;
    const spaceBetween = 10;
    const totalSizePerCube = cubeSize + spaceBetween;
    const horizontalCubes = Math.floor(width / totalSizePerCube);
    const verticalCubes = Math.floor(height / totalSizePerCube);
    return horizontalCubes * verticalCubes;
  }, [width, height]);

  const generateRandomActiveCubes = useCallback(() => {
    const randomCubes: number[] = [];
    const numberOfRandomCubes = Math.floor(numberOfCubes / 10);
    while (randomCubes.length < numberOfRandomCubes) {
      const randomIndex = Math.floor(Math.random() * numberOfCubes);
      if (!randomCubes.includes(randomIndex)) {
        randomCubes.push(randomIndex);
      }
    }
    setRandomActiveCubes(randomCubes);
  }, [numberOfCubes]);

  return {
    numberOfCubes,
    randomActiveCubes,
    setRandomActiveCubes,
    generateRandomActiveCubes,
  };
};
