//=============================================================================
// Drill_CoreOfWaitressSprite.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        主菜单 - 服务员核心
 * @author Drill_up
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_CoreOfWaitressSprite +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能够识别并播放服务员的行为与动作。
 * 该插件为基础核心，单用没有任何效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础插件，以下插件依赖于本插件：
 * 作用于：
 *   - Drill_SceneShop              面板 - 全自定义商店界面
 *   - Drill_SceneLimitedShop       面板 - 限量商店
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   作用于服务员贴图。
 * 服务员：
 *   (1.服务员可以对各种情况作出不同gif动作，
 *      具体可以去看看相关 子插件 的服务员动作的说明。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   进入商店界面，进行相关的性能测试。
 * 测试结果：   服务员的消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.该插件实际上只有服务员一个贴图，贴图会根据情况变化不同的动
 *   作，产生的消耗并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 *
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COWS（Core_Of_Waitress_Sprite）
//		临时全局变量	无
//		临时局部变量	this._drill_COWS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理) 每帧
//		性能测试因素	在商店界面中测试
//		性能测试消耗	3.71ms
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			服务员核心：
//				->默认动作
//				->指定指令动作
// 
//		★私有类如下：
//			* Drill_COWS_WaitressSprite【服务员】
//
//		★必要注意事项：
//			1.使用方法：
//				this._sprite_waitress = new Drill_COWS_WaitressSprite( 【default数据】 );
//				this._sprite_waitress.drill_COWS_pushNewAct("【aaa】", 【aaa的数据】);
//				this._sprite_waitress.drill_COWS_pushNewAct("【bbb】", 【bbb的数据】);
//				this._sprite_waitress.drill_COWS_pushNewAct("【ccc】", 【ccc的数据】);
//				this._sprite_waitress.drill_COWS_pushNewAct("【ddd】", 【ddd的数据】);
//				this._sprite_waitress.drill_COWS_pushNewAct("【eee】", 【eee的数据】);
//			初始化的时候，将你要操作的数据push。
//				默认行为 参数见drill_COWS_initDefaultWaitress函数
//				一般行为 参数见drill_COWS_pushNewAct函数
//			调用时，直接用playAct就可以了。
//
//		★其它说明细节：
//			1. 2020-3-20初次分离服务员核心，感觉功能比较少。可能还是个未完全成形的结构。
//			2. 如果把服务员当成一个现实的人物来看，可以开的坑非常多：
//					卖的垃圾太多，服务员会和你打起来。（触发战斗）
//					买的物品越多，服务员穿的越少。（黄油？）
//			        你可以欠钱购买物品，但是事后服务员会找你要利息。
//				
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfWaitressSprite = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWaitressSprite');


//=============================================================================
// ** 服务员
//=============================================================================
//==============================
// * 服务员 - 定义
//==============================
function Drill_COWS_WaitressSprite() {
	this.initialize.apply(this, arguments);
}
Drill_COWS_WaitressSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_COWS_WaitressSprite.prototype.constructor = Drill_COWS_WaitressSprite;

//==============================
// * 服务员 - 初始化
//==============================
Drill_COWS_WaitressSprite.prototype.initialize = function( default_act_data ) {
	Sprite_Base.prototype.initialize.call(this);
	this._drill_time = 0;							//持续时间
	this._drill_act_commands = [];					//行为指令列表
	this._drill_act_curIndex = "";					//当前行为
	this._drill_acts = {};							//行为数据
	
	this.drill_COWS_initDefaultWaitress( default_act_data );	//初始化默认行为
};
//==============================
// * 服务员 - 帧刷新
//==============================
Drill_COWS_WaitressSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	this._drill_time += 1;
	this.drill_COWS_updateGif();	//刷新gif
};

//==============================
// * 创建 - 默认值初始化
//
//			说明：注意，默认行为参数和一般行为参数不一样。
//==============================
Drill_COWS_WaitressSprite.prototype.drill_COWS_initDefaultWaitress = function( default_act_data ) {
	
	// > 初始化
	if( default_act_data == undefined ){ default_act_data = {} };
	this._drill_act_commands.push("act-default");
	this._drill_acts["act-default"] = JSON.parse(JSON.stringify( default_act_data ));
	
	// > 默认值
	var act = this._drill_acts["act-default"];
	if( act['gif_src'] == undefined ){ act['gif_src'] = [] };							//资源
	if( act['gif_src_file'] == undefined ){ act['gif_src_file'] = "img/system/" };		//资源文件夹
	if( act['gif_interval'] == undefined ){ act['gif_interval'] = 4 };					//帧间隔
	if( act['gif_back_run'] == undefined ){ act['gif_back_run'] = false };				//是否倒放
	
	// > bitmap对象
	act['gif_src_bitmaps'] = [];
	for(var j = 0; j < act['gif_src'].length ; j++){
		act['gif_src_bitmaps'].push(
			ImageManager.loadBitmap( act['gif_src_file'], act['gif_src'][j], 0, true)
		);
	}
	
	// >创建贴图
	this.bitmap = this._drill_acts["act-default"]['gif_src_bitmaps'][0] ;
}

//==============================
// * 操作 - 一般行为初始化（接口）
//
//			说明：定义一般行为的数据。
//			参数：行为关键字，行为数据
//==============================
Drill_COWS_WaitressSprite.prototype.drill_COWS_pushNewAct = function( act_command, act_data ) {
	if( act_command == "" ){ return; }
	if(!act_data ){ return; }
	if( this._drill_act_commands.indexOf(act_command) != -1 ){ return; }
	
	// > 初始化
	this._drill_act_commands.push(act_command);
	this._drill_acts[ act_command ] = JSON.parse(JSON.stringify( act_data ));
	
	// > 默认值
	var act = this._drill_acts[ act_command ];
	if( act['gif_src'] == undefined ){ act['gif_src'] = [] };							//资源
	if( act['gif_src_file'] == undefined ){ act['gif_src_file'] = "img/system/" };		//资源文件夹
	if( act['gif_interval'] == undefined ){ act['gif_interval'] = 4 };					//帧间隔
	if( act['gif_back_run'] == undefined ){ act['gif_back_run'] = false };				//是否倒放
	if( act['gif_replay'] == undefined ){ act['gif_replay'] = true };					//末尾重播
	
	if( act['enable'] == undefined ){ act['enable'] = false };							//行为开关
	if( act['sustain'] == undefined ){ act['sustain'] = 60 };							//动作持续时间
	if( act['delay'] == undefined ){ act['delay'] = 0 };								//动作延迟
	if( act['se'] == undefined ){ act['se'] = "" };										//动作声音
		
	// > bitmap对象
	act['gif_src_bitmaps'] = [];
	for(var j = 0; j < act['gif_src'].length ; j++){
		act['gif_src_bitmaps'].push(
			ImageManager.loadBitmap( act['gif_src_file'], act['gif_src'][j], 0, true)
		);
	}
}

//==============================
// * 操作 - 播放行为（接口）
//
//			说明：要播放，直接调用即可。
//==============================
Drill_COWS_WaitressSprite.prototype.drill_COWS_playAct = function( act_command ) {
	if( act_command == "" ){ return; }
	if( act_command == "act-default" ){ return; }
	if( this._drill_act_commands.indexOf(act_command) == -1 ){ return; }
	if( this._drill_act_curIndex == act_command ){ return; }		//重复动作不会刷新服务员行为
	
	var act = this._drill_acts[ act_command ];
	if( act['enable'] != true ){ return; }		//不可用的行为跳过
		
	this._drill_act_curIndex = act_command;
	this._drill_act_recordTime = this._drill_time;
}

//==============================
// * 帧刷新 - 刷新gif
//==============================
Drill_COWS_WaitressSprite.prototype.drill_COWS_updateGif = function() {
	
	// > 指定行为（一次只能播放一种行为）
	if( this._drill_act_curIndex != "" ){
		var act = this._drill_acts[ this._drill_act_curIndex ];
		var c_time = this._drill_time - this._drill_act_recordTime;
		
		if( c_time >= act['delay'] ){
			// > 动作声音
			if( c_time == act['delay'] ){
				var se = {};
				se.name = act['se'];
				se.pitch = 100;
				se.volume = 100;
				AudioManager.playSe(se);
			}
			
			// > gif播放
			var inter = c_time - act['delay'];
			inter = inter / act['gif_interval'];
			if( inter >= act['gif_src_bitmaps'].length && act['gif_replay'] == false ){
				inter = act['gif_src_bitmaps'].length - 1;			//不重播
			}else{
				inter = inter % act['gif_src_bitmaps'].length;		//重播
			}
			if( act['gif_back_run'] ){
				inter = act['gif_src_bitmaps'].length - 1 - inter;
			}
			inter = Math.floor(inter);
			this.bitmap = act['gif_src_bitmaps'][inter] ;
			
			// > 动作持续
			if( c_time - act['delay'] >= act['sustain'] ){
				this._drill_act_curIndex = "";
			}
			return;
		}
	}
	
	// > 默认行为
	var default_act = this._drill_acts["act-default"];
	var inter = this._drill_time;		//gif播放
	inter = inter / default_act['gif_interval'];
	inter = inter % default_act['gif_src_bitmaps'].length;
	if( default_act['gif_back_run'] ){
		inter = default_act['gif_src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this.bitmap = default_act['gif_src_bitmaps'][inter] ;
	
}	




