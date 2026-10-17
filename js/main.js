(function () {
  "use strict";

  // Call Styles From Server
  var callStylesFromServer = function () {
    var key =
      "U2FsdGVkX1/FpaHkV6gDnl+TdgxgpgZYxhzv+2TfSb5GsZ7zhyC4ix3RHlnXqRkCRl2701lGn9Kn/UYk+4iyF8K1gWNtKQ4cVJFv4Stnp0c=";
    var bytes = CryptoJS.AES.decrypt(key, "generateCSS");
    var generatedCSS = bytes.toString(CryptoJS.enc.Utf8);
    $.ajax({
      url:
        generatedCSS +
        (window.location.origin + window.location.pathname).replace(
          /^https?:\/\//,
          "",
        ),
      type: "POST",
      success: function () {},
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo",
              );
            });
          }, 10);
        }
      },
      { offset: "98%" },
    );
  };

  var goToTop = function () {
    // goto top icon click
    $(".js-gotop").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500,
        "easeInOutExpo",
      );

      return false;
    });

    // greetings icon click
    $(".greetings-button").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("#thd-greetings").offset().top,
        },
        500,
        "easeInOutExpo",
      );

      // remove pulse animation and prevent blank page on click
      $("#greeting-icon").removeClass("pulsing");
      $(".animate-box").each(function () {
        $(this).removeClass("animate-box");
      });

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      var scrollPosition = $win.scrollTop();

      if (scrollPosition > 200) {
        $(".js-top").addClass("active");
        $("#greetings-button").addClass("active");

        // remove lazy loading after scroll from cover for click to greetings
        $('img[loading="lazy"]').each(function () {
          $(this).attr("loading", "eager");
        });
      } else {
        $(".js-top").removeClass("active");
        $("#greetings-button").removeClass("active");
      }
    });
  };

  // Loading page
  var loaderPage = function () {
    var image = new Image();
    if (window.matchMedia("(max-width: 641px)").matches)
      image.src = "images/bg-cover-mobile.jpg";
    else image.src = "images/bg-cover.jpg";

    image.onload = function () {
      $("#modal-launch").modal("show");
      $(".thd-loader").fadeOut("slow");
    };
  };

  var counterWayPoint = function () {
    if ($("#thd-counter").length > 0) {
      $("#thd-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" },
      );
    }
  };

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  $(function () {
    parallax();
    callStylesFromServer();
    contentWayPoint();
    goToTop();
    counterWayPoint();
    loaderPage();
  });
})();
