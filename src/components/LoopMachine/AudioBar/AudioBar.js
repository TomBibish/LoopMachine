import React, {useEffect, useRef, useState} from 'react'
import './AudioBar.css'
import {GoMute} from 'react-icons/go'
import {GoUnmute} from 'react-icons/go'
const AudioBar = props =>{
    const progressBar = useRef();
    // const audioPlayer = useRef();
    const animationRef = useRef()

    const [currentTime, SetCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [muteToggle, setMuteToggle] = useState(false)

    useEffect(()=>{
        setDuration(Math.floor(props.file.duration))
        progressBar.current.max = Math.floor(props.file.duration)
    }, [props.file?.current?.loadedMetadata, props.file?.current?.readyState ])

    useEffect(()=>{
        playing()
    }, [props.isPlay])

    const toggleMuteHandler = () => {
        setMuteToggle(!muteToggle)
        props.file.muted = !muteToggle
    }
    const changeRange = () => {
        props.file.currentTime = progressBar.current.value
        changePlayerCurrentTime()
    }
    const whilePlaying = () =>{
        progressBar.current.value = props.file.currentTime
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value * 100/props.file.duration}%`)
        SetCurrentTime(progressBar.current.value)
    }
    const playing = () => {
        if(props.isPlay){
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        else{
            cancelAnimationFrame(animationRef.current)
        }
    }


    return(
        <div className={'audio__bar__container'}>
            <label>{props.name} Sounds</label>
            <div className='bar__div'>
                <button className='mute__button' onClick={toggleMuteHandler}>
                    {muteToggle === false
                        ? <GoMute className='media__button__icon'/> :
                        <GoUnmute className='media__button__icon'/>
                    }
                </button>
                <li className='audio__bar' style={{background:props.color}}>
                    {/*<audio ref={audioPlayer} src={props.file.src} preload="metadata"/>*/}
                    <input type="range"
                           className='progress__bar'
                           min='0'
                           max={Math.floor(props.file.duration)||'17'}
                           ref={progressBar}
                           defaultValue='0'
                           onChange={changeRange}
                           disabled={true}

                    />
                </li>
            </div>
        </div>

    )
}
export default AudioBar