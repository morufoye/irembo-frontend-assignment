import React, {useState} from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <div className="sm:py-0 md:py-20 ">
            <div className=" bg-white">


                <div className="max-w-7xl mx-auto">

                        <svg
                            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:justify-center">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block text-blue-900">Company Z</span>{' '}
                                    <span className="block text-blue-400">Online Services</span>
                                </h1>
                            </div>
                        </main>
                </div>
            </div>
        </div>
    )
}