import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./Home"
import DataPage from "./DataPage"
import "./styles.css"

//import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from "./Navbar";
import {GoogleOAuthProvider} from "@react-oauth/google";
import GlobalData from "./GlobalData";
import AboutUs from "./AboutUs";


export default function App(){
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path ="/" element={<Home/>} />
                    <Route path ="/datapage" element={<DataPage/>} />
                    <Route path ="/globaldata" element={<GlobalData />} />
                    <Route path ="/aboutus" element={<AboutUs />} />
                </Routes>
            </div>
        </>

    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='6733536360-jll8113tcuuteeb48if2l4hhm50lbqkg.apps.googleusercontent.com'>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
