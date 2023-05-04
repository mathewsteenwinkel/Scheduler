import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace){
      setHistory(prev => [...prev.slice(0,prev.length-1), mode])
    } else {
    setHistory(prev =>[...prev, mode])
    }
  };

  function back (){
    if (history.length <= 1){
      return { mode: history[history.length -1], transition, back };
    } else {
    let element = history.pop()
    setHistory([...history])
  }
}

  return { mode: history[history.length -1], transition, back };
}
