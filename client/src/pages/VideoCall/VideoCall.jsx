import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";

const VideoCall = () => {


    return (
        <div className="w-lvw h-lvh flex" >
            <div className="h-full shadow-2xl md:px-20">
                <ul>
                    <div className="flex items-center gap-2 text-sm mt-3" >
                       <div className="w-14 aspect-square overflow-hidden rounded-full">
                           <img
                            src="images/pessoa.webp"
                            alt="pessoa"
                            className="w-full h-full rounded-full object-cover object-center"
                            />
                        </div>
                        <p>Snoop Dog</p>
                        <button>
                            <FaPhone />
                        </button>
                    </div>
                     <div className="flex items-center gap-2 text-sm mt-3" >
                       <div className="w-14 aspect-square overflow-hidden rounded-full">
                           <img
                            src="images/pessoa.webp"
                            alt="pessoa"
                            className="w-full h-full rounded-full object-cover object-center"
                            />
                        </div>
                        <p>Snoop Dog</p>
                        <button>
                            <FaPhone />
                        </button>
                    </div>
                </ul>
            </div>
            <div className="w-full h-full flex items-center justify-center ">
                <div className="w-11/12 bg-slate-950 rounded-lg hidden" style={{height: '90%'}} >
                    <video src="video-ex.mp4" className="rounded-lg w-full h-full" autoPlay muted ></video>
                </div>
                <div className="w-11/12 rounded-lg flex flex-col items-center justify-center text-1xl md:text-3xl font-semibold" style={{height: '90%'}} >
                    <img src="images/robo.png" alt="Robo" className="w-3/4 md:w-1/3" />
                    Conecte-se à alguém 
                </div>
            </div>
        </div>
    )
}

export default VideoCall