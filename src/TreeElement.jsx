import { useRef, useState, useEffect } from 'react'
import './TreeElement.css'

import {KeyboardArrowRight, KeyboardArrowDown, DeviceHub } from '@mui/icons-material';
import { Typography, Stack } from '@mui/material';

function TreeElement({node, depth, hasChild, isSelected, isOpen, onToggle, onClick, text}) {

  return (

        <div className={`element ${isSelected ? "element_selected" : ""}`} onClick={() => onClick(node.id)} style={{paddingLeft: `calc(${depth}*1rem)` }}>
          <Stack direction="row" alignItems="center">
          {node.droppable && (
          isOpen ? <KeyboardArrowDown onClick={onToggle} /> : <KeyboardArrowRight onClick={onToggle}/>
         )}
          <Typography>{text}</Typography>
          </Stack>
        </div>

    )
}

export default TreeElement;