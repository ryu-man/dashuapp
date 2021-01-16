import React from "react";
import "./sidebar.scss";

const sidebar = ({ index, setIndex }) => {
	return (
		<div className="sidebar">
			<div
				className={`${index === "dashboard" ? "active " : ""}item`}
				onClick={() => setIndex("dashboard")}
			>
				<i class="bi bi-speedometer2"></i>
				<span>Dashboard</span>
			</div>
			<div
				className={`${index === "categories" ? "active " : ""}item`}
				onClick={() => setIndex("categories")}
			>
				<i class="bi bi-columns-gap"></i>
				<span>Categories</span>
			</div>
			<div
				className={`${index === "companies" ? "active " : ""}item`}
				onClick={() => setIndex("companies")}
			>
				<i class="bi bi-building"></i>
				<span>Companies</span>
			</div>
			<div
				className={`${index === "agencies" ? "active " : ""}item`}
				onClick={() => setIndex("agencies")}
			>
				<i class="bi bi-shop"></i>
				<span>Agencies</span>
			</div>
			<div
				className={`${index === "settings" ? "active " : ""}item`}
				onClick={() => setIndex("settings")}
			>
				<i class="bi bi-gear"></i>
				<span>Settings</span>
			</div>
		</div>
	);
};
export default sidebar;
