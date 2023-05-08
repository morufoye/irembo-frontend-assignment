import React, {useEffect, useState} from 'react'
import axios from "axios";
import TokenInputer from "./token-inputer";
import {useNavigate} from "react-router-dom";

const ConsumerRegistration = () => {
    const initData = {"firstname":"", "lastname":"", "email":"", "phoneNumber": "", otp:"", password:"", confirmPassword:"", expiry:"", username:"", referalCode:""}
    const[userInput, setUserInput] = useState(initData);

    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const navigate = useNavigate();
    const[showTokenInputer, setShowTokenInputer] = useState(false);
    const formData =
        [
            {name: "firstname", label: "First name", placeholder: "Enter firstname", id:"firstname", type:"text", value: userInput.firstname, tag:"input"},
            {name: "lastname", label: "Last name", placeholder: "Enter lastname", id:"lastname", type:"text", value: userInput.lastname, tag:"input"},
            {name: "phoneNumber", label: "Phone number", placeholder: "Enter mobile number", id:"phoneNumber", type:"text", value: userInput.phoneNumber, tag:"input"},
            {name: "email", label: "Email", placeholder: "Enter email", type:"email", id:"email", value: userInput.email, tag:"input"},
            {name: "password", label: "Password", placeholder: "Enter password", type:"password", id:"password", value: userInput.password, tag:"input"},
            {name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type:"password", id:"confirmPassword", value: userInput.confirmPassword, tag:"input"},
            {name: "referalCode", label: "Referal Code", placeholder: "Enter Referal Code", type:"referalCode", id:"referalCode", value: userInput.referalCode, tag:"input"},
        ]

    const handleChange=(e)=>{
        const name = e.target.name;
        setUserInput({...userInput,
            [name]: e.target.value
        });
    }

    const handleSubmit = () => {
        const url =  "http://localhost:8080/api/registerUser";
        axios.post(url, userInput).then((response) => response.data
        ).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => console.log(error.message));
        setShowTokenInputer(true)
    }

    const handleTokenResponse = (response) => {
        console.log(JSON.stringify(response))
        //navigate("/registration-success")
        if ("success" === response.tokenResponse) {
            navigate("/registration-success")
        }
    }

    return (
        <>  {!showTokenInputer ?
            <div className="max-w-md mx-auto">
                <div className="max-w-7xl mx-auto my-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Please provide the following information</span>

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
                    <button
                        className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            :
            <TokenInputer phoneNumber={userInput.phoneNumber} email={userInput.email}
                          handleTokenResponse={handleTokenResponse} type="registration"/>
        }
</>

    )
}
export default ConsumerRegistration;