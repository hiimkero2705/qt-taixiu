document.addEventListener('DOMContentLoaded', function () {

var d1 = document.getElementById("dice1");
var d2 = document.getElementById("dice2");
var d3 = document.getElementById("dice3");
var idGame = document.getElementById("id");
var soNguoiChonTai = document.getElementById("usertai");
var soNguoiChonXiu = document.getElementById("userxiu");
var tongTienDatTai = document.getElementById("sumtai");
var tongTienDatXiu = document.getElementById("sumxiu");
var time = document.getElementById("time");
var gameStart = function(){
    time.style.opacity = 1;
    d1.style.opacity = 0;
    d2.style.opacity = 0;
    d3.style.opacity = 0;
    document.getElementById('dragon').style.webkitAnimationPlayState = 'running'; 
    document.getElementById("taitxt").style.webkitAnimationPlayState = 'paused';
    document.getElementById("xiutxt").style.webkitAnimationPlayState = 'paused'; 
};
var el = document.getElementById('pulltai');
if(el){
el.addEventListener('keyup', function(event) {
	if (event.key === "Enter") {
        $.post("http://qt-taixiu/dattai",JSON.stringify({
            dice: 'tai',
            money: Number(document.getElementById('pulltai').value)
        }));
        document.getElementById('pulltai').value = '';
    }
});}

var ek = document.getElementById('pullxiu');
if(ek){
ek.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        $.post("http://qt-taixiu/datxiu",JSON.stringify({
            dice: 'xiu',
            money: Number(document.getElementById('pullxiu').value)
        }));
        document.getElementById('pullxiu').value = '';
    }
});}

window.addEventListener('message', function(e) {
	$("#container").stop(false, true);
    if (e.data.displayWindow == 'true') {
        $("#container").css('display', 'flex');
  		

    }else if (e.data.displayWindow == 'false') {
    	$("#container").css('display', 'none');
    }

});




var gameOver = function(dice){
    time.style.opacity = 0;
    var roll = document.getElementById("roll");
    document.getElementById('dragon').style.webkitAnimationPlayState = 'paused'; 
    roll.src = "";
    roll.src = 'imgs/roll1.gif';
    roll.style.opacity = 1;
    setTimeout(()=>{
        roll.style.opacity = 0;
        showDice(dice.dice1,dice.dice2,dice.dice3);
		if(dice.result == 'nhacaian'){
			showStt('Nhà cái ăn');
		}else{
            document.getElementById(dice.result+"txt").style.webkitAnimationPlayState = 'running'; 
            if(dice.result == 'xiu'){
                appendWhite()
            }else{
                appendBlack()
            }
		}
    },2000);
};

var showDice = function(dice1,dice2,dice3){
    var dice = {
        1: '0 -2px',
        2: '-103px -3px',
        3: '-204px -3px',
        4: '-305px -3px',
        5: '-404px -3px',
        6: '-507px -2px',
    };
    d1.style.background = "url('imgs/dice.png') no-repeat "+ dice[dice1];
    d2.style.background = "url('imgs/dice.png') no-repeat "+ dice[dice2];
    d3.style.background = "url('imgs/dice.png') no-repeat "+ dice[dice3];
    d1.style.opacity = 1;
    d2.style.opacity = 1;
    d3.style.opacity = 1;

};

var showStt = function(msg,timeout = 3000){
    /* var statustxt = document.getElementById('statustxt');
    statustxt.innerHTML = msg;
    statustxt.style.opacity = 1;
    setTimeout(()=>{
        statustxt.style.opacity = 0;
    },timeout); */
    $.post("http://qt-taixiu/Notification", JSON.stringify({message:msg}));
};

gameStart();

window.addEventListener('message', function(e) {
	
		
	if (e.data.type == 'gameData') {
		idGame.innerHTML         = '#' + e.data.id;
		soNguoiChonTai.innerHTML = e.data.chontai;
		soNguoiChonXiu.innerHTML = e.data.chonxiu;
		tongTienDatTai.innerHTML = e.data.tientai;
		tongTienDatXiu.innerHTML = e.data.tienxiu;
		if(e.data.t < 10){
			time.innerHTML  = e.data.t == 0 ? '' : '0' + e.data.t;
		}else{
			time.innerHTML  = e.data.t;
		}
	}
}
);
window.addEventListener('message', function(e) {
	if (e.data.type == 'gameOver') {
		var dice1 = e.data.dice1;
		var dice2 = e.data.dice3;
		var dice3 = e.data.dice3;
		var ketqua = {
			dice1 : e.data.dice1,
			dice2 : e.data.dice2,
			dice3 : e.data.dice3,
			result : dice1 + dice2+ dice3 <= 9 ? 'xiu' : 'tai'
		};
		gameOver(e.data);
	}
}
);
window.addEventListener('message', function(e) {
	if (e.data.type == 'gameStart') {
		gameStart();
		//showStt('Game bắt đầu');
	}
}
);
window.addEventListener('message', function(e) {
	if (e.data.type == 'nhankeo') {
		gameStart();
		//showStt('Game bắt đầu');
	}
}
);
window.addEventListener('message', function(e) {
	if (e.data.type == 'pull') {
		if(e.data.tinnhan == 'success'){
			showStt('Đặt cược thành công');
		}else if(e.data.tinnhan == 'error'){
			showStt('Không thể đặt, vui lòng chờ giây lát');
		}
	}
}
);

function appendWhite(){
    var count = $('.last-roll').length
    if(count == 10){
        $('.last-roll').eq(0).remove();
    }
    $('.txt').append(`<img src="imgs/trang.png" class="last-roll" alt="" height="50">`);
}

function appendBlack(){
    var count = $('.last-roll').length
    if(count == 10){
        $('.last-roll').eq(0).remove();
    }
    $('.txt').append(`<img src="imgs/den.png" class="last-roll"  alt="" height="50">`);
}

$(document).ready(function () {	
	$("body").on("keyup", function (key) {
		if (event.which == 27 || event.keyCode == 27) {
			closeInventory();
			return false;
        }
		return true;
    });
    $(".main").draggable();
    $("body").on("click", ".close", function(){
        $.post("http://qt-taixiu/Close")
    })
    $("body").on("click", "#esc", function(){
        $.post("http://qt-taixiu/NUIFocusOff")
    })
    $("body").on("click", "#close-help", function(){
        $(".help").fadeOut(200)
    })
});

function closeInventory() {
    $.post("http://qt-taixiu/NUIFocusOff", JSON.stringify({}));
}
	});	