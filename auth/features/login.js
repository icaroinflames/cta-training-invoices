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
    variables: request.body.input.arg1
  });
  console.log(res.data);
  // If no match, return authorization error
  if (res.data.user.lenght === 0) {
    reply.code(401).send("User not found");
    return;
  }

  // Create Hasura user's token and send it back
  const accessToken = await request.jwt.sign(buildUserToken(res.data.user[0].user_id));

  reply.send({
    // id: res.data.users[0].id,
    // name: request.body.input.name,
    accessToken
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