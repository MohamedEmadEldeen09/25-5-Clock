import React, { Fragment , memo, useState  } from 'react'
import sound from "./alarm.mp3"

function Clock({breakL , sessionL ,incrementB:inB , decrementB:deB ,
    incrementS:inS ,decrementS:deS , reset , handlePlay , 
    play ,counter , sORb , alarmDom }) {
    let [dark , setDark] = useState(true)

    function changeTheme(){
        let r = document.querySelector(':root')
        if(dark){
            r.style.setProperty('--fc' , 'black')
            r.style.setProperty('--bgb' , '#ddd')
            r.style.setProperty('--bgc' , 'white')
            r.style.setProperty('--sFc' , 'black')
            setDark(false)
        }else{
            r.style.setProperty('--fc' , 'white')
            r.style.setProperty('--bgb' , 'rgba(49, 48, 15, 0.8)')
            r.style.setProperty('--bgc' , 'rgb(46, 49, 49)')
            r.style.setProperty('--sFc' , 'white')
            setDark(true)
        }
    }
   
    
  return (
     <Fragment>   
        <div className='dark'>
                <button id="btnDark" className="clickable" onClick={changeTheme}>
                    <span className="material-symbols-outlined"> bedtime</span>           
                </button>
            </div>        
        <div className="content">      
            <header className="header">
              <h1>25 + 5 Clock</h1>
            </header>

            <div className="actions">

                <div className="breakAction same">
                <label  id="break-label">Break Length</label>
                <div className="flex">
                <button id="break-increment" className="clickable" onClick={inB}>
                    <span className="material-symbols-outlined">arrow_upward</span></button>           
                    <h2 id="break-length">{breakL}</h2>
                    <button id="break-decrement" className="clickable" onClick={deB}>
                    <span className="material-symbols-outlined">arrow_downward</span></button>           
                </div>       
                </div>    

                <div className="sessionAction same">
                <label  id="session-label">Session Length</label>
                <div className="flex">
                    <button id="session-increment" className="clickable" onClick={inS}><span className="material-symbols-outlined">arrow_upward</span></button>           
                    <h2 id="session-length">{sessionL}</h2>
                    <button id="session-decrement" className="clickable" onClick={deS}><span className="material-symbols-outlined">arrow_downward</span></button>           
                </div>
                </div> 

            </div>

            <div className="session">
                <div className="box" id="timer-label">
                    <label ref={sORb}>Session</label>
                    <h1 id="time-left">{counter}</h1>
                </div>
            </div>

            <div className="pausePlayReset flex">
                <button id="start_stop" className="clickable" onClick={handlePlay}>
                  {!play &&<span className="material-symbols-outlined">play_arrow </span>}       
                  {play && <span className="material-symbols-outlined">pause</span>}
                </button>      
                <button id="reset" className="clickable" onClick={reset}>
                    <span className="material-symbols-outlined">restart_alt</span></button>                    
            </div>

            <footer className="footer">
            <p className="Author">designed and coded by</p>
            <a href="https://github.com/MohamedEmadEldeen09" target="_blank">
                <h3 className="signement">Mohamed emad</h3></a>
            </footer>
        </div>
       <audio id="beep" src={sound} ref={alarmDom}></audio>
  </Fragment>

  )
}

export default Clock