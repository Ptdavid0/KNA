import { useCallback, useEffect, useMemo, useState } from "react";

import { Container } from "./styles";
import Cube from "../Cube";
import useWindowSize from "../../hooks/useWindowSize";

const CubeGrid = () => {
  const [activeCubeIndex, setActiveCubeIndex] = useState(0);
  const [width, height] = useWindowSize();
  const tailLength = 6;

  const numberOfCubes = useMemo(() => {
    const cubeSize = 20;
    const spaceBetween = 10;
    const totalSizePerCube = cubeSize + spaceBetween;
    const horizontalCubes = Math.floor(width / totalSizePerCube);
    const verticalCubes = Math.floor(height / totalSizePerCube);
    return horizontalCubes * verticalCubes;
  }, [width, height]);

  const calculateCubeColor = useCallback(
    (index: number) => {
      const distanceFromActive =
        (activeCubeIndex - index + numberOfCubes) % numberOfCubes;
      if (distanceFromActive > tailLength) return "#17171e";

      const percentage = 100 - (distanceFromActive / tailLength) * 100;
      if (percentage >= 83.333) return "#f9ff00";
      if (percentage >= 66.666) return "#9b9f0a";
      if (percentage >= 50) return "#6e700e";
      if (percentage >= 33.333) return "#3f4014";
      if (percentage >= 16.666) return "#272717";
      return "#17171e";
    },
    [activeCubeIndex, numberOfCubes, tailLength]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCubeIndex((prevIndex) => (prevIndex + 1) % numberOfCubes);
    }, 100);

    return () => clearInterval(interval);
  }, [numberOfCubes]);

  const cubes = useMemo(() => {
    return Array.from({ length: numberOfCubes }, (_, index) => (
      <Cube key={index} backgroundColor={calculateCubeColor(index)} />
    ));
  }, [calculateCubeColor, numberOfCubes]);

  return <Container className="container">{cubes}</Container>;
};

export default CubeGrid;
