<template>
    <div>
        <!-- Page Preloder -->
        <div id="preloder">
            <div class="loader"></div>
        </div>

        <!-- Offcanvas Menu Begin -->
        <div class="offcanvas-menu-overlay"></div>
        <div class="offcanvas-menu-wrapper">
            <div class="offcanvas__option">
                <div class="offcanvas__links">
                    <a v-show="user.userIdx == -1" href="./login">Sign in</a>
                    <a v-show="user.userIdx != -1" @click="requestSignOut" href="#">Sign out</a>
                    <a href="#">FAQs</a>
                </div>
                <!-- <div class="offcanvas__top__hover">
                <span>Usd <i class="arrow_carrot-down"></i></span>
                <ul>
                    <li>USD</li>
                    <li>EUR</li>
                    <li>USD</li>
                </ul>
            </div> -->
            </div>
            <div class="offcanvas__nav__option">
                <a href="#" class="search-switch"><img src="img/icon/search.png" alt=""/></a>
                <a href="#"><img src="img/icon/heart.png" alt=""/></a>
                <a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
                <div class="price">$0.00</div>
            </div>
            <div id="mobile-menu-wrap"></div>
            <div class="offcanvas__text">
                <p>{{ user.userName }}님, My Style에 오신걸 환영합니다.</p>
            </div>
        </div>
        <!-- Offcanvas Menu End -->

        <!-- Header Section Begin -->
        <header class="header">
            <div class="header__top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-7">
                            <div class="header__top__left">
                                <p>{{ user.userName }}님, My Style에 오신걸 환영합니다.</p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-5">
                            <div class="header__top__right">
                                <div class="header__top__links">
                                    <a v-show="user.userIdx == -1" href="./login">Sign in</a>
                                    <a v-show="user.userIdx != -1" @click="requestSignOut" href="#">Sign out</a>
                                    <a href="#">FAQs</a>
                                </div>
                                <!-- <div class="header__top__hover">
                                <span>Usd <i class="arrow_carrot-down"></i></span>
                                <ul>
                                    <li>USD</li>
                                    <li>EUR</li>
                                    <li>USD</li>
                                </ul>
                            </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-3">
                        <div class="header__logo">
                            <a href="./main"><img src="img/logo.png" alt=""/></a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <nav class="header__menu mobile-menu">
                            <ul>
                                <li :class="{ active: isMenuActive[0] }"><a href="./main">Home</a></li>
                                <li :class="{ active: isMenuActive[1] }">
                                    <a href="#">Shop</a>
                                    <ul class="dropdown">
                                        <li><a href="./shop">Top</a></li>
                                        <li><a href="./shop">Botyom</a></li>
                                        <li><a href="./shop">Accessories</a></li>
                                        <!-- <li><a href="./checkout.html">Check Out</a></li>
                                    <li><a href="./blog-details.html">Blog Details</a></li> -->
                                    </ul>
                                </li>
                                <li :class="{ active: isMenuActive[2] }">
                                    <a href="#">My Page</a>
                                    <ul class="dropdown">
                                        <li><a href="./my_info">My Information</a></li>
                                        <li><a href="./my_info">My Closet</a></li>
                                        <li><a href="./shopping_cart">Shopping Cart</a></li>
                                        <!-- <li><a href="./checkout.html">Check Out</a></li>
                                    <li><a href="./blog-details.html">Blog Details</a></li> -->
                                    </ul>
                                </li>
                                <!-- <li><a href="./blog.html">Blog</a></li>
                            <li><a href="./contact.html">Contacts</a></li> -->
                            </ul>
                        </nav>
                    </div>
                    <div class="col-lg-3 col-md-3">
                        <div class="header__nav__option">
                            <a href="#" class="search-switch"><img src="img/icon/search.png" alt=""/></a>
                            <a href="./shopping_cart"><img src="img/icon/heart.png" alt=""/></a>
                        </div>
                    </div>
                </div>
                <div class="canvas__open"><i class="fa fa-bars"></i></div>
            </div>
        </header>
        <!-- Header Section End -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            isMenuActive: [true, false, false],
        };
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    mounted() {
        var link = document.location.href;
        console.log("현재 접속 링크 : " + link);
        console.log("현재 userIdx : " + this.user.userIdx);

        // 접속된 링크 : https://도메인/상세주소 -> https, , 도메인, 상세주소로 나눈 배열
        var path = document.location.href.split("/");

        // 배열의 4번째 요소(상세주소)값에 따라 현재 선택된 메뉴목록의 active상태 제어
        if (path[3].startsWith("shop") || path[3].startsWith("detail")) {
            this.isMenuActive = [false, true, false];
        } else if (path[3].startsWith("my_info")) {
            this.isMenuActive = [false, false, true];
        } else {
            this.isMenuActive = [true, false, false];
        }
    },
    methods: {
        requestSignOut() {
            this.$store.commit("requestLogout");
        },
    },
};
</script>
<style scoped></style>
