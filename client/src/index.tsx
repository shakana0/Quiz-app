import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { persistor, store } from './store/store';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/store";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
let persistor = persistStore(store);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

{/* <BrowserRouter>
<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PersistGate>
  </Provider>
</React.StrictMode>
</BrowserRouter> */}
reportWebVitals();
