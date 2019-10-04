import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTimeline = styled.div`
    flex: 0 0 100%;
    position: relative;
    display: block;
    width: 100%;
    height: 4px;
    background: #363636;
    overflow: hidden;
`;

const StyledProgress = styled.div`
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: -100%;
    background: #73fcff;
    transform: translatex(${props => props.time ? props.time+"%" : "-100%"});
    transition: .1s transform ease-in-out;
`;

class Timeline extends Component {
    getProgress = () => {
        const { current, total } = this.props;
        const progress = Math.floor((current/total)*100);

        return progress;
    }

    render() {
        return(
            <StyledTimeline>
                <StyledProgress time={this.getProgress()} />
            </StyledTimeline>
        )
    }
}

export default Timeline;