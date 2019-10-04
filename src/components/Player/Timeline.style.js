import styled from 'styled-components';

export const StyledTimeline = styled.div`
    flex: 0 0 100%;
    position: relative;
    display: block;
    width: 100%;
    height: 4px;
    background: #363636;
    cursor: pointer;
`;

export const StyledBullet = styled.div`
    position: absolute;
    top: -4px;
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    background: #73fcff;
    border-radius: 50%;
    cursor: pointer;
    transform: translatex(${props => props.time ? props.time+"%" : "-100%"});
    transition: 0.2s transform ease;
    opacity: 1;
`;

export const StyledProgress = styled.div.attrs(props => ({
    style: {
        transform: 'translatex('+props.time+'%)'
    },
}))`
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: -100%;
    background: ${props => props.accent && props.accent};
    
    transition: 0.1s transform ease;
    pointer-events: none;

    :hover ${StyledBullet} {
        opacity: 1;
    }
`;