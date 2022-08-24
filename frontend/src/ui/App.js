import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Home } from "./Home/Home";
import { FourOhFour } from "./FourOhFour";
import { SignUpModal } from "./SignUp/SignUpModal";
import { PotholeSubmissionPage } from "./PotholeSubmission/PotholeSubmissionPage";

export const App = (store) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<FourOhFour />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route
          path="/pothole-submission-page"
          element={<PotholeSubmissionPage />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
