function rando(a,b,e){var g=function(f){return"undefined"===typeof f},k=function(f){return"number"===typeof f&&!isNaN(f)},d=function(f){return!g(f)&&null!==f&&f.constructor===Array},c=function(){try{for(var f,q=[],r;30>(r="."+q.join("")).length;){f=(window.crypto||window.msCrypto).getRandomValues(new Uint32Array(5));for(var p=0;p<f.length;p++){var t=4E9>f[p]?f[p].toString().slice(1):"";0<t.length&&(q[q.length]=t)}}return Number(r)}catch(v){return Math.random()}};try{if(null!==a&&null!==b&&null!==
    e){if(g(a))return c();if(window.jQuery&&a instanceof jQuery&&g(b)){if(0==a.length)return!1;var n=rando(0,a.length-1);return{index:n,value:a.eq(n)}}if(k(a)&&k(b)&&"string"===typeof e&&"float"==e.toLowerCase().trim()){if(a>b){var m=b;b=a;a=m}return c()*(b-a)+a}if(d(a)&&0<a.length&&g(b)){var l=c()*a.length<<0;return{index:l,value:a[l]}}if("object"===typeof a&&g(b)){l=a;var h=Object.keys(l);if(0<h.length){var u=h[h.length*c()<<0];return{key:u,value:l[u]}}}if((!0===a&&!1===b||!1===a&&!0===b)&&g(e))return.5>
    rando();if(k(a)&&g(b))return 0<=a?rando(0,a):rando(a,0);if(k(a)&&"string"===typeof b&&"float"==b.toLowerCase().trim()&&g(e))return 0<=a?rando(0,a,"float"):rando(a,0,"float");if(k(a)&&k(b)&&g(e))return a>b&&(m=b,b=a,a=m),a=Math.floor(a),b=Math.floor(b),Math.floor(c()*(b-a+1)+a);if("string"===typeof a&&0<a.length&&g(b))return a.charAt(rando(0,a.length-1))}return!1}catch(f){return!1}}
    function randoSequence(a,b){var e=function(h){return"undefined"===typeof h},g=function(h){return"number"===typeof h&&!isNaN(h)},k=function(h){return!e(h)&&null!==h&&h.constructor===Array};try{if(e(a)||null===a||null===b)return!1;var d=[];if(window.jQuery&&a instanceof jQuery&&e(b)){if(0<a.length){d=randoSequence(0,a.length-1);for(var c=0;c<d.length;c++)d[c]={index:d[c],value:a.eq(d[c])}}return d}if(e(b))if(k(a)&&e(b))for(c=0;c<a.length;c++)d[d.length]={index:c,value:a[c]};else if("object"===typeof a&&
    e(b))for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(d[d.length]={key:n,value:a[n]});else if("string"===typeof a&&e(b))for(c=0;c<a.length;c++)d[d.length]=a.charAt(c);else return g(a)&&e(b)?0<=a?randoSequence(0,a):randoSequence(a,0):!1;else{if(!g(a)||!g(b)||0<a%1||0<b%1)return!1;if(a>b){var m=b;b=a;a=m}for(c=a;c<=b;c++)d[d.length]=c}for(c=d.length-1;0<c;c--){var l=rando(c);m=d[c];d[c]=d[l];d[l]=m}return d}catch(h){return!1}};


var Taixiu = function(){

    // cài đặt
    this.idPhien             = 0;  // id phiên đặt
    this.timeDatCuoc         = 60; // thời gian đặt cược = 60s;
    this.timechophienmoi     = 10; // thời gian chờ phiên mới = 10s;
    this.soNguoiChonTai      = 0;  // Số người đặt tài
    this.soNguoiChonXiu      = 0;  // Số người đặt xỉu
    this.tongTienDatTai      = 0;  // tổng tiền đặt tài
    this.tongTienDatXiu      = 0;  // tổng tiền đặt xỉu
    this.time                = this.timeDatCuoc;  // thời gian
    this.coTheDatCuoc        = true; // có thể đặt hay không
    this.idChonTai           = []; // array id chọn tài
    this.idChonXiu           = []; // array id chọn xỉu
    this.ketQua              = ''; // kết quá


    // game bắt đầu
    this.gameStart = function(){
        // code
        seft = this;
        seft.idPhien ++;
        seft.coTheDatCuoc        = true // có thể đặt
        seft.soNguoiChonTai      = 0;  // Số người đặt tài
        seft.soNguoiChonXiu      = 0;  // Số người đặt xỉu
        seft.tongTienDatTai      = 0;  // tổng tiền đặt tài
        seft.tongTienDatXiu      = 0;  // tổng tiền đặt xỉu
        seft.idChonTai           = []; // array id chọn tài
        seft.idChonXiu           = []; // array id chọn xỉu
        seft.time = seft.timeDatCuoc;
        //console.log('newgame');
		//console.log( 'idGame:' + seft.idPhien);
		emitNet('taixiu:gameStart', -1, this.ketQua);
        loopAGame = setInterval(function() {              
            seft.time--;
			emitNet('taixiu:gameData', -1, { 
                idGame        : seft.idPhien,
                soNguoiChonTai: seft.soNguoiChonTai, 
                soNguoiChonXiu: seft.soNguoiChonXiu, 
                tongTienDatTai: seft.tongTienDatTai, 
                tongTienDatXiu: seft.tongTienDatXiu, 
                soNguoiChonTai: seft.soNguoiChonTai, 
                time          : seft.time, 
            });
            //ketqua = seft.gameRandomResult();
            
            /* console.log( 'soNguoiChonTai:' + seft.soNguoiChonTai);
            console.log( 'soNguoiChonXiu:' + seft.soNguoiChonXiu);
            console.log( 'tongTienDatTai:' + seft.tongTienDatTai);
            console.log( 'tongTienDatXiu:' + seft.tongTienDatXiu);
            console.log( 'time:' + seft.time); */
            if (seft.time == 0){
                clearInterval(loopAGame);
                seft.gameOver();
            }
        }, 1000);
        // console.log( 'tongTienDatXiu:' + JSON.stringify(ketqua));

        // console.log();
    };
    // game kết thúc
    this.gameOver = function(){
        seft = this;
        seft.coTheDatCuoc  = false // không thể đặt
        seft.time = seft.timechophienmoi;
        this.ketQua =  seft.gameRandomResult();
		emitNet('taixiu:gameOver', -1, this.ketQua);
        //console.log(JSON.stringify(this.ketQua));
		if(this.ketQua.result != 'nhacaian'){
			idWin = this.ketQua.result == 'tai' ? seft.idChonTai : seft.idChonXiu;
			idWin.forEach((data)=>{
				emit('taixiu:winGame', data.id, data.tien);
			});
		};
        loopAGame = setInterval(function() {   
            seft.time --;   
            /* console.log(seft.time); */
			emitNet('taixiu:gameData', -1, { 
                idGame        : seft.idPhien,
                soNguoiChonTai: seft.soNguoiChonTai, 
                soNguoiChonXiu: seft.soNguoiChonXiu, 
                tongTienDatTai: seft.tongTienDatTai, 
                tongTienDatXiu: seft.tongTienDatXiu, 
                soNguoiChonTai: seft.soNguoiChonTai, 
                time          : seft.time, 
            });
            if (seft.time == 0){
                clearInterval(loopAGame);
                seft.gameStart();
            }
        }, 1000);
    };
    // đặt cược
    this.putMoney = function(id,cau,tien){
        // nếu đang trong thời gian chờ (coTheDatCuoc == false)
        if (this.coTheDatCuoc == false){
            return {
                status  : 'error',
                error   : 'Không thể đặt, vui lòng chờ giây lát'
            };
        }
        if(tien > 1000000){
            return {
                status  : 'error',
                error   : 'Không thể đặt quá 1.000.000'
            };
        }
        if(cau == 'tai'){
            // thêm tiền vào tổng số tiền đặt tài
            // thêm id vào list id array nếu chưa có
            if(!this.idChonTai.find(x => x.id === id)){ 
                this.idChonTai.push({
                    id   : id,
                    cau  : 'tai',
                    tien : tien
                });
                this.soNguoiChonTai ++;
                this.tongTienDatTai += tien;
            }else{
                // nếu tìm thấy thì cộng thêm tiền vô
                if(this.idChonTai.find(x=>x.id === id).tien + tien > 1000000){
                    return {
                        status  : 'error',
                        error   : 'Không thể đặt quá 1.000.000'
                    };
                }
                this.idChonTai.find(x => x.id === id).tien += tien;
                this.tongTienDatTai += tien;
            }
            
        }else if(cau == 'xiu'){
            // thêm tiền vào tổng số tiền đặt tài
            // thêm id vào list id array nếu chưa có
            if(!this.idChonXiu.find(x => x.id === id)){ 
                this.idChonXiu.push({
                    id   : id,
                    cau  : 'xiu',
                    tien : tien
                });
                this.soNguoiChonXiu ++;
                this.tongTienDatXiu += tien;
            }else{
                // nếu tìm thấy thì cộng thêm tiền vô
                if(this.idChonXiu.find(x=>x.id === id).tien + tien > 1000000){
                    return {
                        status  : 'error',
                        error   : 'Không thể đặt quá 1.000.000'
                    };
                }
                this.idChonXiu.find(x => x.id === id).tien += tien;
                this.tongTienDatXiu += tien;
            }
        }
        return {
            status : 'success',
			player : id,
			tiendat : tien,
        }
    }
    // random kết quả
    this.gameRandomResult = function(){
        /* dice1 = Math.floor(1 + Math.random()*(6));
        dice2 = Math.floor(1 + Math.random()*(6));
        dice3 = Math.floor(1 + Math.random()*(6)); */
        if (this.idPhien > 3 && this.idPhien % 3 == 0){
            dice1 = rando(1, 6);
            dice2 = rando(1, 6);
            dice3 = rando(1, 6);
            if (this.tongTienDatXiu <= this.tongTienDatTai){
                while (dice1 + dice2 + dice3 > 10){
                    dice1 = rando(1, 6);
                    dice2 = rando(1, 6);
                    dice3 = rando(1, 6);
                }
                return {
                    dice1    : dice1,
                    dice2    : dice2,
                    dice3    : dice3,
                    result  : dice1 + dice2 + dice3 <= 10 ? 'xiu' : 'tai'
                };
            }else{
                while (dice1 + dice2 + dice3 <= 10){
                    dice1 = rando(1, 6);
                    dice2 = rando(1, 6);
                    dice3 = rando(1, 6);
                }
                return {
                    dice1    : dice1,
                    dice2    : dice2,
                    dice3    : dice3,
                    result  : dice1 + dice2 + dice3 <= 10 ? 'xiu' : 'tai'
                };
            }
        }else{
            dice1 = rando(1, 6);
            dice2 = rando(1, 6);
            dice3 = rando(1, 6);
            console.log(dice1, dice2, dice3)
            if((dice1 == dice2) & (dice1 == dice3)){
                return {
                    dice1    : dice1,
                    dice2    : dice2,
                    dice3    : dice3,
                    result  : 'nhacaian'
                };
            }else{
                return {
                    dice1    : dice1,
                    dice2    : dice2,
                    dice3    : dice3,
                    result  : dice1 + dice2 + dice3 <= 10 ? 'xiu' : 'tai'
                };
            }
        }
    }
    
}

tx = new Taixiu();

on('taixiu:pull', function (id, dice, money) {
    msg = tx.putMoney(id, dice, money);
    emitNet('taixiu:pull', id, msg);	
});

tx.gameStart();