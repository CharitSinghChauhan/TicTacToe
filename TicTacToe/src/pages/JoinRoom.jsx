import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getSocket } from "../socket";
import { motion } from "motion/react";

let socket;

export default function JoinRoom() {

    const [roomName, setRoom] = useState("")
    const [roomStatus, setRoomStatus] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        socket = getSocket();

        socket.on("roomStatus", (data) => {
            if (data === "Rooms Joined Successfully") {
                navigate('/game')
            }else{
                setRoomStatus(data)
            }
        })

        return () => {
            socket.off("joined-or-not");
        }
    }, [navigate])

    const handleJoinRoom = () => {
        socket.emit("join-room", roomName)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-10 mb-20">
            <label className="w-full grow md:text-2xl text-emerald-900 flex justify-center items-center font-bold font-sans">{roomStatus}</label>
            <label className="w-full grow md:text-2xl text-emerald-900 flex justify-center items-center font-bold font-sans">Room Name</label>
            <motion.input className="w-full grow py-3 md:text-2xl md:border-4 border-emerald-900 bg-transparent pl-2 focus:outline-none text-emerald-900 font-bold font-sans placeholder-emerald-900"
                whileHover={{ scale: 1.2 }}
                type="text"
                placeholder="Enter Room Name"
                onChange={(e) => setRoom(e.target.value)}
            />
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={handleJoinRoom} className="w-full grow py-3 md:text-2xl  text-white rounded-full bg-black" >Join Room</motion.button>
        </div>
    )
}