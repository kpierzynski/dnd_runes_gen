import { useRef, useState, useEffect } from 'react'
import './TreeElement.css'

function TreeElement({node, depth, hasChild, isSelected, isOpen, onToggle, onClick, text}) {
console.log(node);
  return (
      <div className={`element ${isSelected ? "element_selected" : ""}`} onClick={() => onClick(node.id)} style={{marginLeft: `calc(${depth}*0.3rem)` }}>
        {node.droppable && (
          hasChild && <span onClick={onToggle}>{isOpen ? "[-] " : "[+] "}</span>
        )}
        {text}
      </div>
    )
}

export default TreeElement;