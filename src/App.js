import React from 'react';
import styled from 'styled-components';
import ReactPlayer from './components/Player/index';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
`;

const StyledWrapperContent = styled.div`
  display: block;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
`;


function App() {
  return (
    <StyledWrapper>
      <StyledWrapperContent>
        <ReactPlayer 
          src="https://www.youtube.com/embed/3Ld-f3w23U4?controls=0"
          colorAccent="#0ecec9"
        />
      </StyledWrapperContent>      
    </StyledWrapper>
  );
}

export default App;
