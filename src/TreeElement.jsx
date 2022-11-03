/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useRef, useState, useEffect } from "react";
import "./TreeElement.css";

import { KeyboardArrowRight, KeyboardArrowDown, DeviceHub, SpaRounded } from "@mui/icons-material";
import { Typography, Stack } from "@mui/material";
import { useTheme, css, jsx } from "@emotion/react";

function TreeElement({ node, depth, hasChild, isSelected, isOpen, onToggle, onClick, text }) {
  const theme = useTheme();
  const isDisabled = !hasChild;

  const IconType = isOpen ? KeyboardArrowDown : KeyboardArrowRight;
  function iconClick(e) {
    if (isDisabled) return;
    onToggle(e);
  }
  const icon = <IconType color={isDisabled ? "disabled" : "inherit"} onClick={iconClick} />;

  const style = css`
    border-left: 5px solid transparent;
    padding-left: calc(${depth}*1rem);
    &:hover {
      background-color: ${theme.palette.grey["800"]};
    }
  `;

  const selectedStyle = css`
    border-left: 5px solid ${theme.palette.primary.dark};
  `;

  return (
    <div css={[style, isSelected && selectedStyle]} onClick={() => onClick(node.id)}>
      <Stack direction='row' alignItems='center'>
        {node.droppable && icon}
        <Typography>{text}</Typography>
      </Stack>
    </div>
  );
}

export default TreeElement;
