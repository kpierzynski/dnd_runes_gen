import { useRef, useState, useEffect } from 'react'
import './UI.css'

import { random_runes } from './generator/tools';
import { person } from '@jsonforms/examples';
import { ThemeProvider, createTheme} from '@mui/material/styles'

import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';

import { JsonForms } from '@jsonforms/react';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

let initialData = {
  main: {
    ring: {
      radius: 300,
      thickness: 30,
      text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text",
      text_size: 20
    },
    glyph: {
      radius: 160,
      glyphs: random_runes(5),
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
      slots: 3
    }
  },
  other: []
}


const runeSchema = {
  type: "object",
  properties: {
    ring: {
      type: "object",
      properties: {
       radius: {
         type: "integer"
       },
       thickness: {
         type: "integer"
       },
       text: {
         type: "string",
         "options":{
          "multi":true
        }
       },
       text_size: {
         type: "integer"
       }
      },
      required: ["radius", "thickness"]
    },
    glyph: {
      type: "object",
      properties: {
        radius: {
          type: "integer"
        },
        glyphs: {
          type: "array",
          items: {
            type: "string"
          }
        },
        size: {
          type: "integer"
        }
      }
    },
    lines: {
      type: "array",
      items: {
        type: "object",
        properties: {
          vertices: {
            type: "integer",
            minimum: 3
          },
          steps: {
            type: "integer",
            minimum: 1
          }
        },
        required: ["vertices", "steps"]
      }
    },
    planets: {
      type: "object",
      properties: {
        center: {
          type: "boolean"
        },
        slots: {
          type: "integer"
        },
      }
    },
  }
}

const planetSchema = structuredClone(runeSchema)
delete planetSchema.properties.planets;
planetSchema.properties.include = {
  type: "object",
  properties: {
    position: {
      type: "integer"
    }
  },
  required: ["position"]
}

let schema = {
  type: "object",
  properties: {
    main: runeSchema,
    other: {
      type: "array",
      items: planetSchema
    }
  }
}

const uiRuneSchema = {
  type: "Group",
  label: "Main",
  elements: [
    {
      type: "Group",
      label: "Outer Ring",
      elements: [
        {
          type: "Control",
          scope: "#/properties/main/properties/ring/properties/radius",
        }, 
        {
          type: "Control",
          scope: "#/properties/main/properties/ring/properties/thickness"
        },
        {
          type: "Control",
          scope: "#/properties/main/properties/ring/properties/text",
          options: {
            "multi": true
          }
        },
        {
          type: "Control",
          scope: "#/properties/main/properties/ring/properties/text_size"
        }
      ]
    },
    {
      type: "Group",
      label: "Planets",
      elements: [
        {
          type: "Control",
          scope: "#/properties/main/properties/planets/properties/center",
        }, 
        {
          type: "Control",
          scope: "#/properties/main/properties/planets/properties/slots"
        },
      ]
    },
    {
      type: "Group",
      label: "Inner Lines",
      elements: [
        {
          type: "Control",
          scope: "#/properties/main/properties/lines"
        }
      ]
    },
    {
      type: "Group",
      label: "Glyphs",
      elements: [
        {
          type: "Control",
          scope: "#/properties/main/properties/glyph/properties/radius"
        },
        {
          type: "Control",
          scope: "#/properties/main/properties/glyph/properties/size"
        },
        {
          type: "Control",
          scope: "#/properties/main/properties/glyph/properties/glyphs"
        }
      ]
    }
  ]
}

const uischema = {
  type: "HorizontalLayout",
  elements: [
    uiRuneSchema,
    {
      type: "Group",
      label: "Planets",
      elements: [
        {
          type: "Control",
          scope: "#/properties/other"
        }
      ]
    },
        
  ]
}

function UI({onChange}) {
  
  const [data, setData] = useState(initialData);

  function handleChange({data: newData, errors}) {
    setData(newData);
    if( errors.length > 0 ) return;
    onChange(newData);
  }

  return (
    <div className="container">
      <ThemeProvider theme={darkTheme}>
       <JsonForms
         schema={schema}
         uischema={uischema}
         data={data}
         renderers={materialRenderers}
         cells={materialCells}
         onChange={handleChange}
       />
      </ThemeProvider>
    </div>
  )
}

export default UI;
