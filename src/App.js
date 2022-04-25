import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import MaterialUI from "./components/MaterialUI";
import CheckBox from "./components/CheckBox";
import LoginScreen from "./components/LoginScreen";
import {AuthContextProvider} from "./contexts/AuthContext";
import AuthorizedRoutes from "./components/AuthorizedRoutes";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <>
            <div className="ui container">
                <Router>
                    <AuthContextProvider>
                        <Routes>
                            <Route path="/login" element={<LoginScreen/>}/>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/admin" element={
                                <AuthorizedRoutes hasAnyScopes={["etrans:eligibilitiesEnabled"]}
                                                  component={Admin}
                                />
                            }/>

                        </Routes>
                    </AuthContextProvider>
                </Router>
            </div>
        </>
    );
}

export default App;
