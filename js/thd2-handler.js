// ----- CENTER MODAL LAUNCH ----- //
(function ($) {
  "use strict";
  function centerModal() {
    $(this).css("display", "block");
    var $dialog = $(this).find(".modal-dialog"),
      offset = ($(window).height() - $dialog.height()) / 2,
      bottomMargin = parseInt($dialog.css("marginBottom"), 10);

    if (offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset - 10);
  }

  $(document).on("show.bs.modal", ".modal", centerModal);
  $(window).on("resize", function () {
    $(".modal:visible").each(centerModal);
  });
})(jQuery);

// ----- SCROLLING HANDLER PERBAIKAN ----- //
function disableScroll() {
  // Mengunci scroll dengan CSS agar lebih stabil di mobile & desktop
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function enableScroll() {
  // Mengembalikan fungsi scroll
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
  // Menghapus paksaan onscroll jika ada sisa fungsi lama
  window.onscroll = null;
}

// Inisialisasi awal: Kunci layar
disableScroll();

// Event Listener khusus untuk tombol "Lihat Undangan"
$(document).ready(function () {
  $("#btn-lihat-undangan").on("click", function (e) {
    e.preventDefault(); // Mencegah aksi default

    enableScroll(); // Buka kunci layar

    // Logika tambahan untuk tooltip (sesuai kode asli Anda)
    setTimeout(function () {
      $("#greeting-icon").tooltip("show");
    }, 7000);
    setTimeout(function () {
      $("#greeting-icon").tooltip("hide");
    }, 20000);
  });
});

// ----- FUNGSI SMOOTH SCROLL UNTUK ARROW BOUNCE ----- //
$(document).ready(function () {
  $(".tc-bottom").on("click", function (event) {
    // Pastikan ID 'konten-utama' sesuai dengan ID yang Anda buat di index.html
    var target = $("#home"); // Anda juga bisa langsung menargetkan class section pertama

    if (target.length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        1000, // Kecepatan scroll dalam milidetik (1000ms = 1 detik)
        "easeInOutExpo", // Efek transisi (memerlukan jQuery Easing yang sudah ada di file Anda)
      );
    }
  });

  // Tambahkan kursor pointer agar user tahu itu bisa diklik
  $(".tc-bottom").css("cursor", "pointer");
});

// ----- MUSIC PLAYBACK HANDLER ----- //
var sound = document.getElementById("bg-music");
var audioIcon = document.getElementById("audio-icon");

$(document).ready(function () {
  // Fungsi untuk Play/Pause
  function toggleAudio() {
    if (sound.paused) {
      sound.play();
      audioIcon.setAttribute("class", "icon-pause");
    } else {
      sound.pause();
      audioIcon.setAttribute("class", "icon-music");
    }
  }

  // Putar musik saat tombol 'Lihat Undangan' diklik
  $("#btn-lihat-undangan").click(function () {
    sound.play();
    audioIcon.setAttribute("class", "icon-pause");
  });

  // Kontrol tombol musik manual
  $("#music-button").on("click", function () {
    toggleAudio();
  });
});

// ----- BUKU UCAPAN ----- //
// ----- BUKU UCAPAN END ----- //

// ----- INVITATION RECEIVER ----- //
var url_string = window.location.href;
var url = new URL(url_string);
var receiver = url.searchParams.get("kepada") || "Nama Undangan";
if (receiver === "" || receiver == null) {
  $(".receiver-label").remove();
  $(".receiver").remove();
  $(".arrow").css("margin-top", "18vh");
} else {
  $(".receiver").text(receiver);
  $("#input-nama").val(receiver);
}

// ----- DATE COUNTER ----- //
//var end = new Date('09/28/2025 02:00 PM');
var end = new Date();
end.setDate(end.getDate() + 30);

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
  var now = new Date();
  var distance = end - now;
  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  // CURRENT DAYS OR MORE TO 0
  if (days < 0) days = 0;
  if (hours < 0) hours = 0;
  if (minutes < 0) minutes = 0;
  if (seconds < 0) seconds = 0;

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}
timer = setInterval(showRemaining, 1000);
