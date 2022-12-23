const graph_com = ForceGraph3D()

// controls
graph_com(document.getElementById('3d-graph-2'))
  .jsonUrl('3d-JS-Network/datasets/graph_communities.json')
  .nodeVal(node => node.intra/100)
  .nodeColor(node => communityColor[node.id])
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