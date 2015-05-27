window.onload = function() {
  var text = document.getElementById('deleteEffect');
  // console.log(text.style);
  var flag = true;
  setInterval(function() {
    // console.log('point');
    if (flag) {
      text.style.borderRight = 'red 2px solid';
    } else {
      text.style.borderRight = 'red 0px solid';
    }
    flag = !flag;

  }, 800);

  effectBegin(['聚会','郊游','聚餐','KTV','开黑'],text);
};

function effectBegin(stra,ele) {
  var sflag = true;
  var index = 0;
  setInterval(function() {
    if (sflag) {
      deleteEffect(stra[index], ele, 1);
    } else {
      deleteEffect(stra[index], ele, -1);
      index++;
    }
    if(index == stra.length)
      index=0;
    sflag = !sflag;
  }, 1500);
}


function deleteEffect(str, ele, move) {
  ele.innerHTML = '';
  var strr = str;
  str = str.split('');
  move = move || 1;
  // str = str.reverse();
  if (move === 1)
    var si = setInterval(function() {
      if (!str || str.length === 0) {
        clearInterval(si);
      }
      var tt = str.shift();
      if (tt) {
        ele.innerHTML += tt;
      }
    }, 20);
  else if (move === -1)
    var sii = setInterval(function() {
      if (!str || str.length === 0) {
        clearInterval(sii);
      }
      str.pop();

      ele.innerHTML = str.join('');

    }, 30);
}
