import { useRef, useState, useEffect } from 'react'
import './UI.css'

import { random_runes } from './generator/tools';
import { ThemeProvider, createTheme} from '@mui/material/styles'
import { Card, CardContent, CardActions, Button, CssBaseline } from "@mui/material";

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

const schema = {
  type: "object",
  properties: {
    name: {
      type: "object",
      properties: {
        name: {
          type: "string"
        }
      },
      required: ["name"]
    },
    position: {
      type: "object",
      properties: {
        position: {
          type: "integer"
        },
      }
    },
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
        slots: {
          type: "integer"
        },
      },
    },
  },
  required: ["ring","name"]
}

const uischema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "Group",
      label: "Name",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name/properties/name"
        }
      ]
    },
    {
      type: "Group",
      label: "Position",
      elements: [
        {
          type: "Control",
          scope: "#/properties/position/properties/position"
        },
      ]
    },
    {
      type: "Group",
      label: "Outer Ring",
      elements: [
        {
          type: "Control",
          scope: "#/properties/ring/properties/radius",
        }, 
        {
          type: "Control",
          scope: "#/properties/ring/properties/thickness"
        },
        {
          type: "Control",
          scope: "#/properties/ring/properties/text",
          options: {
            "multi": true
          }
        },
        {
          type: "Control",
          scope: "#/properties/ring/properties/text_size"
        }
      ]
    },
    {
      type: "Group",
      label: "Planets",
      elements: [
        {
          type: "Control",
          scope: "#/properties/planets/properties/slots"
        },
      ]
    },
    {
      type: "Group",
      label: "Inner Lines",
      elements: [
        {
          type: "Control",
          scope: "#/properties/lines"
        }
      ]
    },
    {
      type: "Group",
      label: "Glyphs",
      elements: [
        {
          type: "Control",
          scope: "#/properties/glyph/properties/radius"
        },
        {
          type: "Control",
          scope: "#/properties/glyph/properties/size"
        },
        {
          type: "Control",
          scope: "#/properties/glyph/properties/glyphs"
        }
      ]
    }
  ]
}

const example = {
  name: {
    name: "Rune"
  },
  position: {
    position: 0
  },
  ring: {
    radius: 200,
    thickness: 30,
    text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text",
    text_size: 20
  },
  glyph: {
    radius: 0,
    glyphs: [],
    size: 50
  },
  lines: [
    {
      vertices: 5,
      steps: 1
    }
  ],
  planets: {
    slots: 3
  }
};

const treeInit = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    data: example
  },
]

import {
  Tree,
  getBackendOptions,
  MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";

import update from "immutability-helper";
import TreeElement from './TreeElement';

function UI({onChange}) {
  
  const [uiData, setUiData] = useState(treeInit[0].data);
  const [selectedIndex, setSelectedIndex] = useState(treeInit[0].id);

  const [treeData, setTreeData] = useState(treeInit);
  const ref = useRef();
  const handleDrop = (newTreeData) => setTreeData(newTreeData);

  function handleChange({data: newData, errors}) {
    setUiData(newData);
    if( errors.length > 0 ) return;
    
    treeData.find(item => item.id === selectedIndex) 

    const index = treeData.findIndex( item => item.id === selectedIndex );

    const newTreeData = update( treeData, { [index]: {
      data: {
        $set: newData
      }
    } } );

    setTreeData(newTreeData);
  }

  function handleNewRune() {
    const newObject = {
      id: treeData.length + 1,
      parent: selectedIndex,
      droppable: true,
      data: structuredClone(example) 
    }
    newObject.data.name.name = "New Rune"
    setTreeData([...treeData, newObject])
  }

  function handleRemoveRune() {

    setSelectedIndex(1);

    const clean = (arr, id) => {

      if( id.length === 0 ) return arr;
      const result = arr.filter(item => !id.includes(item.id) );
      return clean( result.filter(item => !id.includes(item.parent) ), result.filter(item => id.includes(item.parent)).map(item => item.id) );
    }

    const result = clean(treeData, [selectedIndex]);
    if( result.length === 0 ) return;
    setTreeData(result);
  }

  useEffect( () => {
    const nest = (items, id = 0, link = 'parent') =>
    items
    .filter(item => item[link] === id)
    .map(item => ({
      ...item,
      children: nest(items, item.id)
    }));

    onChange(nest(treeData));
  }, [treeData])

  function onPick(id) {
    setSelectedIndex(id);
    setUiData( treeData.find(item => item.id === id).data );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="container">
      <Card style={{marginBottom: "1rem"}} theme={darkTheme}>
        <CardContent>
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, {depth, isOpen, hasChild, onToggle}) => <TreeElement text={node.data.name.name} hasChild={hasChild} depth={depth} node={node} isOpen={isOpen} onToggle={onToggle} isSelected={node.id === selectedIndex} onClick={onPick} />}
      />
    </DndProvider>
    <CardActions>
      <Button size="small" onClick={handleNewRune}>ADD</Button>
      <Button size="small" onClick={handleRemoveRune}>REMOVE</Button>
    </CardActions>
    </CardContent>
    </Card>

       <JsonForms
         schema={schema}
         uischema={uischema}
         data={uiData}
         renderers={materialRenderers}
         cells={materialCells}
         onChange={handleChange}
       />

    </div>
    </ThemeProvider>
  )
}

export default UI;
