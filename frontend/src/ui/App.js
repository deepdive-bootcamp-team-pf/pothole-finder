import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Home } from './home/Home'
import { FourOhFour } from './FourOhFour'
import {SeverityPhotoPage} from "./SeverityPhotoPage"
import { Navigation } from "./Navigation"
import React from 'react'
import {SignUpModal} from "./SignUp/SignUpModal"

export const App = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route  path='/' element={<Home />} />
                <Route path='*' element={<FourOhFour />} />
                <Route exact path='/SeverityPhotoPage' component={<SeverityPhotoPage/>} />
                <Route path='/signup' element={<SignUpModal/>}/>
            </Routes>
        </BrowserRouter>
    </>
)