//=============================================================================
// Drill_EventFadeInEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 显现动作效果
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
 * ★★必须放在 MOG动作效果 插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家、跟随队员都可以设置效果。
 * 2.显现动作固定为：从 完全透明 到 完全不透明 的过程。
 *   动作结束后，透明度为255。
 * 3.落下、弹跳效果可以与其它动作效果叠加。但不包括透明过程。
 * 4.动作是并行的，你需要手动加格外的等待时间。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定人物
 * 你需要指定哪个人物，来执行你想要的动作效果：
 * 
 * 插件指令：>玩家显现效果 : 领队 : 标准落下 : 60 : 168
 * 插件指令：>玩家显现效果 : 指定队员 : 1 : 标准落下 : 60 : 168
 * 插件指令：>玩家显现效果 : 指定队员(变量) : 1 : 标准落下 : 60 : 168
 * 插件指令：>玩家显现效果 : 全部队员 : 标准落下 : 60 : 168
 *
 * 插件指令：>事件显现效果 : 本事件 : 标准落下 : 60 : 168
 * 插件指令：>事件显现效果 : 指定事件 : 1 : 标准落下 : 60 : 168
 * 插件指令：>事件显现效果 : 指定事件(变量) : 1 : 标准落下 : 60 : 168
 *
 * 1.指定队员，0表示领队，1表示第一个跟随者，以此类推。
 *   注意，玩家显现效果 和 事件显现效果 的指令不一样。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定效果
 * 指定人物后，你还可以使用下面的更多的效果设置：
 * 
 * 插件指令：>事件显现效果 : 本事件 : 标准落下 : 60 : 168
 * 插件指令：>事件显现效果 : 本事件 : 标准弹跳 : 60 : 168
 * 插件指令：>事件显现效果 : 本事件 : 放大出现 : 60
 *
 * 1.落下后面的参数为 时间（单位帧）高度（像素）。实际落下有+20帧的缓冲时间。
 *   比如设置60，实际要等80帧才能结束落下动作。
 * 2.如果你不想要任何动作，只想让事件静态显现，直接设置 标准弹跳 + 高度0 即可。
 *   但是时间不能为0。
 * 3.放大出现后面的参数为 时间（单位帧）。实际落下有+20帧的缓冲时间。
 *   比如设置60，实际要等80帧才能结束放大出现动作。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明度检查
 * 如果有的事件已经是透明度为255了，你不想让他再播放一次出现动画，你可以使用
 * 下面的插件指令。
 * 
 * 插件指令：>玩家显现效果 : 透明度检查开启
 * 插件指令：>玩家显现效果 : 透明度检查关闭
 * 插件指令：>事件显现效果 : 透明度检查开启
 * 插件指令：>事件显现效果 : 透明度检查关闭
 * 
 * 1.插件指令直接作用于所有玩家，或者所有事件。
 * 2.所有事件/玩家的 透明度检查 默认关闭。
 * 3.开启检查后，如果当前事件透明度为255，出现动作不会起作用。
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFIE（Event_Fade_In_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_EFIE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			显现动作效果：
//				->标准落下
//				->标准弹跳
//				->放大出现
//				->结构优化（换成Game_Character）
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//			2.该插件限定透明度从0->255的变化。
//			3.由于rmmv函数中没有【Game_Character.prototype.update】，所以继承时要用【Game_CharacterBase.prototype.update】。
//			  之前继承了这个没有的函数，造成了举起物体插件出问题。
//
//		★其它说明细节：
//			1.需要改变x,y,opacity,rotation,scale_x,scale_y的值，并且毫无损失地复原。
//			  另外，对齐每一个插件指令，也是比较头疼的问题。
//			  结构并不复杂，只是内容划分太多。	
//			2.队伍透明度统一存在麻烦的地方，队长的透明度每帧都会分配给跟随者。
//			  目前只设置了播放动作的时候，透明度才不统一。
//			3.继承Game_Character不要用initMembers，因为follower不会调用这个方法。
//
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFadeInEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventFadeInEffect');
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_EFIE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_EFIE_pluginCommand.call(this, command, args);
	if (command === '>玩家显现效果') { // >玩家显现效果 : 领队 : 标准落下 : 60 : 168
		if(args.length == 6 || args.length == 8){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var time = Number(args[5]);
			if(args[7]){ var height = Number(args[7]); }
			if( $gamePlayer.opacity() == 255 && $gameSystem._drill_EFIE_opacityCheck_player){
				return;
			}
			if( temp1 == "领队" ){ 
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
			if( temp1 == "全部队员" ){ 
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
			if( temp1 == "指定队员" ){
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
			if( temp1 == "指定队员(变量)" ){ 
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
			if( temp1 == "本事件" ){
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
			if( temp1 == "指定事件" ){ 
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
			if( temp1 == "指定事件(变量)" ){ 
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
	this._drill_EFIE_opacityCheck_player = false;
	this._drill_EFIE_opacityCheck_event = false;
}

//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _Drill_EFIE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_EFIE_c_initialize.call(this);
	this._Drill_EFIE = {};			//不要用initMembers，follower没有这个方法。
	
	this._Drill_EFIE.x = 0;			//变化值
	this._Drill_EFIE.y = 0;
	this._Drill_EFIE.rotation = 0;
	this._Drill_EFIE.scale_x = 0;
	this._Drill_EFIE.scale_y = 0;
	this._Drill_EFIE.skew_x = 0;
	this._Drill_EFIE.skew_y = 0;
	this._Drill_EFIE.opacity = 0;	//（透明度不叠加）
	this._Drill_EFIE.playing_type = "";
	
}

//==============================
// * 动作判定
//==============================
Game_Character.prototype.drill_EFIE_isPlaying = function() {
	if( !this._Drill_EFIE ){ return false; }
	if( this._Drill_EFIE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 初始化 - 显现 标准落下
//==============================
Game_Character.prototype.drill_EFIE_playShowingFall = function(time,height) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingFalling";
	ef.fA_tdest = time;
	ef.fA_distance = -1 * height;
	ef.fA_a = 2*ef.fA_distance/ef.fA_tdest/ef.fA_tdest;	//加速度公式
	ef.fA_time = 0;
	ef.fB_tdest = 20;	//固定抛物线公式
	ef.fB_time = 0;
}
//==============================
// * 初始化 - 显现 标准弹跳
//==============================
Game_Character.prototype.drill_EFIE_playShowingJump = function(time,height) {
	var ef = this._Drill_EFIE;
	ef.playing_type = "showingJump";
	ef.f_a = -4*height/time/time;	//抛物线公式 y = ax2 + bx +c
	ef.f_b = 4*height/time;	
	ef.f_c = 0;	
	ef.f_time = 0;
	ef.f_tdest = time;
}
//==============================
// * 初始化 - 显现 放大出现
//==============================
Game_Character.prototype.drill_EFIE_playShowingEnlarge = function(time) {
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
	
	ef.fB_tdest = 20;	//固定抛物线公式
	ef.fB_time = 0;
}

//==============================
// * 帧刷新
//==============================
var _Drill_EFIE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_Drill_EFIE_c_update.call(this);
	
	if( this._Drill_EFIE && this._Drill_EFIE.playing_type != "" ){
		this.drill_EFIE_updateShowingFall();
		this.drill_EFIE_updateShowingJump();
		this.drill_EFIE_updateShowingEnlarge();
	}
}
//==============================
// * 帧刷新 - 显现 标准落下
//==============================
Game_Character.prototype.drill_EFIE_updateShowingFall = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type == "showingFalling" ){
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
			//ef.scale_x = 0.01777777 * t - 0.00039506 *t*t;	//45帧抛物线公式
			//ef.scale_x = 0.02666666 * t - 0.00088888 *t*t;	//30帧
			ef.scale_x = 0.04 * t - 0.002 *t*t;	//20帧
			ef.scale_y = -ef.scale_x;
			ef.opacity = 255;
			this.setOpacity(ef.opacity);
		}else if(ef.fB_time == ef.fB_tdest){
			ef.fB_time ++;
			ef.opacity = 255;
			this.setOpacity(ef.opacity);		//锁定透明度
		}else{
			ef.playing_type = "";
		}
	}
}
//==============================
// * 帧刷新 - 显现 标准弹跳
//==============================
Game_Character.prototype.drill_EFIE_updateShowingJump = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type == "showingJump" ){
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
		}else if( ef.f_time == ef.f_tdest ){
			ef.f_time ++;
			ef.opacity = 255 ;
			this.setOpacity(ef.opacity);		//锁定透明度
		}else{
			ef.playing_type = "";
		}
	}
}
//==============================
// * 帧刷新 - 显现 放大出现
//==============================
Game_Character.prototype.drill_EFIE_updateShowingEnlarge = function() {
	var ef = this._Drill_EFIE;
	if( ef.playing_type == "showingEnlarge" ){
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
			ef.scale_x = 0.02 * t - 0.001 *t*t;	//20帧
			ef.scale_y = ef.scale_x;
			ef.opacity = 255;
			this.setOpacity(ef.opacity);
		}else if(ef.fB_time == ef.fB_tdest){
			ef.fB_time ++;
			ef.opacity = 255;
			this.setOpacity(ef.opacity);		//锁定透明度
		}else{
			ef.playing_type = "";
		}
	}
}

//=============================================================================
// ** 跟随者特殊设置
//=============================================================================
//==============================
// * 透明度同步
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
// * 初始化
//==============================
var _Drill_EFIE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	_Drill_EFIE_s_setCharacter.call(this,character);
	if (character) { this._Drill_EFIE = character._Drill_EFIE; };
};

//==============================
// * 固定帧初始值
//==============================
var _Drill_EFIE_s_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Drill_EFIE_s_updatePosition.call(this);
	if( this.rotation != 0 ){ this.rotation = 0; }
	if( this.scale.x != 1 ){ this.scale.x = 1; }
	if( this.scale.y != 1 ){ this.scale.y = 1; }
	if( this.skew.x != 0 ){ this.skew.x = 0; }
	if( this.skew.y != 0 ){ this.skew.y = 0; }
	//从这里开始，参数都被固定值（不需要考虑多次update的叠加影响）
};

//==============================
// * 帧刷新
//==============================
var _Drill_EFIE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_Drill_EFIE_s_update.call(this);
	if ( this._character && this._Drill_EFIE ) {
		this.update_EFIE_effect();
	}
};
Sprite_Character.prototype.update_EFIE_effect = function() {
	
	if( this._character.drill_EFIE_isPlaying() ){
		//this.x += this._Drill_EFIE.x ;
		this.y += this._Drill_EFIE.y ;
		//this.rotation += this._Drill_EFIE.rotation;
		this.scale.x += this._Drill_EFIE.scale_x;
		this.scale.y += this._Drill_EFIE.scale_y;
		//this.skew.x += this._Drill_EFIE.skew_x;
		//this.skew.y += this._Drill_EFIE.skew_y;
		
		this.opacity = this._Drill_EFIE.opacity;

	}
}

