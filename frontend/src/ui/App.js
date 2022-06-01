import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
<<<<<<< HEAD
import { Home } from './Home'
import { FourOhFour } from './FourOhFour'
import {SeverityPhotoPage} from "./SeverityPhotoPage"
import { Navigation } from "./Navigation"
import React from 'react'


=======
import {Home} from './Home'
import {FourOhFour} from './FourOhFour'
import React from 'react'

import {SignUpPopup} from "./SignUp/SignUpPopup";
>>>>>>> 9ef4d8caad31657079d052a5916640b3dc4ef3fb

export const App = () => (
    <>
        <BrowserRouter>
            <Navigation/>
            <Routes>
<<<<<<< HEAD
                <Route  path='/' element={<Home />} />
                <Route path='*' element={<FourOhFour />} />
                <Route exact path='/SeverityPhotoPage' component={<SeverityPhotoPage />} />

=======
                <Route path='/' element={<Home/>}/>
                <Route path='/404' element={<FourOhFour/>}/>
                <Route path='/signup' element={<SignUpPopup/>}/>
>>>>>>> 9ef4d8caad31657079d052a5916640b3dc4ef3fb
            </Routes>
            <Form/>
        </BrowserRouter>
    </>
)