<template
    ><div>
        <!-- Breadcrumb Section Begin -->
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h4>About Us</h4>
                            <div class="breadcrumb__links">
                                <a href="./main">Home</a>
                                <a href="./my_info">My Page</a>
                                <span>My Information</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- About Section Begin -->
        <section class="about spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about__pic">
                            <img src="img/about/about-us.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 mb-4">
                        <div class="about__item">
                            <h4>{{ myInfoData.userName }}님의 정보</h4>
                            <p>ID : {{ myInfoData.userId }}</p>
                            <p>Name : {{ myInfoData.userName }}</p>
                        </div>
                        <div class="mt-2 float-right"><a class="gotoShopCart" href="#">정보 수정</a></div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="about__item">
                            <h4>나의 찜 목록</h4>
                            <div v-for="product in myHeartList" :key="product.name+product.mysize">
                                <p>{{ product.name }} - {{ product.mysize }}</p>
                            </div>

                        </div>
                        <div class="mt-2 float-right"><a class="gotoShopCart" href="/shopping_cart">쇼핑 카트로 이동</a></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- About Section End -->

        <!-- Testimonial Section Begin -->
        <!-- <section class="testimonial">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 p-0">
                        <div class="testimonial__text">
                            <span class="icon_quotations"></span>
                            <p>
                                “Going out after work? Take your butane curling iron with you to the office, heat it up, style your hair before you leave the office and you won’t have to make a trip
                                back home.”
                            </p>
                            <div class="testimonial__author">
                                <div class="testimonial__author__pic">
                                    <img src="img/about/testimonial-author.jpg" alt="" />
                                </div>
                                <div class="testimonial__author__text">
                                    <h5>Augusta Schultz</h5>
                                    <p>Fashion Design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 p-0">
                        <div class="testimonial__pic set-bg" data-setbg="img/about/testimonial-pic.jpg"></div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- Testimonial Section End -->

        <!-- Counter Section Begin -->
        <!-- <section class="counter spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="counter__item">
                            <div class="counter__item__number">
                                <h2 class="cn_num">102</h2>
                            </div>
                            <span>Our <br />Clients</span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="counter__item">
                            <div class="counter__item__number">
                                <h2 class="cn_num">30</h2>
                            </div>
                            <span>Total <br />Categories</span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="counter__item">
                            <div class="counter__item__number">
                                <h2 class="cn_num">102</h2>
                            </div>
                            <span>In <br />Country</span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="counter__item">
                            <div class="counter__item__number">
                                <h2 class="cn_num">98</h2>
                                <strong>%</strong>
                            </div>
                            <span>Happy <br />Customer</span>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- Counter Section End -->

        <!-- 옷 앨범 -->
        <!-- Team Section Begin -->
        <section class="team spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title">
                            <span>앨범</span>
                            <h2>내 컬렉션</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="team__item">
                            <img src="img/about/team-1.jpg" alt="" />
                            <h4>John Smith</h4>
                            <span>Fashion Design</span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="team__item">
                            <img src="img/about/team-2.jpg" alt="" />
                            <h4>Christine Wise</h4>
                            <span>C.E.O</span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="team__item">
                            <img src="img/about/team-3.jpg" alt="" />
                            <h4>Sean Robbins</h4>
                            <span>Manager</span>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="team__item">
                            <img src="img/about/team-4.jpg" alt="" />
                            <h4>Lucy Myers</h4>
                            <span>Delivery</span>
                        </div>
                    </div>
                </div>
                <div class="float-right">더보기</div>
            </div>
        </section>
        <!-- Team Section End -->

        <!-- Client Section Begin -->
        <section class="clients spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title">
                            <span>My Page Menu</span>
                            <h2>내 정보, 내 옷장(찜), 장바구니</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-4">
                        <a href="#" class="client__item"><img src="img/clients/client-1.png" alt=""/></a>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <a href="#" class="client__item"><img src="img/clients/client-2.png" alt=""/></a>
                    </div>
                    <div class="col-lg-4 col-md-4">
                        <a href="#" class="client__item"><img src="img/clients/client-3.png" alt=""/></a>
                    </div>
                </div>
            </div>
        </section>
        <!-- Client Section End -->
    </div>
</template>

<script>
export default {
    computed: {
        myInfoData() {
            return this.$store.state.user.user;
        },
        myHeartList() {
            return this.$store.state.user.heartData;
        },
    },
};
</script>
