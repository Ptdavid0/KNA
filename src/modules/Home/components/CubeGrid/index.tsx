import { useCallback, useEffect, useMemo, useState } from "react";

import Cube from "../Cube";
import { useCubeGrid } from "../../hooks/useCubeGrid";

import { Container } from "./styles";

const CubeGrid = () => {
  const [cubesWithTails, setCubesWithTails] = useState([]);
  const numberOfTailedCubes = 10;

  const {
    numberOfCubes,
    randomActiveCubes,
    generateRandomActiveCubes,
    numberOfCubesPerRow,
  } = useCubeGrid();

  useEffect(() => {
    generateRandomActiveCubes();
    const initialCubesWithTails = Array.from(
      { length: numberOfTailedCubes },
      () => {
        return {
          index: Math.floor(Math.random() * numberOfCubes),
          tail: [
            /* array of tail segment indices */
          ],
        };
      }
    );
    setCubesWithTails(initialCubesWithTails as any);
  }, [numberOfCubes]);

  const updateCubesWithTails = useCallback(() => {
    setCubesWithTails((prevCubesWithTails: any) =>
      prevCubesWithTails.map((cube: any, index: number) => {
        let direction = index % 2 ? -1 : 1;

        let newIndex = (cube.index + direction) % numberOfCubes;

        if (newIndex % numberOfCubesPerRow === 0) {
          newIndex = Math.floor(Math.random() * numberOfCubes);
        }

        // Create a new tail that includes the old head
        let newTail = [cube.index, ...cube.tail];

        // If you want a tail of length 6:
        newTail = newTail.slice(0, 6);

        return {
          ...cube,
          index: newIndex,
          tail: newTail,
        };
      })
    );
  }, [numberOfCubes, numberOfCubesPerRow]);

  // calculates the color based on the percentage
  const getColor = (percentage: number) => {
    if (percentage >= 83.333) return "#17171e";
    if (percentage >= 66.666) return "#272717";
    if (percentage >= 50) return "#3f4014";
    if (percentage >= 33.333) return "#6e700e";
    if (percentage >= 16.666) return "#9b9f0a";
    if (percentage >= 0) return "#f9ff00";
    return "#17171e";
  };

  const calculateCubeColor = useCallback(
    (index: number) => {
      // Check if index is part of any tail
      for (let cube of cubesWithTails as any) {
        if (cube.index === index) {
          // Head of the tail
          return "#f9ff00";
        } else if (cube.tail.includes(index)) {
          // Part of the tail
          const positionInTail = cube.tail.indexOf(index);
          const percentage = (positionInTail / cube.tail.length) * 100;
          return getColor(percentage);
        }
      }
      // Check if index is part of any random active cube
      if (randomActiveCubes.includes(index)) return "#f9ff00";

      // Default color for cubes not in any tail
      return "#17171e";
    },
    [cubesWithTails, randomActiveCubes, getColor]
  );

  // sets the active cube
  useEffect(() => {
    const interval = setInterval(() => {
      updateCubesWithTails();
    }, 100);

    return () => clearInterval(interval);
  }, [updateCubesWithTails]);

  // creates the cubes
  const cubes = useMemo(() => {
    return Array.from({ length: numberOfCubes }, (_, index) => (
      <Cube key={index} backgroundColor={calculateCubeColor(index)} />
    ));
  }, [calculateCubeColor, numberOfCubes]);

  return <Container>{cubes}</Container>;
};

export default CubeGrid;

// - [ ] Os cubos aleatorios devem ter um efeito de fade in e fade out na cor
