import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { Home } from './Home/Home'
import { FourOhFour } from './FourOhFour'
import {SeverityPhotoPage} from './Severity/SeverityPhotoPage'
import React from 'react'
import {SignUpModal} from './SignUp/SignUpModal'
import {Provider} from 'react-redux'

export const App = (store) => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='*' element={<FourOhFour/>}/>
                <Route path='/signup' element={<SignUpModal/>}/>
                <Route path='/severity-photo-page' element={<SeverityPhotoPage/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
)