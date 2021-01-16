import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { format } from "date-fns";
import { authContext } from "../../auth_context";
import jquery from "jquery";

import "./agency_page.scss";
import { API } from "./agency_api";

const api = new API();

const Agency = ({
	name,
	address,
	wilaya,
	phone,
	createdAt,
	selected = false,
	onUpdate,
	onDelete,
}) => {
	const [_selected, setSelected] = useState(selected);
	useEffect(() => {
		setSelected(selected);
	}, [selected]);

	return (
		<tr>
			<td>
				<label className="checkbox">
					<input
						type="checkbox"
						checked={_selected}
						onChange={(e) => {
							setSelected(e.currentTarget.checked);
						}}
					/>
					<span></span>
				</label>
			</td>
			<td>{name}</td>
			<td>{address}</td>
			<td>{wilaya}</td>
			<td>{phone}</td>
			<td>{format(new Date(createdAt), "dd MMM yyyy")}</td>
			<td className="actions">
				<button type="button" className="btn" onClick={() => onUpdate()}>
					<i className="bi bi-pencil"></i>
				</button>
				<button type="button" className="btn" onClick={() => onDelete()}>
					<i className="bi bi-trash"></i>
				</button>
			</td>
		</tr>
	);
};

const Modal = ({
	agency = {},
	show,
	onHidden,
	onAgencyCreated,
	onAgencyUpdated,
}) => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [wilaya, setWilaya] = useState("");
	const [commune, setCommune] = useState("");
	const [phone, setPhone] = useState("");

	const modalRef = useRef();
	const submitHandler = useCallback(
		async (e) => {
			e.preventDefault();
			if (agency?._id) {
				try {
					const data = await api.update(agency._id, {
						name,
						address,
						wilaya,
						commune,
						phone,
					});
					console.log(data);
					onAgencyUpdated?.(data);
				} catch (err) {
					console.log(err);
				}
			} else {
				try {
					const data = await api.create({
						name,
						address,
						wilaya,
						commune,
						phone,
					});
					onAgencyCreated?.(data);
				} catch (err) {}
			}
		},
		[
			agency,
			name,
			address,
			wilaya,
			commune,
			phone,
			onAgencyCreated,
			onAgencyUpdated,
		]
	);

	useEffect(() => {
		if (show) {
			setName(agency?.name ?? "");
			setAddress(agency?.address ?? "");
			setWilaya(agency?.wilaya ?? "");
			setCommune(agency?.commune ?? "");
			setPhone(agency?.phone ?? "");
			jquery(modalRef.current).modal("show");
		} else {
			jquery(modalRef.current).modal("hide");
		}
	}, [show, agency]);
	useEffect(() => {
		jquery(modalRef.current).on("hidden.bs.modal", function (e) {
			onHidden();
		});
	}, []);

	return (
		<form className="form" onSubmit={submitHandler}>
			<div
				ref={modalRef}
				className="modal"
				tabIndex="-1"
				role="dialog"
				id="#exampleModal"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Agency</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div class="form-group">
								<label>Name</label>
								<input
									type="text"
									className={`form-control${
										name.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={name}
									required
									onChange={(e) => setName(e.currentTarget.value)}
								/>
							</div>
							<div class="form-group">
								<label>Address</label>
								<input
									type="text"
									className={`form-control${
										address.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={address}
									required
									onChange={(e) => setAddress(e.currentTarget.value)}
								/>
							</div>

							<div class="form-group">
								<label>Wilaya</label>
								<input
									type="text"
									className={`form-control${
										wilaya.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={wilaya}
									onChange={(e) => setWilaya(e.currentTarget.value)}
								/>
							</div>
							<div class="form-group">
								<label>Commune</label>
								<input
									type="text"
									className={`form-control${
										commune.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={commune}
									onChange={(e) => setCommune(e.currentTarget.value)}
								/>
							</div>
							<div class="form-group">
								<label>Phone</label>
								<input
									type="text"
									className={`form-control${
										phone.length === 0 ? " is-invalid" : " is-valid"
									}`}
									value={phone}
									required
									onChange={(e) => setPhone(e.currentTarget.value)}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cancel
							</button>
							<button type="submit" className="btn btn-primary">
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

const DeleteConfirmationModal = ({
	agency,
	show,
	onHidden,
	onAgencyDeleted,
}) => {
	const modalRef = useRef();
	const submitHandler = useCallback(
		async (e) => {
			e.preventDefault();
			try {
				const data = await api.remove(agency._id);
				console.log(data);
				onAgencyDeleted(agency._id);
			} catch (err) {
				console.log(err);
			}
		},
		[agency, onAgencyDeleted]
	);
	useEffect(() => {
		if (show) {
			jquery(modalRef.current).modal("show");
		} else {
			jquery(modalRef.current).modal("hide");
		}
	}, [show]);

	useEffect(() => {
		jquery(modalRef.current).on("hidden.bs.modal", function (e) {
			onHidden();
		});
	}, []);
	return (
		<form className="form" onSubmit={submitHandler}>
			<div ref={modalRef} className="modal" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Delete Agency</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Are you sure you want to delete <strong>"{agency.name}"</strong>{" "}
							agency ?
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cancel
							</button>
							<button type="submit" className="btn btn-danger">
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

const AgencyPage = ({}) => {
	const [agencies, setAgencies] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showConfModal, setShowConfModal] = useState(false);
	const [selectedAgency, setSelectedAgency] = useState({});
	const [auth] = useContext(authContext);
	const onAddAgencyhandler = () => setShowModal(true);

	useEffect(() => {
		api.setToken(auth.token);
		api
			.readAll()
			.then((data) => {
				setAgencies(data);
			})
			.catch((err) => {
				setAgencies([]);
			});
	}, [auth]);

	return (
		<>
			<Modal
				agency={selectedAgency}
				show={showModal}
				onHidden={() => {
					setShowModal(false);
					setSelectedAgency({});
				}}
				onAgencyCreated={(agency) => {
					setAgencies([...agencies, agency]);
				}}
				onAgencyUpdated={(updatedAgency) => {
					const array = [];
					for (const agency of agencies) {
						if (agency._id === updatedAgency._id) {
							array.push(updatedAgency);
							continue;
						}
						array.push(agency);
					}
					setAgencies(array);
				}}
			/>
			<DeleteConfirmationModal
				agency={selectedAgency}
				show={showConfModal}
				onHidden={() => setShowConfModal(false)}
				onAgencyDeleted={() => {}}
			/>
			<div className="page agency-page">
				<div className="header">
					<div className="title">
						Agencies
						<div className="sub">{agencies.length} Agencies</div>
					</div>
					<div className="filter-input">
						<i className="bi bi-funnel"></i>
						<select className="form-control">
							<option className="placeholder" value="" disabled selected hidden>
								Filter by company, commune,...
							</option>
						</select>
					</div>
					<div className="search-input">
						<input
							className="form-control"
							type="text"
							placeholder="Search..."
						/>
						<i className="bi bi-search"></i>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						data-toggle="modal"
						data-target="#exampleModal"
						onClick={onAddAgencyhandler}
					>
						<i className="bi bi-plus-circle" />
						Add agency
					</button>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th>
								<label className="checkbox">
									<input
										className=""
										type="checkbox"
										onChange={(e) => {
											setAgencies(
												agencies.map(
													(ag) => ((ag.selected = e.currentTarget.checked), ag)
												)
											);
										}}
									/>
									<span></span>
								</label>
							</th>
							<th>Name</th>
							<th>Address</th>
							<th>Wilaya</th>
							<th>Phone</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{agencies.map((agency, i) => (
							<Agency
								key={agency._id}
								name={agency.name}
								address={agency.address}
								wilaya={agency.wilaya}
								phone={agency.phone}
								createdAt={agency.createdAt}
								selected={agency.selected}
								onUpdate={() => {
									setSelectedAgency(agency);
									setShowModal(true);
								}}
								onDelete={() => {
									setSelectedAgency(agency);
									setShowConfModal(true);
								}}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AgencyPage;
