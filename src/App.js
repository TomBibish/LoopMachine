import React, {useEffect, useState} from 'react'
// Import all the necessary components to the App.js file.
import Header from "./components/Header/Header";
import AudioBar from "./components/LoopMachine/AudioBar/AudioBar";
import AudioBarList from "./components/LoopMachine/AudioBarList/AudioBarList";
import ButtonGroup from "./components/Buttons/ButtonGruop/ButtonGroup";

// Import all the mp3.files from the assets directory.
import ALL_TRACK from '../src/assets/mp3_files/ALL TRACK.mp3'
import TAMBOURINE_SHAKE from '../src/assets/mp3_files/_tambourine_shake_higher.mp3'
import B_VOC from '../src/assets/mp3_files/B VOC.mp3'
import DRUMS from '../src/assets/mp3_files/DRUMS.mp3'
import HE_HE from '../src/assets/mp3_files/HE HE VOC.mp3'
import HIGH_VOC from '../src/assets/mp3_files/HIGH VOC.mp3'
import JIBRISH from '../src/assets/mp3_files/JIBRISH.mp3'
import LEAD from '../src/assets/mp3_files/LEAD 1.mp3'
import UUHO from '../src/assets/mp3_files/UUHO VOC.mp3'



//Save all the mp3.files as Audio elements.
const allTrack = new Audio(ALL_TRACK)
const tamburineShake = new Audio(TAMBOURINE_SHAKE)
const bVoc = new Audio(B_VOC)
const drums = new Audio(DRUMS)
const heHE = new Audio(HE_HE)
const jibrish = new Audio(JIBRISH)
const lead = new Audio(LEAD)
const uuHO = new Audio(UUHO)
const highVoc = new Audio(HIGH_VOC)


// audioFiles - Arrange all the audio files in list of objects, would let me easier mapping.
const audioFiles = [{name:'All Track', file: allTrack, color:'rgba(16,31,77,0.92)', cssCLass:'progress__bar__main'},
                    {name:'Tamburine Shake', file: tamburineShake, color:'rgba(28,60,154,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'B Voc', file: bVoc, color:'rgba(40,85,215,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'Drums', file: drums, color:'rgba(67,114,246,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'HeHE', file: heHE, color:'rgba(127,153,231,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'Jibrish', file: jibrish, color:'rgba(190,202,238,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'Lead', file: lead, color:'rgba(222,228,245,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'UuHo', file: uuHO, color:'rgba(232,234,241,0.92)', cssCLass:'progress__bar__sub'},
                    {name:'high Voc', file: highVoc, color:'rgba(238,238,243,0.92)', cssCLass:'progress__bar__sub'}]

function App() {
    const [counter, setCounter] = useState(0)
    const [isPlay, setIsPlay] = useState(false)
    const [toggleLoop, setToggleLoop] = useState(false)
    // Function that check if the fsong is ready and add 1 to the counter
    const changeCounterHandler = (event) => {
        setCounter((prevCounter) => prevCounter + 1)
        event.path[0].removeEventListener('canplaythrough', changeCounterHandler)
    }

    // Effect only when load the page for the very first time,
    // load all the files and check if they properly loaded with event listener that check if the audio loaded 100%
    useEffect(()=>{
        audioFiles.map(file => {
        file.file.load()
        file.file.addEventListener('canplaythrough', changeCounterHandler)
        })
    },[])

    // Loop toggle handler - change the loop boolean element, and apply the new element to the audio files.
    const toggleLoopHandler = () =>{
        setToggleLoop(!toggleLoop)
        audioFiles.map(file =>
            file.file.loop = !toggleLoop
        )
    }
    // Play Handler -  Play all the unMute audio files from the beginning
    const playALLHandler = () =>{
        setIsPlay(!isPlay)
        if(!isPlay === true && (counter === 9)) {
            audioFiles.map(file =>
                file.file.play())
        }
        else{
           audioFiles.map(file => {
                   file.file.pause()
               }
           )

        }
    }
    // Stop Handler -  Stop all the Files and send them back to the beginning
    const stopALLHandler = () =>{
        setIsPlay(false)
        audioFiles.map(file => {
            file.file.pause()
            file.file.currentTime = 0
        })
    }
  return (
    <>
      <Header/>
      <AudioBarList
          allFiles={audioFiles}
          isPlay={isPlay}
      />
      <ButtonGroup
          onStop={stopALLHandler}
          onPlay={playALLHandler}
          toggleLoop={toggleLoop}
          onLoop={toggleLoopHandler}
          isPlay={isPlay}
      />
    </>
  );
}

export default App;
