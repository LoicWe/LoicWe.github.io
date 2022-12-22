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
  '15' : 'white',
  '16' : 'rust',
  '17' : 'magenta',
  '18' : 'mauve',
  '19' : 'mocha',
}

function color_nodes(node){
  const color='gray'
  if (node['community'] < 20){
    color = communityColor[node['community']]
  }
  return color;
}

// controls

graph(document.getElementById('3d-graph'))
  .jsonUrl('/3d-JS-Network/datasets/graph_complete_communities.json')
  .nodeRelSize(15)
  .nodeColor(n => color_nodes(n))
  .nodeLabel(node => `${node.name}:
  community ${node.community}, 
  ${node.gender?node.gender : 'unknown gender'}`)

  
  .onNodeClick(node => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

      const newPos = node.x || node.y || node.z
        ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
        : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

      graph.cameraPosition(
        newPos, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
    })


// Links
  .linkLabel('Number_of_common_movies')
  .linkOpacity(0.2)

//legend

var d3svg = d3.select("#leg").append('svg');
d3svg.attr('width', 768);
d3svg.attr('height', 200);
d3svg.style('background-color', 'black');
var top_svg = d3svg.append('g');
top_svg.append('g').attr('id','gleg');


graph.backgroundColor('black')
graph.height([800])