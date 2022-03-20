import bpy
 
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()

vertices = [
    (0, 0, 0),
    (1, 0, 0),
    (1, 1, 0),
    (0, 1, 0),
    (0, 0, 0)
]
edges = [(0,1), (1,2), (2,3), (3,4), (4,5)]
faces = [(0, 1, 2, 3)]


new_mesh = bpy.data.meshes.new('new_mesh')
new_mesh.from_pydata(vertices, edges, faces)
new_mesh.update()

bpy.context.scene.collection.children[0].objects.link(
    bpy.data.objects.new('square', new_mesh)
)

bpy.ops.wm.save_mainfile(filepath="test.gltf")
