import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    /* line-height: 1.5; */
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .ant-modal-body {
    max-height: 68vh;
    overflow-x: hidden;
    overflow-y: auto;
  } 

  /* p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  } */
  /* 
  a {
    color: #000;
  } */

  /* .container {
    max-width: 1300px;
    margin: 0 auto;
  } */

  /* .ant-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media(max-width: 768px) {
    .container {
      max-width: 730px;
    }
  }

  @media(max-width: 576px) {
    .container {
      max-width: 560px;
    }
  } */
`;
