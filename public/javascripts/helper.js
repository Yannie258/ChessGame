export async function sendRequestGetPossibleMoves(fen, cellId) {
  // Make a POST request to the server when a piece is clicked
  const response = await fetch('/chessboard/possibleMoves', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fen: fen, pos: cellId }),
  })
  const data = await response.json() // Assuming the response is in JSON format

  return data
}

export async function sendMoveToServerForPlaying(moves) {
    const response = await fetch('/chessboard/moves', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify( moves ),
    })

    const data = await response.json() // Assuming the response is in JSON format

    return data
}
