import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

import Slider, { tester as sliderTester } from "./../UIControls/Slider";
import Accordeon, { tester as accordeonTester } from "./../UIControls/Accordeon";
import Cell, { tester as cellTester } from "./../UIControls/UICell";

import uischema from "./../uischema";
import schema from "./../schema";

const renderers = [
	...materialRenderers,
	{ tester: sliderTester, renderer: Slider },
	{ tester: accordeonTester, renderer: Accordeon }
];

const cells = [...materialCells, { tester: cellTester, cell: Cell }];

function Form({ onChange, data }) {
	function handleChange({ data: newData, errors }) {
		if (errors.length > 0) return;
		onChange(newData);
	}

	return (
		<JsonForms
			schema={schema}
			uischema={uischema}
			data={data}
			renderers={renderers}
			cells={cells}
			onChange={handleChange}
		/>
	);
}

export default Form;
