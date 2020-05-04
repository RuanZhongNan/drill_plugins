//=============================================================================
// Drill_LayerUpperBlock.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 上层图块四通行阻碍
 * @author Drill_up
 * 
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerUpperBlock +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得在角色上方的图块（*图块）的四通行设置起效，能阻挡角色穿过。
 * 原rmmv设置*图块后，四通行无法阻挡角色。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 图块设置 。
 * 2.插件 ON 则直接生效。
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
 * 测试方法：   去地图管理层，建立一堆上方图块的围栏。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.该插件只改了一个识别条件，所以性能几乎没有变化。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件性能测试说明。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LUB （Layer_Upper_Block）
//		临时全局变量	DrillUp.xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_Map.prototype.checkPassage
//
//		工作类型		持续执行
//		时间复杂度		o(n)
//		性能测试因素	地图管理层跑步
//		性能测试消耗	未找到
//		最坏情况		无	
//
//插件记录：
//		★大体框架与功能如下：
//			上层图块：
//				->四通行阻碍
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.将判定换一下顺序就可以了。
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerUpperBlock = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerUpperBlock');


//==============================
// * 通行检查
//==============================
Game_Map.prototype.checkPassage = function(x, y, bit) {
    var flags = this.tilesetFlags();
    var tiles = this.allTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
        var flag = flags[tiles[i]];
        if ((flag & bit) === bit) // [x] Impassable
            return false;
        if ((flag & 0x10) !== 0)  // [*] No effect on passage
            continue;
        if ((flag & bit) === 0)   // [o] Passable
            return true;
    }
    return false;
};

