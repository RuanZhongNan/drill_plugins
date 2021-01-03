//=============================================================================
// Drill_MouseDragPicture.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        鼠标 - 可拖拽的图片
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseDragPicture +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以使得图片能够被鼠标拖拽。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件必须基于核心，并可以辅助扩展下列插件。
 * 基于：
 *   - Drill_CoreOfInput          系统 - 输入设备核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 2.详细内容可以去看看"关于鼠标拖拽图片.docx"。
 * 细节：
 *   (1.你必须先显示图片，再添加可拖拽属性，顺序不能反。
 *   (2.图片可以被鼠标拖移到任何地方，包括被拖移到游戏屏幕之外。
 *      可以使用插件指令使得拖走的图片归位。
 *   (3.当模式为"一张一张图片拖移"时，拖移的图片将会优先选择id值大的。
 * 设计：
 *   (1.如果你想让一张图片被拖移后，永久保持其位置状态。
 *      最好使用变量存储一下图片被拖拽的偏移量，可以防止在图片被销毁后，
 *      拖拽偏移量重新赋值。
 *   (2.图片可以在战斗界面中拖拽，但是战斗界面的事件指令都是串行执行的，
 *      所以获取到偏移量的反应会有延迟。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令控制拖拽绑定：
 * 
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 设置可拖拽
 * 插件指令：>鼠标拖拽图片 : 图片变量[1] : 设置可拖拽
 * 
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 设置可拖拽
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 设置不可拖拽
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 立即清零拖拽偏移量
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 获取拖拽偏移量X : 变量[1]
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 获取拖拽偏移量Y : 变量[1]
 * 
 * 1.前半部分（图片）和 后半部分（设置可拖拽）的参数可以随意组合。
 *   一共有2*5种组合方式。执行插件指令后，指定id的图片将会可拖拽。
 * 2.若执行了事件指令"消除图片"，图片的拖拽偏移量将会被清零。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你需要通过插件指令控制全局配置：
 * 
 * 插件指令：>鼠标拖拽图片 : 设置拖拽开关 : 鼠标左键开启
 * 插件指令：>鼠标拖拽图片 : 设置拖拽开关 : 鼠标左键关闭
 * 插件指令：>鼠标拖拽图片 : 设置拖拽开关 : 鼠标中键开启
 * 插件指令：>鼠标拖拽图片 : 设置拖拽开关 : 鼠标中键关闭
 * 插件指令：>鼠标拖拽图片 : 设置拖拽开关 : 鼠标右键开启
 * 插件指令：>鼠标拖拽图片 : 设置拖拽开关 : 鼠标右键关闭
 * 插件指令：>鼠标拖拽图片 : 设置拖拽模式 : 一张一张图片拖移
 * 插件指令：>鼠标拖拽图片 : 设置拖拽模式 : 可拖移多张聚在一起的图片
 * 
 * 1.全局配置与右侧的参数设置对应，你可以在游戏中开启或关闭鼠标拖拽
 *   的开关。
 * 2.当模式为"一张一张图片拖移"时，拖移的图片将会优先选择id值大的。
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
 * 时间复杂度： o(n^3) 每帧
 * 测试方法：   在对话管理层放置多张图片，进行多张拖拽。
 * 测试结果：   200个事件的地图中，平均消耗为：【24.15ms】
 *              100个事件的地图中，平均消耗为：【21.46ms】
 *               50个事件的地图中，平均消耗为：【17.08ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件中需要实时确定鼠标位置，并且监听鼠标的按下释放状态，
 *   同时，还需要获取多张图片的范围位置，不过总体来说消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * @param 鼠标左键是否可拖拽
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 鼠标中键是否可拖拽
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 鼠标右键是否可拖拽
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 拖拽模式
 * @type select
 * @option 一张一张图片拖移
 * @value 一张一张图片拖移
 * @option 可拖移多张聚在一起的图片
 * @value 可拖移多张聚在一起的图片
 * @desc 拖拽图片的设置。
 * @default 一张一张图片拖移
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MDP (Mouse_Drag_Picture)
//		临时全局变量	DrillUp.g_MDP_xxx
//		临时局部变量	this._drill_MDP_xxx
//		存储数据变量	$gameSystem._drill_MDP_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^3)  每帧
//		性能测试因素	对话管理层
//		性能测试消耗	17.08ms（Sprite_Picture的update） 
//		最坏情况		暂无
//		备注			能够稳定在10帧左右，去掉图片后，15帧左右。
//
//插件记录：
//		★大体框架与功能如下：
//			可拖拽的图片：（鼠标+触屏）
//				->地图点击拦截
//				->图片拖移
//				->每次只能拖移一张图片
//
//		★必要注意事项：
//			1.该插件使用了【图片容器】。
//
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseDragPicture = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseDragPicture');
	
	DrillUp.g_MDP_dragableLeft = String(DrillUp.parameters['鼠标左键是否可拖拽'] || "true") === "true";
	DrillUp.g_MDP_dragableMiddle = String(DrillUp.parameters['鼠标中键是否可拖拽'] || "true") === "true";
	DrillUp.g_MDP_dragableRight = String(DrillUp.parameters['鼠标右键是否可拖拽'] || "true") === "true";
	DrillUp.g_MDP_dragMode = String(DrillUp.parameters['拖拽模式'] || "一张一张图片拖移");


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MDP_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MDP_pluginCommand.call(this, command, args);
	if(command === ">鼠标拖拽图片"){
		
		if( args.length == 4 ){				//>鼠标拖拽图片 : 图片[1] : 设置可拖拽
			var pic_id = String(args[1]);
			var type = String(args[3]);
			
			var pic = null;
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_MDP_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_MDP_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			
			if( pic != null ){
				if( type == "设置可拖拽" ){
					pic._drill_MDP.canDrag = true;
					$gameTemp._drill_MDP_needRefresh = true;
				}
				if( type == "设置不可拖拽" ){
					pic._drill_MDP.canDrag = false;
					$gameTemp._drill_MDP_needRefresh = true;
				}
				if( type == "立即清零拖拽偏移量" ){
					pic._drill_MDP.isDragging = false;
					pic._drill_MDP.draging_x = 0;
					pic._drill_MDP.draging_y = 0;
					pic._drill_MDP.drag_movedX = 0;
					pic._drill_MDP.drag_movedY = 0;
				}
			}
		}
		
		/*-----------------对象组获取------------------*/
		if( args.length == 6 ){				//>鼠标拖拽图片 : 图片[1] : 获取拖拽偏移量X : 变量[1]
			var pic_id = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			
			var pic = null;
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_MDP_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_MDP_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			
			if( pic != null ){
				if( type == "获取拖拽偏移量X" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					$gameVariables.setValue( temp3, pic._drill_MDP.drag_movedX );
				}
				if( type == "获取拖拽偏移量Y" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					$gameVariables.setValue( temp3, pic._drill_MDP.drag_movedY );
				}
			}
		}
		
		/*-----------------拖拽配置------------------*/
		if( args.length == 4 ){				//>鼠标拖拽图片 : 设置拖拽开关 : 鼠标左键开启
			var pic_id = String(args[1]);
			var type = String(args[3]);
			
			if( pic_id == "设置拖拽开关" ){
				if( type == "鼠标左键开启" ){ $gameSystem._drill_MDP_dragableLeft = true; }
				if( type == "鼠标左键关闭" ){ $gameSystem._drill_MDP_dragableLeft = false; }
				if( type == "鼠标中键开启" ){ $gameSystem._drill_MDP_dragableMiddle = true; }
				if( type == "鼠标中键关闭" ){ $gameSystem._drill_MDP_dragableMiddle = false; }
				if( type == "鼠标右键开启" ){ $gameSystem._drill_MDP_dragableRight = true; }
				if( type == "鼠标右键关闭" ){ $gameSystem._drill_MDP_dragableRight = false; }
			}
			if( pic_id == "设置拖拽模式" ){
				$gameSystem._drill_MDP_dragMode = type;
			}
		}
	};
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_MDP_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_MouseDragPicture.js 鼠标 - 可拖拽的图片】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 存储数据变量初始化
//=============================================================================
var _drill_MDP_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_MDP_initialize.call(this);
	
	this._drill_MDP_dragableLeft = DrillUp.g_MDP_dragableLeft ;			//鼠标左键是否可拖拽
	this._drill_MDP_dragableMiddle = DrillUp.g_MDP_dragableMiddle ;		//鼠标中键是否可拖拽
	this._drill_MDP_dragableRight = DrillUp.g_MDP_dragableRight ;		//鼠标右键是否可拖拽
	this._drill_MDP_dragMode = DrillUp.g_MDP_dragMode ;					//拖拽模式
}

//=============================================================================
// ** 图片容器
//=============================================================================
//==============================
// * 图片容器 - 初始化
//==============================
var _drill_MDP_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MDP_temp_initialize.call(this);
	this._drill_MDP_sprites = [];				//图片贴图
	this._drill_MDP_needRefresh = true;			//刷新统计
};
//==============================
// * 图片容器 - 切换地图时
//==============================
var _drill_MDP_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_MDP_gmap_setup.call(this,mapId);
	//$gameTemp._drill_MDP_sprites = [];		//（切换地图不会刷 贴图数据）
	//$gameTemp._drill_MDP_needRefresh = true;
}
//==============================
// * 图片容器 - 切换贴图时（菜单界面刷新）（注意，这里对 地图界面+战斗界面 都有效）
//==============================
var _drill_MDP_sbase_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
	_drill_MDP_sbase_createPictures.call(this);
	$gameTemp._drill_MDP_sprites = [];
	$gameTemp._drill_MDP_needRefresh = true;
}
//==============================
// * 场景层 - 帧刷新
//==============================
var _drill_MDP_base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {	
	_drill_MDP_base_update.call(this);
	this.drill_MDP_refreshSpriteScan();		//刷新统计
};
//==============================
// ** 帧刷新 - 刷新统计
//==============================
Spriteset_Base.prototype.drill_MDP_refreshSpriteScan = function() {
	if( !$gameTemp._drill_MDP_needRefresh ){ return }
	$gameTemp._drill_MDP_needRefresh = false;
	
	for( var i=0; i < this._pictureContainer.children.length; i++ ){
		var temp_sprite = this._pictureContainer.children[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite instanceof Sprite_Picture == false ){ continue; }
		if( temp_sprite.picture() == undefined ){ continue; }
		
		if( temp_sprite.picture()._drill_MDP.canDrag == true ){
			temp_sprite.picture()._drill_MDP.isDragging == false;	//防止按住图片切菜单的情况
			$gameTemp._drill_MDP_sprites.push( temp_sprite );
		}
	}
}

//=============================================================================
// ** 地图点击拦截
//=============================================================================
//==============================
// * 拦截 - 点击监听
//==============================
var _drill_MDP_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_MDP_isOnPictureSprite() ){ return; }	//鼠标按下（阻止目的地+鼠标辅助面板）
	_drill_MDP_processMapTouch.call(this);
};
//==============================
// * 拦截 - 条件
//==============================
Scene_Map.prototype.drill_MDP_isOnPictureSprite = function() {	
	for(var i=0; i < $gameTemp._drill_MDP_sprites.length; i++){
		var sprite = $gameTemp._drill_MDP_sprites[i];
		if( this.drill_MDP_isOnRange( sprite ) ){
			return true;
		}
	}
	return false;	
};

//=============================================================================
// ** 地图界面点击捕获
//=============================================================================
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_MDP_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_MDP_map_update.call(this);
	this.drill_MDP_updatePicturePressCheck();		//判定图片按下
	this.drill_MDP_updatePictureReleaseCheck();		//判定图片释放
};
//==============================
// * 帧刷新 - 判定图片按下
//==============================
Scene_Map.prototype.drill_MDP_updatePicturePressCheck = function() {
	var drag_on = false;
	if( TouchInput.drill_isLeftTriggerd() && $gameSystem._drill_MDP_dragableLeft == true ){	//鼠标左键按下[一帧]
		drag_on = true;
	}
	if( TouchInput.drill_isMiddleTriggerd() && $gameSystem._drill_MDP_dragableMiddle == true ){	//鼠标中键按下[一帧]
		drag_on = true;
	}
	if( TouchInput.drill_isRightTriggerd() && $gameSystem._drill_MDP_dragableRight == true ){	//鼠标右键按下[一帧]
		drag_on = true;
	}
	
	if( drag_on == true ){
		for(var i=$gameTemp._drill_MDP_sprites.length-1; i >= 0; i--){	//（倒序）
			var temp_sprite = $gameTemp._drill_MDP_sprites[i];
			if( temp_sprite.picture() == undefined ){ continue; }
			if( this.drill_MDP_isOnRange( temp_sprite ) ){
				temp_sprite.picture()._drill_MDP.isDragging = true;
				
				if( $gameSystem._drill_MDP_dragMode == "一张一张图片拖移" ){
					break;
				}
			}
		}
	}
}
//==============================
// * 帧刷新 - 判定图片释放
//==============================
Scene_Map.prototype.drill_MDP_updatePictureReleaseCheck = function() {
	var drag_off = false;
	if( TouchInput.drill_isLeftReleased() && $gameSystem._drill_MDP_dragableLeft == true ){	//鼠标左键释放[一帧]
		drag_off = true;
	}
	if( TouchInput.drill_isMiddleReleased() && $gameSystem._drill_MDP_dragableMiddle == true ){	//鼠标中键释放[一帧]
		drag_off = true;
	}
	if( TouchInput.drill_isRightReleased() && $gameSystem._drill_MDP_dragableRight == true ){	//鼠标右键释放[一帧]
		drag_off = true;
	}
	
	if( drag_off == true ){
		for(var i=$gameTemp._drill_MDP_sprites.length-1; i >= 0; i--){	//（倒序）
			var temp_sprite = $gameTemp._drill_MDP_sprites[i];
			if( temp_sprite.picture() == undefined ){ continue; }
			
			temp_sprite.picture()._drill_MDP.isDragging = false;	//（释放鼠标，表示所有图片都需要去除拖拽中状态）
			//if( $gameSystem._drill_MDP_dragMode == "一张一张图片拖移" ){ break; }
		}
	}
}
//==============================
// * 地图 - 判断悬停
//==============================
Scene_Map.prototype.drill_MDP_isOnRange = function( sprite ){
	if( sprite == undefined ){ return false };
	if( sprite.bitmap == undefined ){ return false };
	var cw = sprite.bitmap.width;
	var ch = sprite.bitmap.height;
	var cx = sprite.x ;
	var cy = sprite.y ;
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( Imported.Drill_LayerCamera ){		//（镜头兼容）
		_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );
		_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );
	}
	if ( _x <  cx + 0  - cw*sprite.anchor.x ){ return false };
	if ( _x >= cx + cw - cw*sprite.anchor.x ){ return false };
	if ( _y <  cy + 0  - ch*sprite.anchor.y ){ return false };
	if ( _y >= cy + ch - ch*sprite.anchor.y ){ return false };
	return true;	
}


//=============================================================================
// ** 战斗界面点击捕获
//=============================================================================
//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_MDP_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_MDP_battle_update.call(this);
	this.drill_MDP_updatePicturePressCheck();		//判定图片按下
	this.drill_MDP_updatePictureReleaseCheck();		//判定图片释放
};
//==============================
// * 战斗 - 判定图片
//==============================
Scene_Battle.prototype.drill_MDP_updatePicturePressCheck = Scene_Map.prototype.drill_MDP_updatePicturePressCheck;
Scene_Battle.prototype.drill_MDP_updatePictureReleaseCheck = Scene_Map.prototype.drill_MDP_updatePictureReleaseCheck;
//==============================
// * 战斗 - 判断悬停
//==============================
Scene_Battle.prototype.drill_MDP_isOnRange = function( sprite ){
	if( sprite == undefined ){ return false };
	if( sprite.bitmap == undefined ){ return false };
	var cw = sprite.bitmap.width;
	var ch = sprite.bitmap.height;
	var cx = sprite.x ;
	var cy = sprite.y ;
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x <  cx + 0  - cw*sprite.anchor.x ){ return false };
	if ( _x >= cx + cw - cw*sprite.anchor.x ){ return false };
	if ( _y <  cy + 0  - ch*sprite.anchor.y ){ return false };
	if ( _y >= cy + ch - ch*sprite.anchor.y ){ return false };
	return true;	
}


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _drill_MDP_pic_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_MDP_pic_initialize.call(this);
	this._drill_MDP = {};
	this._drill_MDP.canDrag = false;			//可拖拽
	this._drill_MDP.isDragging = false;			//拖拽中
	this._drill_MDP.draggingLock = false;		//拖拽锁
	this._drill_MDP.dragLastMouseX = 0;			//开始拖拽时鼠标位置
	this._drill_MDP.dragLastMouseY = 0;			//
	this._drill_MDP.draging_x = 0;				//拖拽时鼠标位置
	this._drill_MDP.draging_y = 0;				//
	this._drill_MDP.drag_movedX = 0;			//拖拽后停留的位置
	this._drill_MDP.drag_movedY = 0;			//
	
	$gameTemp._drill_MDP_needRefresh = true;	//图片创建后，强制刷新（战斗界面中创建的图片）
}
//==============================
// * 图片 - 清理拖拽
//==============================
Game_Picture.prototype.drill_MDP_clearDrag = function() {
	this._drill_MDP.canDrag = false;			//可拖拽
	this._drill_MDP.isDragging = false;			//拖拽中
	this._drill_MDP.draggingLock = false;		//拖拽锁
	this._drill_MDP.dragLastMouseX = 0;			//开始拖拽时鼠标位置
	this._drill_MDP.dragLastMouseY = 0;			//
	this._drill_MDP.draging_x = 0;				//拖拽时鼠标位置
	this._drill_MDP.draging_y = 0;				//
	this._drill_MDP.drag_movedX = 0;			//拖拽后停留的位置
	this._drill_MDP.drag_movedY = 0;			//
	
	$gameTemp._drill_MTP_needRefresh = true;	//图片消除后，强制刷新
}
//==============================
// * 图片 - 图片移除时
//==============================
var _drill_MDP_pic_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_drill_MDP_pic_erase.call(this);
	this.drill_MDP_clearDrag();
}
//==============================
// * 图片 - 帧刷新
//==============================
var _drill_MDP_pic_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_drill_MDP_pic_update.call(this);
	this.drill_MDP_updateDrag();
}
//==============================
// * 图片 - 拖拽触发
//==============================
Game_Picture.prototype.drill_MDP_updateDrag = function() {
	if( this._drill_MDP.canDrag != true ){ return; }
	
	if( this._drill_MDP.isDragging == true ){
		
		// > 刚刚点击拖拽
		if( this._drill_MDP.draggingLock == false ){
			this._drill_MDP.draggingLock = true;
			this.drill_MDP_dragStarting();
		}
		
		// > 拖拽偏移
		this._drill_MDP.draging_x = _drill_mouse_x - this._drill_MDP.dragLastMouseX;
		this._drill_MDP.draging_y = _drill_mouse_y - this._drill_MDP.dragLastMouseY;
		
	}else{
		
		// > 刚刚结束拖拽
		if( this._drill_MDP.draggingLock == true ){
			this._drill_MDP.draggingLock = false;
			this.drill_MDP_dragEnding();
		}
	}
}
//==============================
// * 图片 - 刚刚点击拖拽时（接口，继承用）
//==============================
Game_Picture.prototype.drill_MDP_dragStarting = function() {
	this._drill_MDP.dragLastMouseX = _drill_mouse_x;
	this._drill_MDP.dragLastMouseY = _drill_mouse_y;
}
//==============================
// * 图片 - 刚刚结束拖拽时（接口，继承用）
//==============================
Game_Picture.prototype.drill_MDP_dragEnding = function() {
	this._drill_MDP.drag_movedX += this._drill_MDP.draging_x;
	this._drill_MDP.drag_movedY += this._drill_MDP.draging_y;
	this._drill_MDP.draging_x = 0;
	this._drill_MDP.draging_y = 0;
}
//==============================
// * 图片 - 获取拖拽的偏移量X（接口，可实时调用）
//		
//			说明：任何情况下，拖拽所产生的实际偏移量X。（用于定位拖拽偏移位置）
//==============================
Game_Picture.prototype.drill_MDP_getDraggingXOffset = function(){
	return this._drill_MDP.draging_x + this._drill_MDP.drag_movedX;
}
//==============================
// * 图片 - 获取拖拽的偏移量Y（接口，可实时调用）
//		
//			说明：任何情况下，拖拽所产生的实际偏移量Y。（用于定位拖拽偏移位置）
//==============================
Game_Picture.prototype.drill_MDP_getDraggingYOffset = function(){
	return this._drill_MDP.draging_y + this._drill_MDP.drag_movedY;
}


//=============================================================================
// ** 图片贴图
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_MDP_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    _drill_MDP_sp_initialize.call(this,pictureId);
	// ...暂无
}
//==============================
// * 图片贴图 - 固定帧初始值
//==============================
var _Drill_MDP_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_MDP_sp_update.call(this);	
    //this.updateBitmap();								// 贴图资源
	//this.updateOrigin();								// 圆心x、圆心y
	//this.updatePosition();							// x、y
	//this.updateScale();								// 缩放x、缩放y
	//this.updateTone();								// 色调
	//this.updateOther();								// 透明度、混合模式、旋转
	if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
	if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
};
//==============================
// * 图片贴图 - 帧刷新
//==============================
var _Drill_MDP_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_MDP_sp_update2.call(this);
	if( this.picture() ){
		this.update_MDP_position();			//刷新贴图位置
	}
};
//==============================
// * 帧刷新 - 刷新拖拽贴图位置
//==============================
Sprite_Picture.prototype.update_MDP_position = function() {
	this.x += this.picture().drill_MDP_getDraggingXOffset();		//拖拽产生的偏移量X
	this.y += this.picture().drill_MDP_getDraggingYOffset();		//拖拽产生的偏移量Y
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseDragPicture = false;
		alert(
			"【Drill_MouseDragPicture.js 鼠标 - 可拖拽图片】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"
		);
}

