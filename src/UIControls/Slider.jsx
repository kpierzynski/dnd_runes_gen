import { useState } from "react";
import { withJsonFormsControlProps } from '@jsonforms/react';

import { Slider } from "@mui/material";

import { useDebouncedChange } from '@jsonforms/material-renderers/src/util';

function eventToValue(e) {
    return +e.target.value;
}

function UIslider(props) {
    const {data, path, handleChange} = props;
    const [initialData, setInitialData] = useState(data);

    const [inputValue, onChange] = useDebouncedChange(handleChange, '', data, path, eventToValue)

    function handleRange(e) {
        handleChange(path, +e.target.value)
    }

    return <Slider value={inputValue} defaultValue={initialData} max={500} min={1} onChange={onChange} />

}

export default withJsonFormsControlProps(UIslider);