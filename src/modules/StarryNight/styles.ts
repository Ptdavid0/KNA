import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
`;

export const Sky = styled.svg`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const ShootingStars = styled.div`
  margin: 0;
  padding: 0;
  width: 150vh;
  height: 100vw;
  position: fixed;
  overflow: hidden;
  transform: translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%))
    rotate(120deg);
`;

export const Wish = styled.div`
  height: 2px;
  top: 300px;
  width: 100px;
  margin: 0;
  opacity: 0;
  padding: 0;
  background-color: white;
  position: absolute;
  background: linear-gradient(-45deg, white, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 6px white);
  overflow: hidden;
`;
