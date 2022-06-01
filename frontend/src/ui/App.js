import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {Home} from './Home'
import {FourOhFour} from './FourOhFour'
import React from 'react'

import {SignUpPopup} from "./SignUpPopup";

export const App = () => (
    <>
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route path='/' element={<Home/>}/>
                <Route path='/404' element={<FourOhFour/>}/>
                <Route path='/signup' element={<SignUpPopup/>}/>
=======
                <Route  path='/' element={<Home />} />
                <Route path='*' element={<FourOhFour />} />
                <Route exact path='/SeverityPhotoPage' component={SeverityPhotoPage}/>
>>>>>>> e7d5061de7da05c4af4153ead5511282a33727bb
            </Routes>
        </BrowserRouter>
    </>
)