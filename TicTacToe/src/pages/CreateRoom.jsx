import { useEffect, useState } from "react";
import { getSocket } from "../socket";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

let socket;

export default function CreateRoom() {
  const [roomName, setRoom] = useState(null);
  const [roomStatus, setRoomStatus] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    socket = getSocket();

    socket.on("roomStatus", (data) => {
      if (data === "Rooms Created Successfully") {
        navigate("/game");
      }else{
        setRoomStatus(data);
      }
    });

    return () => {
      socket.off("roomStatus");
    };
  }, [navigate]);

  const handleCreateRoom = () => {
    socket.emit("create-room", roomName);
  }; 

  return (
    <div className="flex flex-col justify-center items-center gap-10 mb-20">
      <label className="w-full grow md:text-2xl text-emerald-900 flex justify-center items-center font-bold font-sans">{roomStatus}</label>
      <label className="w-full grow md:text-2xl text-emerald-900 flex justify-center items-center font-bold font-sans">Room Name</label>
      <motion.input className="w-full grow py-3 md:text-2xl md:border-4 border-emerald-900 bg-transparent pl-2 focus:outline-none text-emerald-900 placeholder-emerald-900 font-bold font-sans"
        whileHover={{ scale: 1.2 }}
        type="text"
        placeholder="Enter Room Name"
        onChange={(e) => setRoom(e.target.value)}
      />
      <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}onClick={handleCreateRoom} className="w-full grow py-3 md:text-2xl  text-white rounded-full bg-black" >Create Room</motion.button>
    </div>
  );
}
