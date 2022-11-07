import { useEffect } from "react";

import { withJsonFormsCellProps } from "@jsonforms/react";
import { rankWith, isStringControl } from "@jsonforms/core";

import { MuiInputText } from "@jsonforms/material-renderers/src/mui-controls/index";
import Stack from "@mui/material/Stack";
import CasinoIcon from "@mui/icons-material/Casino";

import { random_glyphs } from "./../../util/random";

function UIslider(props) {
	const { data, path, handleChange } = props;

	useEffect(() => {
		if (data) return;
		handleRandom();
	}, []);

	function handleRandom() {
		handleChange(path, random_glyphs(1).at(0));
	}

	return (
		<Stack direction="row" alignItems="center">
			<MuiInputText {...props} />
			<CasinoIcon onClick={handleRandom} />
		</Stack>
	);
}

export const tester = rankWith(3, isStringControl);

export default withJsonFormsCellProps(UIslider);
