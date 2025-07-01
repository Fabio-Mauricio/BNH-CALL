import React, { useState, useRef, useEffect, useContext, use } from "react";
import { IoPerson } from "react-icons/io5";
import { FaCircle, FaCirclePlus, FaPhone } from "react-icons/fa6";
import axios, { all } from "axios";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import VideoCallModal from "./VideoCallModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const socket = io("http://localhost:8081", {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000
});


const VideoCall = () => {
    const navigate = useNavigate()

    const {user} = useContext(AuthContext)

    const [roomId, setRoomId] = useState()
    const [friends, setFriends ] = useState([])
    const [isHidden, setIsHidden] = useState(true)
    const [searchedUsers, setSearchedUsers] = useState([])
    const [message, setMessage] = useState()
    const [notification, setNotification] = useState(false)

    const receiveVideo = useRef(null);
    const localStream = useRef(null);
    const myPeer = useRef(null);
    const videoDiv = useRef(null)
    const robotDiv = useRef(null)

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

    const handleClick = (roomId, userId, callerName) => {
        videoDiv.current.classList.remove('hidden')
        robotDiv.current.classList.add('hidden')

        socket.emit('privateMessage', {
            roomId: roomId,
            toUserId: userId,
            message: callerName + ' Está ligando...'
        })

         navigate(`?roomId=${roomId}`, { replace: false });

    }

    const addContact = (friendId) => {
        axios.post(`http://localhost:8081/addContact`, {
            userId: user.id,
            friendId: friendId
        })
    }

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
                            receiveVideo.current.play().catch(() => {}); 
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

    useEffect(() => {
    if (user?.id) {
        socket.emit('register', user.id);
    }
}, [user?.id])

useEffect(() => {
        const handleMessage = ({roomId, from, message}) => {
             setMessage(message);
             setNotification(true)
             setRoomId(roomId)
        }
        socket.on('messageReceived', handleMessage);
        return () => {
      socket.off('messageReceived', handleMessage);
    };
}, [])

        axios.get(`http://localhost:8081/getUserFriends/${user.id}`,)
        .then((response) => {
            setFriends(response.data)
        })
        .catch((error) => {
            console.log('Algo deu errado', error)
        })

        const handleChange = (e) => {
             const search = e.target.value
            axios.get(`http://localhost:8081/searchFriends/${search}`)
        .then((response) => {
            setSearchedUsers(response.data)
        }).catch((error) => {
            console.log(error)
        })
        }

      useEffect(() => {
  if (notification) {
    toast(
  <span>
    {message}.{' '}
    <button
      onClick={() => navigate(`?roomId=${roomId}`, { replace: false })}
      style={{ color: '#4fc3f7', textDecoration: 'underline' }}
      target="_blank"
      rel="noopener noreferrer"
    >
      Ver agora
    </button>
  </span>
);

    setNotification(false);
  }
}, [notification]);
    return (
        <>
        <div className={`w-lvw h-lvh flex  ${isHidden ? '' : 'hidden'} `} >
            <div className="h-full shadow-2xl md:px-20">
                <ul>
                    <div className="flex justify-center items-center text-2xl font-semibold gap-3">
                        <h1>CONTATOS</h1> 
                        <i className="cursor-pointer" onClick={() => setIsHidden(false)} ><FaCirclePlus  /></i>
                    </div>
                    {Array.isArray(friends) && friends.map((friendData) => {
                        return (
                        <div className="flex items-center justify-between text-sm mt-3" >
                       <div className="w-14 aspect-square overflow-hidden rounded-full">
                           <img
                            src={friendData.photo}
                            alt="pessoa"
                            className="w-full h-full rounded-full object-cover object-center"
                            />
                        </div>
                        <p>{friendData.name}</p>
                        <button onClick={() => handleClick(friendData.peerId, friendData.id, user.username)}>
                            <FaPhone />
                        </button>
                    </div>
                            )
                })}
                </ul>
            </div>
            <div className="w-full h-full flex items-center justify-center ">
                <div className="hidden w-11/12 bg-slate-950 rounded-lg" style={{height: '90%'}} ref={videoDiv} >
                    <video src="" className="rounded-lg w-full h-full" ref={receiveVideo} autoPlay ></video>
                </div>
                <div className="w-11/12 rounded-lg flex flex-col items-center justify-center text-1xl md:text-3xl font-semibold" style={{height: '90%'}} ref={robotDiv} >
                    <img src="images/robo.png" alt="Robo" className="w-3/4 md:w-1/3" />
                    Conecte-se à alguém 
                </div>
            </div>   
        </div>
        <VideoCallModal 
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        handleChange={handleChange}
        searchedUsers={searchedUsers}
        addContact={addContact}
        />
        </>
    )
}

export default VideoCall