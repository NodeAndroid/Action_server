$(document).ready(function () {

    var itemNum = $(window).height() / 50 | 11

    //预先生成一些div
    for (var i = 0; i < 20; i++) {
        $('.container').append($('.item').clone().first())
    }

    function moreData() {
        while ($(document).height() <= $(window).scrollTop() + $(window).height() + 303) {
//            console.log($('.loading').length)
            if ($('.loading').length)
                break

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
//                    console.log(item.get('img'))
//                    item.children('img').attr({src:'##'})
                    //console.log(data)
                 //   for(var i = 0; i < 3 ; i++)
                      item.find('p').eq(0).text(data.title)
                      item.find('p').eq(1).text(data.auth)
                    item.find('p').eq(2).text(data.message)
                    $('.container').append(item)
//                    item.text(data.message).fadeIn(500)
                    item.fadeIn(500)
                }

            })
        }

    }

    $(window).scroll(moreData)


   //判断滑动
    var startX, startY;
    document.addEventListener('touchstart',function (ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend',function (ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);

        switch(direction) {
               case 0:
                    //alert("没滑动");
                   //$('.userpanel').animate({left:-pandleWidth})
                    break;
               case 1:
                   // alert("向上");
                    break;
               case 2:
                  //  alert("向下");
                     break;
               case 3:
                    //alert("向左");
                    //$('.panel').hide()
                    $('.userpanel').animate({left:'-55%'})
                    break;
                case 4:
                    //alert("向右");
                    //$('.panel').show()
                    $('.userpanel').animate({left:'0%'})
                    break;
            default:
        }
    }, false);


    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection(startX, startY, endX, endY) {
        var dy = startY - endY;
        var dx = endX - startX;
        var result = 0;

        //如果滑动距离太短
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return result;
        }

        var angle = GetSlideAngle(dx, dy);
        if(angle >= -45 && angle < 45) {
            result = 4;
        }else if (angle >= 45 && angle < 135) {
            result = 1;
        }else if (angle >= -135 && angle < -45) {
            result = 2;
        }
        else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        }

        return result;
    }

    function GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }
})
