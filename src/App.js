import React from 'react';
import styled from 'styled-components';
import ReactPlayer from './components/Player/index';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
`;

const StyledWrapperContent = styled.div`
  display: block;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
`;


function App() {
  return (
    <StyledWrapper>
      <StyledWrapperContent>
        <ReactPlayer 
          src="https://rafaldepa.pl/sample/sample-bike.mp4"
          colorAccent="#e64343"
        />
      </StyledWrapperContent>      
    </StyledWrapper>
  );
}

export default App;
