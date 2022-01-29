const gql = require("graphql-tag");
const { buildUserToken } = require("./hasura");

const getUserQuery = gql`
    query getUserId($email: String!, $password: String!) {
        user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
        user_id
        }
    }
`;

const loginHandler = async (request, reply) => {
  // Identify the user by querying Hasura
  const res = await request.apollo.query({
    query: getUserQuery,
    variables: request.body.input
  });

  // If no match, return authorization error
  if (!res.data.users.length) {
    reply.code(401).send("User not found");
    return;
  }

  // Create Hasura user's token and send it back
  const token = await request.jwt.sign(buildUserToken(res.data.users[0].id));

  reply.send({
    // id: res.data.users[0].id,
    // name: request.body.input.name,
    token
  });
};

const login = ({ registerAction }) => {
  registerAction({
    hook: "$FASTIFY_ROUTE",
    handler: {
      method: "POST",
      url: "/login",
      handler: loginHandler
    }
  });
};

module.exports = login;