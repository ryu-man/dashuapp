import React from "react";
import AuthProvider from "./context/auth_provider";
import AuthContext from './context/auth_context'

import Login from "./auth/login";
import App from "./App";

import "bootstrap";
import "./global.scss";

function switcher(value) {
	console.log(value);
	switch (value) {
		case true:
			return <App></App>;

		default:
			return <Login></Login>;
	}
}
const Dashu = () => {
	return (
		<AuthProvider value={{}}>
			<div className="dashu">
				<AuthContext.Consumer>
					{([value,]) => switcher(value.token !== undefined)}
				</AuthContext.Consumer>
			</div>
		</AuthProvider>
	);
};

export default Dashu;
