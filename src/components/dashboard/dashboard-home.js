import React, {Fragment, useContext, useEffect, useState} from 'react'
import { CogIcon, AcademicCapIcon, MusicNoteIcon, DotsHorizontalIcon } from '@heroicons/react/solid'

import ChangePassword from "../modals/change-password";
import EditProfile from "../modals/edit-profile";
import AccountVerification from "../modals/account-verification";
import {useDashboard} from "./dashboard-context";
import AuthContext from "../context/auth-context";

export default function DashboardHome() {
  const [activeClass, setActiveClass]= useState(0);
  const {welcomehome} = useContext(AuthContext);

  const[editProfileModal, setEditProfileModal] = useState(false);
  const[verificationModal, setVerificationModal] = useState(false);

  const links = [
                 {name: "Edit Profile", icon: MusicNoteIcon },
                 {name: "Account verification", icon: MusicNoteIcon},
                ]

const buttonClass= `block w-full px-4 py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500`

const getActiveClass =(index)=>{
  return activeClass === index? buttonClass + " bg-gray-600": buttonClass
}

    return (
      <Fragment> {
    <div className="flex md:flex-row-reverse flex-wrap md:h-screen">

     { editProfileModal &&
            <div className="w-full md:w-4/5 bg-gray-100 sm:h-screen  md:mt-4">
                <div className=" p-3">
                    <EditProfile closeEditUserModal={() => setEditProfileModal(false)}/>
                </div>
            </div>
     }

     { verificationModal &&
                 <div className="w-full md:w-4/5 bg-gray-100 sm:h-screen  md:mt-4">
                     <div className=" p-3">
                         <AccountVerification closeVerificationModal={() => setVerificationModal(false)}/>
                     </div>
                 </div>
          }

        <div
            className="w-full md:w-1/5 bg-gray-900 md:bg-gray-900 px-2 text-center sm:bottom-0 md:pt-8 md:top-20 md:left-0 h-16 md:h-screen sm:fixed md:border-r-4 md:border-gray-600">
            <div className="md:relative mx-auto lg:px-6">
                <ul className="list-reset flex flex-row md:flex-col text-center md:text-left p-1">
                    {links.map((link, index) =>
                        <li className="mr-3 flex-1" key={index}>
                            <button
                                className={getActiveClass(index)}
                                 onClick={ () =>  {
                                      if (index === 0) {
                                      setEditProfileModal(true);
                                      setVerificationModal(false);
                                      }
                                      if (index === 1) {
                                      setVerificationModal(true);
                                       setEditProfileModal(false);
                                     }
                                   }
                                }
                            >
                                <link.icon className="h-5 w-5 md:hidden " aria-hidden="true"/>
                                <span
                                    className="hidden md:show pb-1 md:pb-0 text-lg md:text-base text-gray-600 md:text-white block md:inline-block">{link.name}</span>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </div>
      }

       </Fragment>
  )
}