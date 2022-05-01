import React from 'react'
import AudioBar from "../AudioBar/AudioBar";
import './AudioBarList.css'
const AudioBarList = props =>{
    return(
        <ul className='audio__bars__container'>
        {props.allFiles.map((file) => (
                    <AudioBar
                        key={file.name}
                        name={file.name}
                        file={file.file}
                        color={file.color}
                    />
        ))}
    </ul>
    )
}
export default AudioBarList