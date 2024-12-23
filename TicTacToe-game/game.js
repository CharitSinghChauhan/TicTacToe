class GameLogic {
    constructor(playerOId = null, playerXId = null) {
        this.playerO = playerOId;
        this.playerX = playerXId;
        this.array = Array(9).fill("");
        this.changeO = true;
        this.roomName = null
    }

    move(socketId, index) {

        if (this.changeO && socketId === this.playerO && this.array[index] === "") {
            this.array[index] = "O";
            this.changeO = false;
        } else if ((!this.changeO) && socketId === this.playerX && this.array[index] === "") {
            this.array[index] = "X";
            this.changeO = true
        }

        if (this.checkWinner()) {
            return this.checkWinner() // string
        } else if (this.draw()) {
            return "Draw" //boolean
        }

    }

    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.array[a] && this.array[a] === this.array[b] && this.array[a] === this.array[c]) {
                return this.array[a];
            }
        }

        return false;
    }

    draw() {
        if (this.array.every(x => x != "")) {
            return true
        }
        return false

    }

    reset() {
        this.array = Array(9).fill("");
        this.changeO = (!this.changeO)
        return this.array
    }
}

const game = new GameLogic();

export default game;