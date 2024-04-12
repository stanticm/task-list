import React from 'react';

const TaskModal = ({
	showModal,
	editTask,
	handleSaveChanges,
	setEditedTitle,
	setEditedDescription,
	setShowModal,
	handleCheckboxChange,
	handleDeleteButtonClick,
	handleConfirmChange,
	groupName,
}) => {
	const handleConfirmCheckboxChange = (e) => {
		const newDoneState = e.target.checked;
		handleConfirmChange(editTask.id, newDoneState);
	};

	return (
		<div className={showModal ? 'modal display-block' : 'modal display-none'}>
			<div className="container">
				<div className="modal-content">
					<form className="task-item-edit" onSubmit={handleSaveChanges}>
						<div className="task-item-edit-header">
							<div className="task-item-edit-group">
								<span>{groupName}</span>
							</div>
							<div className="task-item-edit-buttons">
								<button
									className="btn-delete"
									type="delete"
									onClick={handleDeleteButtonClick}
								></button>
								<div className="btn-complete">
									<input
										className="task-item-check"
										type="checkbox"
										defaultChecked={editTask ? editTask.done : false}
										onChange={handleConfirmCheckboxChange}
									/>
									<span>Complete</span>
								</div>
							</div>
						</div>
						<div className="task-item-edit-title">
							<input
								type="text"
								defaultValue={editTask ? editTask.title : ''}
								onChange={(e) => setEditedTitle(e.target.value)}
							/>
						</div>
						<div className="task-item-edit-description">
							<span>Description</span>
							<textarea
								rows="6"
								defaultValue={editTask ? editTask.description : ''}
								onChange={(e) => setEditedDescription(e.target.value)}
							/>
						</div>
						<button className="task-item-edit-save" type="submit">
							Save changes
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TaskModal;
