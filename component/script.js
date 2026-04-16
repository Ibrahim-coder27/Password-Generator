import {React,use,useState} from "react";
import ReactDOM from "react-dom/client"

function PasswordGenerator(){

    const [password,setPassword] = useState("ABCD");
    const [length,setLength] = useState(10);
    const [numberChecked,setNumberChanged] = useState(false);
    const [characterChecked,setCharacterChanged] = useState(false);
    return (
        <>
            <h1>Password is {password}</h1>
            <div>
                <input type="range" min={5} max={50} value={length} onChange={(e)=>{setLength(e.target.value)}}></input>
                <label>Length is {length}</label>

                <input type="checkbox" defaultChecked = {numberChecked}></input>
                <label>Number</label>

                <input type="checkbox" defaultChecked = {characterChecked}></input>
                <label>Character</label>
            </div>
        </>
    )
}


ReactDOM.createRoot(document.getElementById("root")).render(<PasswordGenerator/>);