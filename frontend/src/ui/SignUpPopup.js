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
                <h2 className={'p-3 text-center'}>Sign Up</h2>
                <p className={'m-0 p-0'}>Signing up is Free and easy.</p>
                <p className={'mt-0 mx-0 mb-5 p-0'}>Members can post potholes instantly!</p>
                <SignUpForm/>
            </Popup>
        </>
    )
}
