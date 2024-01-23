import { createGlobalStyle } from "styled-components";
import { devices } from "../utils/styles";

export const GlobalStyle = createGlobalStyle`
:root {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

@media ${devices.mobileL} {
    html {
      font-size: 87.5%;
    }
  }

  @media ${devices.mobileM} {
    html {
      font-size: 85%;
    }
  }

  @media ${devices.mobileS} {
    html {
      font-size: 70%;
    }
  }

  @media (max-width: 270px) {
    html {
      font-size: 60%;
    }
  }

	body {
  	font-family: 'Nunito Sans';
  	margin: 0;
	}
`;
