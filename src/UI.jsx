import { useRef, useState, useEffect } from 'react'
import './UI.css'

import { random_runes } from './generator/tools';
import { ThemeProvider, createTheme} from '@mui/material/styles'
import { Card, CardContent, CardActions, Button, CssBaseline } from "@mui/material";

import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';

import sliderTester from "./UIControls/SliderTester"
import Slider from "./UIControls/Slider"

import accordeonTester from "./UIControls/AccordeonTester";
import Accordeon from './UIControls/Accordeon';

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: sliderTester, renderer: Slider },
  { tester: accordeonTester, renderer: Accordeon },
];

import { JsonForms } from '@jsonforms/react';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const schema = {
  type: "object",
  properties: {
    settings: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        planets: {
          type: "integer",
        },
        position: {
          type: "integer"
        },
      },
      required: ["name", "position", "planets"]
    },
    ring: {
      type: "object",
      properties: {
       radius: {
         type: "integer",
         format: "slider",
       },
       thickness: {
         type: "integer"
       },
       transparent_center: {
        type: "boolean"
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
  },
  required: ["ring"]
}

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "Settings",
      elements: [
        {
          type: "Control",
          scope: "#/properties/settings/properties/name"
        },
        {
          type: "Control",
          scope: "#/properties/settings/properties/position"
        },
        {
          type: "Control",
          scope: "#/properties/settings/properties/planets"
        }
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
          scope: "#/properties/ring/properties/transparent_center"
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
  settings: {
    name: "Rune",
    position: 0,
    planets: 3
  },
  ring: {
    radius: 200,
    thickness: 30,
    transparent_center: false,
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

  const ref = useRef();
  const [treeData, setTreeData] = useState(treeInit);
  const handleDrop = (newTreeData) => setTreeData(newTreeData);

  function handleChange({data: newData, errors}) {
    setUiData(newData);
    if( errors.length > 0 ) return;
    
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
    newObject.data.settings.name = "New Rune";
    if( ref.current ) ref.current.open(newObject.parent);
    setSelectedIndex(newObject.id);
    setTreeData([...treeData, newObject])
  }

  function handleRemoveRune() {

    const parentId = treeData.find(item => item.id === selectedIndex).parent;
    setSelectedIndex( parentId !== 0 ? parentId : 1 );

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
    ("changed")
    const nest = (items, id = 0, link = 'parent') =>
    items
    .filter(item => item[link] === id)
    .map(item => ({
      ...item,
      children: nest(items, item.id)
    }));

    onChange(nest(treeData));
  }, [treeData])
  
  useEffect( () => {
    setUiData( treeData.find(item => item.id === selectedIndex).data );
  }, [selectedIndex])

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
        ref={ref}
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, {depth, isOpen, hasChild, onToggle}) => <TreeElement text={node.data.settings.name} hasChild={hasChild} depth={depth} node={node} isOpen={isOpen} onToggle={onToggle} isSelected={node.id === selectedIndex} onClick={onPick} />}
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
         renderers={renderers}
         cells={materialCells}
         onChange={handleChange}
       />

    </div>
    </ThemeProvider>
  )
}

export default UI;
