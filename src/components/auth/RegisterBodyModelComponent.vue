<template>
    <div class="model-canvas" style="border :1px black solid">
        <!-- <div id="stats"></div>
        <div id="nav"></div> -->
        <div id="body_model_canvas"></div>
        <!-- <div id="progress-bar"></div> -->
    </div>
</template>
<script>
export default {
    /* eslint-disable no-unused-vars */
    /* eslint-disable no-undef */
    mounted() {
        // 할일 : makehuman에서 생성한 human모델을 obj파일로 저장 후 서버로 전송
        var app;
        // load some json data first
        var loadUrls = {
            modeling_sliders: "js/makehuman-data/src/json/sliders/modeling_sliders.json",
            resources: "js/makehuman-data/public/data/resources.json",
        };
        console.log(loadUrls);
        var loader = new THREE.XHRLoader();
        Promise.all(_.values(loadUrls).map((url) => new Promise((resolve, reject) => loader.load(url, (data) => resolve(JSON.parse(data))))))
            .then((data) => {
                var keys = Object.keys(loadUrls);
                console.log(keys);
                console.log(data);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    window[key] = data[i];
                }
            })
            .then(() => {
                // start the app
                resources.baseUrl = "js/makehuman-data/public/data/";
                app = new App(resources, modeling_sliders);
                app.init();
                app.animate();
            });
    },
};
</script>
