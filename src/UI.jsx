import { useRef, useState, useEffect } from 'react'
import './UI.css'

import UInumber from "./UI_inputs/UInumber"

const schema = {
  "type": "object",
  "properties": {
    "radius": {
      "type": "number"
    },
    "settings": {
      "type": "object",
      "properties": {
        "setting1": {
          "type": "number"
        },
        "setting2": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "value1": {
                "type": "number"
              },
              "value2": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  }
}

function UI() {

  function generateUI(name, schema) {

      switch( schema.type ) {
        case "number":
          return <UInumber title={name} />

        case "array":
          return generateUI(name, schema.items)

        case "object":
          return <div>{name} {Object.entries(schema.properties).map( ([key, value]) => {
            return <div className="box2">{generateUI(key, value)}</div>
          })}</div>
      }

  }

  return (
    <div className="ui_container">
      {generateUI("ring", schema)}
    </div>
  )
}

export default UI
