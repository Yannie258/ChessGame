var PROTO_PATH = __dirname + '/../protos/movementGeneration.proto'

var grpc = require('@grpc/grpc-js')
var protoLoader = require('@grpc/proto-loader')

//note : MoveGenerator is the name of the service
//move_generator is the name of the package
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
let moveGenDef = grpc.loadPackageDefinition(packageDefinition).move_generator

//create a stub
let grpcClient = new moveGenDef.MoveGenerator(
    "vsrstud02.informatik.tu-chemnitz.de:50051",
    grpc.credentials.createInsecure()
);

// .proto defines:
/* 
* Request:
* message ValidateMoveRequest
* {
*  Move move_to_validate = 1;
* }
**
* Response: 
* message ValidateMoveResponse
*{
* Move validated_move = 1;
*}
*/

function validate(move) {
    return new Promise((resolve, reject) => {
      grpcClient.validate({ move_to_validate: move }, (err, response) => {
        if (err || !response.validated_move) {
          console.error('[validate]', err)
          resolve(false)
        }
        resolve(true)
        // resolve(response.validated_move);
      })
    })
}

function play(current_board) {
  return new Promise((resolve, reject) => {
    grpcClient.play({ current_board }, (err, response) => {
      if (err) {
        console.error('[play]', err)
        reject(err)
      }
      resolve(response.move_made)
    })
  })
}

// message GetPossibleMovesRequest
// {
//   Board current_board = 1;
//   Square from = 2; 
// }

// message GetPossibleMovesResponse
// {
//   repeated Move possible_moves = 1;
// }

function getPossibleMoves(currFen, pos) {
  return new Promise((resolve, reject) => {
    grpcClient.getPossibleMoves({ current_board: currFen, from: pos }, (err, response) => {
      if (err) {
        console.error('[getPossibleMove]', err)
        reject(err)
      }
      resolve(response.possible_moves)
    })
  })
}
// alternative: send request with fetch 
// async function getPossibleMoves(fen, pos) {
//   try {
//     const data = await grpcClient.getPossibleMoves(fen, pos);
//     console.log('data client', data)
//   } catch (err) {
//     console.log('something went wrong')
//   }
 
// }

module.exports = {
  grpcClient,
  validate,
  play,
  getPossibleMoves
}


