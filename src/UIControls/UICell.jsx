import { useState, useEffect } from "react";
import { withJsonFormsCellProps } from "@jsonforms/react";

import { MuiInputText } from "@jsonforms/material-renderers/src/mui-controls/index";
import CasinoIcon from "@mui/icons-material/Casino";
import { Stack } from "@mui/material";

import { random_runes } from "./../generator/tools";

function UIslider(props) {
  const { data, path, handleChange } = props;

  useEffect(() => {
    if (!data) handleRandom();
  }, []);

  function handleRandom() {
    handleChange(path, random_runes(1).at(0));
  }

  return (
    <Stack direction='row' alignItems='center'>
      <MuiInputText {...props} />
      <CasinoIcon onClick={handleRandom} />
    </Stack>
  );
}

export default withJsonFormsCellProps(UIslider);
