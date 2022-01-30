const echoHandler = (req, reply) => {
    reply.send(req.body.text);
}

const echo = ({ registerAction }) => {
    registerAction({
      hook: "$FASTIFY_ROUTE",
      handler: {
        method: "POST",
        url: "/echo",
        handler: echoHandler
      }
    });
  };
  
  module.exports = echo;