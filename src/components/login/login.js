import React, { Fragment, useState, useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import AuthContext from "../context/auth-context";
import {useForm, Controller} from 'react-hook-form';
import axios from "axios";
import TokenInputer from "../registration/token-inputer";


export default function Login() {

    const {login, sendToken, isAuthenticated,  setIsAuthenticated, welcomeName, showTokenInputer, setShowTokenInputer} = useContext(AuthContext)
    const[username, setUsername] = useState();

    const initData = { username:"", password:""}
    const[userInput, setUserInput] = useState(initData);



     const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
     const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

      const handleChange=(e)=>{
             const name = e.target.name;
             setUserInput({...userInput,
                 [name]: e.target.value
             });
         }

    const formData =
            [
                {name: "userId", label: "Email", placeholder: "Enter email", type:"email", id:"email", value: userInput.email, tag:"input"},
                {name: "password", label: "Password", placeholder: "Enter password", type:"password", id:"password", value: userInput.password, tag:"input"},
           ]

     const navigate = useNavigate();
     const navigationElements = []
     const[navigation, setNavigation]=useState(navigationElements)

     const forgotPassword = (data) => {
        navigate('/forgot-password');
    }

    const handleSubmit = async (data) => {
        const res = await login({...userInput});
    };



    const handleTokenResponse = (response) => {
        if ("success" === response ) {
            navigationElements.splice(0, 1);
            setNavigation(navigationElements);
            setIsAuthenticated(true);
            setShowTokenInputer(false)
            navigate('/dashboard');
        }
    }

    return ( <>  {!showTokenInputer ?
                        <div className="max-w-md mx-auto">
                            <div className="max-w-7xl mx-auto my-4">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block">Log In</span>

                                </h2>
                            </div>

                            <div className="w-full max-w-md">
                                {formData.map(data =>
                                    <div key={data.name}>
                                        <label
                                            className={labelClass}
                                            htmlFor={data.id}
                                        >
                                            {data.label}<span className="text-red-600">*</span>
                                        </label>
                                        <data.tag
                                            name={data.name}
                                            onChange={(e) => handleChange(e)}
                                            className={inputClass}
                                            id={data.id}
                                            type={data.type}
                                            placeholder={data.placeholder}
                                            value={data.value}
                                        />

                                    </div>
                                )}
                                <br></br> <br></br>
                                 <div className="flex items-center justify-between">
                                <button
                                    className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                                <href className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={forgotPassword}>
                                  Forgot Password?
                                </href>
                                </div>
                            </div>
                        </div>
                        :
                        <TokenInputer username={userInput.userId}
                                      handleTokenResponse={handleTokenResponse} type="registration"/>
                    }
            </>
    )
}
