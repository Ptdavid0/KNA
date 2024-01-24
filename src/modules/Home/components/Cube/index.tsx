import React from "react";

import { Container } from "./styles";

interface CubeProps {
  backgroundColor: string;
}

const Cube: React.FC<CubeProps> = ({ backgroundColor }) => {
  return <Container backgroundColor={backgroundColor} />;
};

export default Cube;
