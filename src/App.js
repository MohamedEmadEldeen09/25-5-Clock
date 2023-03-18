import {useEffect, useRef, useState} from 'react'
import Clock from './clock'

function App() {
  let [breakL , setBreakL] = useState(5)
  let [sessionL , setSessionL] = useState(25)
  let [play , setPlay] = useState(false)
  let cd = useRef(null)
  let sORb = useRef('Session')
  let [counter , setCounter] = useState("25:00")
  let [firstClick , setFirstClick] = useState(true)
  let alarmDom = useRef(null)



  useEffect(()=>{
    //For Alarm 
    if(counter.split(":")[0] == '00' && counter.split(":")[1] == '00'){     
      alarmDom.current.play()  
    } 

    //For Red Color
    if(Number(counter.split(":")[0]) < 1){
        let r = document.querySelector(':root')
        r.style.setProperty('--sFc' , 'red')      
    }
    else{
        let r = document.querySelector(':root')
        let rs = getComputedStyle(r)
        if( rs.getPropertyValue('--bgc') == 'white'){
          r.style.setProperty('--sFc' , 'black')
        }else{
          r.style.setProperty('--sFc' , 'white')
        }    
    }

},[counter])


  function incrementB(){
    if(breakL == 60 || play){
      return
    }   
    setBreakL(breakL+1)
    if(sORb.current.textContent == 'Break'){
      let arr = (breakL+1 + ":" + "00").split(":")
      setCounter((arr[0].length < 2 ? "0" : "") + arr[0] + ":" + arr[1])     
    }  
    setFirstClick(true) 
  }
  function decrementB(){
    if(breakL == 1 || play){
      return
    }  
    setBreakL(breakL - 1)
    if(sORb.current.textContent == 'Break'){
      let arr = (breakL-1 + ":" + "00").split(":")
      setCounter((arr[0].length < 2 ? "0" : "") + arr[0] + ":" + arr[1])        
    }   
    setFirstClick(true)  
  }
  function incrementS(){  
    if(sessionL == 60 || play){
      return
    }  
    setSessionL(sessionL + 1)     
    if(sORb.current.textContent == 'Session'){
      let arr = (sessionL+1 + ":" + "00").split(":")
      setCounter((arr[0].length < 2 ? "0" : "") + arr[0] + ":" + arr[1])       
    }    
    setFirstClick(true) 
  }
  function decrementS(){
    if(sessionL == 1 || play){
      return
    }   
    setSessionL(sessionL - 1)   
    if(sORb.current.textContent == 'Session'){
      let arr = (sessionL-1 + ":" + "00").split(":")
      setCounter((arr[0].length < 2 ? "0" : "") + arr[0] + ":" + arr[1])     
    }   
    setFirstClick(true)      
  }
  function reset(){
    clearInterval(cd.current)
    setBreakL(5)
    setSessionL(25)
    setCounter("25:00")
    sORb.current.textContent = "Session"   
    setPlay(false)
    alarmDom.current.pause()
    alarmDom.current.currentTime = 0
    alarmDom.current.pause() 
    setFirstClick(true) 
  }
 
  function handlePlay(){   
    let d = new Date()
    if(!play){   
      
        let a = counter.split(":") 
        cd.current =  setInterval(()=>{  

        if(firstClick){ 
          //Check To Switch the type
          if(d.getMinutes() == 0 && d.getSeconds() == 0){
            if(sORb.current.textContent == 'Session'){
              sORb.current.textContent = "Break"
            }
            else{
              sORb.current.textContent = "Session"
            }
          }

          //change counter
          d.setMinutes(Number(a[0]) , Number(a[1]) - 1)     
          let t = d.getMinutes() +":"+d.getSeconds()     
          let arr = t.split(":")
          arr = (arr[0].length < 2 ? "0" : "") + arr[0]+":" + (arr[1].length < 2 ? "0" : "")
          +arr[1]
          setCounter(arr)  
        
        //Change session to break or break to session    
        if(d.getMinutes() == 0 && d.getSeconds() == 0){  
            if(sORb.current.textContent == 'Session'){
              arr = ((breakL).toString().length < 2? "0" + breakL: breakL) +":"+'01'          
            }
            else{
              arr = ((sessionL).toString().length < 2? "0" + sessionL: sessionL) +":"+'01'            
            }          
        }  
        a = arr.split(":") 
      }
      else{
        setFirstClick(false)
      }

     },1000)   
    }
    else{      
      clearInterval(cd.current)
    }
    setPlay(!play) 
    setFirstClick(true) 
  }
  
  return (  
   <Clock breakL={breakL} sessionL={sessionL} 
    incrementB={incrementB} decrementB={decrementB} 
    incrementS={incrementS} decrementS={decrementS}
     reset={reset} play={play} handlePlay={handlePlay}
     counter={counter} sORb={sORb} alarmDom={alarmDom}
    />
  );
}

export default App;

