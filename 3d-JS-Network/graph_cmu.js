const graph = ForceGraph3D()

const communityColor = {
  '0' : 'blue',
  '1' : 'green',
  '2' : 'purple',
  '3' : 'yellow',
  '4' : 'orange',
  '5' : 'red',
  '6' : 'darkgreen',
  '7' : 'grey',
  '8' : 'pastelgreen',
  '9' : 'pink',
  '10' : 'aquablue',
  '11' : 'indigoblue',
  '12' : 'strawberry',
  '13' : 'fluorescentgreen',
  '14' : 'bamboo',
  '15' : 'armybrown',
  '16' : 'rust',
  '17' : 'magenta',
  '18' : 'mauve',
  '19' : 'mocha',
}

// controls

graph(document.getElementById('3d-graph-1'))
  .jsonUrl('3d-JS-Network/datasets/graph_20_com_complete_communities.json')
  //.nodeColor(node => communityColor[node['community']])
  .nodeAutoColorBy('community')
  .nodeRelSize(15)

// Nodes
  .nodeLabel(node => `${node.name}:
     community ${node.community}, 
     ${node.gender?node.gender : 'unknown gender'}`)

// Links
  .linkOpacity(0.2)
  //.linkLabel('Number_of_common_movies')


graph.backgroundColor('black')
graph.width([730])
graph.height([600])