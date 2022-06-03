import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Home } from './home/Home'
import { FourOhFour } from './FourOhFour'
import {SeverityPhotoPage} from "./home/SeverityPhotoPage"
import React from 'react'
import {SignUpModal} from "./SignUp/SignUpModal"


export const App = () => (
    <>
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Home/>}/>
                <Route path='/404' element={<FourOhFour/>}/>
                <Route path='/signup' element={<SignUpModal/>}/>
                <Route path='/severity-photo-page' element={<SeverityPhotoPage/>}/>


            </Routes>
        </BrowserRouter>
    </>
)