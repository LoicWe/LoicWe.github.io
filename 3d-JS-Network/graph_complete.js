const graph = ForceGraph3D()

const communityColor = {
  '1': '#2f4f4f', //darkslategray
  '2': '#556b2f', //darkolivegreen
  '3': '#8b4513', //saddlebrown
  '4': '#ff4500', //orangered
  '5': '#00fa9a', //mediumspringgreen
  '6': '#20b2aa', //lightseagreen
  '7': '#8b008b', //darkmagenta
  '8': '#ff1493', //deeppink
  '9': 'yellow',
  '10': '#ffa07a', //lightsalmon
  '11': '#9acd32', //yellowgreen
  '12': '#00ff00', //lime
  '13': 'orange', 
  '14': 'green',
  '15': '#dc143c', //crimson
  '16': 'blue', 
  '17': '#db7093', //palevioletred
  '18': '#eee8aa', //palegoldenrod
  '19': '#ee82ee', //violet
  '20': '#7b68ee', //mediumslateblue
}

const genderColor = {
  "M": 'blue',
  'F': 'pink',
  NaN: 'grey',
}





const nationalityColor = {
  'United States of America': '#FF8E43', //coral
  'United Kingdom': '#FC3B01', //Vermillion
  'Australia': '#FEEFB1', //Buttermilk
  'Canada': '#FF4B2F', //red orange
  
  'India': '#f2e938', //confetti
  'Bhutan' : '#F9DB31', //bright sun
  'Pakistan': 'gold',
  
  'Japan': '#C1E522', //pear
  'Hong Kong': '#ABEF52', //Sulu
  'China': '#9CE692', //granny smith green
  'Taiwan' : '#68ce7f', 
  
  'Egypt' : '#E6EB59',
  
  'France': '#287271', //Skobeloff
  'Italy': '#298880', //Celadon green
  'Germany': '#5a8aa6',
  'Spain': '#3B464E', //lime spruce
  'Netherlands': 'navy',
  'Sweden': '#264653', //charcoal 
  'Ireland': '#264653', 
  'Portugal' : '#D3E7D7', //surf crest

  'Denmark': '#d473d4', // 'mauve',
  'Soviet Union': '#9d7651', // 'mocha',
  'West Germany': '#b7410e', // 'rust',
  'Mexico': '#08ff08', // 'fluorescentgreen',
  'South Korea': '#fc5a8d', // 'strawberry',
  'Argentina': '#77dd77', // 'pastelgreen',
}

const colorMode = {
  COMMUNITY: 'community',
  GENDER: 'gender',
  NATIONALITY: 'nationality',
}

// Will return a statfull color mapper object
const createStatefullColorMapper = () => {
  let mode = colorMode.COMMUNITY;
  let communityFilter = {};
  let minYear = 1804;
  let maxYear = 2011;
  return {
    setCommunityFilter: (community, visible) => {
      communityFilter[community] = visible;
    },
    setMinRange: (value) => {
      minYear = value;
    },
    setMaxRange: (value) => {
      maxYear = value;
    },
    setMode: (m) => {
      mode = m;
    },
    getMode: () => {
      return mode;
    },
    color: (node) => {
      if ((minYear != 1804 || maxYear != 2011) && (node.year < minYear || node.year > maxYear || node.year == NaN)) {
        return 'gray';
      }
      switch (mode) {
        case colorMode.COMMUNITY:
          return (communityFilter[node.community] ?? true) ? (communityColor[node.community] ?? 'gray') : 'gray';
        case colorMode.GENDER:
          return genderColor[node.gender] ?? 'gray';
        case colorMode.NATIONALITY:
          return nationalityColor[node.nationality] ?? 'gray';
        default:
          return 'green'
      }
    }
  }
}

// Will return a statfull label mapper object
const createStatefullLabelMapper = () => {
  let displayOccupations = false;
  return {
    setDisplayOccupations: (display) => {
      displayOccupations = display;
    },
    label: (node) => {
      const base = `${node.name}:\ncommunity ${node.community},\n${node.gender ? node.gender : 'unknown gender'}`;
      if (!displayOccupations) {
        return base;
      }
      return base + '\n' + JSON.parse(node.occupation?.replaceAll(`'`, `"`) ?? '[]')?.join(', ');
    }
  }
}

const buildGraph = (data, colorMapper, labelMapper) => {
  graph(document.getElementById('3d-graph'))
    .nodeRelSize(15)
    .nodeColor(colorMapper.color)
    .nodeLabel(labelMapper.label)
    .onNodeClick(node => {
      // Aim at node from outside it
      const distance = 100;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      const newPos = node.x || node.y || node.z
        ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
        : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

      graph.cameraPosition(
        newPos, // new position
        node // lookAt ({ x, y, z })
      );
    })
    .linkLabel(node => `number of common movies: ${node.Number_of_common_movies}`)
    .linkOpacity(0.2)
    .backgroundColor('black')
    .height([800])
    .graphData(data);
}

const buildLabelsSelectors = (g, colorMapper, data) => {
  const communities = new Set(data.nodes.map((n) => n.community))

  const selectors = document.getElementById('label-selectors');
  [...communities]
    .sort((e1, e2) => parseInt(e1) - parseInt(e2))
    .slice(0, 20)
    .forEach((community) => {
      const li = document.createElement('li');

      const label = document.createElement('label');
      label.setAttribute('value', community);
      label.setAttribute('innerText', community);
      label.style.color = communityColor[community] ?? 'gray';
      label.textContent = community;

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox')
      input.setAttribute('checked', true)
      input.addEventListener('change', (event) => {
        colorMapper.setCommunityFilter(community, event.target.checked);
        g.nodeColor(colorMapper.color);
      })

      li.appendChild(input)
      li.appendChild(label)

      selectors.appendChild(li);
    })
  return data;
}

const buildLabelDiplaySelectors = (g, labelMapper, data) => {
  const selectors = document.getElementById('occupation-selectors');
  const label = document.createElement('label');
  label.setAttribute('value', community);
  label.setAttribute('innerText', community);
  label.textContent = "Display all occupations in labels";

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.addEventListener('change', (event) => {
    console.log(event.target.checked)
    labelMapper.setDisplayOccupations(event.target.checked);
    g.nodeLabel(labelMapper.label);
  })

  selectors.appendChild(label)
  selectors.appendChild(input)
  return data;
}

const buildColorSelectors = (g, colorMapper, data) => {
  const selectors = document.getElementById('color-selectors');
  Object.values(colorMode)
    .forEach((mode) => {
      const li = document.createElement('li');

      const label = document.createElement('label');
      label.setAttribute('for', mode);
      label.setAttribute('value', mode);
      label.setAttribute('innerText', mode);
      label.textContent = mode;

      const input = document.createElement('input');
      input.setAttribute('id', mode);
      input.setAttribute('value', mode);
      input.setAttribute('name', 'colorMode');
      input.setAttribute('type', 'radio');
      if (colorMapper.getMode() == mode) {
        input.setAttribute('checked', true);
      }
      input.addEventListener('change', (event) => {
        colorMapper.setMode(event.target.value);
        g.nodeColor(colorMapper.color)
      })

      li.appendChild(input)
      li.appendChild(label)

      selectors.appendChild(li);
    })
  return data;
}

const buildRangeSelectors = (g, colorMapper, data) => {
  const minSelector = document.getElementById('fromSlider');
  const maxSelector = document.getElementById('toSlider');

  minSelector.addEventListener('input', (event) => {
    colorMapper.setMinRange(event.target.value);
    g.nodeColor(colorMapper.color);
  })
  maxSelector.addEventListener('input', (event) => {
    colorMapper.setMaxRange(event.target.value);
    g.nodeColor(colorMapper.color);
  })

  return data;
}

const colorMapper = createStatefullColorMapper();
const labelMapper = createStatefullLabelMapper();
fetch('/3d-JS-Network/datasets/graph_complete_communities.json')
  .then(response => response.json())
  .then((data) => buildLabelsSelectors(graph, colorMapper, data))
  .then((data) => buildColorSelectors(graph, colorMapper, data))
  .then((data) => buildRangeSelectors(graph, colorMapper, data))
  .then((data) => buildLabelDiplaySelectors(graph, labelMapper, data))
  .then((data) => buildGraph(data, colorMapper, labelMapper))
