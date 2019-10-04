import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Timeline from './Timeline';
import Volume from './Volume';

import IconPlay from '../../images/icon-play.svg';
import IconPause from '../../images/icon-pause.svg';
import IconFullscreen from '../../images/icon-fullscreen.svg';

import testvideo from '../../video/mov_bbb.mp4';

const StyledPlayer = styled.div`
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
    border-top-color: ${props => props.accent && props.accent};
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

const StyledSkipper = styled.div`
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

    ${props => props.side == 'left' && css`
        left: -100%;
        border-radius: 0 50% 50% 0;
    `}
    ${props => props.side == 'right' && css`
        right: -100%;
        border-radius: 50% 0 0 50%;
    `}
`

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
            source: props.src,
            theme: {
                accent: props.colorAccent ? props.colorAccent : '#73fcff',
                background: props.colorBackground ? props.colorBackground : '#030303'
            },

            isPlaying: false,
            isMuted: false,
            isFullscreen: false,
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
        const player = document.querySelector("#reactPlayer video");
        player.addEventListener('dblclick', this.fullscreenVideo);
        
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

    updateVolume = e => {
        this.refs.video.volume = e;
        this.setState({ volume: e });
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
        this.refs.video.volume = (this.state.isMuted === true) ? this.state.volume : 0;
        this.setState({ isMuted: !this.state.isMuted });
    }

    fullscreenVideo = () => {
        if(this.state.isFullscreen) {
            document.exitFullscreen();
        } else {
            const element = document.querySelector("#reactPlayer");
            element.webkitRequestFullScreen();
        }        
        this.setState({ isFullscreen: !this.state.isFullscreen });
    }

    formatTime = time => {
        const mins = String(Math.floor(time / 60)).padStart(2, "0");
        const secs = String(Math.floor(time % 60)).padStart(2, "0");
        
        return `${mins}:${secs}`;
    }

    skipVideo = event => {
        const rect = event.target.getBoundingClientRect();
        const element_width = rect.width;
        const element_x = event.clientX - rect.x;
        const time = this.state.time;

        console.log(rect)

        if(element_x < element_width/2) {
            this.setState({
                time: {
                    current: time.current-10
                }
            })
        } else {
            this.setState({
                time: {
                    current: time.current+10
                }
            })
        }
    }

    setTime = time => {
        this.refs.video.currentTime = time;
    }

    render() {
        return(
            <StyledPlayer id="reactPlayer" onMouseEnter={this.toggleControls} onMouseLeave={this.toggleControls} background={this.state.theme.background}>
                <StyledVideo ref="video" src={this.state.source} onContextMenu={e => e.preventDefault()} onDoubleClick={e => this.skipVideo(e)}>Your browser does not support the video tag.</StyledVideo>
                {this.state.loading && <StyledLoader accent={this.state.theme.accent} />}
                <StyledSkipper side="left">&laquo;</StyledSkipper>
                <StyledSkipper side="right">&raquo;</StyledSkipper>
                <StyledControls visible={(this.state.showControls && this.state.allowControls) ? true : false }>
                    <Timeline {...this.state.time} updateTime={time => this.setTime(time)} accent={this.state.theme.accent} />
                    <StyledControlsContent>
                        <StyledControlsGroup>
                            {this.state.isPlaying
                                ? <StyledIconButton icon={IconPause} onClick={this.pauseVideo.bind(this)} />
                                : <StyledIconButton icon={IconPlay} onClick={this.playVideo.bind(this)} />
                            }
                            <Volume vol={this.state.volume} toggleMute={this.muteVideo} updateVolume={e => this.updateVolume(e)} />
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