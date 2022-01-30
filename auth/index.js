const { runHookApp } = require("@forrestjs/hooks");
const serviceFastify = require("@forrestjs/service-fastify");
const serviceApollo = require("@forrestjs/service-apollo");
const serviceJwt = require("@forrestjs/service-jwt");
const envalid = require("envalid");

// App's Features & Utilities
const login = require("./features/login");
const echo = require("./features/echo");
const { buildApolloConfig } = require("./features/hasura");

const validatedEnv = envalid.cleanEnv(process.env, {
    NODE_ENV: envalid.str({
        choices: ['development', 'test', 'production']
    }),
    HASURA_ENDPOINT: envalid.str({
        desc: 'Hasura endpoint full URI'
    }),
    FASTIFY_PORT: envalid.num({
        desc: 'local port where fastify is running'
    }),
    HASURA_JWT_SECRET: envalid.str({
        desc: 'The salt for hasura jwt'
    }),
    HASURA_ADMIN_SECRET: envalid.str({
      desc: 'The hasura admin key'
  }),
});

runHookApp({
  trace: "compact",
  settings: () => ({
    jwt: {
      secret: validatedEnv.HASURA_JWT_SECRET,
      duration: "1h"
    },
    fastify: {
        port: validatedEnv.FASTIFY_PORT
    },
    apollo: {
      client: {
        config: buildApolloConfig({
          endpoint: validatedEnv.HASURA_ENDPOINT,
          secret: validatedEnv.HASURA_JWT_SECRET
        })
      }
    },
  }),
  services: [serviceApollo, serviceJwt, serviceFastify],
  features: [login, echo]
});