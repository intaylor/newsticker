'use strict';

/**
 * @ngdoc directive
 * @name nextissueApp.directive:ticker
 * @description
 * # ticker
 */
angular.module('nextissueApp') 
  .directive('ticker', ['$window', '$timeout', function ($window, $timeout) {
    return {
      template: "<div id='ticker'></div>",
      restrict: 'E',
      //scope: {},
      link: function postLink(scope, element, attrs) {

        var ticker = angular.element('#ticker');
		
		ticker.append("<div id='arrow'/>");
      	ticker.append("<div id='flag'/>");
      	ticker.append("<div id='news'/>");

      	ticker.css({'position':'fixed', 'background':'blue', 'width':'100%', 'z-index':'10', 'height':'32px'});

        var arrow = angular.element('#arrow');
        arrow.html("<img src='../../images/glyphicons-213-down-arrow.png'/>");
        arrow.css({'float':'left', 'background-color':'red'});

		var current = 0;
        arrow.on('click',function() {
        	if (current >= 3) {
        		current = 0;
        	} else {
        		current++;
        	}

        	flag.html( "<img src='../../" + ticker_data[current].flag + "' height='32px' width='42px'/>");
        	news.text(ticker_data[current].content);

        	if(scope.dly != null) {
        		clearTimeout(scope.dly);
        		startTicker();
        	}

        });

		var flag = angular.element('#flag');
        var flagSrc = "<img src='../../" + ticker_data[0].flag + "' height='32px' width='42px'/>";

        flag.html(flagSrc);
        flag.css('float', 'left');

		var news = angular.element('#news');
        news.html('<p>'+ticker_data[0].content + '</p>');
        news.css('color', 'yellow');
        news.css({'height':'32px', 'width':'80%', 'color':'red', 'zIndex':'-1', 'float':'left'});

		$window.addEventListener("load", startTicker, false);

        function startTicker() {
        	//var sz = news[0].offsetWidth;
        	//alert(sz);

          var pos = ['left','offsetWidth','top','width'],                           
		  id = 'ticker',                                                          
		  delay = 2000,                                                              
		  ud = -1,                              
		  p = ticker[0], 
		  obj = news[0], 
		  sz = obj['offsetWidth'],
		  clone,
		  nu = $window.Math.ceil(p['offsetWidth']/sz)+1,
		  z0 = 1;

		  p.style.overflow = 'hidden';

		  obj.style.position = 'absolute';
		  obj.style[pos[0]] = '0px';
		  obj.style[pos[3]] = sz + 'px';
		  for (;z0<nu;z0++){
		   clone=obj.cloneNode(true);
		   clone.style[pos[0]]=sz*z0+'px';
		   clone.style[pos[2]]='0px';
		   obj.appendChild(clone);
		  }
		  var o = {
		   obj:obj,
		   pos:pos[0],
		   sz:sz*(z0-1)
		  }

		  if (typeof(delay) == 'number'){
		   scope.dly=setTimeout(function(){scroll(o, id,typeof(ud)=='number'?ud:-1); }, delay);
		  }
		  else {
		    scroll(id,0)
		  }

    }


    function scroll(o, id, ud) {

		  var p;
		  
		  if (o) {
		   ud=typeof(ud)=='number' ? ud : 0;
		   clearTimeout(o.dly);

		   p = parseInt(o.obj.style[o.pos])+ud;

		   if ((ud>0&&p>0) || (ud<0&&p<-o.sz)){
		    p+=o.sz*(ud>0?-1:1);
		   }

		   o.obj.style[o.pos] = p+'px';

		   o.dly = setTimeout(function(){ scroll(o, id,ud); },50);
		  }
		}
		
      }
    };
  }]);
