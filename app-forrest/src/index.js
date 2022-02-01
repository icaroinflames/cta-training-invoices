import { runHookApp } from "@forrestjs/hooks";
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";

import AuthProvider from "./services/AuthProvider";

import { appFeature } from "./features/app";
import { usersFeature } from "./features/users";
import { authFeature } from "./features/auth";
import { invoicesFeature } from "./features/invoices";

runHookApp({
  settings: {
    auth:{
      hasura_uri: 'http://localhost:8080/v1/graphql',
    }
  },
  services: [reactRoot, reactRouter, AuthProvider],
  features: [appFeature, authFeature, invoicesFeature]
});

