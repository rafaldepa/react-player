import styled, { css } from 'styled-components';

export const StyledPlayer = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    background: ${props => props.background && props.background};
    overflow: hidden;
`;

export const StyledVideo = styled.video`
    display: block;
    width: 100%;
`;

export const StyledControls = styled.div`
    position: absolute;
    bottom: -44px;
    left: 0;
    display: block;
    width: 100%;    
    background: rgba(0, 0, 0, 0.85);
    z-index: 2;
    transform: translatey(${props => props.visible ? "-44px" : "0"});
    transition: .2s transform ease-in-out;
`;

export const StyledControlsContent = styled.div`
    display: flex;
    widht: 100%;
    justify-content: space-between;    
    align-items: center;
    flex-flow: row wrap;
    height: 44px;
    padding: 0 15px;
`;

export const StyledControlsGroup = styled.div`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
`;

export const StyledLoader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60px;
    width: 60px;
    margin-left: -30px;
    margin-top: -30px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-top-color: ${props => props.accent && props.accent};
    animation: spinner 600ms linear infinite;

    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const StyledIconButton = styled.button`
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(${props => props.icon && props.icon});
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    transition: .2s transform ease;
    border: 0;
    padding: 0;
    line-height: 0;
    font-size: 0;
    margin: 0 15px 0 0;
    cursor: pointer;

    :last-child { margin: 0; }
    :focus { outline: none }    
`;

export const StyledSkipper = styled.div`
    position: absolute;    
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    line-height: 0;
    color: #fff;
    background: rgba(0,0,0,0.85);
    
    width: 100px;
    height: 100px;

    ${props => props.side === 'left' && css`
        left: -100%;
        border-radius: 0 50% 50% 0;
    `}
    ${props => props.side === 'right' && css`
        right: -100%;
        border-radius: 50% 0 0 50%;
    `}
`

export const StyledTime = styled.div`
    display: inline-block;
    font-size: .9em;
    margin: 0 10px;
    color: #fff;
`;

export const StyledError = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    text-align: center;
    color: #fff;
    background: ${props => props.background && props.background };
    z-index: 2;
`