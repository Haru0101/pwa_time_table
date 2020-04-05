function backBtn() {
    location.reload();
}

// document.documentElement.requestFullscreen();
// 現在時刻の場所までスクロール

var nowTime = new Date();
var nowHour = nowTime.getHours();

// jsでの記述
// window.onload = function () {
//     document.getElementById(nowHour).scrollIntoView({ behavior: 'smooth', block: 'start' });
// }

// jQueryでの記述
$(function () {
    var targetTop = $('#' + nowHour).offset().top - 129;
    $('html,body').animate({
        scrollTop: targetTop
    }, 500);
    return false;
});

$(function () {
    //ページを表示させる箇所の設定
    var $content = $('.pageDisplay');
    //ボタンをクリックした時の処理
    $(document).on('click', '.choice', function (event) {
        event.preventDefault();
        //.gnavi aのhrefにあるリンク先を保存
        var link = $(this).attr("href");
        //リンク先が今と同じであれば遷移しない
        if (link == lastpage) {
            return false;
        } else {
            $content.fadeOut(0, function () {
                getPage(link);
            });
            //今のリンク先を保存
            lastpage = link;
        }

    });
    //初期設定
    getPage("index.html");
    var lastpage = "index.html";

    //ページを取得してくる
    function getPage(elm) {
        $.ajax({
            type: 'GET',
            url: elm,
            dataType: 'html',
            success: function (data) {
                $content.html(data).fadeIn(0);
            }
            /*,
                                error: function() {
                                    alert('問題がありました。');
                                }*/
        });
    }
});