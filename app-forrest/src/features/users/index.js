import { UsersList } from "./UserList";
import { UserPage } from "./UserPage";

export const usersFeature = ({ registerAction }) => {
  registerAction({
    hook: "addRoute",
    handler: {
      path: "/users",
      element: <UsersList />
    }
  });

  registerAction({
    hook: "addRoute",
    handler: {
      path: "/users/:id",
      element: <UserPage />
    }
  });
};
