var tag = document.getElementsByTagName('table')[0];
var num =0;  //步数
var tds = document.getElementsByTagName('td');
//var once = 0;
var chess = [];  //记录下的棋
//下棋功能
function play(){
	tag.onclick = function(event){
	    //下棋
	    if(event.target.style.background.indexOf('image')==-1){
		    event.target.style.background = num++%2?("url(../image/white.jpg) no-repeat"):("url(../image/black.jpg) no-repeat");
		    event.target.style.backgroundSize = "50px";
		}
		//console.log(event.target.cellIndex);  
		//console.log(event.target.parentElement.rowIndex);  
		
		// 步数
		document.getElementsByClassName('count')[0].innerHTML = "步数"+num;

		//选手
		document.getElementsByClassName('player')[0].innerHTML = num%2?"白方":"黑方";
	    
	    //输赢
	    //当前子的坐标
	    var x = event.target.cellIndex;   //横坐标
		var y = event.target.parentElement.rowIndex;  //纵坐标
		//记录棋子的位置
		chess[num-1] = y*15+x;
		//调用输赢方法
	    getResult(x,y);

	    //开始计时
	   /* if(once==0){
	    	timer();
	    	once++;
	    }*/
	}
}
//开始游戏
document.getElementsByClassName('reset')[0].onclick = function(){
	if(document.getElementsByClassName('reset')[0].innerHTML.indexOf("开始游戏")>=0){
		//下棋
		play();
		//开始计时
		timer();
		document.getElementsByClassName('reset')[0].innerHTML = "重新开始";
	}else{
        window.location.href = "";
	}
}
//悔棋
document.getElementsByClassName('back')[0].onclick = function(){
	if(num>0){
        num--;
	    document.getElementsByClassName('count')[0].innerHTML = "步数"+num;
	    document.getElementsByClassName('player')[0].innerHTML = num%2?"白方":"黑方";
	    tds[(chess[num])].style.background = '';
	}
}

// 暂停 / 开始
document.getElementsByClassName('stop')[0].onclick = function(){
	if(document.getElementsByClassName('stop')[0].innerHTML.indexOf("暂停")>=0){
	    //停止计时
	    clearTimeout(time);
	    //停止下棋
	    tag.onclick = function(){};
	    //切换成开始
	    document.getElementsByClassName('stop')[0].innerHTML = "开始";
	}else{
		//继续计时
		timer();
		//继续游戏
		play();

	}
	
}
//倒计时


//判断输赢功能
//
function getResult(x,y){
	var line = ['','','',''];  //记录每条线x
	//获取当前棋子对应的4条线上的所有棋
	//横
	for(var i=x-4;i<=x+4;i++){
	    line[0] += getColor(i,y);
	}
    result(line[0]);
	//竖
	for(var i=y-4;i<=y+4;i++){
	    line[1] += getColor(x,i);
	}
	result(line[1]);
	//135度角
	for(var i=x-4;i<=x+4;i++){
	    var j= y-(x-i);
	    line[2] += getColor(i,j);
	    j++;
	}
	result(line[2]);
	//45度角
	for(var i=x-4;i<=x+4;i++){
	    var j= y+(x-i);
	    line[3] += getColor(i,j);
	    j++;
	}
	result(line[3]);
}

//判断输赢
function result(chess){
	if(chess.indexOf('bbbbb')>=0){
	   gameover("黑");	   
	   //tag.removeEventListener("onclick");
	}else if(chess.indexOf('wwwww')>=0){
	    gameover("白");
	}
}

//获取棋子的颜色，'b'是黑，'w'是白，'0'是空
function getColor(i,j){
	var color;
	var index = j*15+i;
	if(index<0){
		return '0';
	}
	if(tds[index].style.background.indexOf('black')>=0){
		color = 'b';
	}else if(tds[index].style.background.indexOf('white')>=0){
		color = 'w';
	}else{
		color = '0';
	}
	return color;
}

//计时器
var count = 0;
var time;
function timer(){
	var minute = Math.floor(count/60)<10 ? '0'+Math.floor(count/60) : Math.floor(count/60);
	var second = Math.floor(count%60)<10 ? '0'+Math.floor(count%60) :Math.floor(count%60);
	document.getElementsByClassName('time')[0].innerHTML = minute+':'+second;
	count += 1;
	time = setTimeout("timer()",1000);
}
//setInterval("timer()",1000);

//处理游戏结束
function gameover(winner){
	//停止计时
	clearTimeout(time);
	//停止下棋
	tag.onclick = function(){};
	//显示胜利窗口
	document.getElementById('popup').style.display = "block";
	document.getElementsByClassName("winner")[0].innerHTML = winner+"方获胜";
	//关闭游戏
	document.getElementsByClassName("quit")[0].onclick = function(){
		window.close();
	}
	//关闭弹窗
	document.getElementsByClassName('popupX')[0].onclick = function(){
        document.getElementById('popup').style.display = "none";
	}
}

//确认
//function confirm(){}

/////用户功能
//登录弹窗
document.getElementsByClassName('userphoto')[0].onclick = function(){
	if(this.src.indexOf("unlogin")>=0){
		//登录弹窗
		document.getElementsByClassName("login")[0].style.display = "block";
	}
}
//登录
document.getElementsByClassName("login")[0].onsubmit = function(){
    var cheId = /^[a-zA-Z0-9]{6,11}$/;
    var chePassword = /^[a-zA-Z0-9]{9,16}$/;
    var inputs = document.getElementsByClassName("login")[0].getElementsByTagName('input');
    if(!cheId.test(inputs[0].value)){
    	alert('用户名由6-11位字母或数字组成');
    	return false;
    }
    if(!chePassword.test(inputs[1].value)){
    	alert('密码由9-16位字母或数字组成');
    	return false;
    }
    
}
//关闭登录窗
document.getElementsByClassName("login")[0].getElementsByTagName("h2")[0].onclick = function(){
	document.getElementsByClassName("login")[0].style.display = "none";
}


