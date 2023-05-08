import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PostTransaction = () => {
    const initData = {"amount":"", "transactionTime":""}
    const[userInput, setUserInput] = useState(initData);

    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const navigate = useNavigate();
    const[showTokenInputer, setShowTokenInputer] = useState(false);
    const formData =
        [
            {name: "amount", label: "Amount", placeholder: "Amount", id:"amount", type:"text", value: userInput.amount, tag:"input"},
            {name: "transactionTime", label: "Time", placeholder: "Time", id:"transactionTime", type:"text", value: userInput.transactionTime, tag:"input"},
        ]

    const handleChange=(e)=>{
        const name = e.target.name;
        setUserInput({...userInput,
            [name]: e.target.value
        });
    }

    const handleSubmit = () => {
        const url =  "http://localhost:8080/transactions";
        axios.post(url, userInput).then((response) => response.data
        ).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => console.log(error.message));

    }


    const handleShowTransactions = () => {
        const url =  "http://localhost:8080/statistics";
        axios.get(url).then((response) => response.data
        ).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => console.log(error.message));

    }

    const handleDeleteTransactions = () => {
        const url =  "http://localhost:8080/transactions";
        axios.delete(url).then((response) => response.data
        ).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => console.log(error.message));

    }



    return (

            <div className="max-w-md mx-auto">
                <div className="max-w-7xl mx-auto my-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Please provide the following transaction details</span>

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

                    <br></br> <br></br>

                    <button
                        className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleShowTransactions}
                    >
                        Get Transactions
                    </button>

                    <br></br> <br></br>

                    <button
                        className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleDeleteTransactions}
                    >
                     Delete transactions
                    </button>
                </div>
            </div>
    )
}
export default PostTransaction;