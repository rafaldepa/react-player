import React, { Component } from 'react';
import styled from 'styled-components';

import Timeline from './Timeline';

import IconPlay from '../../images/icon-play.svg';
import IconPause from '../../images/icon-pause.svg';
import IconFullscreen from '../../images/icon-fullscreen.svg';

import testvideo from '../../video/test-720.mp4';

const StyledPlayer = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    background: #323232;
    overflow: hidden;
`;

const StyledVideo = styled.video`
    display: block;
    width: 100%;
`;

const StyledControls = styled.div`
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

const StyledControlsContent = styled.div`
    display: flex;
    widht: 100%;
    justify-content: space-between;    
    align-items: center;
    flex-flow: row wrap;
    height: 44px;
    padding: 0 15px;
`;

const StyledControlsGroup = styled.div`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
`;

const StyledLoader = styled.div`
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
    border-top-color: #73fcff;
    animation: spinner 600ms linear infinite;

    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }
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

const StyledTime = styled.div`
    display: inline-block;
    margin: 0 10px;
    color: #fff;
`;

class ReactPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            loading: false,
            showControls: false,

            time: {
                current: 0,
                total: 100
            }
        }
    }

    componentDidMount = () => {
        setInterval(this.updateTime, 1);
    }

    toggleControls = () => {
        this.setState({ showControls: !this.state.showControls });
    }

    updateTime = () => {
        if(this.state.isPlaying) {
            this.setState({
                time: {
                    current: this.refs.video.currentTime,
                    total: this.refs.video.duration
                }
            })
        }        
    }

    playVideo = () => {
        this.refs.video.play();
        this.setState({ isPlaying: true });        
    }

    pauseVideo = () => {
        this.refs.video.pause();
        this.setState({ isPlaying: false });
    }

    formatTime = time => {
        console.log(time)
        const mins = String(Math.floor(time / 60)).padStart(2, "0");
        const secs = String(Math.floor(time & 60)).padStart(2, "0");
        
        return `${mins}:${secs}`;
    }

    render() {
        return(
            <StyledPlayer onMouseEnter={this.toggleControls} onMouseLeave={this.toggleControls}>
                <StyledVideo ref="video" src={testvideo}>Your browser does not support the video tag.</StyledVideo>
                {this.state.loading && <StyledLoader />}
                <StyledControls visible={this.state.showControls}>
                    <Timeline {...this.state.time} />
                    <StyledControlsContent>
                        <StyledControlsGroup>
                            <StyledIconButton icon={IconPlay} onClick={this.playVideo.bind(this)} />
                            <StyledIconButton icon={IconPause} onClick={this.pauseVideo.bind(this)} />
                            <StyledTime>{this.formatTime(this.state.time.current)} / {this.formatTime(this.state.time.total)}</StyledTime>
                        </StyledControlsGroup>
                        <StyledControlsGroup>
                            <StyledIconButton icon={IconFullscreen} onClick={this.fullscreenVideo} />
                        </StyledControlsGroup>
                    </StyledControlsContent>                 
                </StyledControls>
            </StyledPlayer>  
        )        
    }
}

export default ReactPlayer;