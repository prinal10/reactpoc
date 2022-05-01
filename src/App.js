import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import {AuthContextProvider} from "./contexts/AuthContext";
import AuthorizedRoutes from "./components/AuthorizedRoutes";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";

function App() {
    // console.log("in App")
    return (
        <>
            <div className="ui container">
                <Router>
                    <AuthContextProvider>
                        <Routes>
                            <Route path="/login" element={<LoginScreen/>}/>
                            {/*AuthenticatedRoute are meant so that the AuthorizedRoutes can work plus to make sure
                               that the user is properly authenticated and to manage routes that needs authentication
                               and the one that dont.
                            */}
                            <Route element={<AuthenticatedRoute/>}>
                                <Route element={<NavBar/>}>
                                    <Route path="/" element={<Dashboard/>}/>
                                    {/*AuthorizedRoutes are meant if user tries to hit url which they are not
                                   authorized to.
                                */}
                                    <Route path="/admin" element={
                                        <AuthorizedRoutes hasAnyScopes={["etrans:eligibilitiesEnabled"]}
                                                          component={Admin}
                                        />
                                    }/>
                                    <Route path="/profile" element={
                                        <AuthorizedRoutes hasAnyScopes={["etrans:eligibilitiesEnabled"]}
                                                          component={Profile}
                                        />
                                    }/>
                                </Route>
                            </Route>
                        </Routes>
                    </AuthContextProvider>
                </Router>
            </div>
        </>
    );
}

export default App;
