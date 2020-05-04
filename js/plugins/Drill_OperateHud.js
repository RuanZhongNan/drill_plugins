//=============================================================================
// Drill_OperateHud.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        互动 - 鼠标辅助操作面板
 * @author Drill_up
 *
 * @param ----操作面板----
 * @default 
 *
 * @param 平移-操作面板 X
 * @parent ----操作面板----
 * @desc x轴方向平移，单位像素，0为中心贴在玩家行走图的中心。（可为负数）
 * @default 0
 *
 * @param 平移-操作面板 Y
 * @parent ----操作面板----
 * @desc y轴方向平移，单位像素，0为中心贴在玩家行走图的中心。（可为负数）
 * @default 0
 *
 * @param 资源-操作面板
 * @parent ----操作面板----
 * @desc 操作面板的图片资源。
 * @default 操作面板-外环
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 面板显现时长
 * @parent ----操作面板----
 * @type number
 * @min 0
 * @desc 面板显现出来的时间，单位帧。（1秒60帧）
 * @default 12
 *
 * @param 是否显现时旋转布局
 * @parent ----操作面板----
 * @type boolean
 * @on 旋转
 * @off 不旋转
 * @desc 布局显现时会旋转180度。（圆形的资源图片，效果不会非常明显）
 * @default true
 *
 * @param 未高亮按钮透明度
 * @parent ----操作面板----
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标未接触面板按钮时按钮的透明度。
 * @default 160
 *
 * @param 高亮按钮透明度
 * @parent ----操作面板----
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标接触面板按钮时按钮的透明度。
 * @default 255
 *
 * @param ----菜单----
 * @default 
 *
 * @param 是否开启面板菜单按钮
 * @parent ----菜单----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @param 资源-菜单按钮
 * @parent ----菜单----
 * @desc 跳跃上箭头的图片资源。
 * @default 操作面板-菜单按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 平移-菜单按钮 X
 * @parent ----菜单----
 * @desc x轴方向平移，单位像素，0为中心贴在玩家行走图的中心。（可为负数）
 * @default 72
 *
 * @param 平移-菜单按钮 Y
 * @parent ----菜单----
 * @desc y轴方向平移，单位像素，0为中心贴在玩家行走图的中心。（可为负数）
 * @default 48
 *
 * @param ----跳跃----
 * @default 
 *
 * @param 资源-跳跃上箭头
 * @parent ----跳跃----
 * @desc 跳跃上箭头的图片资源。
 * @default 操作面板-跳跃上箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃下箭头
 * @parent ----跳跃----
 * @desc 跳跃下箭头的图片资源。
 * @default 操作面板-跳跃下箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃左箭头
 * @parent ----跳跃----
 * @desc 跳跃左箭头的图片资源。
 * @default 操作面板-跳跃左箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃右箭头
 * @parent ----跳跃----
 * @desc 跳跃右箭头的图片资源。
 * @default 操作面板-跳跃右箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 跳跃按钮中心距
 * @parent ----跳跃----
 * @type number
 * @min 0
 * @desc 按钮与面板中心的距离，单位像素。
 * @default 32
 *
 * @param ----转向----
 * @default 
 *
 * @param 资源-转向上箭头
 * @parent ----转向----
 * @desc 跳跃上箭头的图片资源。
 * @default 操作面板-转向上箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向下箭头
 * @parent ----转向----
 * @desc 跳跃下箭头的图片资源。
 * @default 操作面板-转向下箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向左箭头
 * @parent ----转向----
 * @desc 跳跃左箭头的图片资源。
 * @default 操作面板-转向左箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向右箭头
 * @parent ----转向----
 * @desc 跳跃右箭头的图片资源。
 * @default 操作面板-转向右箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 转向按钮中心距
 * @parent ----转向----
 * @type number
 * @min 0
 * @desc 按钮与面板中心的距离，单位像素。
 * @default 24
 *
 * @param ----投掷----
 * @default 
 *
 * @param 资源-投掷按钮
 * @parent ----投掷----
 * @desc 投掷按钮的图片资源。
 * @default 操作面板-投掷按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 偏移-投掷按钮 X
 * @parent ----投掷----
 * @desc x轴方向平移，单位像素，0为中心贴在操作面板的中心。（可为负数）
 * @default 0
 *
 * @param 偏移-投掷按钮 Y
 * @parent ----投掷----
 * @desc y轴方向平移，单位像素，0为中心贴在操作面板的中心。（可为负数）
 * @default 0
 *
 * @param ----炸弹----
 * @default 
 *
 * @param 资源-炸弹按钮
 * @parent ----炸弹----
 * @desc 炸弹按钮的图片资源。
 * @default 操作面板-炸弹按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 平移-炸弹按钮 X
 * @parent ----炸弹----
 * @desc x轴方向平移，单位像素，0为中心贴在操作面板的中心。（可为负数）
 * @default -72
 *
 * @param 平移-炸弹按钮 Y
 * @parent ----炸弹----
 * @desc y轴方向平移，单位像素，0为中心贴在操作面板的中心。（可为负数）
 * @default 48
 * 
 * @help  
 * =============================================================================
 * +++ Drill_OperateHud +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得地图的角色提供鼠标按键支持。包括触屏支持。
 * ★★必须放在 "扩展于" 的所有插件的后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件必须基于核心，并可以辅助扩展下列插件，如果目标插件一个都没有，
 * 则该插件没有任何效果。
 * 基于：
 *   - Drill_CoreOfInput 系统 - 输入设备核心
 * 可作用于：
 *   - Drill_LayerCamera 地图 - 活动地图镜头 ★★v1.6及以上版本★★
 *     目标插件控制镜头放大缩小时，该插件的面板仍然可以正常支持。
 *   - Drill_Jump 互动-跳跃能力 ★★v1.2及以上版本★★
 *   - Drill_RotateDirection 互动-原地转向能力
 *   - Drill_PickThrow 互动-举起花盆能力
 *   - Drill_BombCore 炸弹人-游戏核心
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对玩家有效。
 * 2.你可以在核心中禁用鼠标右键菜单功能，设置点击角色出现菜单按钮。
 * 3.你配置的资源图片的矩形大小，决定你按钮的大小。
 *   如果你打算用在移动端，建议使用大图片，不然手指会按不到位置。
 * 4.如果点击了两个按钮重叠的部分，高亮的那个按钮起效果。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_operatehud （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_operatehud文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-操作面板
 * 资源-菜单按钮
 * 资源-跳跃上箭头
 * 资源-跳跃下箭头
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置鼠标操作面板启用情况。
 *
 * 插件指令： >鼠标操作面板开启
 * 插件指令： >鼠标操作面板关闭
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
 * 时间复杂度： o(贴图处理) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【8.21ms】
 *              100个事件的地图中，平均消耗为：【7.32ms】
 *               50个事件的地图中，平均消耗为：【5.15ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.辅助操作面板只有一个，测试的值可能看起来像是线性递增关系。
 *   实际上该插件与事件的数量没有任何关系。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了鼠标高亮在浏览器中玩的错位问题。
 * [v1.2]
 * 添加了菜单的设置，以及禁用地图中右键菜单的设置。
 * 修复了触屏没有效果的bug。
 * [v1.3]
 * 添加了炸弹人核心插件的支持。
 * [v1.4]
 * 修改了内部结构，并且修复了举起物体时，不能点击转向按钮的bug。
 * [v1.5]
 * 分离了核心，优化了插件性能。并且修改了插件关联的资源文件夹。
 * [v1.6]
 * 添加了镜头缩放时，面板触发的支持。
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		OH (Operate_Hud)
//		临时全局变量	DrillUp.g_OH_xxx
//		临时局部变量	this._drill_xxxx
//		存储数据变量	$gameSystem._drill_xxxx
//		全局存储变量	无
//		覆盖重写方法	TouchInput._onRightButtonDown
//
//		工作类型		持续执行
//		时间复杂度		o(贴图处理)	 每帧
//		性能测试因素	不停地操作点出面板
//		性能测试消耗	5.15ms
//		最坏情况		暂无，消耗太少，无论怎么点，消耗都上不去。
//
//插件记录：
//		★大体框架与功能如下：
//			操作面板：（鼠标+触屏）
//				->单功能按钮
//				->跳跃方向按钮
//				->原地转向方向按钮
//				->按钮高亮激活
//				->面板收回时机
//
//		★必要注意事项：
//			1.互动之间如果有较复杂的接口，最好遵循下面的格式：
//				drill_canXxxx_Normal		面板-静态限制条件（无提示音，面板不收回）
//				drill_canXxxx_Conditional	面板-特殊限制条件（有提示音，面板收回）
//				drill_doXxxx				面板-执行操作
//				drill_isXxxxControl			按键-按下即可操作
//			  注意，面板和按键只做自己的事情，不额外调用插件的其它函数、变量。
//			  除了以上接口，其他函数放心改名/改动。
//
//		★其它说明细节：
//			1.鼠标是个很复杂的持续性动作，在update中会持续触发。需要加锁。
//			  只有 高亮 + 点击 才能触发高亮的按钮动作。
//			2. 2019/6/20 看之前自己写的结构，感觉有很多地方比较混乱。
//			  因为同时使用 鼠标接近 函数，又夹杂了rmmv本体的touchinput。函数结构比较松散。
//			  （这里按照drill_createBtn_xxx的代码思路来，毕竟该插件依赖于其它插件，不适合封装成对象）
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_OperateHud = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_OperateHud');

    DrillUp.g_OH_src_Layout = String(DrillUp.parameters['资源-操作面板'] || "");
	DrillUp.g_OH_x = Number(DrillUp.parameters['平移-操作面板 X'] || 0);
	DrillUp.g_OH_y = Number(DrillUp.parameters['平移-操作面板 Y'] || 0); 
	DrillUp.g_OH_time = Number(DrillUp.parameters['面板显现时长'] || 12);
	DrillUp.g_OH_showing_rotate = String(DrillUp.parameters['是否显现时旋转布局'] || "false") === "true";	
	
	//DrillUp.g_OH_btn_auto_hide = String(DrillUp.parameters['是否自动隐藏按钮'] || "false") === "true";	
    DrillUp.g_OH_btn_opacity = Number(DrillUp.parameters['未高亮按钮透明度'] || 160);
    DrillUp.g_OH_btn_l_opacity = Number(DrillUp.parameters['高亮按钮透明度'] || 255);
	
	//DrillUp.g_OH_menu_block = String(DrillUp.parameters['是否禁用鼠标右键菜单'] || "false") === "true";
	DrillUp.g_OH_menu_enable = String(DrillUp.parameters['是否开启面板菜单按钮'] || "true") === "true";
    DrillUp.g_OH_menu_src = String(DrillUp.parameters['资源-菜单按钮'] || "");
	DrillUp.g_OH_menu_x = Number(DrillUp.parameters['平移-菜单按钮 X'] || 0);
	DrillUp.g_OH_menu_y = Number(DrillUp.parameters['平移-菜单按钮 Y'] || 0); 

    DrillUp.g_OH_jump_src_up = String(DrillUp.parameters['资源-跳跃上箭头'] || "");
    DrillUp.g_OH_jump_src_down = String(DrillUp.parameters['资源-跳跃下箭头'] || "");
    DrillUp.g_OH_jump_src_left = String(DrillUp.parameters['资源-跳跃左箭头'] || "");
    DrillUp.g_OH_jump_src_right = String(DrillUp.parameters['资源-跳跃右箭头'] || "");
	DrillUp.g_OH_jump_distance = Number(DrillUp.parameters['跳跃按钮中心距'] || 32);

    DrillUp.g_OH_rotate_src_up = String(DrillUp.parameters['资源-转向上箭头'] || "");
    DrillUp.g_OH_rotate_src_down = String(DrillUp.parameters['资源-转向下箭头'] || "");
    DrillUp.g_OH_rotate_src_left = String(DrillUp.parameters['资源-转向左箭头'] || "");
    DrillUp.g_OH_rotate_src_right = String(DrillUp.parameters['资源-转向右箭头'] || "");
	DrillUp.g_OH_rotate_distance = Number(DrillUp.parameters['转向按钮中心距'] || 24);

    DrillUp.g_OH_throw_src = String(DrillUp.parameters['资源-投掷按钮'] || "");
	DrillUp.g_OH_throw_x = Number(DrillUp.parameters['偏移-投掷按钮 X'] || 0);
	DrillUp.g_OH_throw_y = Number(DrillUp.parameters['偏移-投掷按钮 Y'] || 0);
	
    DrillUp.g_OH_bomb_src = String(DrillUp.parameters['资源-炸弹按钮'] || "");
	DrillUp.g_OH_bomb_x = Number(DrillUp.parameters['平移-炸弹按钮 X'] || -72);
	DrillUp.g_OH_bomb_y = Number(DrillUp.parameters['平移-炸弹按钮 Y'] || 48); 

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.load_MapOperateHud = function(filename) {
    return this.loadBitmap('img/Map__ui_operatehud/', filename, 0, true);
};

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_OH_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_OH_pluginCommand.call(this,command, args);
	if (command === ">鼠标操作面板开启")  { $gameSystem._drill_OH_enable = true;};
	if (command === ">鼠标操作面板关闭")  { $gameSystem._drill_OH_enable = false;};
	return true;
};


//==============================
// * Scene_Map初始化
//==============================
var _drill_OH_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_OH_map_initialize.call(this);
	this._drill_OH_map_oneLock = false;
};

var _drill_OH_map_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_drill_OH_map_createSpriteset.call(this);		//直接在mapsprite大容器后面追加新的sprite块
	if (!this._drill_map_ui_board) {
		this._drill_map_ui_board = new Sprite();
		this.addChild(this._drill_map_ui_board);
	};
	this._drill_OH = new Drill_Operate_Hud();
	this._drill_map_ui_board.addChild(this._drill_OH);
};

//==============================
// * Scene_Map帧刷新
//==============================
var _drill_OH_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_OH_map_update.call(this);
	var s_player = this.drill_OH_getPlayerSprite();
	if( s_player != null ){
		var _x = s_player.x + DrillUp.g_OH_x;
		var _y = s_player.y - 24 + DrillUp.g_OH_y;
		if( Imported.Drill_LayerCamera ){
			_x = $gameSystem.drill_LCa_mapToCameraX( _x );
			_y = $gameSystem.drill_LCa_mapToCameraY( _y );
		}
		this._drill_OH.x = _x;
		this._drill_OH.y = _y;
	}
};

//=============================================================================
// ** 玩家点击地图时情况拦截
//=============================================================================
var _drill_OH_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_OH_canPlayerTouch() ){ 		//辅助面板点击事件
		this.drill_OH_checkPlayerTouch();
	}
	if( this.drill_OH_canMapTouch() ){ 		//拦截地图点击事件
		_drill_OH_processMapTouch.call(this);
	}
};

//==============================
// * 操作面板触发条件
//==============================
Scene_Map.prototype.drill_OH_canPlayerTouch = function() {	
	if( $gameSystem._drill_OH_enable == false ){return false}
	return true;
}
//==============================
// * 地图鼠标触发条件
//==============================
Scene_Map.prototype.drill_OH_canMapTouch = function() {	
	if( $gameSystem._drill_OH_enable == false ){return true}
	if( this._drill_OH._drill_OH_board_blocking ){return false}
	return true;
}

//==============================
// * 查找阻止地图触发事件的条件（这里是帧刷新区域，必须确保只触发一次变化）
//==============================
Scene_Map.prototype.drill_OH_checkPlayerTouch = function() {	
	var s_player = this.drill_OH_getPlayerSprite();
	if(s_player != null){
		
		if( s_player.drill_OH_isOnCharacterSprite() ){
			if( TouchInput.isTriggered() ){		//确保一次按下后，持续时间段，只触发一次
				if( !this._drill_OH_map_oneLock ){	
					this._drill_OH_map_oneLock = true;
					
					this._drill_OH._drill_OH_board_blocking = true;	//展开面板
				}
			}else{
				this._drill_OH_map_oneLock = false;
			}
		}
		//展开面板后，退出面板让面板自己来做。
	}
}
//==============================
// * 地图场景中 获取玩家的sprite贴图容器
//==============================
Scene_Map.prototype.drill_OH_getPlayerSprite = function() {	
	var s_map = this._spriteset;	//获取到map贴图容器
	var s_player = null;
	if(s_map != undefined){
		s_player = s_map._drill_OH_playerSprite;
	}
	return s_player;
}
//==============================
// * 获取玩家的sprite贴图容器
//==============================
var _drill_OH_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	this._drill_OH_playerSprite = null;
    _drill_OH_createCharacters.call(this);
	for (var i = this._characterSprites.length-1; i >= 0; i--) {	//角色贴图应该在最后一个，从最后一个开始索引
		if(this._characterSprites[i]._character == $gamePlayer){
			this._drill_OH_playerSprite = this._characterSprites[i];
			break;
		}
	}
};
//==============================
// * 检查是否鼠标触发角色贴图
//==============================
Sprite_Character.prototype.drill_OH_isOnCharacterSprite = function() { 
	if (this.bitmap == null){ return false };
	if (!this.bitmap.isReady() ){ return false };
	if (this.visible === false) {return false};
	if (this.opacity === 0) {return false};
	var pw = this.patternWidth() /2;
	var ph = this.patternHeight() /2;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( Imported.Drill_LayerCamera ){
		_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );
		_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );
	}
	if ( _x < this.x - pw) {return false};
	if ( _x > this.x + pw) {return false};
	if ( _y < this.y - ph - 24) {return false};	//这个24是角色行走图偏移的修正值
	if ( _y > this.y + ph - 24) {return false};
	return true;	
};


//=============================================================================
// * Drill_Operate_Hud 操作面板
// *
//=============================================================================
function Drill_Operate_Hud() {
    this.initialize.apply(this, arguments);
};

Drill_Operate_Hud.prototype = Object.create(Sprite.prototype);
Drill_Operate_Hud.prototype.constructor = Drill_Operate_Hud;

//==============================
// * 初始化
//==============================
Drill_Operate_Hud.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._drill_OH_board_blocking = false;		//控制正在开启或者关闭的开关
	this._drill_OH_board_blocking_change = false;
	this._drill_OH_btns = [];
	this._drill_OH_hoveringOne = null;
	this._drill_click_one = false;
	this._drill_OH_hud_oneLock = false;
	
	this.drill_createLayout();
	this.drill_createBtn_Menu();
	this.drill_createBtn_Jump();
	this.drill_createBtn_Rotate();
	this.drill_createBtn_Throw();
	this.drill_createBtn_Bomb();
	
	for(var i = 0 ; i < this._drill_OH_btns.length ; i++){		//初始不高亮
		var temp_sprite = this._drill_OH_btns[i];
		temp_sprite.opacity = DrillUp.g_OH_btn_opacity;
	}
};
//==============================
// * 初始化-布局
//==============================
Drill_Operate_Hud.prototype.drill_createLayout = function() {
	this._drill_OH_layout = new Sprite();
	this._drill_OH_layout.anchor.x = 0.5;
	this._drill_OH_layout.anchor.y = 0.5;
	this._drill_OH_layout.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_src_Layout);
	this.addChild(this._drill_OH_layout);
}
//==============================
// * 初始化-菜单按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Menu = function() {
	if( !DrillUp.g_OH_menu_enable ){ return }
	this._drill_menu = new Sprite();
	this._drill_menu.x = DrillUp.g_OH_menu_x;
	this._drill_menu.y = DrillUp.g_OH_menu_y;
	this._drill_menu.anchor.x = 0.5;
	this._drill_menu.anchor.y = 0.5;
	this._drill_menu.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_menu_src);
	this._drill_OH_btns.push(this._drill_menu);
	this.addChild(this._drill_menu);
}
//==============================
// * 初始化-跳跃按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Jump = function() {
	if( !Imported.Drill_Jump ){ return }
	this._drill_OH_jump_up = new Sprite();
	this._drill_OH_jump_up.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_up);
	this._drill_OH_jump_up.x = 0;
	this._drill_OH_jump_up.y = -1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_up.anchor.x = 0.5;
	this._drill_OH_jump_up.anchor.y = 1;
	this._drill_OH_jump_down = new Sprite();
	this._drill_OH_jump_down.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_down);
	this._drill_OH_jump_down.x = 0;
	this._drill_OH_jump_down.y = 1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_down.anchor.x = 0.5;
	this._drill_OH_jump_down.anchor.y = 0;
	this._drill_OH_jump_right = new Sprite();
	this._drill_OH_jump_right.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_right);
	this._drill_OH_jump_right.x = 1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_right.y = 0;
	this._drill_OH_jump_right.anchor.x = 0;
	this._drill_OH_jump_right.anchor.y = 0.5;
	this._drill_OH_jump_left = new Sprite();
	this._drill_OH_jump_left.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_left);
	this._drill_OH_jump_left.x = -1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_left.y = 0;
	this._drill_OH_jump_left.anchor.x = 1;
	this._drill_OH_jump_left.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_jump_up);
	this._drill_OH_btns.push(this._drill_OH_jump_down);
	this._drill_OH_btns.push(this._drill_OH_jump_right);
	this._drill_OH_btns.push(this._drill_OH_jump_left);
	this.addChild(this._drill_OH_jump_up);
	this.addChild(this._drill_OH_jump_down);
	this.addChild(this._drill_OH_jump_right);
	this.addChild(this._drill_OH_jump_left);
}
//==============================
// * 初始化-转向按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Rotate = function() {
	if( !Imported.Drill_RotateDirection ){ return }
	this._drill_OH_rotate_up = new Sprite();
	this._drill_OH_rotate_up.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_up);
	this._drill_OH_rotate_up.x = 0;
	this._drill_OH_rotate_up.y = -1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_up.anchor.x = 0.5;
	this._drill_OH_rotate_up.anchor.y = 1;
	this._drill_OH_rotate_down = new Sprite();
	this._drill_OH_rotate_down.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_down);
	this._drill_OH_rotate_down.x = 0;
	this._drill_OH_rotate_down.y = 1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_down.anchor.x = 0.5;
	this._drill_OH_rotate_down.anchor.y = 0;
	this._drill_OH_rotate_right = new Sprite();
	this._drill_OH_rotate_right.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_right);
	this._drill_OH_rotate_right.x = 1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_right.y = 0;
	this._drill_OH_rotate_right.anchor.x = 0;
	this._drill_OH_rotate_right.anchor.y = 0.5;
	this._drill_OH_rotate_left = new Sprite();
	this._drill_OH_rotate_left.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_left);
	this._drill_OH_rotate_left.x = -1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_left.y = 0;
	this._drill_OH_rotate_left.anchor.x = 1;
	this._drill_OH_rotate_left.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_rotate_up);
	this._drill_OH_btns.push(this._drill_OH_rotate_down);
	this._drill_OH_btns.push(this._drill_OH_rotate_right);
	this._drill_OH_btns.push(this._drill_OH_rotate_left);
	this.addChild(this._drill_OH_rotate_up);
	this.addChild(this._drill_OH_rotate_down);
	this.addChild(this._drill_OH_rotate_right);
	this.addChild(this._drill_OH_rotate_left);
}
//==============================
// * 初始化-花盆按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Throw = function() {
	if( !Imported.Drill_PickThrow ){ return }
	this._drill_OH_throw = new Sprite();
	this._drill_OH_throw.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_throw_src);
	this._drill_OH_throw.x = DrillUp.g_OH_throw_x;
	this._drill_OH_throw.y = DrillUp.g_OH_throw_y;
	this._drill_OH_throw.anchor.x = 0.5;
	this._drill_OH_throw.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_throw);
	this.addChild(this._drill_OH_throw);
}
//==============================
// * 初始化-炸弹按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Bomb = function() {
	if( !Imported.Drill_BombCore ){ return }
	this._drill_OH_bomb = new Sprite();
	this._drill_OH_bomb.x = DrillUp.g_OH_bomb_x;
	this._drill_OH_bomb.y = DrillUp.g_OH_bomb_y;
	this._drill_OH_bomb.anchor.x = 0.5;
	this._drill_OH_bomb.anchor.y = 0.5;
	this._drill_OH_bomb.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_bomb_src);
	this._drill_OH_btns.push(this._drill_OH_bomb);
	this.addChild(this._drill_OH_bomb);
}
//==============================
// * 帧刷新
//==============================
Drill_Operate_Hud.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	if(this._drill_OH_board_blocking_change != this._drill_OH_board_blocking){
		this._drill_OH_board_blocking_change = this._drill_OH_board_blocking;
		SoundManager.playCursor();
	}
	if(this._drill_OH_board_blocking){
		this.drill_updateShowing();
		this.drill_updateCondition_Jump();
		this.drill_updateCondition_Throw();
		this.drill_updateHoverHighlight();
		this.drill_updatePlayerInput();
	}else{
		this.drill_updateHiding();
	}
}
//==============================
// * 显示过程
//==============================
Drill_Operate_Hud.prototype.drill_updateShowing = function() {
	this.opacity += 255/DrillUp.g_OH_time;
	for(var i=0; i < this._drill_OH_btns.length; i++){
		this._drill_OH_btns[i].scale.x += 1/DrillUp.g_OH_time;
		if(this._drill_OH_btns[i].scale.x >= 1){
			this._drill_OH_btns[i].scale.x = 1;
		}
		this._drill_OH_btns[i].scale.y = this._drill_OH_btns[i].scale.x;
	}
	
	this._drill_OH_layout.scale.x += 1/DrillUp.g_OH_time;
	if(this._drill_OH_layout.scale.x >= 1){
		this._drill_OH_layout.scale.x = 1;
	}
	this._drill_OH_layout.scale.y = this._drill_OH_layout.scale.x;
	if(DrillUp.g_OH_showing_rotate){
		this._drill_OH_layout.rotation += Math.PI /DrillUp.g_OH_time;
		if(this._drill_OH_layout.rotation >= Math.PI ){
			this._drill_OH_layout.rotation = Math.PI ;
		}
	}
}
//==============================
// * 隐藏过程
//==============================
Drill_Operate_Hud.prototype.drill_updateHiding = function() {
	this.opacity -= 255/DrillUp.g_OH_time;
	for(var i=0; i < this._drill_OH_btns.length; i++){
		this._drill_OH_btns[i].scale.x -= 1/DrillUp.g_OH_time;
		if(this._drill_OH_btns[i].scale.x <= 0){
			this._drill_OH_btns[i].scale.x = 0;
		}
		this._drill_OH_btns[i].scale.y = this._drill_OH_btns[i].scale.x;
	}
	
	this._drill_OH_layout.scale.x -= 1/DrillUp.g_OH_time;
	if(this._drill_OH_layout.scale.x <= 0){
		this._drill_OH_layout.scale.x = 0;
	}
	this._drill_OH_layout.scale.y = this._drill_OH_layout.scale.x;
	if(DrillUp.g_OH_showing_rotate){
		this._drill_OH_layout.rotation -= Math.PI /DrillUp.g_OH_time;
		if(this._drill_OH_layout.rotation <= 0){
			this._drill_OH_layout.rotation = 0;
		}
	}
}

//=============================================================================
// * 跳跃按键实时变化控制
//=============================================================================
Drill_Operate_Hud.prototype.drill_updateCondition_Jump = function(){
	if( Imported.Drill_Jump ){
		if( $gamePlayer.direction() == 2 ){
			this._drill_OH_jump_up.visible = false;
			this._drill_OH_jump_down.visible = true;
			this._drill_OH_jump_left.visible = false;
			this._drill_OH_jump_right.visible = false;
		}
		if( $gamePlayer.direction() == 4 ){
			this._drill_OH_jump_up.visible = false;
			this._drill_OH_jump_down.visible = false;
			this._drill_OH_jump_left.visible = true;
			this._drill_OH_jump_right.visible = false;
		}
		if( $gamePlayer.direction() == 6 ){
			this._drill_OH_jump_up.visible = false;
			this._drill_OH_jump_down.visible = false;
			this._drill_OH_jump_left.visible = false;
			this._drill_OH_jump_right.visible = true;
		}
		if( $gamePlayer.direction() == 8 ){
			this._drill_OH_jump_up.visible = true;
			this._drill_OH_jump_down.visible = false;
			this._drill_OH_jump_left.visible = false;
			this._drill_OH_jump_right.visible = false;
		}
		if(this._drill_OH_hoveringOne != null
		&& this._drill_OH_hoveringOne.visible == false){
			this._drill_OH_hoveringOne = null;
		}
	}
}
//=============================================================================
// * 投掷按键实时变化控制
//=============================================================================
Drill_Operate_Hud.prototype.drill_updateCondition_Throw = function(){
	if( Imported.Drill_PickThrow ){
		if( $gamePlayer._drill_PT_is_lifting ){
			this._drill_OH_throw.visible = true;
		}else{
			this._drill_OH_throw.visible = false;
		}
		if(this._drill_OH_hoveringOne != null
		&& this._drill_OH_hoveringOne.visible == false){
			this._drill_OH_hoveringOne = null;
		}
	}
}

//=============================================================================
// * 高亮控制
//=============================================================================
//==============================
// * 高亮帧刷新
//==============================
Drill_Operate_Hud.prototype.drill_updateHoverHighlight = function() {
	//按钮里面，只能同时高亮一个按钮，并且最前面的按钮优先权最高

	if(this._drill_OH_hoveringOne == null){	//如果没有，先找到一个按钮
		for(var i = 0 ; i < this._drill_OH_btns.length ; i++){	
			var temp_sprite = this._drill_OH_btns[i];
			if( this.drill_isHoverBtnSprite(temp_sprite) ){
				temp_sprite.opacity = DrillUp.g_OH_btn_l_opacity;
				this._drill_OH_hoveringOne = temp_sprite;
				SoundManager.playCursor();
				break;
			}
		}
	}else{	
		for(var i = 0 ; i < this._drill_OH_btns.length ; i++){	
			var temp_sprite = this._drill_OH_btns[i];
			if(this._drill_OH_hoveringOne == temp_sprite){break};	//搜索中没有更上级的按钮了
			
			if( this.drill_isHoverBtnSprite(temp_sprite) ){
				this._drill_OH_hoveringOne.opacity = DrillUp.g_OH_btn_opacity; //鼠标找到了更上级的新按钮
				temp_sprite.opacity = DrillUp.g_OH_btn_l_opacity;
				this._drill_OH_hoveringOne = temp_sprite;
				SoundManager.playCursor();
				break;
			}
		}
		if( !this.drill_isHoverBtnSprite(this._drill_OH_hoveringOne) ){
			this._drill_OH_hoveringOne.opacity = DrillUp.g_OH_btn_opacity;  //鼠标离开指定按钮
			this._drill_OH_hoveringOne = null;
		}
	}
	
};

//==============================
// * 判断指定按钮高亮
//==============================
Drill_Operate_Hud.prototype.drill_isHoverBtnSprite = function(sprite) {
	if (sprite == null){ return false };
	if (sprite.bitmap == null){ return false };
	if (!sprite.bitmap.isReady() ){ return false };
	if (sprite.visible === false) {return false};
	if (sprite.opacity === 0) {return false};
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.x ;
	var cy = sprite.y ;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x < this.x + cx - cw*sprite.anchor.x + 0  ){return false};
	if ( _x > this.x + cx - cw*sprite.anchor.x + cw ){return false};
	if ( _y < this.y + cy - ch*sprite.anchor.y + 0  ){return false};
	if ( _y > this.y + cy - ch*sprite.anchor.y + ch ){return false};
	return true;	
};

//=============================================================================
// ** 按钮操作
//=============================================================================
//==============================
// ** 鼠标操作监听
//==============================
Drill_Operate_Hud.prototype.drill_updatePlayerInput = function() {
	
	if( TouchInput.isTriggered() ){		//确保一次按下后，持续时间段内，只触发一次
		if( !this._drill_OH_hud_oneLock ){	
			this._drill_OH_hud_oneLock = true;
			
			this.drill_triggerPlayerInput();
		}
	}else{
		this._drill_OH_hud_oneLock = false;
	}
}
//==============================
// ** 执行面板动作
//==============================
Drill_Operate_Hud.prototype.drill_triggerPlayerInput = function() {
	
	if( this.drill_isOnAnyBtnSprite() && this._drill_OH_hoveringOne != null ){
		//菜单
		if( this._drill_OH_hoveringOne == this._drill_menu ){
			SoundManager.playOk();
			SceneManager.push(Scene_Menu);
		}
		//原地转向
		if( Imported.Drill_RotateDirection && $gamePlayer.drill_canRotate_Normal()){
			if( this._drill_OH_hoveringOne == this._drill_OH_rotate_up ){
				
				if( $gamePlayer.drill_canRotate_Conditional() ){//上
					$gamePlayer.setDirection(8);
					this._drill_OH_board_blocking = false;
				}else{
					SoundManager.playBuzzer();
				}	
			}
			if( this._drill_OH_hoveringOne == this._drill_OH_rotate_down ){
				
				if( $gamePlayer.drill_canRotate_Conditional() ){//下
					$gamePlayer.setDirection(2);
					this._drill_OH_board_blocking = false;
				}else{
					SoundManager.playBuzzer();
				}	
			}
			if( this._drill_OH_hoveringOne == this._drill_OH_rotate_left ){
				
				if( $gamePlayer.drill_canRotate_Conditional() ){//左
					$gamePlayer.setDirection(4);
					this._drill_OH_board_blocking = false;
				}else{
					SoundManager.playBuzzer();
				}	
			}
			if( this._drill_OH_hoveringOne == this._drill_OH_rotate_right ){
				
				if( $gamePlayer.drill_canRotate_Conditional() ){//右
					$gamePlayer.setDirection(6);
					this._drill_OH_board_blocking = false;
				}else{
					SoundManager.playBuzzer();
				}	
			}
		}
		//跳跃
		if( Imported.Drill_Jump && $gamePlayer.drill_canJump_Normal()){
			if( this._drill_OH_hoveringOne == this._drill_OH_jump_up ||
				this._drill_OH_hoveringOne == this._drill_OH_jump_down ||
				this._drill_OH_hoveringOne == this._drill_OH_jump_left ||
				this._drill_OH_hoveringOne == this._drill_OH_jump_right ){
				if( $gamePlayer.drill_canJump_Conditional() ){//跳跃
					$gamePlayer.drill_doJump();
					this._drill_OH_board_blocking = false;
				}else{
					SoundManager.playBuzzer();
				}	
			}
		}
		//投掷花盆
		if( Imported.Drill_PickThrow && $gamePlayer.drill_canThrow_Normal()){
			if( this._drill_OH_hoveringOne == this._drill_OH_throw ){
				
				if( $gamePlayer.drill_canThrow_Conditional() ){//投掷
					$gamePlayer.drill_doThrow();
					this._drill_OH_board_blocking = false;
				}else{
					SoundManager.playBuzzer();
				}	
			}
		}		
		//炸弹
		if( this._drill_OH_hoveringOne == this._drill_OH_bomb ){
			var b_id = $gamePlayer.drill_BoC_characterPutBomb();
			if( b_id == -1 ){
				SoundManager.playBuzzer();
			}
		}
	}else{
		this._drill_OH_board_blocking = false;
	}
}

//==============================
// ** 举起花盆的鼠标支持
//==============================
if( Imported.Drill_PickThrow ){
	Game_Player.prototype.drill_isPickControl = function() {
		//确定键 + 鼠标按键
		return Input.isPressed('ok') || TouchInput.isTriggered();
	}
}

//==============================
// * 判断面板任一按钮鼠标触发
//==============================
Drill_Operate_Hud.prototype.drill_isOnAnyBtnSprite = function() {
	for(var i=0; i < this._drill_OH_btns.length; i++){
		if( this.drill_isOnBtnSprite(this._drill_OH_btns[i]) ){
			return true;
		}
	}
	return false;	
}
//==============================
// * 判断指定按钮鼠标触发
//==============================
Drill_Operate_Hud.prototype.drill_isOnBtnSprite = function(sprite) {
	if (sprite == null){ return false };
	if (sprite.bitmap == null){ return false };
	if (!sprite.bitmap.isReady() ){ return false };
	if (sprite.visible === false) {return false};
	if (sprite.opacity === 0) {return false};
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.x ;
	var cy = sprite.y ;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x < this.x + cx - cw*sprite.anchor.x + 0  ){return false};
	if ( _x > this.x + cx - cw*sprite.anchor.x + cw ){return false};
	if ( _y < this.y + cy - ch*sprite.anchor.y + 0  ){return false};
	if ( _y > this.y + cy - ch*sprite.anchor.y + ch ){return false};
	return true;	
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_OperateHud = false;
		alert(
			"【Drill_OperateHud.js 互动 - 鼠标辅助操作面板】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"
		);
}

