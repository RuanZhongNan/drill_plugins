//=============================================================================
// Drill_MouseDestination.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        鼠标 - 目的地指向标
 * @author Drill_up
 * 
 * @Drill_LE_param "指向标-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MDe_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseDestination +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 玩家鼠标点击地图的某一个点时，会飘出一个指向标。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于鼠标。
 * 指向标：
 *   (1.玩家鼠标点击地图的某一个点时，会飘出一个指向标。
 *      移动到目的地之后，或者停止移动，指向标会消失。
 *   (2.你可以切换样式来控制不同风格的指向标。
 * 设计：
 *   (1.指向标的资源可以是单张图片，也可以是GIF图像。
 *      你可以根据你设计的指向标，配置相关效果。
 *   (2.如果你不想显示目的地指向标，设置参数初始隐藏即可。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_mouse （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_mouse文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 指向标1 资源-指向标GIF
 * 指向标1 资源-指向标阴影
 * 指向标2 资源-指向标GIF
 * 指向标2 资源-指向标阴影
 * 指向标3 资源-指向标GIF
 * 指向标3 资源-指向标阴影
 * ……
 *
 * 所有素材都放在Map__ui_mouse文件夹下。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制网格指向标：
 * 
 * 插件指令：>目的地指向标 : 显示
 * 插件指令：>目的地指向标 : 隐藏
 * 插件指令：>目的地指向标 : 切换样式 : 0
 * 插件指令：>目的地指向标 : 切换样式 : 1
 * 
 * 1.数字表示对应配置的指向标编号。
 *   0表示rmmv默认的指向标。
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
 * 时间复杂度： o(n)*o(贴图处理)
 * 测试方法：   开启网格，去各个管理层测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.由于地图界面中只有目的地指向标这一个贴图，所以几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了插件配置细节。
 * 
 * 
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 当前指向标
 * @type number
 * @min 0
 * @desc 当前对应的指向标，0表示rmmv默认的指向标。
 * @default 0
 * 
 * @param ----指向标----
 * @default 
 *
 * @param 指向标-1
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-2
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-3
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-4
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-5
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-6
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-7
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-8
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-9
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 *
 * @param 指向标-10
 * @parent ----指向标----
 * @type struct<DrillMDeSprite>
 * @desc 当前指向标的样式配置。
 * @default 
 * 
 */
/*~struct~DrillMDeSprite:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的指向标样式==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-指向标GIF
 * @parent ---贴图---
 * @desc 指向标的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default []
 * @require 1
 * @dir img/Map__ui_mouse/
 * @type file[]
 *
 * @param 资源-指向标阴影
 * @parent ---贴图---
 * @desc 鼠标指向标阴影的图片资源。漂浮效果时使用。
 * @default 目的地指向标-阴影
 * @require 1
 * @dir img/Map__ui_mouse/
 * @type file
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 偏移-指向标 X
 * @parent ---贴图---
 * @desc 以指向标的点为基准，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 偏移-指向标 Y
 * @parent ---贴图---
 * @desc 以指向标的点为基准，y轴方向平移，单位像素。
 * @default 0 
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 * 
 * @param ---效果---
 * @default 
 *
 * @param 是否使用平滑运动
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，指向标会从玩家的位置出发，跑到目标位置。
 * @default true
 *
 * @param 是否使用淡出效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，玩家停止移动后，指向标淡出的过程。
 * @default true
 *
 * @param 旋转速度
 * @parent ---效果---
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧) 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0 
 *
 * @param 是否使用缩放效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 *
 * @param 缩放幅度
 * @parent 是否使用缩放效果
 * @desc 缩放的幅度，0.08表示图像大小的8%。
 * @default 0.08
 *
 * @param 缩放速度
 * @parent 是否使用缩放效果
 * @desc 缩放效果的速度。
 * @default 5.5
 *
 * @param 是否使用闪烁效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 * 
 * @param 闪烁速度
 * @parent 是否使用闪烁效果
 * @desc 闪烁效果的速度。
 * @default 7.0
 *
 * @param 是否使用漂浮效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 漂浮幅度
 * @parent 是否使用漂浮效果
 * @desc 上下漂浮的幅度，单位像素。
 * @default 6
 *
 * @param 漂浮速度
 * @parent 是否使用漂浮效果
 * @desc 漂浮效果的速度。
 * @default 12.5
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MDe（Mouse_Destination）
//		临时全局变量	DrillUp.g_MDe_xxx
//		临时局部变量	this._drill_MDe_xxx
//		存储数据变量	$gameSystem._drill_MDe_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理)
//		性能测试因素	乱跑
//		性能测试消耗	1.22ms（全图只有这一个sprite）
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			目的地指向标：
//				->目的地获取
//				->样式gif
//				->缩放效果/闪烁效果
//				->平滑移动
//				->淡出效果
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseDestination = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseDestination');
	
	DrillUp.g_MDe_visible = String(DrillUp.parameters['是否初始显示'] || 'true') === 'true';
	DrillUp.g_MDe_curStyle = Number(DrillUp.parameters['当前指向标'] || 0);
	
	DrillUp.g_MDe_list_length = 10;
	DrillUp.g_MDe_list = [];
	for (var i = 0; i < DrillUp.g_MDe_list_length; i++) {
		if( DrillUp.parameters['指向标-' + String(i+1) ] != "" ){
			DrillUp.g_MDe_list[i] = JSON.parse(DrillUp.parameters['指向标-' + String(i+1) ]);
			DrillUp.g_MDe_list[i]['src_img'] = JSON.parse(DrillUp.g_MDe_list[i]["资源-指向标GIF"] || []);
			DrillUp.g_MDe_list[i]['src_img_shadow'] = String(DrillUp.g_MDe_list[i]["资源-指向标阴影"] || "");
			DrillUp.g_MDe_list[i]['interval'] = Number(DrillUp.g_MDe_list[i]["帧间隔"] || 4);
			DrillUp.g_MDe_list[i]['back_run'] = String(DrillUp.g_MDe_list[i]["是否倒放"] || "false") === "true";
			DrillUp.g_MDe_list[i]['x'] = Number(DrillUp.g_MDe_list[i]["偏移-指向标 X"] || 0);
			DrillUp.g_MDe_list[i]['y'] = Number(DrillUp.g_MDe_list[i]["偏移-指向标 Y"] || 0);
			DrillUp.g_MDe_list[i]['opacity'] = Number(DrillUp.g_MDe_list[i]["透明度"] || 255);
			DrillUp.g_MDe_list[i]['blendMode'] = Number(DrillUp.g_MDe_list[i]["混合模式"] || 0);
			DrillUp.g_MDe_list[i]['src_bitmaps'] = [];
			
			DrillUp.g_MDe_list[i]['movement_enable'] = String(DrillUp.g_MDe_list[i]["是否使用平滑运动"] || "true") === "true";
			DrillUp.g_MDe_list[i]['fade_enable'] = String(DrillUp.g_MDe_list[i]["是否使用淡出效果"] || "true") === "true";
			DrillUp.g_MDe_list[i]['rotate'] = Number(DrillUp.g_MDe_list[i]["旋转速度"] || 0);
			DrillUp.g_MDe_list[i]['zoom_enable'] = String(DrillUp.g_MDe_list[i]["是否使用缩放效果"] || "false") === "true";
			DrillUp.g_MDe_list[i]['zoom_range'] = Number(DrillUp.g_MDe_list[i]["缩放幅度"] || 0.08);
			DrillUp.g_MDe_list[i]['zoom_speed'] = Number(DrillUp.g_MDe_list[i]["缩放速度"] || 5.5);
			DrillUp.g_MDe_list[i]['flash_enable'] = String(DrillUp.g_MDe_list[i]["是否使用闪烁效果"] || "false") === "true";
			DrillUp.g_MDe_list[i]['flash_speed'] = Number(DrillUp.g_MDe_list[i]["闪烁速度"] || 7.0);
			DrillUp.g_MDe_list[i]['float_enable'] = String(DrillUp.g_MDe_list[i]["是否使用漂浮效果"] || "true") === "true";
			DrillUp.g_MDe_list[i]['float_range'] = Number(DrillUp.g_MDe_list[i]["漂浮幅度"] || 6);
			DrillUp.g_MDe_list[i]['float_speed'] = Number(DrillUp.g_MDe_list[i]["漂浮速度"] || 12.5);
		}else{
			DrillUp.g_MDe_list[i] = null;
		}
	}

//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapUiMouse = function(filename) {
    return this.loadBitmap('img/Map__ui_mouse/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MDe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MDe_pluginCommand.call(this, command, args);
	
	if (command === ">目的地指向标")  {
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示" ){
				$gameSystem._drill_MDe_visible = true;
			}
			if( type == "隐藏" ){
				$gameSystem._drill_MDe_visible = false;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换样式"){
				$gameSystem._drill_MDe_tarStyle = Number(temp1);
			}
		}
	};
};

//=============================================================================
// * 存储数据初始化
//=============================================================================
var _drill_MDe_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MDe_system_initialize.call(this);
	this._drill_MDe_visible = DrillUp.g_MDe_visible;			//显示状态
	this._drill_MDe_curStyle = 0;								//当前样式
	this._drill_MDe_tarStyle = DrillUp.g_MDe_curStyle;			//
};	

//=============================================================================
// ** 图层
//=============================================================================
//==============================
// * 图层 - 创建目的地
//==============================
var _drill_MDe_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MDe_createDestination.call(this);
	this.drill_MDe_createDestination();
};
Spriteset_Map.prototype.drill_MDe_createDestination = function() {
	if( this._destinationSprite ){this._tilemap.removeChild( this._destinationSprite ); }		//优化（重复创建需要去掉原来的）
	$gameSystem._drill_MDe_curStyle = $gameSystem._drill_MDe_tarStyle;
	if( $gameSystem._drill_MDe_curStyle == 0 ){
		// > rmmv默认样式
		this._destinationSprite = new Sprite_Destination();
		this._destinationSprite.z = 9;
		this._tilemap.addChild(this._destinationSprite);
	}else{
		// > 插件的贴图样式
		this._destinationSprite = new Drill_MDe_DestSprite();
		this._destinationSprite.z = 9;
		this._tilemap.addChild(this._destinationSprite);
	}
}
//==============================
// * 图层 - 刷新重建
//==============================
var _drill_MDe_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_MDe_update.call(this);
	
	// > 切换控制
	if( $gameSystem._drill_MDe_curStyle == 0 &&
		$gameSystem._drill_MDe_tarStyle != 0){
		this.drill_MDe_createDestination();
	}
	if( $gameSystem._drill_MDe_curStyle != 0 &&
		$gameSystem._drill_MDe_tarStyle == 0){
		this.drill_MDe_createDestination();
	}
	$gameSystem._drill_MDe_curStyle = $gameSystem._drill_MDe_tarStyle;
	
	// > 显示控制
	if( this._destinationSprite && $gameSystem._drill_MDe_visible == false){
		this._destinationSprite.visible = false;
	}
}


//=============================================================================
// ** 目的地贴图
//=============================================================================
//==============================
// * 贴图 - 定义
//==============================
function Drill_MDe_DestSprite() {
	this.initialize.apply(this, arguments);
}
Drill_MDe_DestSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_MDe_DestSprite.prototype.constructor = Drill_MDe_DestSprite;

//==============================
// * 贴图 - 初始化
//==============================
Drill_MDe_DestSprite.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._drill_time = 0;							//持续时间
	this._drill_data = null;						//样式数据
	this._drill_curStyle = -1;						//当前样式
	this._drill_destX = 0;							//缓存坐标x
	this._drill_destY = 0;							//缓存坐标y
	this._drill_curX = 0;							//平滑运动 - 当前坐标x
	this._drill_curY = 0;							//平滑运动 - 当前坐标y
	this._drill_MDe_sprite = null;					//指针贴图
	this._drill_MDe_shadow = null;					//指针阴影
};
//==============================
// * 贴图 - 帧刷新
//==============================
Drill_MDe_DestSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	this._drill_time += 1;
	
	if( this._drill_curStyle != $gameSystem._drill_MDe_curStyle ){	//重刷结构
		this._drill_curStyle = $gameSystem._drill_MDe_curStyle;
		this.drill_MDe_refreshAll();
	}
	if( this.visible == false ){ return; }			//未显示，不刷新
	if( this._drill_data == null ){ return; }		//未载入，不刷新
	
	this.drill_MDe_updatePosition();				//位置
	this.drill_MDe_updateGif();						//播放gif
	this.drill_MDe_updateEffects();					//效果控制
	this.drill_MDe_updateFade();					//淡出效果
};
//==============================
// * 帧刷新 - 重刷结构
//==============================
Drill_MDe_DestSprite.prototype.drill_MDe_refreshAll = function() {
	
	// > 载入data
	var temp = DrillUp.g_MDe_list[ this._drill_curStyle - 1 ];
	if( !temp ){ return; }
	this._drill_data = JSON.parse(JSON.stringify( temp ));
	
	// > 建立sprite
	var temp_sprite = new Sprite();
	var temp_sprite_data = this._drill_data;
	for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
		temp_sprite_data['src_bitmaps'].push(ImageManager.load_MapUiMouse(temp_sprite_data['src_img'][j]));
	}
	temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = temp_sprite_data['x'];
	temp_sprite.y = temp_sprite_data['y'];
	temp_sprite.opacity = temp_sprite_data['opacity'];
	temp_sprite.blendMode = temp_sprite_data['blendMode'];
	
	// > 建立阴影
	var temp_shadow = new Sprite();
	temp_shadow.bitmap = ImageManager.load_MapUiMouse(temp_sprite_data['src_img_shadow']);
	temp_shadow.anchor.x = 0.5;
	temp_shadow.anchor.y = 0.5;
	temp_shadow.x = temp_sprite_data['x'];
	temp_shadow.y = temp_sprite_data['y'];
	temp_shadow.opacity = temp_sprite_data['opacity'];
	temp_shadow.blendMode = temp_sprite_data['blendMode'];
	
	// > 重添sprite
	if( this._drill_MDe_sprite ){this.removeChild( this._drill_MDe_sprite ); }
	if( this._drill_MDe_shadow ){this.removeChild( this._drill_MDe_shadow ); }
	this._drill_MDe_sprite = temp_sprite;
	this._drill_MDe_shadow = temp_shadow
	this.addChild(temp_shadow);
	this.addChild(temp_sprite);
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_MDe_DestSprite.prototype.drill_MDe_updatePosition = function() {
	var data = this._drill_data;
    var tileWidth = $gameMap.tileWidth();
    var tileHeight = $gameMap.tileHeight();
	
	if( data['movement_enable'] != true ){
		// > 不移动
		if( $gameTemp.destinationX() != null &&
			$gameTemp.destinationY() != null ){
			this._drill_destX = $gameTemp.destinationX();
			this._drill_destY = $gameTemp.destinationY();
		}
		var xx = ($gameMap.adjustX(this._drill_destX) + 0.5) * tileWidth;
		var yy = ($gameMap.adjustY(this._drill_destY) + 0.5) * tileHeight;
		this.x = xx;
		this.y = yy;
	}else{	
		// > 平滑运动
		if( $gameTemp.destinationX() != null &&
			$gameTemp.destinationY() != null ){
			if( this._drill_destX != $gameTemp.destinationX() ||
				this._drill_destY != $gameTemp.destinationY() ){
				// > 目标变化
				if( data['fade_enable'] == true ){
					if( this.opacity <= 0 ){
						this._drill_curX = $gamePlayer.x;
						this._drill_curY = $gamePlayer.y;
					}
				}else{
					if( this.visible == false ){
						this._drill_curX = $gamePlayer.x;
						this._drill_curY = $gamePlayer.y;
					}
				}
			}
			this._drill_destX = $gameTemp.destinationX();
			this._drill_destY = $gameTemp.destinationY();
		}
		
		// > 平滑运动 - 弹性公式
		this._drill_curX += (this._drill_destX - this._drill_curX)/5;
		this._drill_curY += (this._drill_destY - this._drill_curY)/5;
		if( Math.abs(this._drill_destX - this._drill_curX) < 0.05 ){ this._drill_curX = this._drill_destX; }
		if( Math.abs(this._drill_destY - this._drill_curY) < 0.05 ){ this._drill_curY = this._drill_destY; }
		
		var xx = ($gameMap.adjustX( this._drill_curX ) + 0.5) * tileWidth;	//注意结果必须adjust，用于适配镜头
		var yy = ($gameMap.adjustY( this._drill_curY ) + 0.5) * tileHeight;
		this.x = xx;
		this.y = yy;
	}
};
//==============================
// * 帧刷新 - 播放gif
//==============================
Drill_MDe_DestSprite.prototype.drill_MDe_updateGif = function() {
	if(!this._drill_data ){ return; }
	if(!this._drill_MDe_sprite ){ return; }
	
	var t_gif = this._drill_MDe_sprite;
	var t_gif_data = this._drill_data;
	
	// > 播放gif
	t_gif._time += 1;
	var inter = this._drill_time ;
	inter = inter / t_gif_data['interval'];
	inter = inter % t_gif_data['src_bitmaps'].length;
	if(t_gif_data['back_run']){
		inter = t_gif_data['src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	t_gif.bitmap = t_gif_data['src_bitmaps'][inter];
	t_gif.rotation += t_gif_data['rotate'];
	
}
//==============================
// * 帧刷新 - 效果控制
//==============================
Drill_MDe_DestSprite.prototype.drill_MDe_updateEffects = function() {
	if(!this._drill_data ){ return; }
	var data = this._drill_data;
	
	// > 缩放效果
	if( data['zoom_enable'] == true ){
		var zoom_range = data['zoom_range'];
		var zoom_speed = data['zoom_speed'];
		var scale_value = 1 + zoom_range * Math.cos( this._drill_time*zoom_speed /180*Math.PI );
		this.scale.x = scale_value;
		this.scale.y = scale_value;
	}
	
	// > 闪烁效果
	if( data['flash_enable'] == true && this._drill_MDe_sprite ){
		var flash_speed = data['flash_speed'];
		this._drill_MDe_sprite.opacity = data['opacity']/2 + data['opacity']/2 * Math.cos( this._drill_time*flash_speed /180*Math.PI );
	}
	
	// > 漂浮效果
	if( data['float_enable'] == true && this._drill_MDe_sprite ){
		var float_range = data['float_range'];
		var float_speed = data['float_speed'];
		this._drill_MDe_sprite.y = data['y'] + float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
	}
}

//==============================
// * 帧刷新 - 淡出效果
//==============================
Drill_MDe_DestSprite.prototype.drill_MDe_updateFade = function() {
	if(!this._drill_data ){ return; }
	var data = this._drill_data;
	
	if( data['fade_enable'] == true ){
		if( $gameTemp.isDestinationValid() ){
			this.opacity = 255;
		}else{
			this.opacity = this.opacity - 15;
		}
	}else{
		if( $gameTemp.isDestinationValid() ){
			this.visible = $gameSystem._drill_MDe_visible;
		}else{
			this.visible = false;
		}
	}
}
