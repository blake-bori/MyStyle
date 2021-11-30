<template>
    <div class="myInformation">
        <MyInfoComponent :userId="userId" :userName="userName" :userEmail="userEmail" :userPhoneNum="userPhoneNum"></MyInfoComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import MyInfoComponent from "@/components/myPage/MyInfoComponent.vue";
import * as authApi from "@/api/auth";

export default {
    name: "MyInfo",
    components: {
        MyInfoComponent,
    },
    data() {
        return {
            userIdx: 3,
            userName: "",
            userId: "",
            userEmail: "",
            userPhoneNum: "",
        };
    },
    methods: {
        getMyInfoData() {
            authApi
                .myInfo(this.userIdx)
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
                    } else {
                        // 로그인이 안되어있다면 로그인 필요하다는 알림과 함께 로그인 페이지로 이동
                        console.log("마이페이지 가져오기 실패");
                        alert("로그인 필요");
                        this.$router.replace({ path: "Login" });
                    }
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
    },
    created() {
        this.getMyInfoData();
    },
};
</script>
