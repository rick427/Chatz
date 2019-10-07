import React from 'react';
import closeIcon from '../../assets/closeIcon.png';
import onlineIcon from '../../assets/onlineIcon.png';
import './infoBar.css';

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="onlineImage"/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} alt="closeImage"/>
                </a>
            </div>
        </div>
    )
}

export default InfoBar
