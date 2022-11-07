const schema = {
	type: "object",
	properties: {
		settings: {
			type: "object",
			properties: {
				name: {
					type: "string"
				},
				planets: {
					type: "integer"
				},
				position: {
					type: "integer"
				}
			},
			required: ["name", "position", "planets"]
		},
		ring: {
			type: "object",
			properties: {
				radius: {
					type: "integer",
					format: "slider"
				},
				thickness: {
					type: "integer",
					format: "slider",
					max: "ring.radius"
				},
				transparent_center: {
					type: "boolean"
				},
				text: {
					type: "string",
					options: {
						multi: true
					}
				},
				text_size: {
					type: "integer"
				}
			},
			required: ["radius", "thickness"]
		},
		glyph: {
			type: "object",
			properties: {
				radius: {
					type: "integer",
					format: "slider",
					max: { path: "ring.radius", f: (x) => ~~((3 / 2) * x) }
				},
				glyphs: {
					type: "array",
					items: {
						type: "string"
					}
				},
				size: {
					type: "integer"
				},
				border: {
					type: "boolean"
				},
				border_radius: {
					type: "integer",
					format: "slider",
					max: "glyph.size"
				}
			}
		},
		lines: {
			type: "object",
			properties: {
				center_lines: { type: "boolean" },
				center_lines_count: { type: "integer", minimum: 2 },
				star: { type: "boolean" },
				star_arm_count: { type: "integer", minimum: 5 },
				lines: {
					type: "array",
					items: {
						type: "object",
						properties: {
							vertices: {
								type: "integer",
								minimum: 3
							},
							steps: {
								type: "integer",
								minimum: 1
							}
						},
						required: ["vertices", "steps"]
					}
				}
			}
		}
	},
	required: ["ring"]
};

export default schema;
