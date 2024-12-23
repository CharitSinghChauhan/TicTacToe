import { motion } from "motion/react"
import CreateRoom from "./CreateRoom"
import { useState } from "react"
import JoinRoom from "./JoinRoom"

export default function SelectMode() {

    const [displayCreateRoom, setDisplayCreateRoom] = useState(null)

    const displayCreateRoomOrJoinRoom = ()=>{
        if( displayCreateRoom === null){
            return(
                <></>
            )
        }else if( displayCreateRoom === true){
            return(
                <CreateRoom />
            )
        }else{
            return(
                <JoinRoom />
            )
        }
    }

    return (
        <div className="h-screen flex bg-[#12bdac]">
            <div className="flex flex-col w-1/2 justify-center items-center h-full gap-16 pl-5">
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onMouseEnter={ () => setDisplayCreateRoom(true) }
                    className=" md:w-1/3 w-1/2  py-3 md:text-2xl text-white rounded-full bg-black" >Create-Room</motion.button>
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onMouseEnter={ () => setDisplayCreateRoom(false)}
                    className=" md:w-1/3 w-1/2 py-3 md:text-2xl text-white rounded-full bg-black">Join-Room</motion.button>
            </div>
            <div className="flex justify-center items-center h-full w-1/2">
               {displayCreateRoomOrJoinRoom()}
            </div>
        </div>
    )
}