import styled from "styled-components";

export const Container = styled.div<{
  backgroundColor: string;
}>`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  margin: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
