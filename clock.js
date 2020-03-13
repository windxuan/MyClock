var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var r = w / 2;

// 初始化时钟 --> 绘制时钟表盘
function fun() {
  context.save(); // 保存当前环境的状态
  context.translate(r, r); // 指定时钟的圆心点
  context.beginPath(); // 起始一条路径，开始绘制
  context.strokeStyle = 'black'; // 画笔颜色

  //对齐数字
  context.textAlign = 'center'; //设置或返回文本内容的当前对齐方式
  context.textBaseline = 'middle'; //设置或返回在绘制文本时使用的当前文本基线

  // 设置或返回用于笔触的颜色、渐变或模式
  context.strokeStyle = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';

  context.lineWidth = 10; //线条宽度
  context.arc(0, 0, r - 5, 0, Math.PI * 2, false); // 表盘大圆

  context.closePath(); //创建从当前点回到起始点的路径
  context.stroke(); //绘制已定义的路径

  // 首先，用一个数组将所有的小时数存放起来
  var hoursnum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  for (var i = 0; i < hoursnum.length; i++) {
    // 首先得把弧度确定出来
    var rad = ((Math.PI * 2) / 12) * i; //360°-->12等分

    // 然后确定小时数的对应在重新映射画布里的坐标
    var x = Math.cos(rad) * (r - 30);
    var y = Math.sin(rad) * (r - 30);
    // 输出 -->	在画布上绘制“被填充的”文本
    context.fillText(hoursnum[i], x, y);
  }

  // 绘制60个计时点
  for (var j = 0; j < 60; j++) {
    // 首先得把弧度确定出来
    var rad = ((Math.PI * 2) / 60) * j; // 秒钟的弧度-->60等分

    // 然后确定小时数的对应在重新映射画布里的坐标
    var x = Math.cos(rad) * (r - 18); // 领边/斜边*半径
    var y = Math.sin(rad) * (r - 18); // 对边/斜边*半径

    context.beginPath(); // 开始绘制
    if (j % 5 == 0) {
      context.fillStyle = 'black'; // 设置或返回用于填充绘画的颜色、渐变或模式
      context.arc(x, y, 2, 0, Math.PI * 2, false);
    } else {
      context.fillStyle = 'bisque';
      context.arc(x, y, 2, 0, Math.PI * 2, false);
    }

    context.closePath(); // 结束绘制路径
    context.fill(); // 填充
  }
}

// 绘制时针
function drawhours(hour, minus) {
  context.save(); // 保存当前环境的状态
  // rotate(angle) 方法旋转当前的绘图 , 传递的参数为弧度;
  context.beginPath(); // 起始绘制
  var rad = ((Math.PI * 2) / 12) * hour;
  var radm = ((Math.PI * 2) / 12 / 60) * minus;

  context.rotate(rad);
  context.lineWidth = 6; // 设置或返回当前的线条宽度
  context.lineCap = 'round'; // 设置或返回线条的结束端点样式

  context.moveTo(0, 10); // 从坐标x,y开始画
  context.lineTo(0, -(r / 2 - 15)); // 画到x,y这里结束
  context.stroke();
  context.restore(); // 返回之前保存过的路径状态和属性
}

// 绘制分针
function drawminus(minus) {
  context.save();

  context.beginPath();
  var rad = ((Math.PI * 2) / 60) * minus;

  context.rotate(rad); // W3C: 设置线条的圆角
  context.lineWidth = 4;
  context.lineCap = 'round';

  context.moveTo(0, 10);
  context.lineTo(0, -(r - 45));

  context.stroke();

  context.restore();
}

// 绘制秒针
function drawseco(seco) {
  context.save();

  context.beginPath();
  var rad = ((Math.PI * 2) / 60) * seco;

  context.rotate(rad); // 根据角度旋转
  context.lineWidth = 4;
  context.lineCap = 'round';

  context.moveTo(2, 15);
  context.lineTo(0, -(r - 45));
  context.lineTo(-2, 15);
  context.lineTo(1, 15);

  context.closePath(); // 创建从当前点回到起始点的路径
  context.stroke();

  context.restore();
}

// 绘制原点
function drawDot() {
  context.beginPath();
  context.font = '30px arial';
  context.fillStyle = '#000';
  context.arc(0, 0, 5, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

// 写方法，使时钟动起来
setInterval(function() {
  context.clearRect(0, 0, w, h); // 每次画时钟，清除上一次的画布
  var datenow = new Date();
  var hour = datenow.getHours();
  var minu = datenow.getMinutes();
  var seco = datenow.getSeconds();

  var hourtext;
  var minutext;
  var secotext;

  fun();
  drawhours(hour, minu);
  drawminus(minu);
  drawseco(seco);
  drawDot();

  // 小时
  if (hour < 10) {
    hourtext = '0' + hour;
  } else {
    hourtext = hour;
  }
  // 分钟
  if (minu < 10) {
    minutext = '0' + minu;
  } else {
    minutext = minu;
  }
  // 秒钟
  if (seco < 10) {
    secotext = '0' + seco;
  } else {
    secotext = seco;
  }
  context.fillText(hourtext + ':' + minutext + ':' + secotext, 0, 100);
  context.restore();
}, 1000);
