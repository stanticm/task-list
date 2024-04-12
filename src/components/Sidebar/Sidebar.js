import React, { useEffect, useState } from 'react';
import './sidebar.css';

const Sidebar = ({ groups, onGroupSelect, selectedGroupId, onCreateGroup }) => {
	const [groupName, setGroupName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Create a new group object
		const newGroup = {
			id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
			title: groupName,
			tasks: [], // New group starts with an empty task array
		};
		// Pass the new group to the parent component
		onCreateGroup(newGroup);
		// Clear input field
		setGroupName('');
	};
	return (
		<div className="sidebar">
			<div className="sidebar-wrapper">
				<h3>Groups</h3>
				<ul className="sidebar-list">
					{groups.map((group) => (
						<li
							className={`${
								selectedGroupId === group.id
									? 'selected sidebar-list-item'
									: 'sidebar-list-item'
							}`}
							key={group.id}
							onClick={() => onGroupSelect(group.id)}
						>
							{group.title}
						</li>
					))}
				</ul>
			</div>

			<form onSubmit={handleSubmit} className="add-group-form">
				<input
					className="add-group-title"
					type="text"
					placeholder="Group Name"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
					required
				/>
				<button type="submit" className="add-group-button"></button>
			</form>
		</div>
	);
};

export default Sidebar;
