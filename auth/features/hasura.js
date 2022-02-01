/**
 * Hasura Utility Library
 *
 */

 const { sign } = require("jsonwebtoken");

 const buildHasuraToken = (
   hasuraPayload = {},
   { hasuraScope = "https://hasura.io/jwt/claims", ...jwtPayload } = {}
 ) => ({
   ...jwtPayload,
   [hasuraScope]: Object.keys(hasuraPayload).reduce(
     (acc, curr) => ({
       ...acc,
       [`x-hasura-${curr}`]: hasuraPayload[curr]
     }),
     {}
   )
 });
 
 const buildUserToken = (userId) =>
   buildHasuraToken({
     "default-role": "user",
     "allowed-roles": ["user"],
     "user-id": userId
   });
 
 const buildApolloConfig = ({
   endpoint = "",
   secret,
   expiresIn = "1d",
   role = "admin",
   roles = [],
   ...tokenConfig
 } = {}) => {
   const token = sign(
     buildHasuraToken({
       "allowed-roles": [...roles, role],
       "default-role": role,
       ...tokenConfig
     }),
     secret,
     { expiresIn }
   );
 
   return {
     uri: `${endpoint}/v1/graphql`,
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
     }
   };
 };
 
 module.exports = { buildApolloConfig, buildHasuraToken, buildUserToken };