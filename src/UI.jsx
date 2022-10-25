import { useRef, useState, useEffect } from 'react'
import './UI.css'

import UIprimitive from "./UI_inputs/UIprimitive"

import update from 'immutability-helper';

const initObject = {
	ring: {
		radius: 300,
		thickness: 30,
		text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text",
		text_size: 20
	},
	glyph: {
		radius: 160,
		glyphs: ["A"],
		size: 50
	},
	lines: [
		{
			vertices: 8,
			steps: 4
		}
	],
	planets: {
		center: true,
		slots: 3,
    nested: {
      prop: 0
    }
	}
};

const schema = {
  type: "object",
  properties: {
    ring: {
      type: "object",
      properties: {
       radius: {
         type: "number"
       },
       thickness: {
         type: "number"
       },
       text: {
         type: "string"
       },
       text_size: {
         type: "number"
       }
      }
    },
    glyph: {
      type: "object",
      properties: {
        radius: {
          type: "number"
        },
        glyphs: {
          type: "array",
          items: {
            type: "string"
          }
        },
        size: {
          type: "number"
        }
      }
    },
    lines: {
      type: "array",
      items: {
        type: "object",
        properties: {
          vertices: {
            type: "number"
          },
          steps: {
            type: "number"
          }
        }
      }
    },
    planets: {
      type: "object",
      properties: {
        center: {
          type: "boolean"
        },
        slots: {
          type: "number"
        },
        nested: {
          type: "object",
          properties: {
            prop: {
              type: "number"
            }
          }
        }
      }
    }
  }
}

function UI({onChange}) {

  const [data, setData] = useState(initObject);

  function handleChange(path, value) {
    let obj = {...data};
    let c = obj;
    for( let i = 0; i < path.length-1; i++ ) {
      c = c[path[i]];
    }
    c[path.at(-1)] = value;
    setData(obj);
    onChange(obj);
  }

  function generateUI(schema, name) {

      const primitives = {
        boolean: "checkbox",
        number: "number",
        string: "text"
      }

      switch( schema.type ) {
        case "array":
          return <div className='box'>{name.at(-1)} {generateUI(schema.items, name)}</div>

        case "object":
          return <div className='box'>{name.at(-1)} {Object.entries(schema.properties).map( ([key, value]) => {
            return <div className="">{generateUI(value, [...name, key])}</div>
          })}</div>

        default:
          return <UIprimitive type={primitives[schema.type]} onChange={handleChange} path={name} title={name.at(-1)} />
      }

  }

  return (
    <div className="ui_container">
      {JSON.stringify(data)}
      {generateUI(schema, [])}
    </div>
  )
}

export default UI
