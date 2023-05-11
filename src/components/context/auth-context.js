import axios from "axios";
import React, { useState, useContext } from 'react'


const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {

    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[welcomeName, setWelcomeName] = useState('')
    const[userInfo, setUserInfo] = useState({});
    const[verificationStatus, setVerificationStatus] = useState();
    const[showTokenInputer, setShowTokenInputer] = useState(false)
     const countries = [
         "Afghanistan",
         "Albania",
         "Algeria",
         "Andorra",
         "Angola",
         "Antigua and Barbuda",
         "Argentina",
         "Armenia",
         "Austria",
         "Azerbaijan",
         "Bahrain",
         "Bangladesh",
         "Barbados",
         "Belarus",
         "Belgium",
         "Belize",
         "Benin",
         "Bhutan",
         "Bolivia",
         "Bosnia and Herzegovina",
         "Botswana",
         "Brazil",
         "Brunei",
         "Bulgaria",
         "Burkina Faso",
         "Burundi",
         "Cabo Verde",
         "Cambodia",
         "Cameroon",
         "Canada",
         "Central African Republic",
         "Chad",
         "Channel Islands",
         "Chile",
         "China",
         "Colombia",
         "Comoros",
         "Congo",
         "Costa Rica",
         "Côte d'Ivoire",
         "Croatia",
         "Cuba",
         "Cyprus",
         "Czech Republic",
         "Denmark",
         "Djibouti",
         "Dominica",
         "Dominican Republic",
         "DR Congo",
         "Ecuador",
         "Egypt",
         "El Salvador",
         "Equatorial Guinea",
         "Eritrea",
         "Estonia",
         "Eswatini",
         "Ethiopia",
         "Faeroe Islands",
         "Finland",
         "France",
         "French Guiana",
         "Gabon",
         "Gambia",
         "Georgia",
         "Germany",
         "Ghana",
         "Gibraltar",
         "Greece",
         "Grenada",
         "Guatemala",
         "Guinea",
         "Guinea-Bissau",
         "Guyana",
         "Haiti",
         "Holy See",
         "Honduras",
         "Hong Kong",
         "Hungary",
         "Iceland",
         "India",
         "Indonesia",
         "Iran",
         "Iraq",
         "Ireland",
         "Isle of Man",
         "Israel",
         "Italy",
         "Jamaica",
         "Japan",
         "Jordan",
         "Kazakhstan",
         "Kenya",
         "Kuwait",
         "Kyrgyzstan",
         "Laos",
         "Latvia",
         "Lebanon",
         "Lesotho",
         "Liberia",
         "Libya",
         "Liechtenstein",
         "Lithuania",
         "Luxembourg",
         "Macao",
         "Madagascar",
         "Malawi",
         "Malaysia",
         "Maldives",
         "Mali",
         "Malta",
         "Mauritania",
         "Mauritius",
         "Mayotte",
         "Mexico",
         "Moldova",
         "Monaco",
         "Mongolia",
         "Montenegro",
         "Morocco",
         "Mozambique",
         "Myanmar",
         "Namibia",
         "Nepal",
         "Netherlands",
         "Nicaragua",
         "Niger",
         "Nigeria",
         "North Korea",
         "North Macedonia",
         "Norway",
         "Oman",
         "Pakistan",
         "Panama",
         "Paraguay",
         "Peru",
         "Philippines",
         "Poland",
         "Portugal",
         "Qatar",
         "Réunion",
         "Romania",
         "Russia",
         "Rwanda",
         "Saint Helena",
         "Saint Kitts and Nevis",
         "Saint Lucia",
         "Saint Vincent and the Grenadines",
         "San Marino",
         "Sao Tome & Principe",
         "Saudi Arabia",
         "Senegal",
         "Serbia",
         "Seychelles",
         "Sierra Leone",
         "Singapore",
         "Slovakia",
         "Slovenia",
         "Somalia",
         "South Africa",
         "South Korea",
         "South Sudan",
         "Spain",
         "Sri Lanka",
         "State of Palestine",
         "Sudan",
         "Suriname",
         "Sweden",
         "Switzerland",
         "Syria",
         "Taiwan",
         "Tajikistan",
         "Tanzania",
         "Thailand",
         "The Bahamas",
         "Timor-Leste",
         "Togo",
         "Trinidad and Tobago",
         "Tunisia",
         "Turkey",
         "Turkmenistan",
         "Uganda",
         "Ukraine",
         "United Arab Emirates",
         "United Kingdom",
         "United States",
         "Uruguay",
         "Uzbekistan",
         "Venezuela",
         "Vietnam",
         "Western Sahara",
         "Yemen",
         "Zambia",
         "Zimbabwe"
      ]

    const login = (input) => {
        try {
            const url =  "http://localhost:9090/login/one"
            axios.post(url, input).then((response) => response.data
            ).then((data) => {
            sendToken(input);
            }).catch((error) => console.log(error.message));
        } catch(error) {
            console.error(error);
        }
    };

     const sendToken = (data) => {
            try {
                axios.get('http://localhost:9090/message/token/'+ data.userId).then((response) => response.data
                ).then((data) => {
                setShowTokenInputer(true);
                }).catch((error) => console.log(error.message));
            } catch(error) {
                console.error(error);
            }
        };

    const contextValue = {
        login,
        sendToken,
        userInfo,
        setUserInfo,
        isAuthenticated,
        setIsAuthenticated,
        welcomeName,
        userInfo,
        countries,
        verificationStatus,
        setVerificationStatus,
        showTokenInputer,
        setShowTokenInputer
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;