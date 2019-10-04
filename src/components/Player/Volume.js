import React, { Component } from 'react';
import IconSpeaker from '../../images/icon-speaker.svg';
import { StyledVolume, StyledIconButton, StyledVolumeBar } from './Volume.style';

class Volume extends Component {    
    handleVolume = event => {
        const rect = event.target.getBoundingClientRect();
        const volume_width = rect.width;
        const volume_x = event.clientX - rect.x;
        const volume = (volume_x/volume_width).toFixed(1);

        this.props.updateVolume(volume);
    }

    render() {
        return(
            <StyledVolume>
                <StyledIconButton icon={IconSpeaker} onClick={() => this.props.toggleMute()}/>
                <StyledVolumeBar vol={this.props.vol} onClick={e => this.handleVolume(e)} />
            </StyledVolume>
        )
    }
}

export default Volume;