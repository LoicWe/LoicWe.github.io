const graph_com = ForceGraph3D()

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
graph_com(document.getElementById('3d-graph-2'))
  .jsonUrl('3d-JS-Network/datasets/graph_communities.json')
  .nodeVal(node => node.intra/100)
  .nodeColor(node => communityColor[node['community']])
  .nodeLabel(node => `community ${node.id}, number of intra-relations: ${node.intra}`)

  // Links
  .linkOpacity(0.5)
  .linkLabel(node => `number of inter-relations: ${node.count}`)
  .linkWidth(node => (node.count / 242 * 15))

  // Go to node
  .onNodeClick(node => {
    // Aim at node from outside it
    const distance = 100;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    const newPos = node.x || node.y || node.z
      ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
      : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

      graph_com.cameraPosition(
      newPos, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  });

graph_com.backgroundColor('black')
graph_com.width([730])
graph_com.height([600])