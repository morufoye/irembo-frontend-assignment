import {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Modal from "../UI/Modal";
import ChangePassword from "./change-password";
import AuthContext from "../context/auth-context";
import Countries from "../registration/countries";
import Card from "../UI/Card";
import loadingGif from '../UI/loadingGif.gif';

const AccountVerification = (props) => {
    const {userInfo} = useContext(AuthContext)
    const initData = {userId:userInfo.userId, idType:"", idNumber:""}
    const[idDetails, setIdDetails] = useState(initData);
    const idTypes = ["NATIONAL_IDENTITY_CARD", "INTERNATIONAL_PASSPORT"];
    const updateStatus = {userId:userInfo.userId, status:"PENDING_VERIFICATION"}

    let url = `http://localhost:9090/file/validation/`+ userInfo.userId;
    const [picture, setPicture] = useState();
    const [valUrl, setValUrl] = useState(url);

    const  submitChanges = (event) => {
        event.preventDefault();
        submitUpdate();
        props.closeVerificationModal();
    }

       const submitUpdate = () => {
                    const url =  `http://localhost:9090/user/verification`;
                    axios.post(url, idDetails).then((response) => response.data
                    ).then((data) => {
                    executeUpdate();
                    }).catch((error) => console.log(error.message));
                }

      const executeUpdate = () => {
                         const url =  `http://localhost:9090/user/update-status`;
                         axios.post(url, updateStatus).then((response) => response.data
                         ).then((data) => {

                         }).catch((error) => console.log(error.message));
                     }

     useEffect(() => {
       axios.get("http://localhost:9090/user/verification"+userInfo.userId).then((response) => response.data
                         ).then((data) => {
                         setIdDetails(data)
                        }).catch((error) => console.log(error.message));
             }, []);

    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const handleChange=(e)=>{
         const name = e.target.name;
         setIdDetails({...idDetails, [name]: e.target.value });
    }

     const handleUpload = (event) => {
            event.preventDefault();
             let postUrl = `http://localhost:9090/file/validation`;
            try {
                const formData = new FormData();
                formData.append("file", picture, userInfo.userId);
                const config = {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                };
                axios.post(postUrl, formData, config);
                setValUrl(loadingGif);
                 setTimeout(function() {
                    setValUrl(url)
                 }, 4000);
            } catch(error) {
                console.error(error);
            }
        };

          const pixLogo = {
                height: '36vmin',
                pointerEventsvents: 'none',
            }

            const handleFile = (event) => {
                    let pix = event.target.files[0];
                    setPicture(pix);
                };


    const formData = [
        {name: "idNumber", label: "Identity Number", id:"idNumber", type:"text", value: idDetails.idNumber, tag:"input"},
    ]

    return (
           <>
            <Card>
               <div className="max-w-md mx-auto">
               <div className="w-full max-w-md">

               <div>
                <img src={valUrl} style={pixLogo} alt="Please Upload Pix"/>
                  <form onSubmit={handleUpload}>
                  <input type="file" onChange={handleFile} required/>
                  <button type="submit">Upload</button>
                  </form>
               </div>

            <form className="bg-white shadow-md rounded p-1 my-1 mb-4">
                <div className="mb-4 px-4">
                    <div className="max-w-7xl mx-auto py-1 align-center">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block text-blue-600"> </span>
                        </h2>
                    </div>

                    {formData.map(data =>
                        <div key={data.name}>
                            <label className={labelClass}  htmlFor={data.id}>
                                {data.label}
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

                    <label className={labelClass}>Identity Type</label>
                                        <select className="form-select block w-full my-3 border border-gray-400 p-2" name="idType" onChange={(e)=>handleChange(e)}>
                                           <option value={idDetails.idType}>{idDetails.idTyper}</option>
                                           {idTypes.map((item)=><option value={item}>{item}</option>)}
                                        </select>

                    {
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={submitChanges}
                        >
                            Submit
                        </button>
                    }

                </div>
            </form>
               </div>
               </div>
           </Card>
            </>
    );
};

export default AccountVerification;