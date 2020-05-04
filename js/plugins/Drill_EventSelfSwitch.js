//=============================================================================
// Drill_EventSelfSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        物体 - 独立开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventSelfSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以通过设置事件拥有更多的独立开关，并操作独立开关。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.独立开关可以通过注释设置<<出现条件>>。
 *   你需要注意事件页是否有这个指令。
 * 3.详细机制可以去看看"独立开关与事件页.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 设置
 * 要设置更多的独立开关，直接在指定页添加下面的注释即可：
 * 
 * 事件注释：<<出现条件>> : 独立开关 : A1 : 为NO
 * 事件注释：<<出现条件>> : 独立开关 : A2 : 为NO
 * 事件注释：<<出现条件>> : 独立开关 : E : 为NO
 * 事件注释：<<出现条件>> : 独立开关 : F : 为NO
 * 
 * 1.由于注释修改的是"出现条件"，指令特殊，所以与其他注释有区别。
 * 2.开关后面的字符串是完全自定义的字符串，ABCD是标准的原开关设置。
 * 3.如果注释与独立开关设置同时存在，注释会覆盖设置。
 *   并且该注释写多个没有效果，只认准第一个注释。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 使用
 * 要设置开启指定的独立开关，直接使用插件指令即可：
 * 
 * 插件指令：>独立开关 : E : 开启
 * 插件指令：>独立开关 : F : 关闭
 * 插件指令：>独立开关 : G : 获取值 : 开关[21]
 *
 * 1.指令只作用于本事件，并且对默认独立开关A、B、C、D也有效果。
 * 2."获取值"表示，将独立开关NO/OFF情况，赋值给指定的 开关 。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你还可以通过插件指令控制其他独立开关：
 * 
 * 插件指令：>指定事件的独立开关 : 1 : E : 开启
 * 插件指令：>指定事件的独立开关 : 1 : F : 关闭
 * 
 * 插件指令：>指定事件的独立开关 : 1,2,3,4,5 : A : 开启
 *
 * 1.数字对应了当前地图的事件的id。
 * 2.你可以用逗号隔开，表示多个事件的id，批量控制。
 * 3.该插件指令不建议放在并行事件中频繁使用，因为频繁去干扰其它事件的独立开关，
 *   容易造成游戏卡顿。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   以正常流程进行游戏，查看插件消耗情况。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.单次执行的插件几乎没有消耗，因为计算次数太少。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了批量操作事件独立开关的插件指令。
 * [v1.2]
 * 优化了内部结构。
 * [v1.3]
 * 添加了插件性能说明。
 * [v1.4]
 * 优化了指令设置，添加了获取值功能。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESS（Event_Self_Switch）
//		临时全局变量	无
//		临时局部变量	无（直接操作）
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		单次执行
//		时间复杂度		o(n)
//		性能测试因素	任意地图
//		性能测试消耗	5ms以下
//		最坏情况		暂无
//
//插件记录：
//		★大体框架与功能如下：
//			独立开关：
//				->多个独立开关
//				->控制独立开关快速指令
//				->分支条件脚本		x
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.原理精确定位了，就比较好写。直接在地图读取的时候对所有注释遍历。
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventSelfSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventSelfSwitch');

	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ESS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ESS_pluginCommand.call(this, command, args);
	if (command === '>独立开关') {		//>独立开关 : E : 开启
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "开启" ){
				var key = [this._mapId, this._eventId, temp1 ];
				$gameSelfSwitches.setValue(key,true);
			}
			if( type == "关闭" ){
				var key = [this._mapId, this._eventId, temp1 ];
				$gameSelfSwitches.setValue(key,false);
			}
		}
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "获取值" && temp3.indexOf("开关[") != -1 ){
				var key = [this._mapId, this._eventId, temp1 ];
				var value_ = $gameSelfSwitches.value(key);
				temp3 = temp3.replace("开关[","");
				temp3 = temp3.replace("]","");
				$gameSwitches.setValue( Number(temp3), value_);
			}
		}
	}
	if (command === '>指定事件的独立开关') {
		if(args.length == 6){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( !temp1.contains(",") && !temp1.contains("，") ){
				if( temp3 == "开启" ){
					var key = [this._mapId, Number(temp1), temp2 ];
					$gameSelfSwitches.setValue(key,true);
				}else{
					var key = [this._mapId, Number(temp1), temp2 ];
					$gameSelfSwitches.setValue(key,false);
				}
			}else{
				var need_reflash = false;
				var ids = temp1.split(/[,，]/);
				for(var i = 0; i<ids.length; i++){
					if( temp3 == "开启" ){
						var s_key = [this._mapId, Number(ids[i]), temp2 ];
						if( $gameSelfSwitches.value(s_key) !== true){
							$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
							need_reflash = true;
						}
					}else{
						var s_key = [this._mapId, Number(ids[i]), temp2 ];
						if( $gameSelfSwitches.value(s_key) !== false){
							$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
							need_reflash = true;
						}
					}
				}
				if(need_reflash){
					$gameMap.requestRefresh();	//变化后手动刷新
				}
			}
		}
	}
};

//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};

//==============================
// * 独立开关
//==============================
var _drill_ESS_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	//该位置$dataMap数据正好载入完全，在这里重刷独立开关
	for( var i in $dataMap.events ){
		var e = $dataMap.events[i];
		if ( e ) { for( var j in e.pages ){
			var page = e.pages[j];
			if ( page ) { for( var k in page.list ){
				var l = page.list[k];
				if (l.code === 108) {
					var args = l.parameters[0].split(' ');
					var command = args.shift();
					if (command == "=>独立开关为ON条件"){	//=>独立开关为ON条件 : A
						if(args.length == 2){
							var temp1 = String(args[1]);
							page.conditions.selfSwitchValid = true;
							page.conditions.selfSwitchCh = temp1;
							break;
						}
					};
					if (command == "<<出现条件>>"){	//<<出现条件>> : 独立开关 : A2 : 为NO
						if(args.length == 6){
							var type = String(args[1]);
							var temp2 = String(args[3]);
							var temp3 = String(args[5]);
							if( type == "独立开关" && temp3 == "为NO" ){	
								page.conditions.selfSwitchValid = true;
								page.conditions.selfSwitchCh = temp2;
								break;
							}
						}
					}
				};
			}};
		}}
	}
	_drill_ESS_onMapLoaded.call(this);
};

