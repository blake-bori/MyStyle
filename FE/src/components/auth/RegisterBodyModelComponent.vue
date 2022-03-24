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
        var app;
        // makehuman-data 파일 내의 모델 신체 수치 데이터 불러오기
        var loadUrls = {
            modeling_sliders: "js/makehuman-data/src/json/sliders/modeling_sliders.json",
            resources: "js/makehuman-data/public/data/resources.json",
        };
        console.log(loadUrls);

        // 불러온 신체 수치 데이터들을 mapping 시킴
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
                // 모델 띄우는 화면 렌더
                resources.baseUrl = "js/makehuman-data/public/data/";
                app = new App(resources, modeling_sliders);
                app.init();
                app.animate();
            });
    },
};
</script>
