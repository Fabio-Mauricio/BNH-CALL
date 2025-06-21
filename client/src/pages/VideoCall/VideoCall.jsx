import React, { useState, useRef, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:8081", {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000
});


const VideoCall = () => {
    const { roomId } = useParams();

    const receiveVideo = useRef(null);
    const localStream = useRef(null);
    const myPeer = useRef(null);

    const connectToUser = (userId, stream) => {
        const call = myPeer.current.call(userId, stream);
        call.on('stream', (userVideoStream) => {
            if (receiveVideo.current) {
                receiveVideo.current.srcObject = userVideoStream;
                receiveVideo.current.play();
            }
        });

        call.on('close', () => {
            if (receiveVideo.current) {
                receiveVideo.current.srcObject = null;
            }
        });
    };

    useEffect(() => {
        myPeer.current = new Peer();

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            localStream.current = stream;

            myPeer.current.on('call', (call) => {
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    if (receiveVideo.current) {
                        receiveVideo.current.srcObject = remoteStream;
                        receiveVideo.current.onloadedmetadata = () => {
                        if (receiveVideo.current) {
                            receiveVideo.current.play().catch(() => {}); // Silencia qualquer erro
                        }
                    };
                       
                    }
                });
            });

            myPeer.current.on('open', (id) => {
                socket.emit('join_room', roomId, id);
            });

            socket.on('user-connected', (userId) => {
                connectToUser(userId, stream);
            });
        });

        return () => {
            socket.disconnect();
            if (myPeer.current) myPeer.current.destroy();
        };
    }, [roomId]);

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
                <div className="w-11/12 bg-slate-950 rounded-lg" style={{height: '90%'}} >
                    <video src="" className="rounded-lg w-full h-full" ref={receiveVideo} autoPlay ></video>
                </div>
                <div className="hidden w-11/12 rounded-lg flex flex-col items-center justify-center text-1xl md:text-3xl font-semibold" style={{height: '90%'}} >
                    <img src="images/robo.png" alt="Robo" className="w-3/4 md:w-1/3" />
                    Conecte-se à alguém 
                </div>
            </div>
        </div>
    )
}

export default VideoCall