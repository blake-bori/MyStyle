import * as authApi from "@/api/auth";

export default {
    // state는 data와 같음
    // this.$store.state.변수명
    state: () => ({
        // 유저 정보 데이터
        user: {
            userIdx: -1,
            userId: "",
            password: "",
            userName: "익명의 손",
            userEmail: "",
            userPhoneNum: "",
        },
        // 상품 화면에 나올 상품의 인덱스값
        productIdx: 0,
    }),
    // getter는 computed와 같음
    // this.$store.state.변수명으로 state에 접근해서 사용
    getters: {},
    // mutations는 methods와 같음
    // 첫번째 인자는 state(변수 저장소),두번째 인자로 payload로 함수에 쓰일 파라미터들을 전달 (payload말고 그냥 변수 써도됨 payload는 여러 변수의 집합 느낌?)
    // this.$store.commit("함수명",{변수 파라미터들})
    mutations: {
        // detail페이지로 넘어갈 때 쓰일 productIdx를 설정
        setProductIdx(state, value) {
            console.log("mutation - setProductIdx 실행");
            state.productIdx = value;
        },
        loginResult(state, data) {
            console.log("mutation - loginResult 실행");
            if (data.isSuccess) {
                alert("로그인 성공");
                state.user.userIdx = data.result.userId;
                state.user.userIdx = 3;
                location.href = "./";
            } else {
                alert("로그인 실패");
            }
        },
        requestLogout(state) {
            console.log("mutation - requestLogout 실행");
            state.user = {
                userIdx: -1,
                userId: "",
                password: "",
                userName: "익명의 손",
            };
            alert("로그아웃");
            location.href = "./";
        },
        addMyInfoData(state, myInfoData) {
            state.user.userId = myInfoData.userId;
            state.user.userName = myInfoData.userName;
            state.user.userEmail = myInfoData.email;
            state.user.userPhoneNum = myInfoData.phoneNum;
        },
    },
    // actions는 async methods(비동기)와 같다
    // this.$store.dispatch("함수명")
    actions: {
        requestLogin(context, inputData) {
            console.log("action - requestLogin 실행");
            authApi
                .login(inputData[0], inputData[1])
                // 로그인 결과
                // isSuccess, code, message, result{jwt, userIdx}
                .then((response) => {
                    console.log("로그인 결과 : " + response.data.message);

                    context.commit("loginResult", response.data);
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        getMyInfoData(context, userIdx) {
            authApi
                .myInfo(userIdx)
                // 마이페이지 정보 가져오기
                // isSuccess, code, message, result[{idx, userName, userId, email, phoneNum}] => 배열임
                // 할일 : email, phoneNume 정보 없애거나 회원가입 정보에 추가하기(없애는게 나을듯)
                .then((response) => {
                    console.log("마이페이지 가져오기 결과 : " + response.data.message);
                    if (response.data.isSuccess) {
                        this.userName = response.data.result[0].userName;
                        this.userId = response.data.result[0].userId;
                        this.userEmail = response.data.result[0].email;
                        this.userPhoneNum = response.data.result[0].phoneNum;

                        context.commit("addMyInfoData", response.data.result[0]);
                    } else {
                        // 로그인이 안되어있다면 로그인 필요하다는 알림과 함께 로그인 페이지로 이동
                        console.log("마이페이지 가져오기 실패");
                        alert("로그인 필요");
                        location.href = "./login";
                    }
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
        // getShoppingCart(context, userIdx) {
        //     authApi
        //         .myInfo(userIdx)
        //         // 마이페이지 정보 가져오기
        //         // isSuccess, code, message, result[{idx, userName, userId, email, phoneNum}] => 배열임
        //         // 할일 : email, phoneNume 정보 없애거나 회원가입 정보에 추가하기(없애는게 나을듯)
        //         .then((response) => {
        //             console.log("마이페이지 가져오기 결과 : " + response.data.message);
        //             if (response.data.isSuccess) {
        //                 this.userName = response.data.result[0].userName;
        //                 this.userId = response.data.result[0].userId;
        //                 this.userEmail = response.data.result[0].email;
        //                 this.userPhoneNum = response.data.result[0].phoneNum;

        //                 context.commit("addMyInfoData", response.data.result[0]);
        //             } else {
        //                 // 로그인이 안되어있다면 로그인 필요하다는 알림과 함께 로그인 페이지로 이동
        //                 console.log("마이페이지 가져오기 실패");
        //                 alert("로그인 필요");
        //                 location.href = "./login";
        //             }
        //         })
        //         // 에러 발생 시 (예: 서버 닫힘)
        //         .catch((error) => {
        //             console.log("에러 : " + error);
        //         });
        // },
    },
};
