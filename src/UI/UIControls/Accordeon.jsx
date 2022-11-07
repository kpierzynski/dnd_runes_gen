import { Accordion, AccordionDetails, AccordionSummary, Hidden, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MaterialLayoutRenderer } from "@jsonforms/material-renderers";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { rankWith, uiTypeIs } from "@jsonforms/core";

const UIAccordeon = ({ uischema, schema, path, visible, renderers }) => {
	const layoutProps = {
		elements: uischema.elements,
		schema: schema,
		path: path,
		direction: "column",
		visible: visible,
		uischema: uischema,
		renderers: renderers
	};
	return (
		<Hidden xsUp={!visible}>
			<Accordion style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>{uischema.label}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<MaterialLayoutRenderer {...layoutProps} />
				</AccordionDetails>
			</Accordion>
		</Hidden>
	);
};

export const tester = rankWith(1000, uiTypeIs("Group"));

export default withJsonFormsLayoutProps(UIAccordeon);
