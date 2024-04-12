import React, { useState } from 'react';
import './content.css';
import TaskModal from '../TaskModal.js/TaskModal';
import isEqual from 'lodash/isEqual';

const Content = ({ groups, selectedGroupId, onAddTask }) => {
	const [taskState, setTaskState] = useState({
		newTaskTitle: '',
		newTaskDescription: '',
		editTask: null,
		showModal: false,
		taskDone: false,
		editedTitle: '',
		editedDescription: '',
		showConfirmation: false,
		groupName: '',
	});

	const {
		newTaskTitle,
		newTaskDescription,
		editTask,
		showModal,
		taskDone,
		editedTitle,
		editedDescription,
		showConfirmation,
		groupName,
	} = taskState;

	const tasks = selectedGroupId
		? groups.find((group) => group.id === selectedGroupId).tasks
		: [];

	const sortedTasks = tasks.slice().sort((a, b) => {
		// If a is not done and b is done, a should come before b
		if (!a.done && b.done) {
			return -1;
		}
		// If a is done and b is not done, a should come after b
		if (a.done && !b.done) {
			return 1;
		}
		// Otherwise, maintain the existing order
		return 0;
	});

	const handleTaskEditClick = (taskId) => {
		const taskToEdit = tasks.find((task) => task.id === taskId);
		if (showModal && (editedTitle.trim() || editedDescription.trim())) {
			// If there are unsaved changes in the modal, show confirmation popup
			setTaskState({ ...taskState, showConfirmation: true });
		} else {
			// If no unsaved changes, proceed with editing the task
			setTaskState({
				...taskState,
				editTask: taskToEdit,
				showModal: true,
				groupName: taskToEdit.groupName,
			});
		}
	};

	const handleCheckboxChange = (taskId) => {
		const updatedTask = tasks.find((task) => task.id === taskId);
		if (!updatedTask) return;
		updatedTask.done = !updatedTask.done;
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		if (updatedTask.done) {
			updatedTasks.push(updatedTask);
		} else {
			updatedTasks.unshift(updatedTask);
		}

		if (!isEqual(updatedTasks, tasks)) {
			onAddTask(selectedGroupId, updatedTasks);
		}
	};

	const handleNewTaskSubmit = (e) => {
		e.preventDefault();
		if (!newTaskTitle.trim()) return; // Prevent adding empty tasks

		const newTask = {
			id: Date.now(), // Generate unique ID
			title: newTaskTitle,
			description: '',
			done: false,
			groupName: groups.find((group) => group.id === selectedGroupId).title,
		};

		onAddTask(selectedGroupId, newTask);

		// Reset input fields
		setTaskState({
			...taskState,
			newTaskTitle: '',
			newTaskDescription: '',
		});
	};

	const handleSaveChanges = (e) => {
		e.preventDefault();
		if (!editedTitle.trim() || !editTask) {
			return;
		}

		const updatedTasks = tasks.map((task) =>
			task.id === editTask.id
				? { ...task, title: editedTitle, description: editedDescription }
				: task
		);

		onAddTask(selectedGroupId, updatedTasks);

		// Reset state and close modal
		setEditedTitle('');
		setEditedDescription('');
		setTaskState((prevState) => ({ ...prevState, showModal: false }));
	};

	const setEditedTitle = (title) => {
		setTaskState({ ...taskState, editedTitle: title });
	};

	const setEditedDescription = (description) => {
		setTaskState({ ...taskState, editedDescription: description });
	};

	const setShowModal = (show) => {
		setTaskState({ ...taskState, showModal: show });
	};

	const handleDeleteButtonClick = () => {
		setTaskState((prevState) => ({ ...prevState, showConfirmation: true }));
	};

	const handleConfirmationYes = () => {
		const updatedTasks = tasks.filter((task) => task.id !== editTask.id);
		onAddTask(selectedGroupId, updatedTasks);

		setTaskState((prevState) => ({
			...prevState,
			editTask: null,
			showConfirmation: false,
			showModal: false,
		}));
	};

	const handleConfirmationNo = () => {
		setTaskState((prevState) => ({
			...prevState,
			showConfirmation: false,
		}));
	};

	return (
		<div className="content">
			<div className="content-wrapper">
				<ul className="content-task-list">
					{sortedTasks.map((task) => (
						<li
							className={`${
								task.done
									? 'content-task-list-item task-done'
									: 'content-task-list-item'
							}`}
							key={task.id}
						>
							<div className="task-item">
								<div className="task-item-wrap">
									<span
										className="task-item-title"
										onClick={() => handleTaskEditClick(task.id)}
									>
										{task.title}
									</span>
									<input
										className="task-item-check"
										type="checkbox"
										defaultChecked={task.done}
										onChange={() => handleCheckboxChange(task.id)}
									/>
								</div>
							</div>
						</li>
					))}
				</ul>

				{showModal && (
					<TaskModal
						showModal={showModal}
						editTask={editTask}
						handleSaveChanges={handleSaveChanges}
						setEditedTitle={setEditedTitle}
						setEditedDescription={setEditedDescription}
						setShowModal={setShowModal}
						handleCheckboxChange={handleCheckboxChange}
						handleDeleteButtonClick={handleDeleteButtonClick}
						handleConfirmChange={(taskId, newDoneState) => {
							const updatedTasks = tasks.map((task) =>
								task.id === taskId ? { ...task, done: newDoneState } : task
							);
							onAddTask(selectedGroupId, updatedTasks);
						}}
						groupName={groupName}
					/>
				)}

				{showConfirmation && (
					<div className="confirmation-popup">
						<div className="confirmation-popup-wrap">
							<p>Are you sure you want to delete this task?</p>
							<div className="confirmation-popup-btns">
								<button
									className="confirmation-popup-yes"
									onClick={handleConfirmationYes}
								>
									Yes
								</button>
								<button
									className="confirmation-popup-no"
									onClick={handleConfirmationNo}
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="content-add-new-task">
					<form onSubmit={handleNewTaskSubmit} className="add-task-form">
						<input
							className="add-task-title"
							type="text"
							placeholder="Add task..."
							value={newTaskTitle}
							onChange={(e) =>
								setTaskState({ ...taskState, newTaskTitle: e.target.value })
							}
							required
						/>
						<button type="submit" className="add-task-button"></button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Content;
