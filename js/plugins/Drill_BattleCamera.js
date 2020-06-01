//=============================================================================
// Drill_BattleCamera.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        战斗 - 活动战斗镜头
 * @author Drill_up
 *
 * @param 镜头架宽度
 * @type number
 * @min 50
 * @desc 镜头可以活动的宽度。战斗背景大小 >= 镜头架宽度 >= 窗口宽度 。
 * @default 1000
 *
 * @param 镜头架高度
 * @type number
 * @min 50
 * @desc 镜头可以活动的高度。战斗背景大小 >= 镜头架高度 >= 窗口高度 。
 * @default 740
 *
 * @param 镜头移动模式
 * @type select
 * @option 弹性移动
 * @value 弹性移动
 * @option 匀速移动
 * @value 匀速移动
 * @desc 镜头移动到新目标的模式。
 * @default 弹性移动
 *
 * @param 镜头移动速度
 * @parent 镜头移动模式
 * @type number
 * @min 1
 * @desc 匀速移动模式：简单平移，单位 像素/帧。
 * 弹性模式：速度为比例除数，值越小，速度越快。
 * @default 10 
 *
 * @param 镜头聚焦延迟
 * @type number
 * @min 0
 * @desc 镜头移动延迟的时间。20表示20帧后开始移动镜头。（1秒60帧）
 * @default 20  
 *
 * @param 偏移-镜头 X
 * @desc 默认镜头聚焦目标的中心，在中心的基础上x轴方向偏移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-镜头 Y
 * @desc 默认镜头聚焦目标的中心，在中心的基础上y轴方向偏移，单位像素。（可为负数）
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ Drill_BattleCamera +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 镜头会根据对象进行平移，当指针选中敌人时，镜头会进行动态移动。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗整体画面，但不包括ui。
 * 2.兼容yep修改窗口大小。
 * 3.在车轮战插件中，新的波数的第一回合，会出现暂时镜头锁死情况。
 *   下一回合就会恢复。
 * 4.镜头翻转/缩放的原理与 活动地图镜头 原理一样。
 *   你可以去看看活动地图镜头的注意事项。这里不赘述。
 * 5.注意，镜头翻转，只对图像有效，鼠标点击区域没有变化。
 *   比如，敌人的鼠标靠近状态查看区域，翻转后，还是原来的位置。
 *
 * -----------------------------------------------------------------------------
 * ----素材规则
 * 你只要满足： 
 *     战斗背景高度 >= 镜头架高度 >= 窗口高度
 *     战斗背景宽度 >= 镜头架宽度 >= 窗口宽度
 * 就可以随意控制战斗背景了。
 * 
 * 1.示例中的配置为：
 *     战斗背景高度(1000) >= 镜头架高度(1000) >= 窗口高度(816)
 *     战斗背景高度(740) >= 镜头架高度(740) >= 窗口高度(624)
 *     这样，示例中有高度0-184范围，宽度0-176范围的可活动空间。
 * 2.镜头架，相当于窗口的可活动区域。
 *   如果 镜头架宽度 小于 窗口宽度，则镜头无法左右移动。
 *   如果 镜头架高度 小于 窗口高度，则镜头无法上下移动。
 * 3.你可以通过yep设置窗口为1280*720，设置镜头架为1366*768。
 *   那么你只需要配置1366*768的战斗背景素材就可以了。（素材小了会看到黑边）
 *   相比原来的mog，这里的镜头不对战斗背景做任何多余操作。
 * 4.关于素材看到黑边的几个问题可能原因：
 *    1）素材小了。
 *       配置高度宽度大于你设置的窗口即可。
 *    2）战斗背景位移比没有置0。
 *       如果你的战斗背景跟着你的镜头移动，那么很可能是因为你没有将
 *       位移比置0，由于背景往不同的方向移动，很可能会看到边界。
 *    3）使用了其他相关镜头控制插件。
 *       首先确认一点，除了这个插件的插件指令可以缩放战斗画面。
 *       示例中【没有任何其他插件】会缩放战斗背景。
 *       如果你发现了战斗背景明显变大了，或者敌人大小和战斗背景大小
 *       明显不符，那么极有可能是其它插件进行了介入。造成了问题。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以手动改变镜头架的大小等参数。
 * 
 * 插件指令（开启）：>开启战斗镜头
 * 插件指令（关闭）：>关闭战斗镜头
 *
 * 插件指令（改高度）：>战斗镜头架高度 1000
 * 插件指令（改宽度）：>战斗镜头架宽度 740
 * 插件指令（改速度）：>战斗镜头速度 10
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头缩放/旋转
 * 你可以通过插件指令设置镜头缩放：
 * 
 * 插件指令：>战斗镜头 : 缩放X : 1.50 : 60
 * 插件指令：>战斗镜头 : 缩放Y : 1.50 : 60
 * 插件指令：>战斗镜头 : 旋转 : 180 : 60
 * 
 * 1.缩放前一个数字表示缩放比例，后一个数字表示缩放持续时间，单位帧。
 *   缩放建议只用放大，不建议用缩小。
 *   缩放后永久有效，要记得恢复1.00缩放比例。
 * 2.旋转前一个数字表示旋转角度，后一个数字表示旋转持续时间，单位帧。
 *   旋转正数顺时针，也可为负数。
 * 3.缩放 和 旋转 不能 同时使用。
 * 4.缩放/旋转变化只有匀速。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头翻转
 * 你可以通过插件指令设置镜头翻转：
 * 
 * 插件指令：>战斗镜头 : 水平翻转 : 60 : 匀速
 * 插件指令：>战斗镜头 : 垂直翻转 : 60 : 匀速
 * 插件指令：>战斗镜头 : 顺时针翻转 : 60 : 匀速
 * 插件指令：>战斗镜头 : 逆时针翻转 : 60 : 匀速
 * 插件指令：>战斗镜头 : 水平翻转 : 60 : 平滑
 * 插件指令：>战斗镜头 : 垂直翻转 : 60 : 平滑
 * 插件指令：>战斗镜头 : 顺时针翻转 : 60 : 平滑
 * 插件指令：>战斗镜头 : 逆时针翻转 : 60 : 平滑
 * 插件指令：>战斗镜头 : 水平翻转 : 60 : 弹性
 * 插件指令：>战斗镜头 : 垂直翻转 : 60 : 弹性
 * 插件指令：>战斗镜头 : 顺时针翻转 : 60 : 弹性
 * 插件指令：>战斗镜头 : 逆时针翻转 : 60 : 弹性
 * 
 * 插件指令：>战斗镜头 : 恢复翻转 : 60 : 匀速
 * 插件指令：>战斗镜头 : 恢复翻转 : 60 : 平滑
 * 插件指令：>战斗镜头 : 恢复翻转 : 60 : 弹性
 * 
 * 1.数字表示翻转的时间，单位帧。
 * 2.注意，翻转只能处于一种状态。比如顺时针翻转后。其它翻转指令完全失效。
 *   只有恢复翻转后，才能进行其它翻转操作。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了镜头翻转、镜头缩放功能。
 * [v1.2]
 * 修复了在sideview情况下，默认战斗背景出现黑边的问题。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BCa（Battle_Camera）
//		临时全局变量	DrillUp.g_BCa_xxx
//		临时局部变量	$gameTemp._drill_cam_xxx	（许多插件关联，不在改动）
//		存储数据变量	$gameSystem._drill_cam_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			战斗镜头：
//				->聚焦敌人
//				->匀速移动
//				->弹性移动
//				->镜头架
//				->镜头位置
//
//				->镜头缩放/旋转
//				->翻转的镜头
//				x->镜头放大特写
//		
//		★其它说明细节：
//			1.该插件原本原理只是对 _battleField 进行简单平移。
//			  （mog由于直接改变了大小，越弄越复杂，这里重建，简化方式。）
//			  	中心点：	._drill_center_X
//			  	镜头目标点：._drill_target_X
//			  	当前点：	._battleField.x
//			2.战斗镜头的平移控制的是_battleField，缩放、旋转控制的是Spriteset_Battle。
//			3.【战斗的实际镜头，是._battleField.x控制的】，Spriteset_Battle的xy完全属于例外变量。
//
//		★存在的问题：
//			1.插件没有完全脱离mog的影子，内部有已经套牢并且无法改名的变量名。（外部插件都与此插件关联引用）
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleCamera = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_BattleCamera');
	DrillUp.g_BCa_x = Number(DrillUp.parameters['平移-镜头 X'] || 0);
	DrillUp.g_BCa_y = Number(DrillUp.parameters['平移-镜头 Y'] || 0);
	DrillUp.g_BCa_limit_width = Number(DrillUp.parameters['镜头架宽度'] || 1500);
	DrillUp.g_BCa_limit_height = Number(DrillUp.parameters['镜头架高度'] || 900);
    DrillUp.g_BCa_type = String(DrillUp.parameters['镜头移动模式'] || '弹性移动');
    DrillUp.g_BCa_speed = Number(DrillUp.parameters['镜头移动速度'] || 10);
	DrillUp.g_BCa_ftime = Number(DrillUp.parameters['镜头聚焦延迟'] || 20);
	
//=============================================================================
// ** 插件指令
//=============================================================================	
var _drill_BCa_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BCa_pluginCommand.call(this,command, args)
	if (command === ">镜头速度" || command === ">战斗镜头速度" )  {
		if(args.length == 1){
			$gameSystem._drill_cam_speed = Number(args[0])
		};
	};
	if (command === ">镜头架高度" || command === ">战斗镜头架高度")  {
		if(args.length == 1){
			$gameSystem._drill_cam_limit_height = Number(args[0])
		};
	};
	if (command === ">镜头架宽度" || command === ">战斗镜头架宽度")  {
		if(args.length == 1){
			$gameSystem._drill_cam_limit_width = Number(args[0]);
		};
	};
	if (command === ">开启镜头" || command === ">开启战斗镜头")  { $gameSystem._drill_cam_enable = true};
	if (command === ">关闭镜头" || command === ">关闭战斗镜头")  { $gameSystem._drill_cam_enable = false};
	
	
	if (command === '>战斗镜头') { // >战斗镜头 : 水平翻转 : 60 : 匀速
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = Number(args[3]);
			var temp2 = String(args[5]);
			if( (type == "顺时针翻转" || type == "逆时针翻转") && $gameSystem._drill_BCa_flip.lock == false){
				$gameSystem._drill_BCa_flip.type = type;
				$gameSystem._drill_BCa_flip.back = false;
				$gameSystem._drill_BCa_flip.mode = temp2;
				$gameSystem._drill_BCa_flip.time = temp1;
				$gameSystem._drill_BCa_flip.move = 0;
				$gameSystem._drill_BCa_flip.lock = true;
			}
			if( (type == "水平翻转" || type == "垂直翻转") && $gameSystem._drill_BCa_flip.lock == false){
				$gameSystem._drill_BCa_flip.type = type;
				$gameSystem._drill_BCa_flip.back = false;
				$gameSystem._drill_BCa_flip.mode = temp2;
				$gameSystem._drill_BCa_flip.time = temp1;
				$gameSystem._drill_BCa_flip.move = 0;
				$gameSystem._drill_BCa_flip.lock = true;
			}
			if( type == "恢复翻转" && $gameSystem._drill_BCa_flip.lock == true ){
				$gameSystem._drill_BCa_flip.back = true;
				$gameSystem._drill_BCa_flip.mode = temp2;
				$gameSystem._drill_BCa_flip.time = temp1;
				$gameSystem._drill_BCa_flip.move = temp1;
			}
			if( type == "缩放X" ){
				$gameSystem._drill_BCa_X.move = 0;
				$gameSystem._drill_BCa_X.time = Math.max(Number(temp2),1);
				$gameSystem._drill_BCa_X.speed = (temp1 - 1 - $gameSystem._drill_BCa_X.cur)/$gameSystem._drill_BCa_X.time;
			}
			if( type == "缩放Y" ){
				$gameSystem._drill_BCa_Y.move = 0;
				$gameSystem._drill_BCa_Y.time = Math.max(Number(temp2),1);
				$gameSystem._drill_BCa_Y.speed = (temp1 - 1 - $gameSystem._drill_BCa_Y.cur)/$gameSystem._drill_BCa_Y.time;
			}
			if( type == "旋转" ){
				$gameSystem._drill_BCa_R.move = 0;
				$gameSystem._drill_BCa_R.time = Math.max(Number(temp2),1);
				$gameSystem._drill_BCa_R.speed = (temp1 - $gameSystem._drill_BCa_R.cur)/$gameSystem._drill_BCa_R.time;
			}
		}
	}
};
//=============================================================================
// ** 存储变量初始化
//=============================================================================	
var _drill_BCa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_BCa_sys_initialize.call(this);
    this._drill_cam_enable = true ;
    this._drill_cam_speed = DrillUp.g_BCa_speed;
    this._drill_cam_ftime = DrillUp.g_BCa_ftime;
    this._drill_cam_limit_width = DrillUp.g_BCa_limit_width;
    this._drill_cam_limit_height = DrillUp.g_BCa_limit_height;
	
	this._drill_BCa_X = {}			// 缩放x
	this._drill_BCa_X.cur = 0;      //	cur = -0.1，则缩放为0.9
	this._drill_BCa_X.move = 0;     //
	this._drill_BCa_X.time = 0;     //
	this._drill_BCa_Y = {}          // 缩放y
	this._drill_BCa_Y.cur = 0;      //
	this._drill_BCa_Y.move = 0;     //
	this._drill_BCa_Y.time = 0;     //
	this._drill_BCa_R = {}          // 旋转
	this._drill_BCa_R.cur = 0;      //
	this._drill_BCa_R.move = 0;     //
	this._drill_BCa_R.time = 0;     //
	
    this._drill_BCa_flip = {};			//翻转控制
    this._drill_BCa_flip.lock = false;	//
};

//=============================================================================
// ** 临时变量初始化
//=============================================================================	
var _drill_BCa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BCa_temp_initialize.call(this);
    this.drill_BCa_clearCamera();
};
Game_Temp.prototype.drill_BCa_clearCamera = function() {
	this._drill_cam_pos = [0,0];						//镜头所在位置
	this._drill_cam_cur_actor = [null,[0,0]];			//当前选中角色（sv）
	this._drill_cam_being_attack = [null,[0,0],0];		//受伤害单位
	this._drill_cam_select_single = [null,[0,0]];		//选中一个单位
	this._drill_cam_select_single_turn = [null,[0,0]];	//
	this._drill_cam_select_all = false;					//选中所有单位
	this._drill_cam_select_all_turn = false;			//
	this._drill_battleEnd = false;						//战斗结束
	this._drill_cam_result_move_X = 0;					//镜头实际位移量X
	this._drill_cam_result_move_Y = 0;					//镜头实际位移量Y
};


//=============================================================================
// ** 镜头属性
//=============================================================================
//==============================
// * 镜头属性 - 固定帧初始值
//==============================
var _drill_BCa_updatePosition = Spriteset_Battle.prototype.updatePosition;
Spriteset_Battle.prototype.updatePosition = function() {
	_drill_BCa_updatePosition.call(this);				// x、y、z、缩放x、缩放y
	if( this.rotation != 0 ){ this.rotation = 0; }		// 旋转
	if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
	if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
														//Spriteset_Battle的中心锚点没有效果，且rotation被锁定为（0,0）中心点位置，这里索性固定中心点为(0,0)。
}
//==============================
// * 镜头属性 - 帧刷新
//==============================
var _drill_BCa_updatePosition2 = Spriteset_Battle.prototype.updatePosition;
Spriteset_Battle.prototype.updatePosition = function() {
	_drill_BCa_updatePosition2.call(this);			
	
	this._drill_BCa_change_rotation = 0;	//旋转
	this._drill_BCa_change_sizeX = 1;		//缩放x
	this._drill_BCa_change_sizeY = 1;		//缩放y
	
	this.drill_BCa_resize();				//缩放操作
	this.drill_BCa_rotate();				//旋转操作
	this.drill_BCa_flip();					//翻转控制
	this.drill_BCa_lockAnchor();			//锁定锚点
};
//==============================
// * 镜头属性 - 缩放
//==============================
Spriteset_Battle.prototype.drill_BCa_resize = function() {
	var re_x = $gameSystem._drill_BCa_X;
	var re_y = $gameSystem._drill_BCa_Y;
	re_x.move += 1;
	re_y.move += 1;
	
	if( re_x.move < re_x.time ){ re_x.cur += re_x.speed; }
	if( re_y.move < re_y.time ){ re_y.cur += re_y.speed; }
	
	this._drill_BCa_change_sizeX += re_x.cur;
	this._drill_BCa_change_sizeY += re_y.cur;
}
//==============================
// * 镜头属性 - 旋转
//==============================
Spriteset_Battle.prototype.drill_BCa_rotate = function() {
	var re_r = $gameSystem._drill_BCa_R;
	re_r.move += 1;
	
	if( re_r.move < re_r.time ){
		re_r.cur += re_r.speed;
	}
	
	this._drill_BCa_change_rotation += ( re_r.cur /180.0 )*Math.PI;
}
//==============================
// * 镜头属性 - 锁定锚点
//==============================
Spriteset_Battle.prototype.drill_BCa_lockAnchor = function() {
	var rotation = this._drill_BCa_change_rotation;
	var scale_x = this._drill_BCa_change_sizeX;
	var scale_y = this._drill_BCa_change_sizeY;
	if( rotation == 0 && scale_x == 1 && scale_y == 1 ){ return; } 
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_BCa_getFixPointInAnchor( 0,0, 0.5,0.5, Graphics.boxWidth,Graphics.boxHeight, rotation, scale_x, scale_y );
	this.x += Graphics.boxWidth/2;	
	this.y += Graphics.boxHeight/2;	
	this.x += fix_point.x;	
	this.y += fix_point.y;	
	
	this.rotation = rotation;
	this.scale.x *= scale_x;
	this.scale.y *= scale_y;
}
//=============================================================================
// * 数学 - 锁定锚点
//			
//			说明：修正 旋转+缩放 的xy坐标，使其看起来像是在绕着 新的锚点 变换。
//=============================================================================
Game_Temp.prototype.drill_BCa_getFixPointInAnchor = function( 
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
//==============================
// * 镜头属性 - 翻转控制
//==============================
Spriteset_Battle.prototype.drill_BCa_flip = function() {
	var flip = $gameSystem._drill_BCa_flip;
	
	if(flip.type == "顺时针翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2)) - Math.PI;
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += Math.PI * flip.move / flip.time ;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move-flip.time , 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2));
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += Math.PI * flip.move / flip.time ;
			}
		}
	}
	if(flip.type == "逆时针翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2)) - Math.PI;
			}else if( flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += -Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += -Math.PI * flip.move / flip.time ;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move-flip.time , 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2));
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_BCa_change_rotation += -Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_BCa_change_rotation += -Math.PI * flip.move / flip.time ;
			}
		}
	}
	if(flip.type == "水平翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeX *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeX *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeX *= -2 * flip.move / flip.time + 1;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeX *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeX *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeX *= -2 * flip.move / flip.time + 1;
			}
		}
	}
	if(flip.type == "垂直翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeY *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeY *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeY *= -2 * flip.move / flip.time + 1;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if(flip.mode == "弹性"){		//（椭圆公式）
				this._drill_BCa_change_sizeY *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_BCa_change_sizeY *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_BCa_change_sizeY *= -2 * flip.move / flip.time + 1;
			}
		}
	}
}

//=============================================================================
// ** 镜头移动目标
//=============================================================================
//==============================
// * 镜头移动目标 - 选中全部敌人时（Scene_Battle）
//==============================
var _drill_BCa_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
	var action = BattleManager.inputtingAction();
	$gameTemp._drill_cam_select_all = action.isForAll();
	_drill_BCa_onSelectAction.call(this);    
};

//==============================
// * 镜头移动目标 - 角色窗口被隐藏时（Window BattleActor）
//==============================
var _drill_BCa_win_actor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _drill_BCa_win_actor_hide.call(this);
    $gameTemp._drill_cam_select_all = false;
	$gameTemp._drill_cam_select_single = null;
};
//==============================
// * 镜头移动目标 - 选中一个敌人时（Window BattleActor）
//==============================
var _drill_BCa_win_actor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _drill_BCa_win_actor_select.call(this,index);
	$gameTemp._drill_cam_select_single = [null,[0,0]];
	if (this.actor()) {$gameTemp._drill_cam_select_single[0] = this.actor();};
};

//==============================
// * 镜头移动目标 - 敌人窗口被隐藏时（Window BattleEnemy）
//==============================
var _drill_BCa_win_enemy_hide = Window_BattleEnemy.prototype.hide; 
Window_BattleEnemy.prototype.hide = function() {
	_drill_BCa_win_enemy_hide.call(this);
	$gameTemp._drill_cam_select_all = false;
	$gameTemp._drill_cam_select_single = null;
};
//==============================
// * 镜头移动目标 - 选中一个角色时（[SV] Window BattleEnemy）
//==============================
var _drill_BCa_win_enemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _drill_BCa_win_enemy_select.call(this,index)
	$gameTemp._drill_cam_select_single = [null,[0,0]];
	if (this.enemy()) {$gameTemp._drill_cam_select_single[0] = this.enemy();};
};

//==============================
// * 镜头移动目标 - 清除目标
//==============================
BattleManager.drill_BCa_targetClear = function() {
	$gameTemp._drill_cam_being_attack = [null,[0,0],0];
	$gameTemp._drill_cam_select_single_turn = [null,[0,0]];
	$gameTemp._drill_cam_select_all_turn = false;
	$gameTemp._drill_cam_pos = [0,0];
};

//==============================
// * 镜头 - 结束回合
//==============================
var _drill_BCa_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
	_drill_BCa_endTurn.call(this);
	$gameTemp._drill_cam_being_attack = [null,[0,0],0];
    this.drill_BCa_targetClear();
};

//==============================
// * 镜头 - 开始释放技能
//==============================
var _drill_BCa_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	_drill_BCa_startAction.call(this);
    this.drill_BCa_targetClear();
	$gameTemp._drill_cam_being_attack = [this._subject,[0,0],$gameSystem._drill_cam_ftime];	//确定/聚焦 被攻击对象
	$gameTemp._drill_cam_select_single_turn[0] = this._targets[0];
	if (this._targets.length > 1) {$gameTemp._drill_cam_select_all_turn = true};
};

//==============================
// * 镜头 - 战斗胜利
//==============================
var _drill_BCa_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	 $gameTemp._drill_battleEnd = true;
	_drill_BCa_processVictory.call(this);	 
};
//==============================
// * 镜头 - 战斗逃跑
//==============================
var _drill_BCa_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	$gameTemp._drill_battleEnd = true;
	_drill_BCa_processAbort.call(this);	 
};
//==============================
// * 镜头 - 战斗失败
//==============================
var _drill_BCa_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	$gameTemp._drill_battleEnd = true;
	_drill_BCa_processDefeat.call(this);	 
};

//=============================================================================
// ** Spriteset Battler
//=============================================================================

//==============================
// * 战斗场景帧刷新
//==============================
var _drill_BCa_b_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	_drill_BCa_b_updatePosition.call(this);
    this.drill_BCa_updateCamPos();
};

//==============================
// * 刷新镜头位置
//==============================
Sprite_Battler.prototype.drill_BCa_updateCamPos = function() {
	$gameTemp._drill_cam_cur_actor[0] = BattleManager.actor();
	if ($gameTemp._drill_cam_select_single && $gameTemp._drill_cam_select_single[0] === this._battler) {this.drill_BCa_focusTarget()};
	if ($gameTemp._drill_cam_select_single_turn && $gameTemp._drill_cam_select_single_turn[0] === this._battler) {this.drill_BCa_focusTarget_turn()};
	if ($gameTemp._drill_cam_being_attack && $gameTemp._drill_cam_being_attack[0] === this._battler) {this.drill_BCa_focusBeingAttack()};
	if ($gameTemp._drill_cam_cur_actor && $gameTemp._drill_cam_cur_actor[0] === this._battler) {this.drill_BCa_focusActor()};
};

//==============================
// * 镜头位置 - 高度修正
//==============================
Sprite_Battler.prototype.drill_BCa_heightFix = function() {
	if (this._mainSprite) {
		return this.y - (this._mainSprite.height / 2);
	} else {
		return this.y - (this.bitmap.height / 2);
	};
};
//==============================
// * 镜头位置 - 当前角色
//==============================
Sprite_Battler.prototype.drill_BCa_focusActor = function() {
	  $gameTemp._drill_cam_cur_actor[1][0] = this.x;
      $gameTemp._drill_cam_cur_actor[1][1] = this.drill_BCa_heightFix();
};

//==============================
// * 镜头位置 - 选择目标
//==============================
Sprite_Battler.prototype.drill_BCa_focusTarget = function() {
	   $gameTemp._drill_cam_select_single[1][0] = this.x;
       $gameTemp._drill_cam_select_single[1][1] = this.drill_BCa_heightFix();
};

//==============================
// * 镜头位置 - 选择目标
//==============================
Sprite_Battler.prototype.drill_BCa_focusTarget_turn = function() {
	   $gameTemp._drill_cam_select_single_turn[1][0] = this.x;
       $gameTemp._drill_cam_select_single_turn[1][1] = this.drill_BCa_heightFix();
};
	
//==============================
// * 镜头位置 - 受伤单位
//==============================
Sprite_Battler.prototype.drill_BCa_focusBeingAttack = function() {
	   $gameTemp._drill_cam_being_attack[1][0] = this.x;
       $gameTemp._drill_cam_being_attack[1][1] = this.drill_BCa_heightFix();
};	

//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * 镜头内容初始化
//==============================
var _drill_BCa_spriteset_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	this.drill_BCa_setup();
	_drill_BCa_spriteset_initialize.call(this);	
};

Spriteset_Battle.prototype.drill_BCa_setup = function() {
    $gameTemp.drill_BCa_clearCamera(); 
	this._drill_center_X = Graphics.boxWidth / 2;	//设置中心
	this._drill_center_Y = Graphics.boxHeight / 2;	
	this._drill_target_XF = DrillUp.g_BCa_x;		//设置偏移
	this._drill_target_YF = DrillUp.g_BCa_y; 
	this.drill_BCa_setToCenter();
};

	
//==============================
// * 默认的两个背景控制
//==============================
var _drill_BCa_createBattleback = Spriteset_Battle.prototype.createBattleback
Spriteset_Battle.prototype.createBattleback = function() {
	_drill_BCa_createBattleback.call(this);
	if ($gameSystem._drill_cam_enable) {
		this._back1Sprite.anchor.x = 0.5;
		this._back1Sprite.anchor.y = 0.5;
		this._back1Sprite.x = this._drill_center_X;
		this._back1Sprite.y = this._drill_center_Y;
		this._back2Sprite.anchor.x = 0.5;
		this._back2Sprite.anchor.y = 0.5;
		this._back2Sprite.x = this._drill_center_X;
		this._back2Sprite.y = this._drill_center_Y;
	};
};
//==============================
// * 兼容yep核心
//==============================
if( Imported.YEP_CoreEngine ){
	var _drill_BCa_scaleSprite = Sprite_Battleback.prototype.scaleSprite;
	Sprite_Battleback.prototype.scaleSprite = function() {
		_drill_BCa_scaleSprite.call(this);
		if ($gameSystem.isSideView()) {
			this.anchor.y = 0.5;				//强制yep的sprite的圆心为0.5
			this.y = Graphics.boxHeight / 2;
		}
	};
}

//==============================
// * 镜头 - 帧刷新
//==============================
var _drill_BCa_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_BCa_update.call(this); 
    if ( $gameSystem._drill_cam_enable ) {
		this.drill_BCa_updateCameraPos();
		this.drill_BCa_updateCameraMove();
	};
};

//==============================
// * 镜头 - 刷新目标
//==============================
Spriteset_Battle.prototype.drill_BCa_updateCameraPos = function() {
	if (this.drill_BCa_isNeedToCenter()) {	//中心移动判断
		this.drill_BCa_setToCenter();
		return ;
	};
	if ($gameTemp._drill_cam_being_attack[2] > 0) {	//镜头移动延迟
		$gameTemp._drill_cam_being_attack[2] -= 1
	};
	if ($gameTemp._drill_cam_select_single && $gameTemp._drill_cam_select_single[0]) {
		if (!$gameSystem.isSideView() && $gameTemp._drill_cam_select_single[0].isActor()) {
		  this._drill_target_X = this._drill_center_X;
     	  this._drill_target_Y = this._drill_center_Y;		
	    } else { 
		  this._drill_target_X = $gameTemp._drill_cam_select_single[1][0];
     	  this._drill_target_Y = $gameTemp._drill_cam_select_single[1][1];
	    };
    } else if (this.drill_BCa_isBeingAttack()) {
		  if (!$gameSystem.isSideView() && $gameTemp._drill_cam_being_attack[0].isActor()) {
			this.drill_BCa_setToCenter();
		  } else {
		    this._drill_target_X = $gameTemp._drill_cam_being_attack[1][0];
     	    this._drill_target_Y = $gameTemp._drill_cam_being_attack[1][1];
		  };
		  //if (TouchInput.isCancelled()) {alert("TEST")}

	} else if (this.drill_BCa_isTarget()) {
		  this._drill_target_X = $gameTemp._drill_cam_select_single_turn[1][0];
     	  this._drill_target_Y = $gameTemp._drill_cam_select_single_turn[1][1];
	} else if (this.drill_BCa_isActor()) {
		  this._drill_target_X = $gameTemp._drill_cam_cur_actor[1][0];
     	  this._drill_target_Y = $gameTemp._drill_cam_cur_actor[1][1];		 
	} else {
		this.drill_BCa_setToCenter();
	};
};


//==============================
// * 镜头 - 设置移动到中心
//==============================
Spriteset_Battle.prototype.drill_BCa_setToCenter = function() {
	this._drill_target_X = this._drill_center_X;
	this._drill_target_Y = this._drill_center_Y;
};

//==============================
// * 镜头 - 判断移动到中心
//==============================
Spriteset_Battle.prototype.drill_BCa_isNeedToCenter = function() {
	if ($gameTemp._drill_cam_select_all) {return true};
	if ($gameTemp._drill_cam_select_all_turn) {return true};
	if ($gameTemp._drill_battleEnd) {return true};
	return false
};

//==============================
// * 镜头 - 判断受伤害目标
//==============================
Spriteset_Battle.prototype.drill_BCa_isBeingAttack = function() {
	if (!$gameTemp._drill_cam_being_attack) {return false};
	if (!$gameTemp._drill_cam_being_attack[0]) {return false};
	if ($gameTemp._drill_cam_being_attack[2] === 0) {return false};
	if (Imported.MOG_ATB) {
	    if (this._phase != 'start') {return false};
	};
	return true;
};

//==============================
// * 镜头 - 判断选择目标
//==============================
Spriteset_Battle.prototype.drill_BCa_isTarget = function() {
	if (!$gameTemp._drill_cam_select_single_turn) {return false};
	if (!$gameTemp._drill_cam_select_single_turn[0]) {return false};
	if (!$gameSystem.isSideView() && $gameTemp._drill_cam_select_single_turn[0].isActor()) {return false};
	return true;
};

//==============================
// * 镜头 - 判断角色
//==============================
Spriteset_Battle.prototype.drill_BCa_isActor = function() {
    if (!$gameSystem.isSideView()) {return false};
	if (!$gameTemp._drill_cam_cur_actor) {return false};
	if (!$gameTemp._drill_cam_cur_actor[0]) {return false};
	return true;
};

//==============================
// * 镜头 - 移动镜头
//==============================
Spriteset_Battle.prototype.drill_BCa_updateCameraMove = function() {
	var tar_x = this._drill_center_X - this._drill_target_X + this._drill_target_XF;
	var tar_y = this._drill_center_Y - this._drill_target_Y + this._drill_target_YF;
	var lim_x = Math.max($gameSystem._drill_cam_limit_width /2 - Graphics.boxWidth / 2,0);
	var lim_y = Math.max($gameSystem._drill_cam_limit_height /2 - Graphics.boxHeight / 2,0);
	var cur_x = this._battleField.x;
	var cur_y = this._battleField.y;
	var speed_x = $gameSystem._drill_cam_speed;
	var speed_y = $gameSystem._drill_cam_speed;
	
	if( tar_x > lim_x ){ tar_x = lim_x; }		//镜头架限制
	if( tar_x < -lim_x ){ tar_x = -lim_x; }
	if( tar_y > lim_y ){ tar_y = lim_y; }
	if( tar_y < -lim_y ){ tar_y = -lim_y; }
	
	if( cur_x < tar_x ){
		if( DrillUp.g_BCa_type == '弹性移动' ){ speed_x = Math.max( (tar_x - cur_x)/speed_x , 1 ); }
		cur_x += speed_x;
		if( cur_x > tar_x ){
			cur_x = tar_x;
		}
	}
	if( cur_x > tar_x ){
		if( DrillUp.g_BCa_type == '弹性移动' ){ speed_x = Math.max( (cur_x - tar_x)/speed_x , 1 ); }
		cur_x -= speed_x;
		if( cur_x < tar_x ){
			cur_x = tar_x;
		}
	}
	if( cur_y < tar_y ){
		if( DrillUp.g_BCa_type == '弹性移动' ){ speed_y = Math.max( (tar_y - cur_y)/speed_y , 1 ); }
		cur_y += speed_y;
		if( cur_y > tar_y ){
			cur_y = tar_y;
		}
	}
	if( cur_y > tar_y ){
		if( DrillUp.g_BCa_type == '弹性移动' ){ speed_y = Math.max( (cur_y - tar_y)/speed_y , 1 ); }
		cur_y -= speed_y;
		if( cur_y < tar_y ){
			cur_y = tar_y;
		}
	}
	$gameTemp._drill_cam_result_move_X = cur_x - this._battleField.x;
	$gameTemp._drill_cam_result_move_Y = cur_y - this._battleField.y;
	this._battleField.x = cur_x ;
	this._battleField.y = cur_y ;
	//this._battleField.x = cur_x * 1.2;
	//this._battleField.y = cur_y * 1.2;
	//this._battleField.scale.x = 1.20 ;
	//this._battleField.scale.y = 1.20 ;
	
	$gameTemp._drill_cam_pos = [this._battleField.x,this._battleField.y];
    //if (Imported.MOG_BattlebackEX) {this.update_bbex_cam()};
};

//=============================================================================
// ** 其它mog插件兼容
//=============================================================================

var _drill_mog_ballon_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_mog_ballon_update.call(this);
	if (Imported.MOG_BalloonActionName && this._balloonField) {	// 技能 - 招式名气泡框
		this._balloonField.x = this._battleField.x
		this._balloonField.y = this._battleField.y
	};
	if (Imported.MOG_ChainCommands && this._bchain) {		// 技能 - 按键连锁攻击
	   this._bchain.x = this._battleField.x;
	   this._bchain.y = this._battleField.y;
	};
	if (Imported.MOG_HPGauge && this._hpField) {		// 敌人 - 生命浮动框
		this._hpField.x = this._battleField.x
		this._hpField.y = this._battleField.y
	};
};


if (Imported.MOG_ChainCommands) {
	var _drill_mog_updateFocus = Spriteset_Battle.prototype.updateFocus;
	Spriteset_Battle.prototype.updateFocus = function() {
		if ($gameTemp._bchainTemp) {$gameTemp._drill_cam_being_attack[2] = 0};//技能 - 按键连锁攻击（下一段招不等待）
		_drill_mog_updateFocus.call(this);
	};
};

