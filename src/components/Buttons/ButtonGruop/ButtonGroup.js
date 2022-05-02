import React from 'react'
import './ButtonGroup.css'
import {AiFillPlayCircle} from 'react-icons/ai'
import {BsStopCircleFill} from 'react-icons/bs'
import {ImLoop} from 'react-icons/im'
import {AiFillPauseCircle} from 'react-icons/ai'

// Control the 3 main buttons of the app.
const ButtonGroup = props =>{
    return(
        <div className='button__container'>
            {/*Play/Pause button*/}
            <button className='media__button' onClick={props.onPlay}>
                {props.isPlay ?
                    <AiFillPauseCircle className='media__button__icon'/>: <AiFillPlayCircle className='media__button__icon'/>
                }
            </button>
            {/*Stop, would take the audio file to the beginning */}
            <button className='media__button'  onClick={props.onStop}>
                <BsStopCircleFill className='media__button__icon'/>
            </button>
            {/*Toggle loop button. on every press it would change the loop element in all the audio files*/}
            <button className={props.toggleLoop ? 'clicked__media__button': 'media__button'} onClick={props.onLoop}>
                <ImLoop className='media__button__icon'/>
            </button>
        </div>
    )
}
export default ButtonGroup