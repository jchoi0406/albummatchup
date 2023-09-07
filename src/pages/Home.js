import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../components/auth";
import {FaGithub, FaLinkedin} from "react-icons/fa";
export default function Home(props){
    const navigate = useNavigate();
    const titleDimension = props.isPhone ? "text-[2em]": "text-[4em]";
    return (
        <div>
            asd
            <div className="flex flex-col justify-between min-h-screen text-center items-center p-[18vh]">
                <div className="">
                    <h1 className={`${titleDimension} font-semibold mb-4 border-4 border-black p-2`}>ALBUMMATCHUP</h1>
                    
                </div>
                <div className="flex flex-col items-center ">
                    <h2 className="text-3xl font-semibold mb-2">
                            Guess which album has a higher rating on <a className="underline" href="https://rateyourmusic.com/" target="_blank" rel="noopener noreferrer">rateyourmusic.com</a>
                    </h2>
                    <hr/>
                    <h3 className="mb-2">
                        A game of higher or lower using rateyourmusic album ranks. Album rating data from October 2021.
                    </h3>
                    <button className="text-lg mb-5" onClick={()=>{navigate("/albummatchup/play")}}>
                        Play
                    </button>
                </div>
                
                <div className="flex flex-row justify-center mb-10">
                    <hr color="black" width="50%"></hr>
                    <a href="https://github.com/jchoi0406">
                        <FaGithub size="1.5em"/>
                    </a>
                    <a href="https://www.linkedin.com/in/jiyong-choi-740a68235/">
                        <FaLinkedin size="1.5em"/>
                    </a>
                </div>

            </div>
        </div>
        
    )
}