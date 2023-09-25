"use client";
import Image from "next/image";

export default function Wager() {
    return (
        <div>
            <div className="flex">
                <div className="flex flex-col items-start w-full">
                    <div className="flex gap-2 items-center">
                        <Image
                            src="https://static.www.nfl.com/t_q-best/league/api/clubs/logos/SF"
                            alt=""
                            width={100}
                            height={100}
                        />
                        <h2 className="mt-4 text-5xl font-extrabold text-gray-900 dark:text-gray-200">
                            49ers
                        </h2>
                    </div>
                    <div className="flex -space-x-4">
                        <Image
                            width={50}
                            height={50}
                            className="w-10 h-10 bg-gray-100 border-2 border-white rounded-full dark:border-gray-800"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80"
                            alt=""
                        />
                        <Image
                            width={50}
                            height={50}
                            className="w-10 h-10 bg-gray-100 border-2 border-white rounded-full dark:border-gray-800"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80"
                            alt=""
                        />
                        <Image
                            width={50}
                            height={50}
                            className="w-10 h-10 bg-gray-100 border-2 border-white rounded-full dark:border-gray-800"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80"
                            alt=""
                        />
                        <a
                            className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                            href="#"
                        >
                            +99
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-end w-full">
                    <div className="flex gap-2 items-center">
                        <Image
                            src="https://static.www.nfl.com/t_q-best/league/api/clubs/logos/SF"
                            alt=""
                            width={100}
                            height={100}
                        />
                        <h2 className="mt-4 text-5xl font-extrabold text-gray-900 dark:text-gray-200">
                            49ers
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
