import React, {useEffect, useRef, useState} from 'react'
import './AudioBar.css'
import {GoMute} from 'react-icons/go'
import {GoUnmute} from 'react-icons/go'
const AudioBar = props =>{
    const progressBar = useRef();
    // const audioPlayer = useRef();
    const animationRef = useRef()
    const [muteToggle, setMuteToggle] = useState(false)

    useEffect(()=>{
        progressBar.current.max = Math.floor(props.file.duration)
    }, [props.file?.current?.loadedMetadata, props.file?.current?.readyState ])

    // Side effect, start the movement of the bar (In case of playing)
    useEffect(()=>{
        playing()
    }, [props.isPlay])

    // Set Mute/unMute to the existing audio file
    const toggleMuteHandler = () => {
        setMuteToggle(!muteToggle)
        props.file.muted = !muteToggle
    }
    // Control the animation of the progress bar LIVE
    const whilePlaying = () =>{
        progressBar.current.value = props.file.currentTime
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value * 100/props.file.duration}%`)
        animationRef.current = requestAnimationFrame(whilePlaying)
    }
    // Start and stop the progress bar changing (by if the audio plays or not)
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
                        ? <GoUnmute className='media__button__icon'/>:
                          <GoMute className='media__button__icon'/>
                    }
                </button>
                <li className='audio__bar' style={{ background:props.color}}>
                    <input type="range"
                           className={props.cssClass}
                           min='0'
                           max={Math.floor(props.file.duration)||'17'}
                           ref={progressBar}
                           defaultValue='0'
                           disabled={true}
                    />
                </li>
            </div>
        </div>

    )
}
export default AudioBar