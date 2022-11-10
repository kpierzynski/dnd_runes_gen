/** @jsxRuntime classic */
/** @jsx jsx */

import { Card, CardContent, CardActions, Button, Divider } from "@mui/material";

import { Tree as DNDTree, getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

import { useTheme, css, jsx } from "@emotion/react";

import TreeElement from "./TreeElement";

function Tree({ treeData, selectedIndex, reference, callbacks }) {
	const { onMove, onAdd, onRemove, onPick } = callbacks;

	const theme = useTheme();

	function handleMove(newTree) {
		onMove(newTree);
	}

	function handleAdd() {
		onAdd();
	}

	function handleRemove() {
		onRemove();
	}

	function handlePick(id) {
		onPick(id);
	}

	return (
		<Card style={{ marginBottom: "1rem" }}>
			<CardContent style={{ paddingBottom: "0px" }}>
				<div
					css={{
						height: "100%",
						"& .droptarget": {
							backgroundColor: theme.palette.action.selected
						},
						"& .container": {
							paddingBottom: "4rem"
						}
					}}
				>
					<DndProvider backend={MultiBackend} options={getBackendOptions()}>
						<DNDTree
							classes={{
								dropTarget: "droptarget",
								root: "container"
							}}
							ref={reference}
							tree={treeData}
							rootId={0}
							onDrop={handleMove}
							render={(node, { depth, isOpen, hasChild, onToggle }) => (
								<TreeElement
									text={node.data.settings.name}
									hasChild={hasChild}
									depth={depth}
									node={node}
									isOpen={isOpen}
									onToggle={onToggle}
									isSelected={node.id === selectedIndex}
									onClick={handlePick}
								/>
							)}
						/>
					</DndProvider>
				</div>

				<Divider />
				<CardActions>
					<Button size="small" onClick={handleAdd}>
						ADD
					</Button>
					<Button size="small" onClick={handleRemove}>
						REMOVE
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
}

export default Tree;
