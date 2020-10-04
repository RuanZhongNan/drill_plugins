//=============================================================================
// Drill_EventForPlayer.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 玩家的事件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventForPlayer +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得某个事件时刻与玩家位置重合，并且能够跨地图，只对玩家进行相关
 * 触发响应动作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件必须依赖指定插件才能运行。
 * 基于：
 *   - Drill_EventDuplicator        物体-事件复制器★★v1.5及以上版本★★
 *     跨地图时，需要该插件才能复制事件。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于玩家。
 * 玩家事件：
 *   (1.插件将会创建一个完全与玩家一致的事件，可代替玩家执行
 *      一连串操作，相当于一个触发接收器。
 *   (2.玩家释放技能、召唤事件等，从逻辑上都不属于该插件的范围。
 *      你应该用事件复制器，在模板管理地图中进行复制使用。
 * 事件属性：
 *   (1.被绑定的事件的触发条件："确定键"，"玩家接近"，"事件接近"等
 *      将会完全失效，由于时刻跟随玩家，所以不能执行相关触发。
 *   (2.事件的独立开关开启后永久有效，可以跨地图，且不会被重置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 绑定
 * 你需要使用插件指令来将事件绑定到玩家：
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>玩家的事件 : 永久绑定到玩家 : 地图[21] : 事件名[玩家事件-伤害]
 * 
 * 1.事件名是唯一标识，不能绑定重复的事件名。
 * 2.绑定后是永久性的，无法解除，如果你要消除该事件，切换事件页为空事件页即可。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件操作
 * 你需要通过变量赋值的方式，获取到事件id：
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>玩家的事件 : 事件名[玩家事件-伤害] : 赋值事件id给变量 : 变量[10]
 * 
 * 1.由于进入不同的地图，事件变量id的值也不同，所以使用前，需要先赋值给变量。
 *   如果事件还没有被完全创建，则获得的变量值是-1。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你需要设置事件的被触发条件，使用下面事件注释：
 * （注意，冒号左右有空格）
 * 
 * 插件指令：>玩家的事件 : DEBUG显示当前的绑定情况
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   绑定了5个事件后，在地图之间来回穿梭。
 * 测试结果：   地图界面中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.玩家的事件不要绑定太多，最好不要超过10个，因为进入新地图后，
 *   事件会被新复制到地图中，增加地图事件的数量。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFP （Event_For_Player）
//		临时全局变量	DrillUp.g_EFP_xxx
//		临时局部变量	this._drill_EFP_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2) 每帧
//		性能测试因素	物体管理层、其他管理层穿梭
//		性能测试消耗	3.70ms
//		最坏情况		如果绑定了20个以上的事件，不仅给插件加大消耗，而且还给地图带来更多负担。
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			玩家的事件：
//				->绑定
//					->绑定事件名
//					->读取地图数据
//					->建立事件
//					->实时建立事件
//				->伴随属性
//					->独立开关永久跟随
//					->无视确定键
//
//		★必要注意事项：
//			1.
//			
//		★其它说明细节：
//			1.从原理实现上，就是复制一个事件然后绑定。
//			  只是由于附带条件太多，藕断丝连。事件id随时变，开关需要存储，所以关联在一起非常复杂。
//			
//		★存在的问题：
//			暂无


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventForPlayer = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventForPlayer');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventDuplicator ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EFP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFP_pluginCommand.call(this, command, args);
	if (command === ">玩家的事件") {
		if(args.length == 6){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			
			/*-----------------绑定------------------*/
			if( temp1 == "永久绑定到玩家" ){
				temp2 = temp2.replace("地图[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				temp3 = temp3.replace("事件名[","");
				temp3 = temp3.replace("]","");
				temp3 = String(temp3);
				var data = {
					'mapId': temp2,
					'eventName': temp3,
				}
				$gameSystem.drill_EFP_pushBind( data );
			}
			
			/*-----------------事件操作------------------*/
			if( temp1.indexOf("事件名[") ){
				temp1 = temp1.replace("事件名[","");
				temp1 = temp1.replace("]","");
				var e_id = -1;
				var e = $gameMap.drill_EFP_getCurMapEventDataByName( temp1 );
				if( e != null ){
					e_id = e._eventId;
				}
				
				if( temp2 == "赋值事件id给变量" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					$gameVariables.setValue( Number(temp3), e_id );
				}
				
			}
		}
		if(args.length == 2){
			var temp1 = String(args[1]);
			if( temp1 == "DEBUG显示当前的绑定情况" ){
				alert( JSON.stringify( $gameSystem._drill_EFP_bindTank ) );
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFP_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventForPlayer.js 物体 - 玩家的事件】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储数据初始化
//=============================================================================
//==============================
// * 初始化
//==============================
var _drill_EFP_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_EFP_System_initialize.call(this);
	this._drill_EFP_bindTank = [];			//绑定数据的容器
	this._drill_EFP_switchTank = [];		//绑定的独立开关容器
};
//==============================
// * 插入绑定
//==============================
Game_System.prototype.drill_EFP_pushBind = function( bind ) {
	
	// > 重复事件名不能插入
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_EFP_bindTank[i];
		if( temp_bind['eventName'] == bind['eventName'] ){
			return;
		}
	}
	this._drill_EFP_bindTank.push( bind );
	this._drill_EFP_switchTank.push( {} );
};


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_EFP_map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	_drill_EFP_map_initialize.call( this );
	
	this._drill_EFP_time = 0;			//时间
	this._drill_EFP_eventTank = [];		//事件对象容器（与gameSystem的数据下标一一对应）
	this._drill_EFP_dataTank = [];		//绑定数据容器（与gameSystem的数据下标一一对应）
}
//==============================
// * 地图 - 切换地图
//==============================
var _drill_EFP_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_EFP_map_setup.call( this,mapId );
	this.drill_EFP_setupMap( mapId );
}
Game_Map.prototype.drill_EFP_setupMap = function( mapId ){
	
	// > 容器置零
	this._drill_EFP_eventTank = [];
	this._drill_EFP_dataTank = [];
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var cur_bind = JSON.parse(JSON.stringify(  $gameSystem._drill_EFP_bindTank[i] ));
		cur_bind['created'] = false;	//（延迟创建）
		this._drill_EFP_eventTank[i] = null;
		this._drill_EFP_dataTank[i] = cur_bind;
	}
	
	// > 预加载 - 标记地图id
	var temp_map = {};
	for(var i=0; i < $gameSystem._drill_EFP_bindTank.length; i++ ){
		var bind = $gameSystem._drill_EFP_bindTank[i];
		temp_map[ bind['mapId'] ] = true;
	}
	// > 预加载 - 加载数据
	for( var key in temp_map ){
		if( $gameTemp.drill_EDu_hasMapId( key ) == false ){
			alert(
				"【Drill_EventForPlayer.js 物体 - 玩家的事件】\n" + 
				"插件指令指定要复制地图"+ key +"中的某个事件。\n"+
				"但是系统并没有找到这个地图文件。\n"+
				"请检查你的地图文件是否存在，或者修改插件指令。"
			);
		}
		DataManager.drill_loadMapData( key );
	}
}

//==============================
// * 地图 - 帧刷新
//==============================
var _drill_EFP_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EFP_map_update.call( this,sceneActive );
	if( sceneActive ){
		this._drill_EFP_time += 1;
		
		this.drill_EFP_updateBindRealTime();		//实时新建绑定
		this.drill_EFP_updateCreate();				//延迟创建事件
		
		this.drill_EFP_updateEventLocks();			//锁定事件数据
	}
}
//==============================
// * 帧刷新 - 实时新建绑定
//==============================
Game_Map.prototype.drill_EFP_updateBindRealTime = function(){
	if( this._drill_EFP_dataTank.length < $gameSystem._drill_EFP_bindTank.length ){
		
		// > 添加新绑定
		var new_index = this._drill_EFP_dataTank.length;
		var cur_bind = JSON.parse(JSON.stringify( $gameSystem._drill_EFP_bindTank[ new_index ] ));
		cur_bind['created'] = false;
		this._drill_EFP_eventTank[ new_index ] = null;
		this._drill_EFP_dataTank[ new_index ] = cur_bind;
		
		// > 预加载地图
		DataManager.drill_loadMapData( cur_bind['mapId'] );
	}
}
//==============================
// * 帧刷新 - 延迟创建事件
//==============================
Game_Map.prototype.drill_EFP_updateCreate = function(){
	if( this._drill_EFP_time % 10 != 0 ){ return; }		//延迟10帧创建
	
	for( var i=0; i < this._drill_EFP_dataTank.length; i++ ){
		var cur_bind = this._drill_EFP_dataTank[i];
		if( cur_bind['created'] == false ){
			
			// > 获取事件数据
			var e_data = this.drill_EFP_getTarMapEventDataByName( cur_bind['mapId'], cur_bind['eventName'] );
			if( e_data == null ){
				continue;
			}
			
			// > 根据数据生成事件对象
			var e = this.drill_newEvent_createEvent( e_data );
		
			// > 记录上一个id
			$gameSystem._drill_EDu_last_id = e._eventId;
			
			// > 独立开关取出值
			var switch_data = $gameSystem._drill_EFP_switchTank[i];
			var switch_keys = Object.keys(switch_data);
			for(var j=0; j < switch_keys.length; j++ ){
				var key = switch_keys[j];
				if( switch_data[ key ] == true ){
					var s_key = [ this._mapId, e._eventId, key ];
					$gameSelfSwitches._data[s_key] = true;
				}
			}
			
			cur_bind['created'] = true;
			this._drill_EFP_eventTank[i] = e;
		}
	}
}
//==============================
// * 帧刷新 - 锁定事件数据
//==============================
Game_Map.prototype.drill_EFP_updateEventLocks = function(){
	for( var i=0; i < this._drill_EFP_eventTank.length; i++ ){
		var e = this._drill_EFP_eventTank[i];
		if( e == null ){ continue; }
		
		e._x = $gamePlayer._x;						//坐标x
		e._y = $gamePlayer._y;						//坐标y
		e._realX = $gamePlayer._realX;				//小数坐标x
		e._realY = $gamePlayer._realY;				//小数坐标y
		e._direction = $gamePlayer._direction;		//朝向
		e._pattern = $gamePlayer._pattern;			//帧数
		e._through = true;							//强制穿透
		if( e._trigger === 0 || e._trigger === 1 || e._trigger === 2 ){	//去掉 确定键/玩家接近/事件接近 的触发条件
			e._trigger = null;
		}
		
	}
}
//==============================
// * 地图 - 获取指定地图的事件数据（根据事件名）
//==============================
Game_Map.prototype.drill_EFP_getTarMapEventDataByName = function( mapId, eventName ) {
	if( this._mapId == mapId ){
		
		// > 本地图
		return this.drill_EFP_getCurMapEventDataByName( eventName );
		
	}else{
		
		// > 获取map文件
		var map_data = DataManager.drill_getMapData( mapId );
		if( map_data ){
			
			// > 获取事件数据
			for(var i = 0; i < map_data.events.length; i++ ){
				var e_data = map_data.events[i];
				if( e_data && e_data.name == eventName ){
					return e_data;
				}
			}
			alert(
				"【Drill_EventForPlayer.js 物体 - 玩家的事件】\n" + 
				"插件指令指定的地图"+ mapId +"中，\n"+
				"并没有名称为 "+ eventName +" 的事件。"
			);
			return {};
			
		}else{
			
			return null;
		}
	}
}
//==============================
// * 地图 - 获取本地图的事件数据（根据事件名）
//==============================
Game_Map.prototype.drill_EFP_getCurMapEventDataByName = function( eventName ) {
	var events = this.events();
	for(var i = 0; i < events.length; i++ ){
		var e_data = events[i].event();
		if( e_data.name == eventName ){
			return e_data;
		}
	}
	return null;
}

//=============================================================================
// ** 独立开关
//=============================================================================
//==============================
// * 独立开关 - 赋值捕获
//==============================
var _drill_EFP_switch_setValue = Game_SelfSwitches.prototype.setValue;
Game_SelfSwitches.prototype.setValue = function( key, value ){
	_drill_EFP_switch_setValue.call( this, key, value );
	
	//（key的结构：[this._mapId, this._eventId, 'A' ]）
	if($gameMap._mapId === key[0]){
		
		for(var i=0; i < $gameMap._drill_EFP_eventTank.length; i++ ){
			var p_event = $gameMap._drill_EFP_eventTank[i];
			if( p_event != null && Number(key[1]) == Number(p_event._eventId) ){
				
				//（存入键值：{ 'A':true,'B':false } ）
				$gameSystem._drill_EFP_switchTank[i][ String(key[2]) ] = value;
			}
		}
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventForPlayer = false;
		alert(
			"【Drill_EventForPlayer.js 物体 - 玩家的事件】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_EventDuplicator 物体 - 事件复制器"
		);
}

