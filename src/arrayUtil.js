const depth = (items, id) => {
	const item = items.find((item) => item.id === id);
	if (item) return 1 + depth(items, item.parent);

	return 0;
};

const remove = (items, id) => {
	if (id.length === 0) return items;
	const result = items.filter((item) => !id.includes(item.id));
	return remove(
		result.filter((item) => !id.includes(item.parent)),
		result.filter((item) => id.includes(item.parent)).map((item) => item.id)
	);
};

const nest = (items, id = 0, link = "parent") =>
	items
		.filter((item) => item[link] === id)
		.map((item) => ({
			...item,
			children: nest(items, item.id)
		}));

export { depth, remove, nest };
