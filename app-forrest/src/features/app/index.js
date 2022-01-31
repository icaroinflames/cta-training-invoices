import { App } from "./App.js";

export const appFeature = ({ registerAction }) => {
  registerAction({
    hook: "$INIT_FEATURE",
    handler: ({ createHook, setContext }) => {
      const routes = createHook("addRoute").map(($) => $[0]);
      setContext("app.routes", routes);
    }
  });

  registerAction({
    hook: "$REACT_ROOT_COMPONENT",
    handler: {
      component: App
    }
  });
};
