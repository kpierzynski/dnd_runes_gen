import { useState } from "react";

import { useJsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, schemaTypeIs, uiTypeIs, schemaMatches, and, isRangeControl, showAsRequired } from "@jsonforms/core";
import { useDebouncedChange } from "@jsonforms/material-renderers/src/util";

import { Slider, Typography, FormLabel } from "@mui/material";

import merge from "lodash/merge";

function eventToValue(e) {
	if (Number.isInteger(e)) return e;
	return +e.target.value;
}

function path2property(obj, path) {
	try {
		return path.split(".").reduce((a, b) => a[b], obj);
	} catch (err) {
		return;
	}
}

function UIslider(props) {
	const { handleChange, data, path, label, id, required, errors, config, enabled, schema } = props;

	const { core } = useJsonForms();

	const isValid = errors.length === 0;
	const [initialData, _] = useState(data);

	const [inputValue, onChange] = useDebouncedChange(handleChange, 0, data, path, eventToValue, 50);

	const appliedUiSchemaOptions = merge({}, config, props.uischema.options);

	let maximum;
	if (typeof schema.max === "string") {
		maximum = path2property(core.data, schema.max);
	}
	if (typeof schema.max === "object") {
		maximum = schema.max.f(path2property(core.data, schema.max.path));
	}
	if (!maximum) maximum = 500;

	if (maximum < inputValue) {
		onChange(maximum);
	}

	const labelStyle = {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		width: "100%"
	};

	const marks = [
		{
			value: 1,
			label: "0"
		},
		{
			value: maximum,
			label: maximum.toString()
		}
	];

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
			<Slider
				marks={marks}
				valueLabelDisplay="auto"
				disabled={!enabled}
				value={inputValue}
				defaultValue={initialData}
				max={maximum}
				min={1}
				onChange={onChange}
			/>
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
