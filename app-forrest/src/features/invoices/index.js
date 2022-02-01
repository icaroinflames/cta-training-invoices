import { InvoicesList } from "./InvoicesList";
import { InvoicesNew } from "./InvoicesNew";

export const invoicesFeature = ({ registerAction }) => {
  registerAction({
    hook: "addRoute",
    handler: {
      path: "/invoices",
      element: <InvoicesList />
    }
  });

  registerAction({
    hook: "addRoute",
    handler: {
      path: "/invoices/new",
      element: <InvoicesNew />
    }
  });

};