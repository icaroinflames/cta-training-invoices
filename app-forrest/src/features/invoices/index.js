import { InvoicesList } from "./InvoicesList";

export const invoicesFeature = ({ registerAction }) => {
  registerAction({
    hook: "addRoute",
    handler: {
      path: "/invoices",
      element: <InvoicesList />
    }
  });

};