jQuery("document").ready(function ($) {
    var baseAPIURL = "https://alpha-dev.reciplay.in/api/";

    function generateRandom(maxLimit) {
        let rand = Math.random() * maxLimit;
        rand = Math.floor(rand); // 99
        return rand;
    }

    // ================================================== API CALLS AND SETTING UP THINGS
    // 1. NEED TO GET ALL THE COOK BOOKS FOR THE ENTITY
    // 2. CREATE ONE ARRAY OR RECIPES AND FILL IS UP ()
    // 3. SETUP THE DATA IN CORRECT PLACES
    var rcb = ["62edf995758af5df9ecbc008", "6324152c2a7f858926f14097", "63e5c77dbbee9a464ab7cc28", "632415482a7f858926f14098"];
    var cookbooks = [];
    var cookbooksSet = false;

    var recipes = {};
    var recipesSet = false;
    var i = 0;

    rcb.map(function (cb, i) {
        var callToCookbook = baseAPIURL + "cookbook/" + cb;
        // ${process.env.NEXT_PUBLIC_DEV_API_URL}/cookbook/${router.query.id}/recipes?maxResultCount=200&countOnly=false&tags=${queryString}
        var callToRecipes = callToCookbook + "/recipes";
        $.ajax(callToCookbook, {
            type: "GET", // http method
            success: function (data) {
                if (data.data) {
                    var cbData = data.data;
                    cookbooks.push(data.data);
                    cookbooksSet = true;
                    // ================================================== GET ALL THE RECIPES
                    $.ajax(callToRecipes, {
                        type: "GET", // http method
                        success: function (data) {
                            if (data.data) {
                                recipes[cb] = data.data;
                                setLatestCreation(data.data, i);
                                setIndianCookbooks(data.data, i);
                                setRecipesInCNB(data.data, i);
                                setCookbooksInCNB(cbData, i);
                                // setShareCookbook();
                                setAllTimeFavs(data.data, i);
                            }
                        },
                        error: function (jqXhr, textStatus, errorMessage) {
                            console.log("Error" + errorMessage);
                        },
                    });
                }
            },
            error: function (jqXhr, textStatus, errorMessage) {
                console.log("Error" + errorMessage);
            },
        });
    });

    function setLatestCreation(cookbook, index) {
        var $swiper = $("#latest-creation-swiper");
        if (index == 0) {
            latestCreationSwiper.removeAllSlides();
        }
        var src = "https://s3.ap-south-1.amazonaws.com/reciplay/recipe/" + cookbook[0]._id + "/" + cookbook[0].dishInfo.dishImage.path;
        var title = cookbook[0].dishInfo.dishName;
        var description = cookbook[0].dishInfo.dishDesc;
        var template = `<div class="swiper-slide">
            <article class="slide-image-text">
                <div class="img-wrapper rounded-16">
                    <img src="${src}" alt="" />
                </div>
                <h2>${title}</h2>
                <p>${description}</p>
            </article>
        </div>`;
        latestCreationSwiper.appendSlide(template);
        if (index == rcb.length - 1) {
            latestCreationSwiper.enabled = true;
        }
    }
    var $indianCookbooks = $("#indian-cookbooks");
    var $shuffleBtn = $("#shuffle-btn");
    $shuffleBtn.on("click", updateIndianCookbooks);
    function updateIndianCookbooks(evt) {
        evt.preventDefault();
        $indianCookbooks.html("");
        for (i = 0; i < rcb.length; i++) {
            var cookbook = recipes[rcb[i]];
            var recipe = cookbook[generateRandom(cookbook.length)];
            var src = "https://s3.ap-south-1.amazonaws.com/reciplay/recipe/" + recipe._id + "/" + recipe.dishInfo.dishImage.path;
            var title = recipe.dishInfo.dishName;
            var template = `<div class="cookbook rounded-16 aos-init aos-animate" data-aos="fade-up" data-aos-dealy="50" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
                <figure class="grid-item">
                    <div class="img-wrapper">
                        <img src="${src}" alt="">
                    </div>
                    <figcaption>${title}</figcaption>
                </figure>
            </div>`;
            $indianCookbooks.append(template);
        }
        var masonry = document.querySelector("#indian-cookbooks");
        // masonry.masonry({
        //     itemSelector: ".grid-item",
        //     columnWidth: 200,
        // });
    }
    function setIndianCookbooks(cookbook, index) {
        if (index == 0) {
            $indianCookbooks.html("");
        }
        var randomRecipe = generateRandom(cookbook.length);
        var src = "https://s3.ap-south-1.amazonaws.com/reciplay/recipe/" + cookbook[randomRecipe]._id + "/" + cookbook[randomRecipe].dishInfo.dishImage.path;
        var title = cookbook[randomRecipe].dishInfo.dishName;
        var template = `<div class="cookbook rounded-16 aos-init aos-animate" data-aos="fade-up" data-aos-dealy="50">
            <figure class="grid-item">
                <div class="img-wrapper">
                    <img src="${src}" alt="">
                </div>
                <figcaption>${title}</figcaption>
            </figure>
        </div>`;
        $indianCookbooks.append(template);
        // $("#indian-cookbooks").masonry({
        //     // options...
        //     itemSelector: ".grid-item",
        //     columnWidth: 200,
        // });
    }
    function setRecipesInCNB(cookbook, index) {
        if (index == 0) {
            recipeSwiper.removeAllSlides();
        }
        var src = "https://s3.ap-south-1.amazonaws.com/reciplay/recipe/" + cookbook[1]._id + "/" + cookbook[1].dishInfo.dishImage.path;
        var title = cookbook[1].dishInfo.dishName;
        var description = cookbook[1].dishInfo.dishDesc;
        var template = `<div class="swiper-slide">
            <article class="slide-image-text">
                <div class="img-wrapper rounded-16">
                    <img src="${src}" alt="" />
                </div>
                <h2>${title}</h2>
                <p>${description}</p>
            </article>
        </div>`;
        recipeSwiper.appendSlide(template);
        if (index == rcb.length - 1) {
            recipeSwiper.enabled = true;
        }
    }
    function setCookbooksInCNB(cookbook, index) {
        if (index == 0) {
            recipeSwiper.removeAllSlides();
        }
        var title = cookbook.name;
        var kitchen = cookbook.entity.name;
        var src = "https://s3.ap-south-1.amazonaws.com" + "/reciplay" + "/cookbook/" + cookbook._id + "/" + cookbook.media[0].path;
        // var title = cookbook[1].dishInfo.dishName;
        // var description = cookbook[1].dishInfo.dishDesc;
        var template = `<div class="swiper-slide">
            <div class="cookbook-bg">
                <div class="bb-overlay-left"></div>
                <div class="bb-overlay-right"></div>
                <div class="cover-text">
                    <span id="" class="title">${title}</span>
                    <span id="" class="chef">By ${kitchen}</span>
                </div>
                <div class="cover-image">
                    <img alt="" src="${src}">
                </div>
            </div>
        </div>`;
        cookbookSwiper.appendSlide(template);
        if (index == rcb.length - 1) {
            cookbookSwiper.enabled = true;
        }
    }
    function setShareCookbook() {}
    function setAllTimeFavs(cookbook, index) {
        console.log(cookbook[0]);
        var $swiper = $("#favourites-swiper");
        if (index == 0) {
            favouritesSwiper.removeAllSlides();
        }
        var src = "https://s3.ap-south-1.amazonaws.com/reciplay/recipe/" + cookbook[0]._id + "/" + cookbook[0].dishInfo.dishImage.path;
        var title = cookbook[0].dishInfo.dishName;
        var description = cookbook[0].dishInfo.dishDesc;
        var url = "https://alpha-dev.reciplay.in/detail/" + cookbook[0]._mappingId + "?sharing=true";
        var template = `<div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 3" style="margin-right: 24px;">
            <article class="slide-image-text">
                <div class="img-wrapper rounded-16">
                    <img src="${src}" alt="">
                </div>
                <div class="row">
                    <div class="col-9">
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </div>
                    <div class="col-3">
                        <a href="${url}" class="btn hollow full-rounded icon-42">
                            <span class="arrow upright"></span>
                        </a>
                    </div>
                </div>
            </article>
        </div>`;
        favouritesSwiper.appendSlide(template);
        if (index == rcb.length - 1) {
            favouritesSwiper.enabled = true;
        }
    }

    var heroSwiper = new Swiper(".hero-swiper", {
        slidesPerView: "auto",
        pagination: {
            el: ".hero-swiper-pagination",
        },
        pagination: {
            el: ".hero-pagination",
        },
        // loop: true,
        // centeredSlides: true,
    });

    var latestCreationSwiper = new Swiper(".latest-creation-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        speed: 1000,
        autoplay: {
            delay: 1200,
        },
        centeredSlides: true,
        enabled: false,
    });

    var lcSwiperAutoEvent = null;

    var cookbookSwiper = new Swiper(".cookbook-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        navigation: {
            nextEl: ".cookbook-swiper-next",
            prevEl: ".cookbook-swiper-prev",
        },
        centeredSlides: true,
    });

    var recipeSwiper = new Swiper(".recipe-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        navigation: {
            nextEl: ".recipe-swiper-next",
            prevEl: ".recipe-swiper-prev",
        },
        centeredSlides: true,
    });

    var favouritesSwiper = new Swiper(".favourites-swiper", {
        slidesPerView: "auto",
        spaceBetween: 24,
        speed: 1000,
        // loop: true,
        autoplay: {
            delay: 1200,
        },
        centeredSlides: true,
    });

    // =========================================================================================== swipe box
    var $sliderBox = $(".swipe-box").first();
    var width = $sliderBox.width();

    $(".swipe-handle").draggable({
        axis: "x",
        drag: function (event, ui) {
            //sp slider
            $(this)
                .closest(".swipe-box")
                .find("span.text")
                .css("opacity", 1 - ui.position.left / 100);
        },
        containment: "parent",
        stop: function (event, ui) {
            if (ui.position.left < 150) {
                // console.log("Didnt pull enough");
                $(".swipe-handle").css("left", "2px");
                // $(".unlockedArea").css("opacity", "0");
                $(this).closest(".swipe-box").find("span.text").css("opacity", 1);
            } else {
                // console.log("Unlocked");
                // $(".unlockedArea").css("opacity", "1");
                $(".swipe-handle").css("left", width - 44);
            }
        },
    });

    // =========================================================================================== ingredients
    var $ingredients = $(".ingredient");
    var $ingredientExploreBtn = $("#ingredient-explore-btn");

    $ingredients.on("click", handleIngredientClick);
    function handleIngredientClick() {
        var $this = $(this);
        var name = $this.data("name");
        $ingredients.removeClass("active");
        $this.addClass("active");
        $ingredientExploreBtn.find(".ingredient-name").text(name);
    }

    // =========================================================================================== cookbooks-n-recipes
    // var $sliderSwitches = $(".slider-switch-tab");
    // $sliderSwitches.on("click", handleSlideSwitch);
    // function handleSlideSwitch(evt) {
    //     evt.preventDefault();
    //     var $this = $(this);
    //     var showId = $this.data("show");
    //     $sliderSwitches.removeClass("active");
    //     $this.addClass("active");
    //     $(".togglable-slider-wrapper").removeClass("active");
    //     $(showId).addClass("active");
    // }
});
