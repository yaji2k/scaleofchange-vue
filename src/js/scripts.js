window.onload = function () {
    var point = $(".point");
    var scale = $("#scale");
    var status = $(".status");
    var maxSize = 890;
    console.log(scale.data());
    var move = function () {
        var coord = Math.round(event.pageX - scale.offset().left);
        if (maxSize >= coord && coord >= 0) {
            var $coord = Math.round(coord/maxSize*100);
            point.css({"left": $coord + "%"});
            status.css({"width": $coord + "%"});
        }
        console.log($coord);
    }
    point.on("mousedown", function () {
        $(this).css({"cursor": "grabbing", "background": "#000"});
        $('body').on("mousemove", move);
    });
    $('body').on("mouseup mouseleave", function () {
        point.css({"cursor": "grab", "background": "radial-gradient(circle, #000, #000 8px, #fff 8px, #fff)"});
        $('body').off("mousemove mouseover", move);
    });

    point.on("mouseover", function () {
        $(this).css({"background": "#000"});
    });
    point.on("mouseleave", function () {
        $(this).css({"background": "radial-gradient(circle, #000, #000 8px, #fff 8px, #fff)"});
    });
}