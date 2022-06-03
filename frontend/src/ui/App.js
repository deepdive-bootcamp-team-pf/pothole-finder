import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Home } from './home/Home'
import { FourOhFour } from './FourOhFour'
import {SeverityPhotoPage} from "./home/SeverityPhotoPage"

import React from 'react'
import {SignUpPopup} from "./SignUp/SignUpPopup"


export const App = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/404' element={<FourOhFour/>}/>
                <Route path='/signup' element={<SignUpPopup/>}/>
                <Route path='/severity-photo-page' element={<SeverityPhotoPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
)