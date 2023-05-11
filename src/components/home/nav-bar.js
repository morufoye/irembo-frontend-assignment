import React, { Fragment, useState, useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import AuthContext from "../context/auth-context";
import {useForm, Controller} from 'react-hook-form';
import axios from "axios";
import TokenInputer from "../registration/token-inputer";




export default function NavBar(){
    const {login,  isAuthenticated,  setIsAuthenticated, welcomeName, verificationStatus} = useContext(AuthContext);
    const[showTokenInputer, setShowTokenInputer] = useState(false);
    const navigationElements = [{ name: 'Sign Up', path: 'sign-up' }, { name: 'Login', path: 'login' },];
    const[navigation, setNavigation]=useState(navigationElements);

    const[unverified, setUnverified] = useState(false);
    const[pending, setPending] = useState(false);
    const[verified, setVerified] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await login(
          {...data}
        );

        if (isAuthenticated) {
            closeModal();
            setShowTokenInputer(true)
        }
    };

    const forgotPassword = (data) => {
        closeModal();
        navigate('/forgot-password');
    }


    const handleTokenResponse = (response) => {
        if ("success" === response ) {
            setIsAuthenticated(true);
            setShowTokenInputer(false)
            navigate('/dashboard');
        }
    }

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const logOut = () => {
        setIsAuthenticated(false);
        navigationElements = [{ name: 'Sign Up', path: 'sign-up' }, { name: 'Login', path: 'login' },];
        setNavigation(navigationElements);
        navigate('/');
    }

      useEffect(() => {
            console.log(" verification status " + verificationStatus)
            if (verificationStatus == "UNVERIFIED") {
            setUnverified(true);
            setPending(false);
            setVerified(false);
            } else if (verificationStatus == "PENDING_VERIFICATION") {
            setPending(true);
            setVerified(false);
            setUnverified(false);
            }else if (verificationStatus == "VERIFIED") {
            setVerified(true);
            setUnverified(false);
            setPending(false);
            }
         }, []);

    return (
        <>
            <Popover>
                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                            <div className="flex items-center justify-between w-full md:w-auto">
                                <Link to="/">
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        alt=""
                                        className="h-8 w-auto sm:h-10"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    />
                                </Link>
                                <div className="-mr-2 flex items-center md:hidden">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                            {!isAuthenticated &&
                            navigation.map((item) => (
                                <Link className="font-medium text-gray-500 hover:text-gray-900" key={item.name} to={item.path}>
                                    {item.name}
                                </Link>
                            ))
                            }

                            {isAuthenticated &&
                            <>
                                <button className="font-large text-red-900 hover:text-Red-800"> Welcome    {welcomeName} </button>

                                {unverified && <button className="font-large text-red-900 hover:text-Red-800"> {verificationStatus} </button> }
                                {pending && <button className="font-large text-red-900 hover:text-Orange-800"> {verificationStatus} </button> }
                                {verified && <button className="font-large text-red-900 hover:text-Green-800"> {verificationStatus} </button> }

                                <button  type="button"  onClick={logOut} className="font-medium text-indigo-600 hover:text-indigo-500"> Log Out </button>


                            </>
                            }
                        </div>
                    </nav>
                </div>


                <Transition
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="px-5 pt-4 flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close main menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (

                                    <Link
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                        key={item.name}
                                        to={item.path}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>
    )
}