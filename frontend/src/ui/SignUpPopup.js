import {Popup} from "./Components/Popup"
import React from "react"
import {useState} from 'react'
import {SignUpForm} from "./SignUpForm";


export function SignUpPopup() {
    const [buttonPopup, setButtonPopup] = useState(false);
    return (
        <>
            <button onClick={() => setButtonPopup(true)}>Sign Up</button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h2>Sign Up</h2>
                <SignUpForm/>
            </Popup>
        </>
    )
}
