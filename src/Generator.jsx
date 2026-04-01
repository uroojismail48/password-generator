import React, { useRef} from 'react'
import {useState , useCallback  } from 'react'
import './App.css'
function Generator() {


  const [password, setPassword ]  = useState("")
  const [length, setLength]  = useState(9)
    const [charAllowed, setCharAllowed]  = useState(false)
     const [numAllowed, setNumAllowed]  = useState(false)

     const generatePassword = useCallback( () => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = ""

    if (numAllowed) 
       str  += "0123456789`"
    
    if (charAllowed) {
    str  += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    }
    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length)
      password += str[randomIndex]
    }
    setPassword(password)
     } , [ length, charAllowed, numAllowed, setPassword])

const passRef = useRef(null)
const clipboard = useCallback(() => {
window.navigator.clipboard.writeText(password)
}, [password])
  return (
    <div>
          <h1 className='head'>Password Generator</h1>
      <div className="container">  
    
            <p className='para' ref={passRef} >{password} </p>
      <input type="range" min="8" max="20" value={length} onChange={(e) => setLength(e.target.value)} />
      <span className='a'>{length}</span>
      <label>
        <input className='check' type="checkbox" defaultChecked={charAllowed} onChange={(e) => setCharAllowed(e.target.checked)} />
       <span> Characters</span>
      </label>
      <label>
        <input className='check' type="checkbox" defaultChecked={numAllowed} onChange={() => setNumAllowed((prev) => !prev)} />
     <span>  Numbers</span>
      </label>
      <button onClick={generatePassword}>Generate Password</button>
        <button onClick={clipboard} >Copy!</button>
    </div>
    </div>
  )
}

export default Generator;
