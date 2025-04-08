import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import SignIn from "../pages/Sign-in";
import User from "../pages/User";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
        </Routes>
    )
}

export default AppRouter;