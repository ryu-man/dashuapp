import React from "react";
import { useState } from "react";
import AuthContext from "./auth_context";

const AuthProvider = ({ children }) => {
	const authState = useState({});

	return (
		<AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
	);
};
export default AuthProvider