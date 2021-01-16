import React from "react";
import AgencyPage from "../agency/agency_page";
import './app_content.scss'

function switcher(index) {
	switch (index) {
		case "agencies":
			return <AgencyPage></AgencyPage>;
		/* case "dashboard":
			return <AgencyPage></AgencyPage>;
		case "categories":
			return <AgencyPage></AgencyPage>;
		case "companies":
			return <AgencyPage></AgencyPage>;
		case "settings":
			return <AgencyPage></AgencyPage>; */

		default:
			return <div className="page empty">Not implemented yet !</div>;
	}
}

const appContent = ({ index }) => {
	return (
		<div className="app-content overflow-overlay">
			<div className="path">Agencies</div>
			{switcher(index)}
		</div>
	);
};

export default appContent;
