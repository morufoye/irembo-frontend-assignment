import React, {Fragment, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import TokenInputer from "./token-inputer";
import PasswordResetForm from "./password-reset-form";

const ForgotPassword = (props) => {
    const[showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
    const[showTokenInputer, setShowTokenInputer] = useState(false);
    const[userInput, setUserInput] = useState({phoneNumber:props.phoneNumber, email:props.email, otp:""});
    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const navigate = useNavigate();

    const handleTokenResponse = (response) => {
        setShowPasswordChangeForm(true)
    }

    const getToken = () => {
        const url =  `http://localhost:9090/message/reset-link/` + userInput.userId;
        axios.get(url).then((response) => alert('Reset link has been sent to your email'))
    }
    const tokenData =
        [
            {name: "userId", label: "Enter the email associated with your account to reset your password ", placeholder: "Email", id:"otp", type:"text", value: userInput.username, tag:"input"},
        ]

    const handleChange=(e)=>{
        const name = e.target.name;
        setUserInput({...userInput,
            [name]: e.target.value
        });
    }

    return (
        <>
            {
                !showPasswordChangeForm &&
                <>
                    { !showTokenInputer ?
                        <div className="max-w-md mx-auto">
                            <div className="max-w-7xl mx-auto my-4">
                                <h2 className="text-1l font-bold tracking-tight text-gray-900 sm:text-1">
                                    <span className="block">Reset Password</span><br></br>
                                </h2>
                            </div>

                            <div className="w-full max-w-md">
                                {tokenData.map(data =>
                                    <div key={data.name}>
                                        <label
                                            className={labelClass}
                                            htmlFor={data.id}
                                        >
                                            {data.label}<span className="text-red-600">*</span>
                                        </label>
                                        <data.tag
                                            name={data.name}
                                            onChange={(e)=>handleChange(e)}
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
                                    onClick={getToken}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        :
                        <TokenInputer phoneNumber={userInput.phoneNumber} email={userInput.email} handleTokenResponse={handleTokenResponse}/>
                    }
                   }
                </>
            }
            {showPasswordChangeForm &&  <PasswordResetForm username={userInput.phoneNumber}/>
            }
        </>
    )
}
export default ForgotPassword;