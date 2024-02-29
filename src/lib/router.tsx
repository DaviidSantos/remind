import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Anotacoes from "../pages/Anotacoes";
import Cartoes from "../pages/Cartoes";
import Revisao from "../pages/Revisao";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Anotacoes />,
      },
      {
        path: "/cartoes",
        element: <Cartoes />,
      },
      {
        path: "revisao/:card_id",
        element: <Revisao />,
      },
    ],
  },
]);
