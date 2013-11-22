var P = {
	init: function(){
		this._globals();
		this.page.init();
		this.filters.init();
		this.form.init();
		this.even();
	},
	_globals: function(){
		body = $('body'),
		L = body.find('.layout'),
		NAV = L.find('.menu'),
		FORM = L.find('.form');
	},
	overlay: {
		create: function(){
			body.append($('<div />').addClass('overlay'));
		},
		remove: function(){
			body.find('.overlay').remove();
		}
	},
	page: {
		init: function(){
			this.slide();
		},
		slide: function(){
			NAV.find('a').live('click', function(){
				var t = $(this), rel = t.attr('rel');
				if (typeof rel != 'undefined'){
					$.scrollTo('#'+rel, 1500, { axis: 'y', easing: 'easeOutBack' });
					return false;	
				}
			});
		}
	},
	form: {
		init: function(){
			this.change();
			this.send();
		},
		change: function(){
			var inside = FORM.find('.in'),
				blocks = FORM.find('.blocks'),
				a = $('.switch').find('a');
			a.click(function(){
				var t = $(this), rel = t.attr('rel'), f = blocks.filter('.'+rel),
					p = f.position(), 
					animate = {
						left: -p.left
					}
				a.removeClass('active');
				t.addClass('active');
				inside.animate(animate);
				return false;
			});
		},
		send: function(){
			FORM.find('.blocks').submit(function(){
				var t = $(this), mail = t.find('.mail'), empty = t.find('.empty'), errors = t.find('.error'), valid = true,
					regmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				
				errors.remove();
				
				if (!regmail.test(mail.val())){
					valid = false;
					mail.after($('<span />').addClass('error').text('Invalid email!'));
				}
				
				empty.each(function(){
					var t = $(this), val = t.val();
					if (val == ''){
						valid = false;
						t.after($('<span />').addClass('error').text('Empty field!'));
					}
				});
				
				if (valid){
					$.ajax({
						type: 'post',
						url: '/mail.php',
						data: t.serialize(),
						dataType: 'json',
						success: function(data){
							FORM.find('.in').remove();
							FORM.append($('<div />').addClass('success').html(data.message));
						}
					});					
				}
				
				return false;
			});
		}
	},
	filters: {
		data: {
			move: {
				init: false
			},
			css3: {
				init: false
			},
			fade: {
				opacity: [.1, 1]
			},
			onclick: function(filter, element){
				var li = $('.filters').find('li'), name = 'active';
				li.removeClass(name);
				if (li.length != element.length)
					element.addClass(name);
			}
		},
		init: function(){
			$('.filters').filters(this.data);
		}
	},
	even: function(){
		var skill = $('.skill'), li = skill.find('li:even');
		li.addClass('even');
	}
}

$(function(){ P.init(); })




















