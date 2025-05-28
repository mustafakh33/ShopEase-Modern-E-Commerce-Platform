import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
// redux
import { store, persistor } from "@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
