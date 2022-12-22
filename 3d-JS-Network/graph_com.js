const graph_com = ForceGraph3D()

// controls

graph_com(document.getElementById('3d-graph-2'))
  .jsonUrl('3d-JS-Network/datasets/graph_communities.json')
  .nodeAutoColorBy('id')

// Nodes
  .nodeLabel('id')

// Links
  .linkOpacity(0.2)
  .linkLabel('Number_of_common_movies')
  .linkWidth('count');


graph_com.backgroundColor('black')
graph_com.width([730])
graph_com.height([600])