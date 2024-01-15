function placePieces(fen) {
        const boardSize = 8
        //pov =white-> A8 is on top-left, H1: right-bottom
        const rows = ['8', '7', '6', '5', '4', '3', '2', '1']
        const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        //split fen for row
        const fenRow = fen.split('/')
        console.log(fenRow)

        //let chessBoard = `<table class='chess-board'>`

        for (let i = 0; i < boardSize; i++) {
            const singleRow = fenRow[i]
            //console.log('singleRow:', singleRow)
            //chessBoard += `<tr>`
            //rotate the board when change pov
            let rowIndex = boardSize - i 
            //cut fenRow to get single pieces
            const singleCellPure = singleRow.split('')
            //change digit to space string
            let singleCell = emptyCell(singleRow)

            for (let j = 0; j < boardSize; j++) {
                const cell = singleCell[j]
                const singleCellt = singleCell[j]
                //check if in every cell contains character or not
                //when yes, then map to pieces, else do nothing
                let piece = cell.match(/[prnbqkPRNBQK]/) ? getSinglePiece(cell) : ''
                //render id / coordination for square
                //chessBoard += `<td id=${cols[j]}${rowIndex}>${piece}</td>`
                const setPieces = document.getElementById(`${cols[j]}${rowIndex}`);
                setPieces.innerHTML = piece
            }
           // chessBoard += `</tr>` // close a tr block
        }
        //chessBoard += `</table>` // close tag table
        //splitPieces(fen)
        //return chessBoard
    }

    //expand amount of consecate empty cells based on number
    // repeat space for num times
    function emptyCell(cell) {
        return cell.replace(/\d/g, digit => ' '.repeat(digit)).split('');
    }

    function getSinglePiece(char) {
        return char !== '' ? `<span class="chess-piece">${encodeFen[char]}</span>` : '';
    }
    //Enum Using Objects
    const encodeFen = {
        r: '♜',
        n: '♞',
        b: '♝',
        q: '♛',
        k: '♚',
        p: '♟',

        R: '♖',
        N: '♘',
        B: '♗',
        Q: '♕',
        K: '♔',
        P: '♙',
    
}