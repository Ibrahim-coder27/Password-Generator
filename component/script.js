import {React,useState,useEffect} from "react";
import ReactDOM from "react-dom/client"

function PasswordGenerator(){

    const [password,setPassword] = useState("ABCD");
    const [length,setLength] = useState(10);
    const [numberChecked,setNumberChanged] = useState(false);
    const [characterChecked,setCharacterChanged] = useState(false);

    function passGenerator(){
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(numberChecked){
            str+="0123456789";
        }
        if(characterChecked){
            str+="!@#$%^&*()~`";
        }
        let pass="";
        for (let index = 0; index < length; index++) {
            
            pass+= str[Math.floor(Math.random()*str.length)];
        }
        setPassword(pass);
    }
    useEffect(()=>{
        passGenerator();
    },[numberChecked,characterChecked,length])

    return (
        <>
            <h1>Password is {password}</h1>
            <div>
                <input type="range" min={5} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}}></input>
                <label>Length is {length}</label>

                <input type="checkbox" defaultChecked = {numberChecked} onClick={(e)=>{setNumberChanged(!numberChecked)}}></input>
                <label>Number</label>

                <input type="checkbox" defaultChecked = {characterChecked} onClick={(e)=>{setCharacterChanged(!characterChecked)}}></input>
                <label>Character</label>
            </div>
        </>
    )
}


ReactDOM.createRoot(document.getElementById("root")).render(<PasswordGenerator/>);