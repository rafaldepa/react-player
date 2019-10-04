import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTimeline = styled.div`
    flex: 0 0 100%;
    position: relative;
    display: block;
    width: 100%;
    height: 4px;
    background: #363636;
    cursor: pointer;
`;

const StyledBullet = styled.div`
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

const StyledProgress = styled.div.attrs(props => ({
    style: {
        transform: 'translatex('+props.time+'%)'
    },
}))`
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: -100%;
    background: #73fcff;
    
    transition: 0.1s transform ease;
    pointer-events: none;

    :hover ${StyledBullet} {
        opacity: 1;
    }
`;

class Timeline extends Component {    
    getProgress = () => {
        const { current, total } = this.props;
        const progress = ((current/total)*100).toFixed(1);

        return progress;
    }

    updateTime = event => {
        const rect = event.target.getBoundingClientRect();
        const bar_width = rect.width;
        const bar_x = event.clientX - rect.x;
        const percent = (bar_x*100)/bar_width;
        const { total } = this.props;
        const time = (percent*total)/100;

        this.props.updateTime(time);
    }

    render() {
        return(
            <StyledTimeline onClick={e => this.updateTime(e)}>
                <StyledProgress time={this.getProgress()} />
                {/* <StyledBullet time={this.getProgress()} /> */}
            </StyledTimeline>
        )
    }
}

export default Timeline;