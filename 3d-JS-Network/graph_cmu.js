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

// controls

graph(document.getElementById('3d-graph-1'))
  .jsonUrl('3d-JS-Network/datasets/graph_20_com_complete_communities.json')
  .nodeColor(node => communityColor[node['community']])
  .cameraPosition([{x: -3000, y: -100, z: 1000 }])
  .nodeRelSize(15)

// Nodes
  .nodeLabel(node => `${node.name}:
     community ${node.community}, 
     ${node.gender?node.gender : 'unknown gender'}`)

// Links
  .linkOpacity(0.2);
  //.linkLabel('Number_of_common_movies')


graph.backgroundColor('black')
graph.width([730])
graph.height([600])