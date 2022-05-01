import React from 'react'
import './ButtonGroup.css'
import {AiFillPlayCircle} from 'react-icons/ai'
import {BsStopCircleFill} from 'react-icons/bs'
import {ImLoop} from 'react-icons/im'
import {AiFillPauseCircle} from 'react-icons/ai'

const ButtonGroup = props =>{
    return(
        <div className='button__container'>
            <button className='media__button' onClick={props.onPlay}>
                {props.isPlay ?
                    <AiFillPauseCircle className='media__button__icon'/>: <AiFillPlayCircle className='media__button__icon'/>
                }
            </button>
            <button className='media__button'  onClick={props.onStop}>
                <BsStopCircleFill className='media__button__icon'/>
            </button>
            <button className={props.toggleLoop ? 'clicked__media__button': 'media__button'} onClick={props.onLoop}>
                <ImLoop className='media__button__icon'/>
            </button>
        </div>
    )
}
export default ButtonGroup