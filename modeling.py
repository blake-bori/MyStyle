import bpy
import sys

# scene 내의 모든 오브젝트 삭제
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()

#humanFilePath="C:/blender/model/human.obj"
#topFilePath="C:/blender/model/top(black)/top(black)_M.obj"
#bottomFilePath="C:/blender/model/bottom(jean1)/M_01.obj"
#resultPath="C:/blender/result.gltf"
#height=175

# 인자를 받아옴 (0~3은 실행 시킬때의 명령어)
# 4(사람 파일 위치), 5(상의 파일 위치), 6(하의 파일 위치), 7(결과 저장 위치), 8(키)
humanFilePath=sys.argv[1]
topFilePath=sys.argv[2]
bottomFilePath=sys.argv[3]
resultPath=sys.argv[4]
height=float(sys.argv[5])
print(humanFilePath)

#####################
#### human model ####
#####################
#bpy.ops.import_scene.obj(filepath="C:/blender/model/human.obj")
bpy.ops.import_scene.obj(filepath=humanFilePath)
print("import human model complete")

selectedHuman=bpy.data.objects[0]
selectedHuman.select_set(True)
bpy.context.view_layer.objects.active = selectedHuman
bpy.ops.object.modifier_add(type="COLLISION")
print("human model : add modifier collision")
# bpy.ops.object.modifier_apply(modifier="Collision")


##########################
#### cloth(top) model ####
##########################
#bpy.ops.import_scene.obj(filepath="C:/blender/model/top(blue)/top(blue).obj")
bpy.ops.import_scene.obj(filepath=topFilePath)
print("import cloth(top) model complete")

selectedTop=bpy.data.objects[1]
selectedTop.location.z+=height/10-1
selectedTop.select_set(True)
bpy.context.view_layer.objects.active = selectedTop
bpy.ops.object.modifier_add(type="CLOTH")
print("top model : add modifier cloth")

selectedTop.modifiers["Cloth"].settings.quality=3
selectedTop.modifiers["Cloth"].settings.use_sewing_springs=True
selectedTop.modifiers["Cloth"].settings.sewing_force_max=15
selectedTop.modifiers["Cloth"].collision_settings.use_self_collision=True


#############################
#### cloth(bottom) model ####
#############################
#bpy.ops.import_scene.obj(filepath="C:/blender/model/top(blue)/top(blue).obj")
bpy.ops.import_scene.obj(filepath=bottomFilePath)
print("import cloth(bottom) model complete")

selectedBottom=bpy.data.objects[1]
selectedBottom.location.z+=height/10*0.5+1
selectedBottom.select_set(True)
bpy.context.view_layer.objects.active = selectedBottom
bpy.ops.object.modifier_add(type="CLOTH")
print("bottom model : add modifier cloth")

selectedBottom.modifiers["Cloth"].settings.quality=5
selectedBottom.modifiers["Cloth"].settings.use_sewing_springs=True
selectedBottom.modifiers["Cloth"].settings.sewing_force_max=16
selectedBottom.modifiers["Cloth"].collision_settings.use_self_collision=True


##########################
#### rendering result ####
##########################
for i in range(1,61):
    bpy.context.scene.frame_set(i)

selectedHuman.select_set(True)
bpy.context.view_layer.objects.active = selectedHuman
bpy.ops.object.modifier_apply(modifier="Collision")

selectedTop.select_set(True)
bpy.context.view_layer.objects.active = selectedTop
bpy.ops.object.modifier_apply(modifier="Cloth")

selectedBottom.select_set(True)
bpy.context.view_layer.objects.active = selectedBottom
bpy.ops.object.modifier_apply(modifier="Cloth")

bpy.ops.export_scene.gltf(filepath=resultPath)