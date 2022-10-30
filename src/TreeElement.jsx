import { useRef, useState, useEffect } from 'react'
import './TreeElement.css'

import {KeyboardArrowRight, KeyboardArrowDown, DeviceHub, SpaRounded } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';

function TreeElement({node, depth, hasChild, isSelected, isOpen, onToggle, onClick, text}) {

  const isDisabled = !hasChild;

  const IconType = isOpen ? KeyboardArrowDown : KeyboardArrowRight;
  function iconClick(e) {
    if( isDisabled ) return;
    onToggle(e);
  }
  const icon = <IconType color={ isDisabled ? "disabled" : "inherit"} onClick={iconClick} />
 
  return (

        <div className={`element ${isSelected ? "element_selected" : ""}`} onClick={() => onClick(node.id)} style={{paddingLeft: `calc(${depth}*1rem + 1rem)` }}>
          <Stack direction="row" alignItems="center">
            {node.droppable && icon}
           <Typography>{text}</Typography>
          </Stack>
        </div>

    )
}

export default TreeElement;