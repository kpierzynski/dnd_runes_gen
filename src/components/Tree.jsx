import { useState } from "react";

import { ACTIONS, useStore } from "../stores/store";

export default function TreeView() {
	const { state, dispatch } = useStore();
	const tree = state.rune;

	const [isExpanded, setIsExpanded] = useState({});

	const toggleExpand = (name) => {
		setIsExpanded((prev) => ({
			...prev,
			[name]: !prev[name],
		}));
	};

	function handleSelectionChange(name) {
		dispatch({ type: ACTIONS.setSelected, selected: name });
	}

	const renderTree = (node, depth = 0) => {
		return (
			<div key={node.name} className={`pl-${depth * 4} mb-2 `}>
				<div className="flex">
					<div
						className="flex items-center cursor-pointer"
						onClick={() => toggleExpand(node.name)}
					>
						<span className="mr-2">{isExpanded[node.name] ? "▾" : "▴"}</span>
					</div>
					<span
						onClick={() => handleSelectionChange(node.name)}
						className={`rounded px-3 py-1  ${
							state.selected === node.name
								? "underline bg-gray-300"
								: "hover:bg-gray-100"
						}`}
					>
						{node.name}
					</span>
				</div>

				{isExpanded[node.name] && (
					<div className="ml-4 mt-1">
						{node.children && node.children.length > 0 && (
							<div className="mt-2">
								{node.children.map((child) => renderTree(child, depth + 1))}
							</div>
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="bg-white border border-gray-300 p-2">
			{renderTree(tree)}
			<button
				className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-center w-full"
				onClick={() =>
					dispatch({
						type: ACTIONS.addChild,
						name: state.selected,
					})
				}
			>
				Add child to selected
			</button>
			<button
				className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-center w-full"
				onClick={() =>
					dispatch({
						type: ACTIONS.removeChild,
						name: state.selected,
					})
				}
			>
				Remove selected child
			</button>
		</div>
	);
}
