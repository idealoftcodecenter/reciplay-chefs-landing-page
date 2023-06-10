(function () {
    "use strict";

    $.ajax({
        url: "https://alpha-dev.reciplay.in/api/recipe?countOnly=true",
    }).done(function (data) {
        console.log(data);
    });
});
