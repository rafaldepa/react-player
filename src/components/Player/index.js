import React, { Component } from 'react';
import { 
    StyledPlayer, 
    StyledVideo, 
    StyledControls, 
    StyledControlsContent,
    StyledControlsGroup,
    StyledLoader,
    StyledIconButton,
    StyledSkipper,  
    StyledTime
} from './index.style';

import Timeline from './Timeline';
import Volume from './Volume';

import IconPlay from '../../images/icon-play.svg';
import IconPause from '../../images/icon-pause.svg';
import IconFullscreen from '../../images/icon-fullscreen.svg';

// import testvideo from '../../video/mov_bbb.mp4';

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
            volume: 0.75,
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
        player.volume = this.state.volume;
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