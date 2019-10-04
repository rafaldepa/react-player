import React, { Component } from 'react';
import { StyledTimeline, StyledBullet, StyledProgress } from './Timeline.style';

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
                <StyledProgress time={this.getProgress()} accent={this.props.accent} />
                {/* <StyledBullet time={this.getProgress()} /> */}
            </StyledTimeline>
        )
    }
}

export default Timeline;