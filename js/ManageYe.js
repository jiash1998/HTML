$(document).ready(function() {
	//选中状态
	$(".myNavbar_inul>li").click(function() {
		$(this).addClass("myActive").siblings().removeClass("myActive");
		$("ol").children().siblings().removeClass("myActive");
	})

	$("ol>li").click(function() {
		//console.log(1);
		event.stopPropagation();
		$(this).parent().parent().removeClass("myActive");
		$(this).parent().parent().siblings().removeClass("myActive");
		$(this).addClass("myActive").siblings().removeClass("myActive");
	})

	$(".ol_open").click(function() {
		$(this).children("ol").toggle(500);
	})

	//管理界面
	$li1 = $(".li_first");
	$li2 = $(".li_second");
	$li3 = $(".li_third");
	$right1 = $(".right1");
	$right2 = $(".right2");
	$right3 = $(".right3");

	$li1.click(function() {
		$right1.css("display", "block");
		$right2.css("display", "none");
		$right3.css("display", "none");
	})

	$li2.click(function() {
		$right1.css("display", "none");
		$right2.css("display", "block");
		$right3.css("display", "none");
	})

	$li3.click(function() {
		$right1.css("display", "none");
		$right2.css("display", "none");
		$right3.css("display", "block");
	})

	//表格导出
	$("#reDown").click(function() {
		$("#tableExc").table2excel({
			exclude: "",
			name: "Excel Document Name",
			filename: "药品库存统计表",
			exclude_img: false,
			exclude_link: false,
			exclude_inputs: true
		});
	})
	
	//vue机器人聊天
	var homeBot = BotUI('home-demo');

			homeBot.message.add({
				delay: 500,
				content: '你好！'
			}).then(function() {
				return homeBot.message.add({
					delay: 1000,
					content: '想进行药品的相关咨询嘛？'
				});
			}).then(function() {
				return homeBot.action.button({
					delay: 1000,
					action: [{
						text: '好的',
						value: 'sure'
					}, {
						text: '不用了',
						value: 'skip'
					}]
				});
			}).then(function(res) {
				if(res.value == 'sure') {
					tutorial();
				}
				if(res.value == 'skip') {
					end();
				}
			});

			var tutorial = function() {
				homeBot.message.add({
					delay: 1000,
					content: '请选择药品'
				}).then(function() {
					return homeBot.action.button({
						delay: 1000,
						action: [{
							text: '1.布洛芬',
							value: 1
						}, {
							text: '2.阿莫西林',
							value: 2
						}, {
							text: '3.头孢',
							value: 3
						}, {
							text: '4.阿奇霉素',
							value: 4
						}, {
							text: '5.地塞米松片',
							value: 5
						}, {
							text: '6.结束',
							value: 6
						}]
					});
				}).then(function(res) {
					switch(res.value) {
						case 1:
							drogIntroduce("布洛芬");
							break;
						case 2:
							drogIntroduce("阿莫西林");
							break;
						case 3:
							drogIntroduce("头孢");
							break;
						case 4:
							drogIntroduce("阿奇霉素");
							break;
						case 5:
							drogIntroduce("地塞米松片");
							break;
						case 6:
							end();
							break;
					}
				})
			};

			var end = function() {
				homeBot.message.add({
					delay: 1000,
					content: '欢迎下次再来！'
				});
			};

			function drogChoo() {

			}

			function drogIntroduce(value) {
				homeBot.message.bot({
					delay: 1500,
					content: '药名：' + value
				});
				var drogAll = ["适用症：用于缓解轻至中度疼痛如头痛、关节痛、牙痛 [价格：15/盒]", "适用症：应对肺炎链球菌、不产青霉素酶金葡菌、溶血性链球菌和不产β内酰胺酶的流感嗜血杆菌所致的耳、鼻、喉感染、呼吸道感染和皮肤软组织感染等 [价格：21/盒]", "适用症：本类抗生素为广谱抗生素，对肺炎双球菌、肺炎杆菌和流感杆菌等有效。 [价格：23/盒]", "适用症：用于敏感细菌所引起的下列感染：呼吸道感染、软组织感染、急性中耳炎。 [价格：13/盒]", "适用症：用于过敏性与自身免疫性炎症性疾病，如结缔组织病，严重的支气管哮喘，皮炎等过敏性疾病及溃疡性结肠炎，急性白血病，恶性淋巴瘤等 [价格：17/盒]"];
				var num = '';
				switch(value) {
					case '布洛芬':
						num = 0;
						break;
					case '阿莫西林':
						num = 1;
						break;
					case '头孢':
						num = 2;
						break;
					case '阿奇霉素':
						num = 3;
						break;
					case '地塞米松片':
						num = 4;
						break;
				}
				homeBot.message.bot({
					delay: 1800,
					content: drogAll[num]
				});

				homeBot.message.bot({
					delay: 4000,
					content: "是否继续咨询？"
				});
				setTimeout(tutorial,4000);

			}

})