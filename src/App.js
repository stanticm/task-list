import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './components/Content/Content';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
	const [selectedGroupId, setSelectedGroupId] = useState(null);
	const [groups, setGroups] = useState([
		{
			id: 1,
			title: 'My List',
			tasks: [
				{
					id: 1,
					title: 'Go for a jog',
					description: 'Go for a jog around the park',
					done: false,
				},
				{
					id: 2,
					title: 'Read a book',
					description: 'Read the latest bestseller',
					done: true,
				},
				{
					id: 3,
					title: 'Call mom',
					description: 'Call mom to check in',
					done: false,
				},
				{
					id: 4,
					title: 'Cook dinner',
					description: 'Prepare a delicious dinner',
					done: false,
				},
				{
					id: 5,
					title: 'Watch a movie',
					description: 'Watch the new release on Netflix',
					done: true,
				},
			],
		},
		{
			id: 2,
			title: 'New Project',
			tasks: [
				{
					id: 6,
					title: 'Research competitors',
					description: 'Conduct market research on competitors',
					done: false,
				},
				{
					id: 7,
					title: 'Create project timeline',
					description: 'Outline the project timeline and milestones',
					done: true,
				},
				{
					id: 8,
					title: 'Design user interface',
					description: 'Create wireframes for the user interface',
					done: false,
				},
				{
					id: 9,
					title: 'Write project proposal',
					description: 'Draft the project proposal document',
					done: true,
				},
				{
					id: 10,
					title: 'Setup development environment',
					description: 'Configure the development environment',
					done: false,
				},
			],
		},
		{
			id: 3,
			title: 'Shopping List',
			tasks: [
				{
					id: 11,
					title: 'Buy milk',
					description: 'Pick up a gallon of milk from the grocery store',
					done: true,
				},
				{
					id: 12,
					title: 'Get vegetables',
					description: 'Purchase fresh vegetables for the week',
					done: false,
				},
				{
					id: 13,
					title: 'Purchase toiletries',
					description: 'Restock bathroom toiletries',
					done: true,
				},
				{
					id: 14,
					title: 'Pick up laundry detergent',
					description: 'Buy laundry detergent from the store',
					done: true,
				},
				{
					id: 15,
					title: 'Buy birthday gift',
					description: "Find a special gift for a friend's birthday",
					done: false,
				},
			],
		},
		{
			id: 4,
			title: 'Birthday Planning',
			tasks: [
				{
					id: 16,
					title: 'Choose party venue',
					description: 'Select a venue for the birthday party',
					done: false,
				},
				{
					id: 17,
					title: 'Send out invitations',
					description: 'Send out invitations to friends and family',
					done: false,
				},
				{
					id: 18,
					title: 'Order birthday cake',
					description: 'Place an order for a customized birthday cake',
					done: false,
				},
				{
					id: 19,
					title: 'Plan party decorations',
					description: 'Plan and purchase decorations for the party',
					done: true,
				},
				{
					id: 20,
					title: 'Organize entertainment',
					description: 'Arrange entertainment activities for the party',
					done: true,
				},
			],
		},
	]);

	const handleGroupSelect = (groupId) => {
		setSelectedGroupId(groupId);
	};

	const handleCreateGroup = (newGroup) => {
		// Update groups array by adding the new group
		setGroups([...groups, newGroup]);
		console.log(groups);
	};

	const handleAddTask = (groupId, newTask) => {
		const updatedGroups = groups.map((group) => {
			if (group.id === groupId) {
				return {
					...group,
					tasks: [...group.tasks, newTask],
				};
			}
			return group;
		});
		setGroups(updatedGroups);
	};

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<h1>Tasks - My List</h1>
				</div>
				<div className="App-wrapper">
					<Sidebar
						groups={groups}
						onGroupSelect={handleGroupSelect}
						selectedGroupId={selectedGroupId}
						onCreateGroup={handleCreateGroup}
					/>
					<Content
						groups={groups}
						selectedGroupId={selectedGroupId}
						onAddTask={handleAddTask}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
