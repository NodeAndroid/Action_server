$(document).ready(function () {

    var itemNum = $(window).height() / 50 | 11

    //预先生成一些div
    for (var i = 0; i < 20; i++) {
        $('.container').append($('.item').clone().first())
    }

    function moreData() {
        if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
            console.log($('.loading').length)
            if ($('.loading').length)
                return

            var item = $('.item').clone().first().hide()


            var loading = $('<div class="loading">loding</div>')
            var end =  $('<div class="end">没啦</div>').hide()
            $('.container').append(loading)
            $.getJSON('/news').done( function (data) {
                $(".loading").remove()
                $('.end').remove()

                if (data === null || data.message === '_end_') {
                    $('.container').append(end)
                    end.fadeIn(500)
                }
                else {
                    $('.container').append(item)
//                    item.text(data.message).fadeIn(500)
                    item.fadeIn(500)
                }

            })
        }

    }

    $(window).scroll(moreData)
})
