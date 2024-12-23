<div className="flex justify-center items-center h-screen">
    <div>{winnerMsg}</div>
    <div onClick={handleReset}>Reset Game</div>

    <motion.div className="grid grid-cols-3 gap-5 shadow-2xl">

        {board.map((cell, index) => (
            <motion.div key={index} className="border-4 border-amber-700 h-40 w-36 flex justify-center items-center text-6xl shadow-2xl shadow-amber-800 shadow-"
                onClick={() => handleMove(index)}

            >{cell}</motion.div>
        ))}
    </motion.div>

    <div onClick={handleReset}>
        Reset Game
    </div>

</div>