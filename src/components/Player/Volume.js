import React, { Component } from 'react';
import styled from 'styled-components';
import IconSpeaker from '../../images/icon-speaker.svg';

const StyledVolume = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledIconButton = styled.button`
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
    margin: 0 10px 0 0;
    cursor: pointer;

    :last-child { margin: 0; }
    :focus { outline: none }    
`;

const StyledVolumeBar = styled.div`
    position: relative;
    display: block;
    width: 55px;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;

    ::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #fff;
        transform: translatex(${props => props.vol && props.vol*100}%);
    }
`;

class Volume extends Component {    
    render() {
        return(
            <StyledVolume>
                <StyledIconButton icon={IconSpeaker} />
                <StyledVolumeBar vol={this.props.vol} />
            </StyledVolume>
        )
    }
}

export default Volume;