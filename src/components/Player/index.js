import React, { Component } from 'react';
import styled from 'styled-components';

import Timeline from './Timeline';
import Volume from './Volume';

import IconPlay from '../../images/icon-play.svg';
import IconPause from '../../images/icon-pause.svg';
import IconFullscreen from '../../images/icon-fullscreen.svg';

import testvideo from '../../video/mov_bbb.mp4';

const StyledPlayer = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    position: relative;
    display: block;
    width: 100%;
    height: auto;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
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
    margin: 0 15px 0 0;
    cursor: pointer;

    :last-child { margin: 0; }
    :focus { outline: none }    
`;

const StyledTime = styled.div`
    display: inline-block;
    font-size: .9em;
    margin: 0 10px;
    color: #fff;
`;

class ReactPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            isMuted: false,
            volume: 0.5,
            loading: true,
            allowControls: false,
            showControls: false,

            time: {
                current: 0,
                total: 0
            }
        }
    }

    componentDidMount = () => {
        setInterval(this.analyzeVideo, 1);
        setInterval(this.updateTime, 1);
    }

    toggleControls = () => {
        this.setState({ showControls: !this.state.showControls });
    }

    analyzeVideo = () => {
        const video = this.refs.video;

        if(video.readyState === 4) {
            this.setState({ 
                loading: false,
                allowControls: true,
                time: {
                    current: this.refs.video.currentTime,
                    total: this.refs.video.duration
                }
            });            
        } else {
            this.setState({ loading: true });
        }
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
    
        // Pause at the end
        if(this.state.time.current === this.state.time.total) {
            this.setState({
                isPlaying: false
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

    muteVideo = () => {
        this.refs.video.volume = (this.state.isMuted === true) ? 0 : this.state.volume;
        this.setState({ isMuted: !this.state.isMuted });
    }

    formatTime = time => {
        const mins = String(Math.floor(time / 60)).padStart(2, "0");
        const secs = String(Math.floor(time % 60)).padStart(2, "0");
        
        return `${mins}:${secs}`;
    }

    setTime = time => {
        this.refs.video.currentTime = time;
    }

    render() {
        return(
            <StyledPlayer onMouseEnter={this.toggleControls} onMouseLeave={this.toggleControls}>
                <StyledVideo ref="video" src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4" onContextMenu={e => e.preventDefault()}>Your browser does not support the video tag.</StyledVideo>
                {this.state.loading && <StyledLoader />}
                <StyledControls visible={(this.state.showControls && this.state.allowControls) ? true : false }>
                    <Timeline {...this.state.time} updateTime={time => this.setTime(time)} />
                    <StyledControlsContent>
                        <StyledControlsGroup>
                            {this.state.isPlaying
                                ? <StyledIconButton icon={IconPause} onClick={this.pauseVideo.bind(this)} />
                                : <StyledIconButton icon={IconPlay} onClick={this.playVideo.bind(this)} />
                            }
                            <Volume vol={this.state.volume} onClick={() => this.muteVideo} />
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