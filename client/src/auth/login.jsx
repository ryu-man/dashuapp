import React, { useState } from "react";
import { useContext } from "react";
import { authContext } from "../auth_context";
import "./login.scss";

const Login = () => {
	const [, setAuth] = useContext(authContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordIsValid, setPasswordIsVald] = useState(false);

	return (
		<div className="login">
			<div className="side">
				<div className="app-name">Dashu</div>
				<form
					className="form"
					action=""
					onSubmit={(e) => {
						e.preventDefault();

						loginApi();
					}}
				>
					<div class="form-group">
						<label>Email</label>
						<input
							className="form-control"
							type="email"
							value={email}
							onBlur={(e) => {
								const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								if (!regex.test(e.currentTarget.value)) {
									// alert("");
								}
							}}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
						{/* <small id="emailHelp" class="form-text text-muted">
									We'll never share your email with anyone else.
								</small> */}
					</div>
					<div class="form-group">
						<label>Password</label>
						<input
							className={`form-control${passwordIsValid ? " is-valid" : ""}`}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<small class="form-text text-muted invalid-feedback">
							We'll never share your email with anyone else.
						</small>
					</div>

					<div className="form-group">
						<button type="submit" className="col btn btn-primary">
							Login
						</button>
					</div>
					<div className="form-group options">
						<div className="form-row">
							<div className="col">
								<label htmlFor="rememberme">
									<input
										type="checkbox"
										name=""
										id="rememberme"
										onChange={(e) => console.log(e.currentTarget.checked)}
									/>
									<span>Remember me</span>
								</label>
							</div>
							<div className="col text-right">
								<a href="/">Forget your password?</a>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);

	async function loginApi() {
		// try{
		const res = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		setAuth(await res.json());

		/* 	switch(res.status){
				case 200:
					break;
				case 404:
					break
	
					default:
	
			} */
		/* }catch(err){
			console.log(err)
		} */
	}
};

export default Login;
