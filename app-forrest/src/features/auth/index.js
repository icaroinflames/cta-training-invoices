import { UserLogin } from "./UserLogin";
import { UserRegister } from "./UserRegister";

export const authFeature = ({ registerAction }) => {
  
  registerAction({
    hook: "addRoute",
    handler: {
      path: "/login",
      element: <UserLogin />
    }
  });

  registerAction({
    hook: "addRoute",
    handler: {
      path: "/register",
      element: <UserRegister />
    }
  });
  
};