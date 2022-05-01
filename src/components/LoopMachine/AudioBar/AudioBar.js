import React, {useEffect, useRef, useState} from 'react'
import './AudioBar.css'
import {GoMute} from 'react-icons/go'
import {GoUnmute} from 'react-icons/go'
const AudioBar = props =>{
    const progressBar = useRef();
    const audioPlayer = useRef();
    const[currentTime, SetCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    useEffect(()=>{
        setDuration(audioPlayer.current.duration)
        progressBar.current.max = duration
    }, [audioPlayer?.current?.loadedMetadata, audioPlayer?.current?.readyState ])
    const [muteToggle, setMuteToggle] = useState(false)
    const toggleMuteHandler = () => {
        setMuteToggle(!muteToggle)
        props.file.muted = !muteToggle
    }
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        SetCurrentTime(progressBar.current.value)
    }


    return(
        <div className={'audio__bar__container'}>
            <label>{props.name} Sounds</label>
            <div className='bar__div'>
                <button className='mute__button' onClick={toggleMuteHandler}>
                    {muteToggle===false
                        ? <GoMute className='media__button__icon'/> :
                        <GoUnmute className='media__button__icon'/>
                    }
                </button>
                <li className='audio__bar' style={{background:props.color}}>

                    <audio ref={audioPlayer} src={props.file.src} preload="metadata"/>
                    <input type="range"
                           className='progress__bar'
                           min='0'
                           ref={progressBar}
                           defaultValue='0'
                           onChange={changeRange}
                    />
                </li>
            </div>
        </div>

    )
}
export default AudioBar