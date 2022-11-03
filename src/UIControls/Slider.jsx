import { useState } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { showAsRequired } from "@jsonforms/core";

import { Slider, Typography, FormLabel } from "@mui/material";
import merge from "lodash/merge";

import { MaterialSliderControl } from "@jsonforms/material-renderers/src/controls/index";

import { useDebouncedChange } from "@jsonforms/material-renderers/src/util";

function eventToValue(e, p) {
  return +e.target.value;
}

function UIslider(props) {
  const { handleChange, data, ...rest } = props;
  const { path, label, id, required, errors, config } = rest;

  const isValid = errors.length === 0;
  const [initialData, setInitialData] = useState(data);

  const [inputValue, onChange] = useDebouncedChange(handleChange, 0, data, path, eventToValue, 50);

  const appliedUiSchemaOptions = merge({}, config, props.uischema.options);

  const labelStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  };

  return (
    <>
      <FormLabel
        htmlFor={id}
        error={!isValid}
        component={"legend"}
        required={showAsRequired(required, appliedUiSchemaOptions.hideRequiredAsterisk)}
      >
        <Typography id={id + "-typo"} style={labelStyle} variant='caption'>
          {label}
        </Typography>
      </FormLabel>
      <Slider value={inputValue} defaultValue={initialData} max={500} min={1} onChange={onChange} />
    </>
  );
}

export default withJsonFormsControlProps(UIslider);
