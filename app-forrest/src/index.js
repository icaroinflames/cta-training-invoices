import { runHookApp } from "@forrestjs/hooks";
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";

import AuthProvider from "./services/AuthProvider";

import { appFeature } from "./features/app";
import { usersFeature } from "./features/users";
import { authFeature } from "./features/auth";
import { invoicesFeature } from "./features/invoices";

runHookApp({
  services: [reactRoot, reactRouter, AuthProvider],
  features: [appFeature, usersFeature, authFeature, invoicesFeature]
});

