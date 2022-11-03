const uischema = {
	type: "VerticalLayout",
	elements: [
		{
			type: "Group",
			label: "Settings",
			elements: [
				{
					type: "Control",
					scope: "#/properties/settings/properties/name"
				},
				{
					type: "Control",
					scope: "#/properties/settings/properties/position"
				},
				{
					type: "Control",
					scope: "#/properties/settings/properties/planets"
				}
			]
		},
		{
			type: "Group",
			label: "Outer Ring",
			elements: [
				{
					type: "Control",
					scope: "#/properties/ring/properties/radius"
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/thickness"
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/transparent_center"
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/text",
					options: {
						multi: true
					}
				},
				{
					type: "Control",
					scope: "#/properties/ring/properties/text_size"
				}
			]
		},
		{
			type: "Group",
			label: "Inner Lines",
			elements: [
				{
					type: "Control",
					scope: "#/properties/lines/properties/center_lines"
				},
				{
					type: "Control",
					scope: "#/properties/lines/properties/center_lines_count",
					rule: {
						effect: "DISABLE",
						condition: {
							scope: "#/properties/lines/properties/center_lines",
							schema: {
								enum: [false]
							}
						}
					}
				},
				{
					type: "Control",
					scope: "#/properties/lines/properties/lines",
					options: {
						showSortButtons: true
					}
				}
			]
		},
		{
			type: "Group",
			label: "Glyphs",
			elements: [
				{
					type: "Control",
					scope: "#/properties/glyph/properties/radius"
				},
				{
					type: "Control",
					scope: "#/properties/glyph/properties/size"
				},
				{
					type: "Control",
					scope: "#/properties/glyph/properties/glyphs",
					options: {
						showSortButtons: true
					}
				}
			]
		}
	]
};

export default uischema;
