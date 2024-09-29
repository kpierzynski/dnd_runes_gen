import React, { createContext, useReducer, useContext } from "react";
import update from "immutability-helper";

import { generateRandomRune, getRandomInt } from "../utils/utils";

const initialRune = generateRandomRune(1);
initialRune.name = "root";

const childrenCount = getRandomInt(0, 3);

initialRune.children = Array.from({ length: childrenCount }, () =>
	generateRandomRune(2)
);

const initialState = {
	rune: initialRune,

	selected: "root",
};

export const ACTIONS = {
	setSelected: "SETSELECTED",
	setSettings: "SETSETTINGS",
	addChild: "ADDCHILD",
	removeChild: "REMOVECHILD",
};

const removeChildByName = (items, name) => {
	return items.reduce((acc, item) => {
		if (item.name === name) {
			return acc; // Skip the item to remove it
		}
		if (item.children) {
			const updatedChildren = removeChildByName(item.children, name);
			if (updatedChildren.length !== item.children.length) {
				return [...acc, { ...item, children: updatedChildren }]; // Only update if children changed
			}
		}
		return [...acc, item]; // Include item if it wasn't removed
	}, []);
};

const findAndUpdate = (items, name, updateSpec) => {
	return items.map((item) => {
		if (item.name === name) {
			return update(item, updateSpec);
		} else if (item.children && item.children.length > 0) {
			return {
				...item,
				children: findAndUpdate(item.children, name, updateSpec),
			};
		}
		return item;
	});
};

const reducer = (state, action) => {
	const { type, ...params } = action;

	switch (type) {
		case ACTIONS.setSelected:
			return { ...state, selected: params.selected };

		case ACTIONS.setSettings: {
			const { name, updateSpec } = params;
			return update(state, {
				rune: {
					$apply: (rune) => ({
						...rune,
						...(rune.name === name
							? update(rune, updateSpec)
							: { children: findAndUpdate(rune.children, name, updateSpec) }),
					}),
				},
			});
		}

		case ACTIONS.addChild: {
			const { name } = params;
			const newChild = generateRandomRune();
			return update(state, {
				rune: {
					$apply: (rune) => ({
						...rune,
						...(rune.name === name
							? { children: [...rune.children, newChild] }
							: {
									children: findAndUpdate(rune.children, name, {
										children: { $push: [newChild] },
									}),
							  }),
					}),
				},
			});
		}

		case ACTIONS.removeChild: {
			const { name } = params;
			const updatedChildren = removeChildByName(state.rune.children, name);
			return {
				...state,
				rune: {
					...state.rune,
					children: updatedChildren,
				},
				selected: "root",
			};
		}

		default:
			return state;
	}
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export function useStore() {
	return useContext(StoreContext);
}
