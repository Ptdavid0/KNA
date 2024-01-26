import { useCallback, useEffect, useMemo, useState } from "react";

import Cube from "../Cube";
import { useCubeGrid } from "../../hooks/useCubeGrid";

import { Container } from "./styles";

const CubeGrid = () => {
  const [activeCubeIndex, setActiveCubeIndex] = useState(0);
  const [tailSize, setTailSize] = useState(6);
  const [canMove, setCanMove] = useState(true);

  const {
    numberOfCubes,
    randomActiveCubes,
    setRandomActiveCubes,
    generateRandomActiveCubes,
  } = useCubeGrid();

  // Not working properly, causing the update Random Active Cubes to be called twice
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.code);
      if (event.code === "Space") {
        setCanMove((prevCanMove) => !prevCanMove);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // calculates the color based on the percentage
  const getColor = (percentage: number) => {
    if (percentage >= 83.333) return "#f9ff00";
    if (percentage >= 66.666) return "#9b9f0a";
    if (percentage >= 50) return "#6e700e";
    if (percentage >= 33.333) return "#3f4014";
    if (percentage >= 16.666) return "#272717";
    return "#17171e";
  };

  // calculates the color of the cube based on its distance from the active cube - tail effect
  const calculateCubeColor = useCallback(
    (index: number) => {
      const distanceFromActive =
        (activeCubeIndex - index + numberOfCubes) % numberOfCubes;
      if (distanceFromActive > tailSize) {
        if (randomActiveCubes.includes(index)) return "#f9ff00";
        return "#17171e";
      }

      const percentage = 100 - (distanceFromActive / tailSize) * 100;
      return getColor(percentage);
    },
    [activeCubeIndex, numberOfCubes, tailSize, randomActiveCubes]
  );

  // resets the grid when the active cube reaches the end
  const resetGrid = useCallback(() => {
    setActiveCubeIndex(0);
    setTailSize(6);
    generateRandomActiveCubes();
  }, []);

  const updateRandomActiveCubes = (newIndex: number) => {
    setRandomActiveCubes((prevRandomActiveCubes) => {
      const index = prevRandomActiveCubes.indexOf(newIndex);
      if (index > -1) {
        const updatedRandomActiveCubes = [...prevRandomActiveCubes];
        updatedRandomActiveCubes.splice(index, 1);
        setTailSize((prevTailSize) => prevTailSize + 1);
        return updatedRandomActiveCubes;
      }
      return prevRandomActiveCubes;
    });
  };

  // updates the active cube
  const updateTailHead = useCallback(() => {
    if (!canMove) return;
    setActiveCubeIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % numberOfCubes;
      updateRandomActiveCubes(newIndex);
      if (newIndex === 0) resetGrid();
      return newIndex;
    });
  }, [numberOfCubes, canMove]);

  // sets the active cube
  useEffect(() => {
    const interval = setInterval(updateTailHead, 100);
    generateRandomActiveCubes();

    return () => clearInterval(interval);
  }, [updateTailHead]);

  // creates the cubes
  const cubes = useMemo(() => {
    return Array.from({ length: numberOfCubes }, (_, index) => (
      <Cube key={index} backgroundColor={calculateCubeColor(index)} />
    ));
  }, [calculateCubeColor, numberOfCubes, randomActiveCubes]);

  return <Container>{cubes}</Container>;
};

export default CubeGrid;

// A FAZER

// - [ ] Ao pressionar espaço, o cubo ativo deve mudar de direção
// - [ ] Os cubos aleatorios devem ter um efeito de fade in e fade out na cor
// - [ ] Melhorar as cores do tail
