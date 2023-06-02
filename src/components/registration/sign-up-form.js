import React, {useEffect, useState} from 'react'
import axios from "axios";
import TokenInputer from "./token-inputer";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const initData = { userId:"", firstname:"", lastname:"", password:"", }
    const[userInput, setUserInput] = useState(initData);

    const base-url = "http://localhost:9090/user/"

    const [password, setPassword] = useState({password:"", confirmPassword:""})

    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const navigate = useNavigate();
    const[showTokenInputer, setShowTokenInputer] = useState(false);

    const formData =
        [
            {name: "userId", label: "Email", placeholder: "Enter email", type:"email", id:"email", value: userInput.email, tag:"input"},
            {name: "firstname", label: "Firstname", placeholder: "Firstname", type:"text", id:"firstname", value: userInput.firstname, tag:"input"},
            {name: "lastname", label: "Lastname", placeholder: "lastname", type:"text", id:"lastname", value: userInput.lastname, tag:"input"},
            {name: "password", label: "Password", placeholder: "Enter password", type:"password", id:"password", value: userInput.password, tag:"input"},
            {name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type:"password", id:"confirmPassword", value: userInput.confirmPassword, tag:"input"},
       ]

    const handleChange=(e)=>{
        const name = e.target.name;
        setUserInput({...userInput,
            [name]: e.target.value
        });

        if (name == "userId") {
         usernameAvailability(e.target.value)
        }

        if (name === "password" | name === "confirmPassword") {
          setPassword({...password, [name]: e.target.value});
         }
    }

    const handleSubmit = () => {
        const url =  base-url + "validate-password";
        axios.post(url, password).then((response) => response.data
        ).then((data) => {
            console.log(JSON.stringify(data));
            if (data === "valid") {
                submitInfo();
            }else {
              alert(data)
            }

        }).catch((error) => console.log(error.message));

    }

    const submitInfo = () => {
    let isUsernameAvailable = usernameAvailability(userInput.userId);
    if (isUsernameAvailable) {
     const url =  base-url +"signup";
                axios.post(url, userInput).then((response) => response.data
                ).then((data) => {
                sendLoginLink();
                }).catch((error) => console.log(error.message));
          }
     }

    const usernameAvailability = (userId) => {
                let result = false;
                const url =  base-url +"username-available/"+ userId;
                 axios.get(url).then((response) => response.data
                                    ).then((data) => {
                                    if (data) {
                                    alert("username is not available")
                                     }
                                    result = data;
                                }).catch((error) => console.log(error.message));
                                return result;
         }

    const sendLoginLink = () => {
                  const url =  "http://localhost:9090/message/login-link/"+ userInput.userId;
                    axios.get(url).then((response) => response.data
                    ).then((data) => {
                         navigate("/login")
                    }).catch((error) => console.log(error.message));
                }

    const handleTokenResponse = (response) => {
        console.log(JSON.stringify(response))
        //navigate("/registration-success")
        if ("success" === response) {
            navigate("/registration-success")
        }
    }

    return (
        <>
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
                                onBlur={(e) => handleChange(e)}
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
</>

    )
}
export default SignUp;
