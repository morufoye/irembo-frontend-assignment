import React, {Fragment, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TokenInputer = (props) => {

    const[userInput, setUserInput] = useState({phoneNumber:props.phoneNumber, email:props.email, phoneOtp:"", emailOtp:""});
    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const navigate = useNavigate();
    const submitToken = () => {
      //  const url =  `http://localhost:8080/api/verifyOTP/${props.type}`;
      //  axios.post(url, userInput).then((response) => response.data
      //  ).then((data) => {
      //       props.handleTokenResponse("success")
      //  }).catch((error) => console.log(error.message));
        //navigate("/registration-success")
        props.handleTokenResponse("success")
    }
    let tokenData =
        [
            {name: "otp", label: "Token", placeholder: "Enter the token sent to you", id:"otp", type:"password", value: userInput.otp, tag:"input"},
        ]


    const handleChange=(e)=>{
        const name = e.target.name;
        setUserInput({...userInput,
            [name]: e.target.value
        });
    }

    return (
            <div className="max-w-md mx-auto">
            <div className="max-w-7xl mx-auto my-4">
                <h2 className="text-1l font-bold tracking-tight text-gray-900 sm:text-1">
                    <p>A token has been sent to your your email and phone number. It expires in 20 minutes</p>
                    <span className="block">Enter Token</span><br></br>
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
                    onClick={submitToken}
                >
                    Submit
                </button>
            </div>
            </div>

    )
}
export default TokenInputer;