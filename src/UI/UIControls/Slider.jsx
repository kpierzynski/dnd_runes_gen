import { useState } from "react";

import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, schemaTypeIs, uiTypeIs, schemaMatches, and, isRangeControl, showAsRequired } from "@jsonforms/core";
import { useDebouncedChange } from "@jsonforms/material-renderers/src/util";

import { Slider, Typography, FormLabel } from "@mui/material";

import merge from "lodash/merge";

function eventToValue(e) {
	return +e.target.value;
}

function UIslider(props) {
	const { handleChange, data, ...rest } = props;
	const { path, label, id, required, errors, config } = rest;

	const isValid = errors.length === 0;
	const [initialData, _] = useState(data);

	const [inputValue, onChange] = useDebouncedChange(handleChange, 0, data, path, eventToValue, 50);

	const appliedUiSchemaOptions = merge({}, config, props.uischema.options);

	const labelStyle = {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		width: "100%"
	};

	return (
		<>
			<FormLabel
				htmlFor={id}
				error={!isValid}
				component={"legend"}
				required={showAsRequired(required, appliedUiSchemaOptions.hideRequiredAsterisk)}
			>
				<Typography id={id + "-typo"} style={labelStyle} variant="caption">
					{label}
				</Typography>
			</FormLabel>
			<Slider value={inputValue} defaultValue={initialData} max={500} min={1} onChange={onChange} />
		</>
	);
}

export const tester = rankWith(
	3,
	and(
		uiTypeIs("Control"),
		schemaTypeIs("integer"),
		schemaMatches((schema) => {
			if (schema.hasOwnProperty("format")) {
				return schema["format"] === "slider";
			}
			return false;
		})
	)
);

export default withJsonFormsControlProps(UIslider);
