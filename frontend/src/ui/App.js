import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Home } from './Home'
import { FourOhFour } from './FourOhFour'
import {SeverityPhotoPage} from "./SeverityPhotoPage"
import { Navigation } from "./Navigation"
import React from 'react'
import {SignUpPopup} from "./SignUp/SignUpPopup";

export const App = () => (
    <>
        <BrowserRouter>
            <Navigation/>
            <Routes>

                <Route exact path='/SeverityPhotoPage' component={<SeverityPhotoPage />} />
                <Route path='/' element={<Home/>}/>
                <Route path='/404' element={<FourOhFour/>}/>
                <Route path='/signup' element={<SignUpPopup/>}/>
            </Routes>
        </BrowserRouter>
    </>
)