const graph = ForceGraph3D()

const communityColor = {
  '0': 'blue',
  '1': 'green',
  '2': 'purple',
  '3': 'yellow',
  '4': 'orange',
  '5': 'red',
  '6': 'darkgreen',
  '7': 'grey',
  '8': '#77dd77', // 'pastelgreen',
  '9': 'pink',
  '10': '#4acfee', // 'aquablue',
  '11': '#2719a1', // 'indigoblue',
  '12': '#fc5a8d', // 'strawberry',
  '13': '#08ff08', // 'fluorescentgreen',
  '14': '#2c6705', // 'bamboo',
  '15': 'white',
  '16': '#b7410e', // 'rust',
  '17': 'magenta',
  '18': '#d473d4', // 'mauve',
  '19': '#9d7651', // 'mocha',
}

const genderColor = {
  "M": 'blue',
  'F': 'pink',
  NaN: 'grey',
}

const nationalityColor = {
  'United States of America': 'blue',
  'India': 'green',
  'United Kingdom': 'purple',
  'France': 'yellow',
  'Italy': 'orange',
  'Japan': 'red',
  'Canada': 'darkgreen',
  'Germany': 'grey',
  'Argentina': '#77dd77', // 'pastelgreen',
  'Hong Kong': 'pink',
  'Spain': '#4acfee', // 'aquablue',
  'Australia': '#2719a1', // 'indigoblue',
  'South Korea': '#fc5a8d', // 'strawberry',
  'Mexico': '#08ff08', // 'fluorescentgreen',
  'Netherlands': '#2c6705', // 'bamboo',
  'Sweden': 'white',
  'West Germany': '#b7410e', // 'rust',
  'China': 'magenta',
  'Denmark': '#d473d4', // 'mauve',
  'Soviet Union': '#9d7651', // 'mocha',
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
  let minYear = 1900;
  let maxYear = 2023;
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
      if ((minYear != 1900 || maxYear != 2023) && (node.year < minYear || node.year > maxYear || node.year == NaN)) {
        return 'gray';
      }
      switch (mode) {
        case colorMode.COMMUNITY:
          return (communityFilter[node.community] ?? true) ? (communityColor[node.community] ?? 'gray'): 'gray';
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

const buildGraph = (data, colorMapper) => {
  graph(document.getElementById('3d-graph'))
    .nodeRelSize(15)
    .nodeColor((node) => colorMapper.color(node))
    .nodeLabel(node => `${node.name}:
  community ${node.community}, 
  ${node.gender ? node.gender : 'unknown gender'}`)
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

const updateGraph = (g, data) => {
  g.graphData(data);
}

const buildLabelSelectors = (g, colorMapper, data) => {
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
fetch('/3d-JS-Network/datasets/graph_complete_communities.json')
  .then(response => response.json())
  .then((data) => buildLabelSelectors(graph, colorMapper, data))
  .then((data) => buildColorSelectors(graph, colorMapper, data))
  .then((data) => buildRangeSelectors(graph, colorMapper, data))
  .then((data) => buildGraph(data, colorMapper))
