import React from "react";

const AddAgencyModal = () => {
	const agency = {};
	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault()
					fetch("host/agency", {
						method: "post",
						body: agency,
					}).then((res) => {
						if (res.ok) {
							agency = {};
						}
					});
				}}
				method="post"
			>
				<input
					type="text"
					value={agency.name}
					onChange={(e) => (agency.name = e.currentTarget.value)}
				/>
				<input
					type="text"
					value={agency.address}
					onChange={(e) => (agency.address = e.currentTarget.value)}
				/>
				<input
					type="text"
					value={agency.wilaya}
					onChange={(e) => (agency.wilaya = e.currentTarget.value)}
				/>
				<input
					type="text"
					value={agency.commune}
					onChange={(e) => (agency.commune = e.currentTarget.value)}
				/>
				<input
					type="text"
					value={agency.phone}
					onChange={(e) => (agency.phone = e.currentTarget.value)}
				/>

				<div className="buttons">
					<button type="button" className="btn">
						Cancel
					</button>
					<button type="submit" className="btn btn-primary">
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddAgencyModal;
