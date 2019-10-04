import React from 'react';
import styled from 'styled-components';
import ReactPlayer from './components/Player/index';

const StyledWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 50px;
  box-sizing: border-box;
`;

function App() {
  return (
    <StyledWrapper>
      <ReactPlayer />
    </StyledWrapper>
  );
}

export default App;
