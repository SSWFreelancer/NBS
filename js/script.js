document.addEventListener('DOMContentLoaded', function(){
	var scrollPos = 0;
	var isScrolling = false; 
	function handleScroll() {
		if (!isScrolling) {
		window.requestAnimationFrame(function() {
			var scroll = document.documentElement.scrollTop;
			var header = document.querySelector('.header');
			if (scroll > 15 && scroll > scrollPos) {
				header.classList.add('scroll');
			} else {
				header.classList.remove('scroll');
			}
			if(scroll > 1){
				header.classList.add('show');
			}
			else{
				header.classList.remove('show');
			}
			scrollPos = scroll;
			isScrolling = false; 
		});
		}
		isScrolling = true; 
	}
	handleScroll();
	window.addEventListener('scroll', handleScroll);

	var headerBurger = document.querySelector('.header__burger');
	var menu = document.querySelector('.menu');
	var menuLink = document.querySelectorAll('.menu__link:not(:has(+ul))');
	var body = document.body;
	
	if(headerBurger){
		headerBurger.addEventListener("click", function () {
			headerBurger.classList.toggle('active');
			menu.classList.toggle('open');
			body.classList.toggle('lock');
		});		
	}

	if(menuLink){
		menuLink.forEach(function(menuLink) {
			menuLink.addEventListener('click', function() {
				headerBurger.classList.remove('active');
				menu.classList.remove('open');
				body.classList.remove('lock');
			});
		});
	}

	const headerLocation = document.querySelectorAll('.header__location span');
	if(headerLocation.length) {
		headerLocation.forEach((loc) => {
			loc.addEventListener("click", () => {
				loc.parentNode.classList.toggle('open')
			})
		})
	}

	const menuItem = document.querySelectorAll('.menu__item:has(ul) .menu__link');
	if(menuItem.length) {
		menuItem.forEach((el) => {
			el.addEventListener("click", (e) => {
				e.preventDefault();
				el.parentNode.classList.toggle('open');
				slideToggle(el.nextElementSibling);
			})
		})
	}

	document.addEventListener('click', (event) => {
		headerLocation.forEach((loc) => {
			const parent = loc.parentNode;
			if (parent.classList.contains('open') && !parent.contains(event.target)) {
				parent.classList.remove('open');
			}
		});
		menuItem.forEach((el) => {
			const parent = el.parentNode;
			if (parent.classList.contains('open') && !parent.contains(event.target) && window.innerWidth > 767) {
				parent.classList.remove('open');
			}
		});

	})

	function slideToggle(element) {
		var target = element.style;
		if (target.maxHeight) {
			target.maxHeight = null;
		} else {
			target.maxHeight = element.scrollHeight + 'px';
		}
	}	

	if (document.querySelector('.footer__slider')) {
		const slider = document.querySelector('.footer__slider');
		const slidesCount = slider.querySelectorAll('.swiper-slide').length;
		const customLength = slidesCount === 2;

		new Swiper('.footer__slider', {
			slidesPerView: customLength ? slidesCount : 3,
			spaceBetween: 50,
			loop: false,
			speed: 600,
			scrollbar: {
				el: '.footer__scrollbar',
				draggable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2,
					spaceBetween: 10
				},
				501: {
					slidesPerView: 1.5,
					spaceBetween: 20
				},
				651: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				992: {
					slidesPerView: customLength ? slidesCount : 3,
					spaceBetween: 40
				},
				1281: {
					slidesPerView: customLength ? slidesCount : 3,
					spaceBetween: 50
				}
			}
		});
	}

	if (document.querySelector('.contribution-conditions__slider')) {
		new Swiper('.contribution-conditions__slider', {
			slidesPerView: 1.2,
			spaceBetween: 16,
			loop: false,
			speed: 600,
			breakpoints: {
				501: {
					slidesPerView: 1.6,
				}
			}
		});
	}

	if (document.querySelector('.main__slider')) {
		let navSwiper = null;
		if(document.querySelector('.main__navslider')) {
			navSwiper = new Swiper('.main__navslider', {
				slidesPerView: 3,
				spaceBetween: 15,
				speed: 600,
			});
		}

		let slideTimer = null;

		const swiper = new Swiper('.main__slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: 'fade',
			loop: true,
			speed: 600,
			pagination: {
				el: '.main__pagination',
				clickable: true,
			},
			thumbs: {
				swiper: navSwiper,
			},
			on: {
				slideChangeTransitionEnd() {
					startSlideTimer();
				}
			}
		});

		function startSlideTimer() {
			clearTimeout(slideTimer);

			const activeSlide = swiper.el.querySelector('.swiper-slide-active');
			const video = activeSlide?.querySelector('video');

			swiper.el.querySelectorAll('video').forEach(v => {
				v.pause();
				v.currentTime = 0;
				v.onended = null;
			});

			if (video) {
				video.loop = false;

				video.play().catch(() => {});

				video.onended = () => {
					swiper.slideNext();
				};
			} else {
				slideTimer = setTimeout(() => {
					swiper.slideNext();
				}, 10000);
			}
		}

		swiper.on('slideChangeTransitionEnd', startSlideTimer);

		startSlideTimer();
	}

	// const popupButton = document.querySelectorAll("[data-popup]");
	// if(popupButton){
	// 	popupButton.forEach(function (popupButton) {
	// 		popupButton.addEventListener("click", function (event) {
	// 			event.preventDefault();
	// 			const dataPopup = this.getAttribute("data-popup");
	// 			const dataClassPopup = document.querySelector(dataPopup);
	// 			if (dataClassPopup !== null) {
	// 				dataClassPopup.classList.add("open");
	// 				body.classList.add('popuplock');
	// 			}
	// 		});
	// 	});
	// }

	// var popupClose = document.querySelectorAll('.popup__close');
	// if(popupClose){
	// 	popupClose.forEach(function(popupClose) {
	// 		popupClose.addEventListener('click', function(event) {
	// 			body.classList.remove('popuplock');
	// 			popupClose.closest('.popup').classList.remove('open');
	// 		});
	// 	});
	// }

	// const telmask = document.querySelectorAll("input[type='tel']");
	// if(telmask){
	//     telmask.forEach(function(input) {
	//         const maskOptions = {
	//           mask: '+{7} (000) 000 00 00',
	//           lazy:true,
	//         };
	//        	const mask = IMask(input, maskOptions);
	//         input.addEventListener('focus', function() {
	//             mask.updateOptions({
	//                 lazy: false
	//             });
	//         });
	//         input.addEventListener('blur', function() {
	//         	  if(input.value.replace(/\D/g, "").length <= 1){
	// 	            mask.updateOptions({
	// 	                lazy: true
	// 	            });	        	  	
	//         	  }
	//         });

	// 		var prevElement = input.parentNode.previousElementSibling.querySelector('input');
	//         if(prevElement && prevElement.tagName.toLowerCase() === 'input') {
	//             prevElement.addEventListener('input', function() {
	//             	prevElement.value = prevElement.value.charAt(0).toUpperCase() + prevElement.value.slice(1);
	//             });
	//         }
	//     });
	// }

	var tabsItems = document.querySelectorAll('[data-tab]');
	if(tabsItems){
		tabsItems.forEach(function(tabsItem) {
			tabsItem.addEventListener('click', function(event) {
				event.preventDefault();
				var tabParent = this.closest('.tabs');
				var tabActive = tabParent.querySelector('[data-tab].active');
				var contentActive = tabParent.querySelectorAll('[data-content].target');
				if (tabActive) {
					tabActive.classList.remove('active');
				}
				contentActive.forEach(function(contentActive){
					if (contentActive) {
						contentActive.classList.remove('target');
					}	  
				});
				this.classList.add('active');
				const tabContent = this.getAttribute("data-tab");
				const tabId = tabParent.querySelectorAll(`[data-content="${tabContent}"]`);
				tabId.forEach(function(tabId){
					if (tabId) {
						tabId.classList.add('target');
						
						const tabaos = tabId.querySelectorAll('[data-tabaos]');
						if(tabaos.length) {
							for(el of tabaos) {
								el.dataset.aos = el.dataset.tabaos
							}
							AOS.refreshHard();
						}
					}	  
				});
			});
		});
	}

	// if (document.querySelector('[data-fancybox]')) {
	//     Fancybox.bind("[data-fancybox]", {
	// 		compact: false,
	//         Images: {
	//             zoom: false,
	//         },
	//         Thumbs: false,
    //      	Carousel: {
    //      		transition: "slide",
	//       	},
	//         l10n: {
	//             NEXT: "Следующая",
	//             PREV: "Предыдущая",
	//             CLOSE: "Закрыть",
	//         },
	//         on: {
	//             click: (fancybox, event) => {
	//                 const containerWidth = event.currentTarget.clientWidth * 0.9;
	//                 const clickX = event.clientX;
	//                 if (clickX < containerWidth / 2) {
	//                     fancybox.prev();
	//                 } else {
	//                     fancybox.next();
	//                 }
	//             },
	//        	},
	//     });
	// }
	const videos = document.querySelectorAll('video[data-src]');
	if(videos.length) {
		videos.forEach((video) => {
			if(!video.src && window.matchMedia("(any-hover: hover)").matches)
				video.src = video.dataset.src;
		})
	}

	const videoBlocks = document.querySelectorAll('.video-block')
	if(videoBlocks){
		videoBlocks.forEach(function(videoBlock) {
		    videoBlock.addEventListener('mouseenter', function(event) {
		    	video = videoBlock.querySelector('video');
		    	if(video){
		    		video.play();
					videoBlock.classList.add('hover');
		    	}
		    });
		    videoBlock.addEventListener('mouseleave', function(event) {
		    	if(video){
		    		video.pause();
		    	}
		    });
		});
	}

	const contactsSpoilers = document.querySelectorAll('.contacts__card-title');
	if(contactsSpoilers.length) {
		contactsSpoilers.forEach((el) => {
			el.addEventListener("click", (e) => {
				e.preventDefault();
				el.parentNode.classList.toggle('open');
				slideToggle(el.nextElementSibling);
			})
		})
	}

	const spoilers = document.querySelectorAll('.spoilers__top');
	if(spoilers.length) {
		spoilers.forEach((el) => {
			el.addEventListener("click", (e) => {
				e.preventDefault();
				el.parentNode.classList.toggle('open');
				slideToggle(el.nextElementSibling);
			})
		})
	}

	const openedSpoilers = document.querySelectorAll('.spoilers__item.open');
	if(openedSpoilers.length) {
		openedSpoilers.forEach((spoiler) => {
			const spoilerBody = spoiler.querySelector('.spoilers__body');
			if(spoilerBody) {
				spoilerBody.style.maxHeight = spoilerBody.scrollHeight + 'px'
			}
		})
	}

	const ranges = document.querySelectorAll('.contribution-calc__nouislider');
	if(ranges.length) {
		ranges.forEach((range) => {
			const min = +range.dataset.min;
			const max = +range.dataset.max;
			const start = +range.dataset.start;
			const currentVal = document.getElementById(range.dataset.currentval);
			const ranges = range.dataset.range;
			let parsedRangeArray = [];
			if (ranges) {
				try {
					parsedRangeArray = JSON.parse(ranges);
				} catch (e) {
					console.error("Ошибка парсинга JSON в data-range:", e);
				}
			}
			const dynamicPoints = Array.isArray(parsedRangeArray) 
				? parsedRangeArray.reduce((acc, currentObj) => Object.assign(acc, currentObj), {})
				: {};

			const sliderRangeConfig = Object.assign({
				'min': [min || 0],
				'max': [max || 0]
			}, dynamicPoints);

			noUiSlider.create(range, {
				start: [start || min || 0],
				connect: [true, false],
				range: sliderRangeConfig
			});

			range.noUiSlider.on('update', function (values, handle) {
				if(!currentVal) return
				currentVal.innerHTML = Number(values[handle]).toLocaleString('ru-RU', {
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				});
			});

		})
	}

	if(AOS) {
		AOS.init({
			offset: 50,
			once: true
		});
	}
});

window.addEventListener('load', () => {
	AOS.refreshHard();
});