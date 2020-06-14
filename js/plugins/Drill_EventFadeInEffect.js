//=============================================================================
// Drill_EventFadeInEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        行走图 - 显现动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventFadeInEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放事件显现出来的各种动作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 事件、玩家 。
 * 2.建议先了解基本定义"显示与透明度.docx"。
 *   更多详细内容，去看看"关于动作效果.docx"。
 * 细节：
 *   (1.所有动作都是并行的，你可能需要手动加等待时间。
 *   (2.所有 显现动作 都可以与持续动作效果叠加，但不包括透明度的叠加。
 *      显现动作 同时只能播放一种。
 * 指令：
 *   (1.显现动作固定为：从 完全透明 到 完全不透明 的过程。
 *      动作结束后，对象的透明度将变为255。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 透明度：
 *   (1.开启"透明度检查"后，如果事件的透明度为255，则动作会被阻止播放。
 *   (2.该插件只影响事件的 透明度 ，并不控制 透明状态 。
 *      若rmmv的透明状态为ON时，事件直接不可见，动作也不可见。
 * 设计：
 *   (1.你可以使得事件消失之后，显现出现在镜像中。或者反过来。
 *      具体可以去镜像管理层看看"镜像化"的小爱丽丝。
 *   (2.该效果可以与 滤镜效果、方块粉碎效果 叠加。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行显现动作：
 * 
 * 插件指令：>显现动作 : 玩家 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 玩家领队 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 玩家全员 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 玩家队员[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 玩家队员变量[21] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 本事件 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 事件[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 事件变量[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 批量事件[10,11] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 批量事件变量[21,22] : 标准弹跳 : 时间[60] : 高度[168]
 * 
 * 插件指令：>显现动作 : 本事件 : 标准落下 : 时间[60] : 缓冲时间[20] : 高度[168]
 * 插件指令：>显现动作 : 本事件 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>显现动作 : 本事件 : 放大出现 : 时间[60] : 缓冲时间[20]
 * 插件指令：>显现动作 : 本事件 : 横向冒出 : 时间[60] : 横向比例[1.5]
 * 插件指令：>显现动作 : 本事件 : 纵向冒出 : 时间[60] : 纵向比例[1.5]
 * 插件指令：>显现动作 : 本事件 : 立即终止动作
 * 
 * 1.前半部分（玩家）和 后半部分（标准落下 : 时间[60] : 缓冲时间[20] : 高度[168]）
 *   的参数可以随意组合。一共有10*6种组合方式。
 * 2."玩家"和"玩家领队"是同一个意思。
 *   "玩家队员[1]"表示领队后面第一个跟随的队友。
 * 3.部分类型的动作有 时间和缓冲时间 两个设置，该动作分两个阶段。
 *   比如"标准落下"，分别对应落下的动作时间，和落地后阶段弹簧效果的缓冲时间。
 * 4.如果你不想要任何动作，只想让事件直接静态显现，直接设置 标准弹跳 + 高度0 即可。
 *   但是时间不能为0。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>玩家显现效果 : 领队 : 标准落下 : 60 : 168
 * 插件指令(旧)：>玩家显现效果 : 指定队员 : 1 : 标准落下 : 60 : 168
 * 插件指令(旧)：>玩家显现效果 : 指定队员(变量) : 1 : 标准落下 : 60 : 168
 * 插件指令(旧)：>玩家显现效果 : 全部队员 : 标准落下 : 60 : 168
 * 插件指令(旧)：>事件显现效果 : 本事件 : 标准落下 : 60 : 168
 * 插件指令(旧)：>事件显现效果 : 指定事件 : 1 : 标准落下 : 60 : 168
 * 插件指令(旧)：>事件显现效果 : 指定事件(变量) : 1 : 标准落下 : 60 : 168
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明度检查
 * 如果有的事件已经是透明度为255了，你不想让他再播放一次出现动画，你可以使用
 * 下面的插件指令。
 * 
 * 插件指令：>显现动作 : 玩家 : 透明度检查 : 开启
 * 插件指令：>显现动作 : 玩家 : 透明度检查 : 关闭
 * 插件指令：>显现动作 : 事件 : 透明度检查 : 开启
 * 插件指令：>显现动作 : 事件 : 透明度检查 : 关闭
 * 
 * 1.插件指令直接作用于所有玩家，或者所有事件。
 * 2.开启检查后，如果当前事件的透明度为255，则动作会被阻止播放。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(镜像)*o(贴图处理) 每帧
 * 测试方法：   放置10个动作变化的事件，在事件数量不同的地图中测。
 * 测试结果：   200个事件的地图中，平均消耗为：【85.19ms】
 *              100个事件的地图中，平均消耗为：【46.21ms】
 *               50个事件的地图中，平均消耗为：【38.16ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件对镜像也有效果，该测试是包括镜像一起测试的结果。
 *   由于持续变化的事件数量和消耗几乎成正比，所以放20个以上电脑就带不动了。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 修改了插件指令格式。
 * [v1.4]
 * 添加了横向冒出和纵向冒出。
 * 
 * 
 * 
 * @param 玩家默认透明度检查
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。开启后，会在玩家贴图透明度处于255时（已经显现时），阻止玩家的显现动作。
 * @default false
 * 
 * @param 事件默认透明度检查
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。开启后，会在事件贴图透明度处于255时（已经显现时），阻止事件的显现动作。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFIE（Event_Fade_In_Effect）
//		临时全局变量	DrillUp.g_EFIE_xxx
//		临时局部变量	this._drill_EFIE_xxx
//		存储数据变量	$gameSystem._drill_EFIE_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(镜像)*o(贴图处理) 每帧
//		性能测试因素	地图管理层 125事件
//		性能测试消耗	39.91ms（Sprite_Character.update）
//		最坏情况		所有事件都在执行动作。
//		备注			从原理上看，变化并没有那么复杂，只是图像一直在变。
//						类似于滤镜，但没有滤镜消耗复杂。
//
//插件记录：
//		★大体框架与功能如下：
//			显现动作效果：
//				->动作
//					->标准落下
//					->标准弹跳
//					->放大出现
//					->横向冒出
//					->纵向冒出
//					->翻转出现	x
//					->地面升起	x
//				->其他
//					->数学锚点变换问题
//					->结构优化（换成Game_Character）
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//			  该插件限定透明度 0->255 的变化。
//			2.由于rmmv函数中没有【Game_Character.prototype.update】，所以继承时要用【Game_CharacterBase.prototype.update】。
//			  之前继承了这个没有的函数，造成了举起物体插件出问题。
//
//		★其它说明细节：
//			1.事件的锚点固定为(0.5,1)。
//			2.需要改变x,y,opacity,rotation,scale_x,scale_y的值，并且毫无损失地复原。
//			  另外，对齐每一个插件指令，也是比较头疼的问题。
//			  结构并不复杂，只是内容划分太多。	
//			3.队伍透明度统一存在麻烦的地方，队长的透明度每帧都会分配给跟随者。
//			  目前只设置了播放动作的时候，透明度才不统一。
//			4.继承Game_Character不要用initMembers，因为follower不会调用这个方法。
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventFadeInEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFadeInEffect');
	
	DrillUp.g_EFIE_p_opacityCheck = String(DrillUp.parameters['玩家默认透明度检查'] || "false") === "true";
	DrillUp.g_EFIE_e_opacityCheck = String(DrillUp.parameters['事件默认透明度检查'] || "false") === "true";
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_EFIE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_EFIE_pluginCommand.call(this, command, args);
	
	if( command === ">显现动作" ){
		
		/*-----------------透明度检查------------------*/
		if( args.length == 6 ){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "玩家" && temp1 == "透明度检查" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_EFIE_opacityCheck_player = true;
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_EFIE_opacityCheck_player = false;
				}
			}
			if( unit == "事件" && temp1 == "透明度检查" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_EFIE_opacityCheck_event = true;
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_EFIE_opacityCheck_event = false;
				}
			}
		}
		
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		var p_chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e = $gameMap.event( Number(temp_arr[k]) );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e = $gameMap.event( $gameVariables.value(Number(temp_arr[k])) );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e = $gameMap.event( $gameVariables.value(Number(unit)) );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e = $gameMap.event( Number(unit) );
				e_chars = [ e ];
			}
			
			if( p_chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				p_chars = [ $gamePlayer ];
			}
			if( p_chars == null && unit == "玩家全员" ){
				p_chars = $gamePlayer.followers().visibleFollowers();
				p_chars.unshift($gamePlayer);
			}
			if( p_chars == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ $gameVariables.value(Number(unit)) ]);
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ Number(unit) ]);
			}
		}
		// > 透明度检查
		if( p_chars != null && $gameSystem._drill_EFIE_opacityCheck_player && $gamePlayer.opacity() == 255 ){
			p_chars = null;
		}
		if( e_chars != null && $gameSystem._drill_EFIE_opacityCheck_event ){
			var temp_tank = [];
			for( var k=0; k < e_chars.length; k++ ){
				if( e_chars[k].opacity() != 255 ){
					temp_tank.push( e_chars[k] );
				}
			}
			e_chars = temp_tank;
		}
		
		/*-----------------立即终止动作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即终止动作" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFIE_stopEffect();
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFIE_stopEffect();
					}
				}
			}
		}	
			
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			
			/*-----------------标准落下------------------*/
			if( type == "标准落下" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("高度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFIE_playShowingFall( Number(temp1),Number(temp3),Number(temp2) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFIE_playShowingFall( Number(temp1),Number(temp3),Number(temp2) );
					}
				}
			}
			
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			/*-----------------标准弹跳------------------*/
			if( type == "标准弹跳" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("高度[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFIE_playShowingJump( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFIE_playShowingJump( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------放大出现------------------*/
			if( type == "放大出现" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFIE_playShowingEnlarge( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFIE_playShowingEnlarge( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------横向冒出------------------*/
			if( type == "横向冒出" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFIE_playShowingHorizonFlat( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFIE_playShowingHorizonFlat( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------纵向冒出------------------*/
			if( type == "纵向冒出" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFIE_playShowingVerticalFlat( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFIE_playShowingVerticalFlat( Number(temp1),Number(temp2) );
					}
				}
			}
			
		}
	}
	
	
	
	/*-----------------------------------------*/
	/*-----------------旧指令------------------*/
	/*-----------------------------------------*/
	if (command === '>玩家显现效果') { // >玩家显现效果 : 领队 : 标准落下 : 60 : 168
		if(args.length == 6 || args.length == 8){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var time = Number(args[5]);
			if(args[7]){ var height = Number(args[7]); }
			if( $gamePlayer.opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_player){
				return;
			}
			if( temp1 == '领队' ){ 
				if( type == '标准落下' ){
					$gamePlayer.drill_EFIE_playShowingFall(time,height);
				}
				if( type == '标准弹跳' ){
					$gamePlayer.drill_EFIE_playShowingJump(time,height);
				}
				if( type == '放大出现' ){
					$gamePlayer.drill_EFIE_playShowingEnlarge(time);
				}
			}
			if( temp1 == '全部队员' ){ 
				if( type == '标准落下' ){
					$gamePlayer.drill_EFIE_playShowingFall(time,height);
					$gamePlayer.followers().forEach(function(f){ f.drill_EFIE_playShowingFall(time,height); },this);
				}
				if( type == '标准弹跳' ){
					$gamePlayer.drill_EFIE_playShowingJump(time,height);
					$gamePlayer.followers().forEach(function(f){ f.drill_EFIE_playShowingJump(time,height); },this);
				}
				if( type == '放大出现' ){
					$gamePlayer.drill_EFIE_playShowingEnlarge(time);
					$gamePlayer.followers().forEach(function(f){ f.drill_EFIE_playShowingEnlarge(time); },this);
				}
			}
		}
		if(args.length == 8 || args.length == 10){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			var time = Number(args[7]);
			if(args[9]){ var height = Number(args[9]); }
			var _followers = $gamePlayer.followers().visibleFollowers();
			_followers.unshift($gamePlayer);
			if( temp1 == '指定队员' ){
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_player){
						return;
					}
					if( type == '标准落下' ){
						_followers[temp2].drill_EFIE_playShowingFall(time,height);
					}
					if( type == '标准弹跳' ){
						_followers[temp2].drill_EFIE_playShowingJump(time,height);
					}
					if( type == '放大出现' ){
						_followers[temp2].drill_EFIE_playShowingEnlarge(time);
					}
				}
			}
			if( temp1 == '指定队员(变量)' ){ 
				temp2 = $gameVariables.value(temp2);
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_player){
						return;
					}
					if( type == '标准落下' ){
						_followers[temp2].drill_EFIE_playShowingFall(time,height);
					}
					if( type == '标准弹跳' ){
						_followers[temp2].drill_EFIE_playShowingJump(time,height);
					}
					if( type == '放大出现' ){
						_followers[temp2].drill_EFIE_playShowingEnlarge(time);
					}
				}
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type == '透明度检查开启' ){
				$gameSystem._drill_EFIE_opacityCheck_player = true;
			}
			if( type == '透明度检查关闭' ){
				$gameSystem._drill_EFIE_opacityCheck_player = false;
			}
		}
	}
	if (command === '>事件显现效果') { // >事件显现效果 : 本事件 : 标准落下 : 60 : 168
		if(args.length == 6 || args.length == 8){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var time = Number(args[5]);
			if(args[7]){ var height = Number(args[7]); }
			if( temp1 == '本事件' ){
				var e = $gameMap.event( this._eventId );
				if( e.opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_event){
					return;
				}
				if( type == '标准落下'){
					e.drill_EFIE_playShowingFall(time,height);
				}
				if( type == '标准弹跳'  ){
					e.drill_EFIE_playShowingJump(time,height)
				}
				if( type == '放大出现' ){
					e.drill_EFIE_playShowingEnlarge(time)
				}
			}
		}
		if(args.length == 8 || args.length == 10){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			var time = Number(args[7]);
			if(args[9]){ var height = Number(args[9]); }
			if( temp1 == '指定事件' ){ 
				var e = $gameMap.event( temp2 );
				if( e.opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_event){
					return;
				}
				if( type == '标准落下' ){
					e.drill_EFIE_playShowingFall(time,height);
				}
				if( type == '标准弹跳' ){
					e.drill_EFIE_playShowingJump(time,height);
				}
				if( type == '放大出现' ){
					e.drill_EFIE_playShowingEnlarge(time);
				}
			}
			if( temp1 == '指定事件(变量)' ){ 
				var e = $gameMap.event( $gameVariables.value(temp2) );
				if( e.opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_event){
					return;
				}
				if( type == '标准落下' ){
					e.drill_EFIE_playShowingFall(time,height);
				}
				if( type == '标准弹跳' ){
					e.drill_EFIE_playShowingJump(time,height);
				}
				if( type == '放大出现' ){
					e.drill_EFIE_playShowingEnlarge(time);
				}
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type == '透明度检查开启' ){
				$gameSystem._drill_EFIE_opacityCheck_event = true;
			}
			if( type == '透明度检查关闭' ){
				$gameSystem._drill_EFIE_opacityCheck_event = false;
			}
		}
	}
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_EFIE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EFIE_sys_initialize.call(this);
	this._drill_EFIE_opacityCheck_player = DrillUp.g_EFIE_p_opacityCheck;
	this._drill_EFIE_opacityCheck_event = DrillUp.g_EFIE_e_opacityCheck;
}

//=============================================================================
// ** 跟随者
//=============================================================================
//==============================
// * 跟随者 - 透明度同步
//==============================
var _drill_EFIE_setOpacity = Game_Follower.prototype.setOpacity;
Game_Follower.prototype.setOpacity = function(opacity) {
	if( $gamePlayer.drill_EFIE_isPlaying() ){ return; }
	if( this.drill_EFIE_isPlaying() ){ return; }
	_drill_EFIE_setOpacity.call(this,opacity);
};

//=============================================================================
// ** 事件贴图
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
var _Drill_EFIE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	_Drill_EFIE_s_setCharacter.call(this,character);
	if (character) { this._Drill_EFIE = character._Drill_EFIE; };
};

//==============================
// * 事件贴图 - 固定帧初始值
//==============================
var _Drill_EFIE_s_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Drill_EFIE_s_updatePosition.call(this);			// x、y、z
	if( this.rotation != 0 ){ this.rotation = 0; }		// 旋转
	if( this.scale.x != 1 ){ this.scale.x = 1; }		// 缩放x
	if( this.scale.y != 1 ){ this.scale.y = 1; }		// 缩放y
	if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
	if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
};

//==============================
// * 事件贴图 - 帧刷新
//==============================
var _Drill_EFIE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_Drill_EFIE_s_update.call(this);
	if ( this._character && this._Drill_EFIE ) {
		this.update_EFIE_effect();			//执行变换
		this.update_EFIE_bitmap();			//获取图片宽高
	}
};
//==============================
// * 帧刷新 - 执行变换
//==============================
Sprite_Character.prototype.update_EFIE_effect = function() {
	if( !this._character.drill_EFIE_isPlaying() ){ return; }
		
	this.x += this._Drill_EFIE.x ;					// x
	this.y += this._Drill_EFIE.y ;					// y
	this.rotation += this._Drill_EFIE.rotation;		// 旋转
	this.scale.x += this._Drill_EFIE.scale_x;		// 缩放x
	this.scale.y += this._Drill_EFIE.scale_y;		// 缩放y
	//this.skew.x += this._Drill_EFIE.skew_x;		// 斜切x
	//this.skew.y += this._Drill_EFIE.skew_y;		// 斜切y
	
	this.opacity = this._Drill_EFIE.opacity;		// 透明度
}
//==============================
// * 帧刷新 - 获取图片宽高
//==============================
Sprite_Character.prototype.update_EFIE_bitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_EFIE.real_width = this.patternWidth();
		this._Drill_EFIE.real_height = this.patternHeight();
	}
}

//=============================================================================
// * 数学 - 锁定锚点
//			
//			说明：修正 旋转+缩放 的xy坐标，使其看起来像是在绕着 新的锚点 变换。
//=============================================================================
Game_Temp.prototype.drill_EFIE_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图中心锚点 
					target_anchor_x,target_anchor_y, 	//新的中心锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y ) {		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	var r = Math.sqrt( Math.pow(ww,2) + Math.pow(hh,2) );
	var p_degree = Math.atan(hh/ww);	
	p_degree = Math.PI - p_degree;
	
	xx = r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy = r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
	xx += ww * (1 - scale_x);
	yy += hh * (1 - scale_y);
	
	return { "x":xx, "y":yy };
}


//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _Drill_EFIE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_EFIE_c_initialize.call(this);
	this._Drill_EFIE = {};					//（不要用initMembers，follower没有这个方法）
	this._Drill_EFIE.x = 0;					// x
	this._Drill_EFIE.y = 0;					// y
	this._Drill_EFIE.rotation = 0;			// 旋转
	this._Drill_EFIE.scale_x = 0;			// 缩放x
	this._Drill_EFIE.scale_y = 0;			// 缩放y
	this._Drill_EFIE.skew_x = 0;			// 斜切x
	this._Drill_EFIE.skew_y = 0;			// 斜切y
	
	this._Drill_EFIE.opacity = 0;			// 透明度（不叠加）
	this._Drill_EFIE.playing_type = "";		// 显示类型
	this._Drill_EFIE.real_width = -1;		// 贴图宽
	this._Drill_EFIE.real_height = -1;		// 贴图高
}
//==============================
// * 物体 - 动作判定
//==============================
Game_Character.prototype.drill_EFIE_isPlaying = function() {
	if( !this._Drill_EFIE ){ return false; }
	if( this._Drill_EFIE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 物体 - 帧刷新
//==============================
var _Drill_EFIE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_Drill_EFIE_c_update.call(this);
	
	if( this._Drill_EFIE == undefined ){ return; } 
	if( this._Drill_EFIE.playing_type == "" ){ return; }
	if( this._Drill_EFIE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_EFIE.real_height == -1 ){ return; }
	
	this.drill_EFIE_updateShowingFall();
	this.drill_EFIE_updateShowingJump();
	this.drill_EFIE_updateShowingEnlarge();
	this.drill_EFIE_updateShowingHorizonFlat();
	this.drill_EFIE_updateShowingVerticalFlat();
}
//==============================
// * 初始化 - 终止效果
//==============================
Game_Character.prototype.drill_EFIE_stopEffect = function() {
	var ef = this._Drill_EFIE;
	ef.x = 0;					// x
	ef.y = 0;					// y
	ef.rotation = 0;			// 旋转
	ef.scale_x = 0;				// 缩放x
	ef.scale_y = 0;				// 缩放y
	ef.skew_x = 0;				// 斜切x
	ef.skew_y = 0;				// 斜切y
	ef.opacity = 255 ;
	ef.playing_type = "";
	this.setOpacity(ef.opacity);
}


//==============================
// * 初始化 - 显现 标准落下
//==============================
Game_Character.prototype.drill_EFIE_playShowingFall = function( time,height,b_time ) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingFalling";
	ef.fA_tdest = time;
	ef.fA_distance = -1 * height;
	ef.fA_a = 2*ef.fA_distance/ef.fA_tdest/ef.fA_tdest;	//加速度公式
	ef.fA_time = 0;
	ef.fB_tdest = b_time || 20;		//固定抛物线公式
	ef.fB_time = 0;
}
//==============================
// * 帧刷新 - 显现 标准落下
//==============================
Game_Character.prototype.drill_EFIE_updateShowingFall = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type != "showingFalling" ){ return; }
	
	if( ef.fA_time < ef.fA_tdest ){
		ef.fA_time ++;
		var t = ef.fA_time;
		ef.y = ef.fA_distance - ef.fA_a*t*t/2;	//加速下落
		if(ef.y >0){ 
			ef.y = 0;
			//alert(ef.fA_time);	//验证加速度时间
		}
		ef.opacity = 255 * ef.fA_time /ef.fA_tdest * 3 ;
		this.setOpacity(ef.opacity);
	}else if( ef.fB_time < ef.fB_tdest ){
		ef.fB_time ++;
		var t = ef.fB_time;
		var a = 0.8 / ef.fB_tdest / ef.fB_tdest;	//固定压缩0.2比例
		var b = -1 * a * ef.fB_tdest;
		var c = 0;
		//ef.scale_x = 0.01777777 * t - 0.00039506 *t*t;	//45帧抛物线公式
		//ef.scale_x = 0.02666666 * t - 0.00088888 *t*t;	//30帧
		//ef.scale_x = 0.04 * t - 0.002 *t*t;				//20帧
		ef.scale_x = -1*(a*ef.fB_time*ef.fB_time + b*ef.fB_time + c);
		ef.scale_y = -ef.scale_x;
		ef.opacity = 255;
		this.setOpacity(ef.opacity);
	}else{
		this.drill_EFIE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 标准弹跳
//==============================
Game_Character.prototype.drill_EFIE_playShowingJump = function( time, height ) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingJump";
	ef.f_a = -4*height/time/time;	//抛物线公式 y = ax2 + bx +c
	ef.f_b = 4*height/time;	
	ef.f_c = 0;	
	ef.f_time = 0;
	ef.f_tdest = time;
}
//==============================
// * 帧刷新 - 显现 标准弹跳
//==============================
Game_Character.prototype.drill_EFIE_updateShowingJump = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type != "showingJump" ){ return; }
		
	if( ef.f_time <= ef.f_tdest/2 ){		//通用一个公式，只是根据顶点值分成了两份
		ef.f_time ++;
		var t = ef.f_time;
		ef.y = -1*(ef.f_a*t*t + ef.f_b*t);
		ef.opacity = 255 * ef.f_time /ef.f_tdest*2 ;
		this.setOpacity(ef.opacity);
	}else if( ef.f_time < ef.f_tdest ){
		ef.f_time ++;
		var t = ef.f_time;
		ef.y = -1*(ef.f_a*t*t + ef.f_b*t);
		if(ef.y >0){ ef.y = 0; }
		ef.opacity = 255 ;
		this.setOpacity(ef.opacity);
	}else{
		this.drill_EFIE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 放大出现
//==============================
Game_Character.prototype.drill_EFIE_playShowingEnlarge = function( time,b_time ) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingEnlarge";
	
	ef.fA_sa = 2/time/time/2;	//匀加速公式 scale = 1/2 * at2
	ef.fA_sb = 0;	
	ef.fA_sc = 0;	
	ef.fA_ya = 20/time/time/2;	//抛物线公式 y = ax2 + bx +c
	ef.fA_yb = 0;	
	ef.fA_yc = 0;	
	ef.fA_time = 0;
	ef.fA_tdest = time;
	
	ef.fB_tdest = b_time || 20;
	ef.fB_time = 0;
}
//==============================
// * 帧刷新 - 显现 放大出现
//==============================
Game_Character.prototype.drill_EFIE_updateShowingEnlarge = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type != "showingEnlarge" ){ return; }
		
	if( ef.fA_time < ef.fA_tdest ){
		ef.fA_time ++;
		var t = ef.fA_time;
		
		ef.y = 20 -1*(ef.fA_ya*t*t + ef.fA_yb*t);	//抛物线
		ef.scale_x = -1 + ef.fA_sa*t*t + ef.fA_sb*t;	//匀加速放大
		ef.scale_y = ef.scale_x;

		if(ef.y >0){ 
			ef.y = 0;
			//alert(ef.fA_time);	//验证加速度时间
		}
		ef.opacity = 255 * ef.fA_time /ef.fA_tdest ;
		this.setOpacity(ef.opacity);
	}else if( ef.fB_time < ef.fB_tdest ){
		ef.fB_time ++;
		var t = ef.fB_time;
		var a = 0.8 / ef.fB_tdest / ef.fB_tdest;	//固定压缩0.2比例
		var b = -1 * a * ef.fB_tdest;
		var c = 0;
		ef.scale_x = -1*(a*ef.fB_time*ef.fB_time + b*ef.fB_time + c);
		ef.scale_y = ef.scale_x;
		ef.opacity = 255;
		this.setOpacity(ef.opacity);
		
	}else{
		this.drill_EFIE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 横向冒出
//==============================
Game_Character.prototype.drill_EFIE_playShowingHorizonFlat = function( time, scale_x ) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingHorizonFlat";
	
	ef.f_tdest = time ;
	ef.f_time = 0;
	ef.f_scale_x = scale_x - 1.0;
}
//==============================
// * 帧刷新 - 显现 横向冒出
//==============================
Game_Character.prototype.drill_EFIE_updateShowingHorizonFlat = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type != "showingHorizonFlat" ){ return; }
		
	if( ef.f_time < ef.f_tdest ){
		ef.f_time ++;
		
		ef.scale_x = ef.f_scale_x * (ef.f_tdest - ef.f_time)/ef.f_tdest ;
		ef.scale_y = -1.0 * (ef.f_tdest - ef.f_time)/ef.f_tdest ;
		
		ef.opacity = 255 * ef.f_time /ef.f_tdest ;
		this.setOpacity(ef.opacity);
	}else{
		this.drill_EFIE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 纵向冒出
//==============================
Game_Character.prototype.drill_EFIE_playShowingVerticalFlat = function( time, scale_y ) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingVerticalFlat";
	
	ef.f_tdest = time ;
	ef.f_time = 0;
	ef.f_scale_y = scale_y - 1.0;
}
//==============================
// * 帧刷新 - 显现 纵向冒出
//==============================
Game_Character.prototype.drill_EFIE_updateShowingVerticalFlat = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type != "showingVerticalFlat" ){ return; }
		
	if( ef.f_time < ef.f_tdest ){
		ef.f_time ++;
		
		ef.scale_x = -1.0 * (ef.f_tdest - ef.f_time)/ef.f_tdest ;
		ef.scale_y = ef.f_scale_y * (ef.f_tdest - ef.f_time)/ef.f_tdest ;
		
		ef.opacity = 255 * ef.f_time /ef.f_tdest ;
		this.setOpacity(ef.opacity);
	}else{
		this.drill_EFIE_stopEffect();	//结束动作
	}
}


