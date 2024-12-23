import { useEffect, useState } from "react"
import { getSocket } from "../socket";
import { motion } from "motion/react";

let socket;

export default function Game() {

    const [board, setBoard] = useState(Array(9).fill(""));
    const [DrawMsg, setDrawMsg] = useState('')
    const [WinnerMsg, setWinnerMsg] = useState('')

    useEffect(() => {

        socket = getSocket();

        socket.on("array", (array) => {
            setBoard(array);
        })

        socket.on("Winner", (data,array) => {
            const result = data + " Won 🥳!"
            setBoard(array);
            setWinnerMsg(result);
        })

        socket.on("Draw", (data) => {
            setBoard(data)
            setDrawMsg("OX Draw")
        })

        socket.on("reset-array", (array) => {
            setBoard(array);
            setDrawMsg('')
            setWinnerMsg('')
        })

        socket.on("join-room-game-board", (array) => {
            setBoard(array);
        })

    }, [board], [DrawMsg], [WinnerMsg])

    const handleMove = (index) => {
        socket.emit("move-send", index)
    }

    const handleReset = () => {
        if (DrawMsg || WinnerMsg) {
            console.log("reset")
            socket.emit("reset")
        }
    }

    return (
        <div className="bg-[#12bdac] h-screen">
            <div className="flex justify-center items-center h-32 text-4xl">
                <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }}>{DrawMsg}{WinnerMsg}</motion.div>
            </div>

            <div >
                <div>
                    <motion.div className="flex justify-center items-center">
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-r-8 border-b-8 flex justify-center items-center text-7xl" onClick={() => handleMove(0)}>{board[0]}</motion.div>
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-r-8 border-b-8 flex justify-center items-center text-7xl" onClick={() => handleMove(1)}>{board[1]}</motion.div>
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-b-8 flex justify-center items-center text-7xl" onClick={() => handleMove(2)}>{board[2]}</motion.div>
                    </motion.div>
                    <motion.div className="flex justify-center items-center">
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-r-8 border-b-8 flex justify-center items-center text-7xl" onClick={() => handleMove(3)}>{board[3]}</motion.div>
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-r-8 border-b-8 flex justify-center items-center text-7xl" onClick={() => handleMove(4)}>{board[4]}</motion.div>
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-b-8 flex justify-center items-center text-7xl" onClick={() => handleMove(5)}>{board[5]}</motion.div>
                    </motion.div>
                    <motion.div className="flex justify-center items-center">
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-r-8 flex justify-center items-center text-7xl" onClick={() => handleMove(6)}>{board[6]}</motion.div>
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 border-r-8 flex justify-center items-center text-7xl" onClick={() => handleMove(7)}>{board[7]}</motion.div>
                        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="h-40 w-36 flex justify-center items-center text-7xl" onClick={() => handleMove(8)}>{board[8]}</motion.div>
                    </motion.div>
                </div>
            </div >
            <div className="h-10 flex justify-center items-center my-8">
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="bg-cyan-950 text-white w-40 rounded-full text-lg py-2"
                    onClick={handleReset}>Play Again</motion.button>
            </div>
        </div>
    )
}