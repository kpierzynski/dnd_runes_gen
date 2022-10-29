import { useRef, useState, useEffect } from 'react'
import './TreeElement.css'

import {KeyboardArrowRight, KeyboardArrowDown, DeviceHub } from '@mui/icons-material';

function TreeElement({node, depth, hasChild, isSelected, isOpen, onToggle, onClick, text}) {
console.log(node);
  return (

        <div className={`element ${isSelected ? "element_selected" : ""}`} onClick={() => onClick(node.id)} style={{paddingLeft: `calc(${depth}*1rem)` }}>
         {node.droppable && (
          <span onClick={onToggle}>{isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />}</span>
         )}
        {text}
        </div>

    )
}

export default TreeElement;