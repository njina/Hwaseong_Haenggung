// main.js
// 화성행궁 야간개장 사이트
// 메인페이지

(function($){
// jQuery 시작

// 로딩 될때 보여지는 화면(loading...)
$('body').prepend('<div class="loading"></div>');
$('.loading').css({position:'fixed', top:0,left:0, width:'100%', height:'100%', zIndex:5000, backgroundColor:'rgba(0,0,0,0.95)'});
$('head').append('<style>.loading:before{content:"Loading"; font-size:3rem; color:#fff; display:block; width:100%; height:auto; margin:auto; text-align:center; position:fixed; top:0;bottom:0;z-index:5000;}</style>');

//모든 로딩이 끝나면 진행해라
$(document).ready(function(){

	$('html,body').animate({scrollTop:0});	
	$('.loading').remove();

	//페이지 공통적인 변수
	var win = $(window);
	var winH = win.outerHeight();
	var myScroll;

	//viewBox 스크롤시에 애니메이트
	var headBox = $('#headBox');
	var gnbBox = $('#gnbBox');
	var viewBox = $('#viewBox');
	var viewImg = viewBox.find('div');
	var imageMoveStart;

	// $('#starBox').show();

	win.on('scroll',function(e){
		e.preventDefault();

		myScroll = win.scrollTop();

		var myoffset = (myScroll / winH) / 3 * 2;
		var winTop = myoffset + winH;
		// console.log(myoffset);
		// console.log('myScroll: ' + myScroll);
		// console.log(winTop);
		// viewBox.css({top:myScroll});
		//안개 걷히는
		viewImg.eq(3).css({opacity: 1-myoffset, left: myoffset * 100 + '%'});
		viewImg.eq(4).css({opacity: 1-myoffset, left: -myoffset * 100 + '%'});
		//사람 투명도
		viewImg.eq(2).css({opacity: myoffset});
		viewImg.eq(1).css({bottom: -myoffset * 100 + '%'});

		// if( myScroll > 1300 && myScroll < 2000){
			if(myScroll > 1500 ){
				//달 커지게
				if( (myoffset/3*2) * 100 < 100){
					viewImg.eq(1).css({backgroundSize:'100% auto'});
				} else {
					viewImg.eq(1).css({backgroundSize: (myoffset/3*2) * 100 + '% auto'});
				}
				viewImg.eq(2).css({opacity: 2-myoffset});
		}

		if ( myScroll > 1600 && myoffset < 2){
			viewImg.eq(1).css({opacity:2 - myoffset});
		} 

		if ( myScroll > 1800 && myoffset < 2){
			viewImg.eq(5).css({opacity: 0});
			viewImg.eq(6).css({opacity: 0});
			$('#starBox').hide();
			
			// console.log(imageMoveStart)
			imageMoveStart = win.scrollTop();
		} else {
			viewImg.eq(5).css({opacity: 1-myoffset});
			viewImg.eq(6).css({opacity: 1-myoffset});
			$('#starBox').show();
			viewImg.show();
		}


		if( myoffset >= 2){
			// console.log( imageMoveStart - myScroll);
			viewBox.css({top: (imageMoveStart - myScroll)/3 +'px'});
			$('#starBox').hide();
		}else{
			viewBox.css({top:0});
		}

		//end-scroll 기능
	});
	

	//'달빛정담' mousemove 시
	var mouseX, mouseY ;

	viewImg.eq(5).on('mousemove',function(e){
		mouseX = e.originalEvent.offsetX;
		mouseY = e.originalEvent.offsetY;
		
		$(this).css({transform:'translateX('+ -mouseX/20+'px) scale(1.1)'});
	});
	viewImg.eq(5).on('mouseleave',function(e){
		mouseX = e.originalEvent.offsetX;
		mouseY = e.originalEvent.offsetY;
		
		$(this).css({left: 0, transform:'scale(1)'});
	});






	//headBox 배경색상, 글씨색상 변경 -------
	var reGuide = $('#reGuide');
	var reGuideOff;

	win.on('scroll',function(){
		myScroll  = win.scrollTop();
		reGuideOff = reGuide.offset().top;

		if( myScroll >= reGuideOff ){
			headBox.css({backgroundColor:'rgba(22, 20, 17, 1)', color:'#fff'});
		}	else {
			headBox.css({backgroundColor:'rgba(22, 20, 17, 0)', color:'#fff'});
		}
	});

	//navigation 에 mouseenter 시에
	var gnbLink = gnbBox.find('li').children('a');

	gnbLink.on('mouseenter',function(){
		$(this).parent('li').addClass('active');
	});
	gnbLink.on('mouseleave',function(){
		$(this).parent('li').removeClass('active');
	});





}); //ready종료
// jQuery 종료
})(jQuery);