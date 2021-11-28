var App = (function(makehuman, _, THREE, Detector) {
    /**
     * A three.js app that build a scene
     * @param       {object} resources        - list of resources from makehuman-data
     * @param       {object} modeling_sliders - list of modeling_sliders from makehuman-data
     * @constructor
     */
    function App(resources, modeling_sliders) {
        // 초기 로딩 시 화면 사이즈에 맞게 렌더할 canvas크기 및 camera aspect 조절
        if (window.innerWidth < 576) {
            this.SCREEN_WIDTH = window.innerWidth - 30;
            this.SCREEN_HEIGHT = window.innerWidth - 30;
            this.aspectRatio = window.innerWidth / window.innerWidth;
        } else if (window.innerWidth < 768) {
            this.SCREEN_WIDTH = 510;
            this.SCREEN_HEIGHT = 510;
            this.aspectRatio = window.innerWidth / window.innerWidth;
        } else if (window.innerWidth < 992) {
            this.SCREEN_WIDTH = 330;
            this.SCREEN_HEIGHT = 700;
            this.aspectRatio = window.innerWidth / 2 / window.innerWidth;
        } else if (window.innerWidth < 1200) {
            this.SCREEN_WIDTH = 610;
            this.SCREEN_HEIGHT = 700;
            this.aspectRatio = window.innerWidth / 2 / (window.innerWidth / 2);
        } else {
            this.SCREEN_WIDTH = 750;
            this.SCREEN_HEIGHT = 750;
            this.aspectRatio = window.innerWidth / 2 / (window.innerWidth / 2);
        }

        this.container;

        this.camera;
        this.scene;
        this.renderer;
        this.controls;

        this.mouseX = 0;
        this.mouseY = 0;

        this.human;

        this.gui;
        this.skinConfig;
        this.modifierConfig;
        this.bodyPartConfig;

        this.clock = new THREE.Clock();
        if (!Detector.webgl) Detector.addGetWebGLMessage();

        this.resources = resources;
        this.modeling_sliders = modeling_sliders;
    }

    // 모델링 init 함수
    // scene 구성 (light, camera, ,renderer, object 등등)
    App.prototype.init = function init() {
        self = this;

        this.container = document.getElementById("body_model_canvas");
        if (!this.container) this.container = document.body;

        // scene
        this.scene = new THREE.Scene();

        // LIGHTS
        // sunlight from above
        var light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(light1);

        // light front up
        var light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light2.position.set(0, 140, 500);
        light2.position.multiplyScalar(1.1);
        light2.color.setHSL(0.6, 0.075, 1);
        this.scene.add(light2);

        // light from ground
        var light3 = new THREE.DirectionalLight(0xffffff, 0.5);
        light3.position.set(0, -1, 0); // ground
        light3.position.set(13, 5, 0); // right (right, up, front)
        this.scene.add(light3);

        // light from back
        var light4 = new THREE.DirectionalLight(0xffffff, 0.5);
        light4.position.set(0, 140, -500); // back
        this.scene.add(light4);

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(30, this.aspectRatio, 1, 2000);
        self.camera.position.set(0, 6.5, 40);

        // RENDERER
        if (Detector.webgl) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            throw Error("need webgl");
        }
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.renderer.setClearColor(0xffffff);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // mouse controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 10.5, 0);

        // events
        window.addEventListener("resize", this.onWindowResize.bind(this), false);
        this.controls.addEventListener("change", self.render.bind(self));

        // HUMAN
        // 사람 오브젝트 (중요!)
        this.human = new makehuman.Human(this.resources);
        self.scene.add(self.human);

        // load human metadata
        // 사람 오브젝트에 기본 신체 사이즈 적용 (default값 적용)
        return new Promise(function(resolve, reject) {
            resolve();
        })
            .then(function() {
                console.log("original human model load");
                // load the base human body
                return self.human.loadModel();
            })
            .then(function() {
                console.log("human load complete");
                console.debug(
                    "Human load Complete. ",
                    self.human.skins.length,
                    " skins, " + self.human.mesh.geometry.morphTargets.length + " morphtargets, " + self.human.bodyPartOpacity().length + " bodyparts"
                );

                self.setHumanDefaults();

                // 신체 사이즈 조절할 수 있는 gui창 생성
                self.gui = new GUI(self);

                // load targets last as it's slow
                // (it loads a ~150mb bin files with targets)
                self.human.loadTargets(`${self.resources.baseUrl}targets/${self.resources.targets}`).then(() => {
                    self.setModifierDefaults();

                    console.log("load human model with default body size");

                    // load url encoded attributes, this lets us share humans
                    self.human.io.fromUrl();

                    console.log("loading complete!");
                });
            });
    };

    // 사람 모델의 기본 값으로 모델링 (기본 성별 : 여자)
    App.prototype.setHumanDefaults = function() {
        // 기본 포즈 설정
        this.human.setPose("standing02");

        // 기본 옷 적용
        this.human.proxies.toggleProxy("female_casualsuit01", true);

        // 눈썹 적용
        this.human.proxies.toggleProxy("eyebrow010", true);

        // 기본 헤어스타일 적용
        this.human.proxies.toggleProxy("ponytail01", true);

        // 기본 피부색 적용
        this.human.setSkin("young_asian_female/young_asian_female.json");

        //기본 눈(안구) 적용
        this.human.proxies.toggleProxy("Low-Poly", true);

        // lets set the color to be a mixed/average skin color
        this.human.mesh.material.materials[0].color = new THREE.Color(0.6451834425332652, 0.541358126188251, 0.46583313890034395);
    };

    // 사람 모델의 기본 신체 사이즈로 모델링
    App.prototype.setModifierDefaults = function() {
        // gender, proportion, height값 기본값 적용
        this.human.modifiers.children["macrodetails/Gender"].setValue(0);
        this.human.modifiers.children["macrodetails-proportions/BodyProportions"].setValue(0.5);
        this.human.modifiers.children["macrodetails-height/Height"].setValue(0.5);

        // set some modifier buttons
        // 기본값에 맞게 gui의 값을 변경
        // var macroControllers = this.gui.gui.__folders.Modifiers.__folders["Macro modelling"].__folders.Macro.__controllers;
        // macroControllers.find((c) => c.property == "Gender").setValue(0);
        // macroControllers.find((c) => c.property == "Proportions").setValue(0.5);
        // macroControllers.find((c) => c.property == "Height").setValue(0.5);
    };

    //화면 크기 변경 시 캔버스 사이즈 변경 (반응형 디자인)
    App.prototype.onWindowResize = function() {
        //화면 크기 별로 알맞는 캔버스 사이즈 설정
        if (window.innerWidth < 576) {
            this.camera.aspect = window.innerWidth / window.innerWidth;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth - 30, window.innerWidth - 30);
        } else if (window.innerWidth < 768) {
            this.camera.aspect = window.innerWidth / window.innerWidth;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(510, 510);
        } else if (window.innerWidth < 992) {
            this.camera.aspect = window.innerWidth / 2 / window.innerWidth;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(330, 700);
        } else if (window.innerWidth < 1200) {
            this.camera.aspect = window.innerWidth / 2 / (window.innerWidth / 2);
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(610, 700);
        } else {
            this.camera.aspect = window.innerWidth / 2 / (window.innerWidth / 2);
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(750, 750);
        }
    };

    // everything to update
    App.prototype.animate = function() {
        requestAnimationFrame(this.animate.bind(this));

        this.controls.update();

        this.render();
    };

    App.prototype.render = function() {
        var delta = 0.75 * this.clock.getDelta();
        if (this.renderer && this.scene && this.camera && this.human) {
            // you need the before and after call to update the body
            this.human.onBeforeRender();
            this.renderer.render(this.scene, this.camera);
            this.human.onAfterRender();
        }
    };

    /**
     * Builds a simple interface to makehuman-js using dat.gui
     * see: https://workshop.chromeexperiments.com/examples/gui
     * @param       {App} app - instance of App
     * @constructor
     */
    function GUI(app) {
        this.app = app;
        this.human = app.human;

        // 신체 사이즈 입력 슬라이더 바 element
        var bodyGender = document.getElementById("bodysize_1");
        var bodyHeight = document.getElementById("bodysize_2");
        var bodyWeight = document.getElementById("bodysize_3");
        var bodyProportions = document.getElementById("bodysize_4");
        var bodyMuscle = document.getElementById("bodysize_5");

        // 0일때 여자, 1일때 남자 옷 적용
        var clothes = ["female_casualsuit01", "male_casualsuit06"];
        // 0일때 여자(포니테일), 1일때 남자(짧은 머리)
        var hairs = ["ponytail01", "short02"];
        // 0일때 여자, 1일때 남자 (큰 차이는 모르겠음)
        var skins = ["young_asian_female/young_asian_female.json", "young_asian_male/young_asian_male.json"];

        // element집합
        var bodySizeElement = [bodyGender, bodyHeight, bodyWeight, bodyProportions, bodyMuscle];
        var elementIndex = [0, 4, 3, 5, 2];

        // json파일에서의 gender, height, weight, proportions, muscle의 값을 가진 데이터
        var subGroupData = this.app.modeling_sliders["Macro modelling"].modifiers["Macro"];
        // subGroupData 구성 : {Gender,Age,Muscle,Weight,Height,BodyProportions,African,Asian,caucasian}

        bodySizeElement[0].addEventListener("change", function(e) {
            var slider = subGroupData[elementIndex[0]];
            var modifier = self.human.modifiers.children[slider.mod];

            var label = slider.label || modifier.name;
            modifier.label = label;
            modifier.cam = slider.cam;

            console.log(slider);
            console.log(modifier);

            modifier.setValue(e.target.value);
            modifier.updateValue();

            console.log(e.target.value);

            var genderIndex;
            if (e.target.value < 0.5) {
                genderIndex = 0;
            } else {
                genderIndex = 1;
            }
            // 성별에 맞는 옷, 헤어스타일, 피부색 변경
            self.human.proxies.toggleProxy(clothes[(genderIndex + 1) % 2], false);
            self.human.proxies.toggleProxy(hairs[(genderIndex + 1) % 2], false);

            self.human.proxies.toggleProxy(clothes[genderIndex], true);
            self.human.proxies.toggleProxy(hairs[genderIndex], true);

            self.human.setSkin(skins[genderIndex]);
        });

        bodySizeElement[1].addEventListener("change", function(e) {
            var slider = subGroupData[elementIndex[1]];
            var modifier = self.human.modifiers.children[slider.mod];

            var label = slider.label || modifier.name;
            modifier.label = label;
            modifier.cam = slider.cam;

            console.log(slider);
            console.log(modifier);

            modifier.setValue(e.target.value);
            modifier.updateValue();

            console.log(e.target.value);
        });

        bodySizeElement[2].addEventListener("change", function(e) {
            var slider = subGroupData[elementIndex[2]];
            var modifier = self.human.modifiers.children[slider.mod];

            var label = slider.label || modifier.name;
            modifier.label = label;
            modifier.cam = slider.cam;

            console.log(slider);
            console.log(modifier);

            modifier.setValue(e.target.value);
            modifier.updateValue();

            console.log(e.target.value);
        });

        bodySizeElement[3].addEventListener("change", function(e) {
            var slider = subGroupData[elementIndex[3]];
            var modifier = self.human.modifiers.children[slider.mod];

            var label = slider.label || modifier.name;
            modifier.label = label;
            modifier.cam = slider.cam;

            console.log(slider);
            console.log(modifier);

            modifier.setValue(e.target.value);
            modifier.updateValue();

            console.log(e.target.value);
        });

        bodySizeElement[4].addEventListener("change", function(e) {
            var slider = subGroupData[elementIndex[4]];
            var modifier = self.human.modifiers.children[slider.mod];

            var label = slider.label || modifier.name;
            modifier.label = label;
            modifier.cam = slider.cam;

            console.log(slider);
            console.log(modifier);

            modifier.setValue(e.target.value);
            modifier.updateValue();

            console.log(e.target.value);
        });
    }

    return App;
})(makehuman, _, THREE, Detector);
