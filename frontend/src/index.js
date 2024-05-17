import React from "react";
import ReactDOM from "react-dom/client";
// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// custom css
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";
import Error from "./screens/Errorpage";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Candidatescreen from "./screens/Candidatescreen";
import Aboutcandidate from "./screens/Aboutcandidate";
import Votescreen from "./screens/Votescreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Producteditscreen from "./screens/Producteditscreen";
import ProfileScreen from "./screens/ProfileScreen";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Homescreen />} />
      <Route path="/candidates" element={<Candidatescreen />} />
      <Route path="/auth" element={<Loginscreen />} />
      <Route path="/candidates/:id" element={<Aboutcandidate />} />

      <Route path="/profile" element={<ProfileScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/vote" element={<Votescreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route
          path="admin/candidates/:id/edit"
          element={<Producteditscreen />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
