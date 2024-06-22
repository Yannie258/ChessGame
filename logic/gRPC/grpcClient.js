const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const config = require("../../config");

// Specify the path to the proto file
const PROTO_PATH = path.join(__dirname, "protos/move_generator.proto");

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const moveGeneratorProto =
  grpc.loadPackageDefinition(packageDefinition).move_generator;

const grpcClient = new moveGeneratorProto.MoveGenerator(
  config.grpcServer,
  grpc.credentials.createInsecure()
);

function validate(move) {
  return new Promise((resolve, reject) => {
    grpcClient.Validate({ move_to_validate: move }, (err, response) => {
      if (err || !response.validated_move) {
        console.error("[validate]", err);
        resolve(false);
      }
      resolve(true);
      // resolve(response.validated_move);
    });
  });
}

function play(current_board) {
  return new Promise((resolve, reject) => {
    grpcClient.Play({ current_board }, (err, response) => {
      if (err) {
        console.error("[play]", err);
        reject(err);
      }
      resolve(response.move_made);
    });
  });
}

module.exports = {
  grpcClient,
  validate,
  play,
};
