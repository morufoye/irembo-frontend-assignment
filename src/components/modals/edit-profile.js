import {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Modal from "../UI/Modal";
import ChangePassword from "./change-password";
import AuthContext from "../context/auth-context";
import Countries from "../registration/countries";
import Card from "../UI/Card";
import loadingGif from '../UI/loadingGif.gif';

const EditProfile = (props) => {
    const {userInfo, countries, setUserInfo} = useContext(AuthContext)
    const[userDetails, setUserDetails] = useState(userInfo);
    let url = `http://localhost:9090/file/profile/`+ userDetails.userId;

    const maritalStatus = ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"];
    const gender = ["MALE", "FEMALE"];

    const [picture, setPicture] = useState();
    const [profilePixUrl, setProfilePixUrl] = useState(url);

    const  submitChanges = (event) => {
        event.preventDefault();
        submitUpdate();
        props.closeEditUserModal();
    }

     const submitUpdate = () => {
                const url =  `http://localhost:9090/user/edit-profile`;
                axios.post(url, userDetails).then((response) => response.data
                ).then((data) => {
                console.log(data)
                setUserInfo(data)
                }).catch((error) => console.log(error.message));
            }

    const labelClass= "block text-gray-700 text-sm font-bold mb-1 mt-2"
    const inputClass= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const handleChange=(e)=>{
         const name = e.target.name;
         setUserDetails({...userDetails, [name]: e.target.value });
    }

     const handleUpload = (event) => {
           let postUrl = `http://localhost:9090/file/profile-pix`;
            event.preventDefault();
            try {
                const formData = new FormData();
                formData.append("file", picture, userDetails.userId);
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                axios.post(postUrl, formData, { headers: {"content-type": 'multipart/form-data' }});
                setProfilePixUrl(loadingGif);
                 setTimeout(function() {
                   setProfilePixUrl(url)
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
        {name: "firstname", label: "First Name", id:"name", type:"text", value: userDetails.firstname, tag:"input"},
        {name: "lastname", label: "Last Name", id:"name", type:"text", value: userDetails.lastname, tag:"input"},
        {name: "age", label: "Age",  id:"age", type:"number", value: userDetails.age, tag:"input"},
        {name: "dateOfBirth", label: "Date of Birth",  type:"date", id:"dateOfBirth", value: userDetails.dateOfBirth, tag:"input"},
    ]

    return (

           <>
            <Card>
               <div className="max-w-md mx-auto">
               <div className="w-full max-w-md">

                <div>
                       <img src={profilePixUrl} style={pixLogo} alt="Please Upload Pix"/>
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

                    <label  className={labelClass}>User Id</label>
                    <input type="text" value={userInfo.userId}  className={inputClass} readOnly={true}/>

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

                     <label className={labelClass}>Gender</label>
                     <select className="form-select block w-full my-3 border border-gray-400 p-2" name="gender" onChange={(e)=>handleChange(e)}>
                        <option value={userDetails.gender}>{userDetails.gender}</option>
                       {gender.map((item)=><option value={item}>{item}</option>)}
                     </select>

                     <label className={labelClass}>Marital Status</label>
                     <select className="form-select block w-full my-3 border border-gray-400 p-2" name="maritalStatus" onChange={(e)=>handleChange(e)}>
                          <option value={userDetails.maritalStatus}>{userDetails.maritalStatus}</option>
                         {maritalStatus.map((item)=><option value={item}>{item}</option>)}
                     </select>

                     <label className={labelClass}>Nationality</label>
                     <select className="form-select block w-full my-3 border border-gray-400 p-2" name="nationality"  onChange={(e)=>handleChange(e)}>
                          <option value={userDetails.nationality}>{userDetails.nationality}</option>
                          {countries.map((item)=><option value={item}>{item}</option>)}
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

export default EditProfile;