// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
	scrollFunction();
};

function scrollFunction() {
	const mybuttontop = document.querySelector('#myBtn');

	if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 20) {
		mybuttontop.style.display = 'block';
	} else {
		mybuttontop.style.display = 'none';
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//To load template for header and footer
const header = document.querySelector('#header'),
	footer = document.querySelector('#footer'),
	userDashboardHeader = document.querySelector('#userDashboardHeader'),
	userDashboardfooter = document.querySelector('#userDashboardfooter'),
	adminDashboardHeader = document.querySelector('#adminDashboardHeader');
let argUrl = window.location.pathname;

document.addEventListener('DOMContentLoaded', loadDoc);
function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'template/header.html', true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			header.innerHTML = this.responseText;

			switch (argUrl) {
				case '/index.html':
					header.querySelector('#home').classList.add('active');
					break;
				case '/about-us.html':
					header.querySelector('#about').classList.add('active');
					break;
				case '/tracking.html':
					header.querySelector('#tracking').classList.add('active');
					break;
				case '/contact.html':
					header.querySelector('#contact').classList.add('active');
					break;
				case '/signUp.html':
					header.querySelector('#signUp').classList.add('active');
					break;

				default:
					break;
			}
		}
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'template/footer.html', true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			footer.innerHTML = this.responseText;
		}
	};
}

//dashboard setup
(function(window) {
	'use strict';

	function classReg(className) {
		return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ('classList' in document.documentElement) {
		hasClass = function(elem, c) {
			return elem.classList.contains(c);
		};
		addClass = function(elem, c) {
			elem.classList.add(c);
		};
		removeClass = function(elem, c) {
			elem.classList.remove(c);
		};
	} else {
		hasClass = function(elem, c) {
			return classReg(c).test(elem.className);
		};
		addClass = function(elem, c) {
			if (!hasClass(elem, c)) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function(elem, c) {
			elem.className = elem.className.replace(classReg(c), ' ');
		};
	}

	function toggleClass(elem, c) {
		var fn = hasClass(elem, c) ? removeClass : addClass;
		fn(elem, c);
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

	// transport
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(classie);
	} else {
		// browser global
		window.classie = classie;
	}
})(window);

var SidebarMenuEffects = (function() {
	function hasParentClass(e, classname) {
		if (e === document) return false;
		if (classie.has(e, classname)) {
			return true;
		}
		return e.parentNode && hasParentClass(e.parentNode, classname);
	}

	function mobilecheck() {
		var check = false;
		(function(a) {
			if (
				/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
				check = true;
		})(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	}

	function init() {
		var container = document.getElementById('st-container'),
			buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > button')),
			// event type (if mobile use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove(container, 'st-menu-open');
			},
			bodyClickFn = function(evt) {
				if (!hasParentClass(evt.target, 'st-menu')) {
					resetMenu();
					document.removeEventListener(eventtype, bodyClickFn);
				}
			};

		buttons.forEach(function(el, i) {
			var effect = el.getAttribute('data-effect');

			el.addEventListener(eventtype, function(ev) {
				ev.stopPropagation();
				ev.preventDefault();
				container.className = 'st-container'; // clear
				classie.add(container, effect);
				setTimeout(function() {
					classie.add(container, 'st-menu-open');
				}, 25);
				document.addEventListener(eventtype, bodyClickFn);
			});
		});
	}

	init();
})();

// dashboard sidebars

function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('active');
}

// chart graph

//loader
var loaderVa;

function loaderFunction() {
    loaderVa = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loaderDiv").style.display = "block";
}