//=============================================================================
// Drill_CoreOfShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 方块粉碎核心
 * @author Drill_up
 * 
 * @Drill_LE_param "方块粉碎-%d"
 * @Drill_LE_parentKey "---方块粉碎组%d至%d---"
 * @Drill_LE_var "DrillUp.g_COSE_style_list_length"
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件为基础核心，单独使用没有效果。
 * 想要更多了解方块粉碎，可以去看看"方块粉碎大家族.docx"。
 * ★★尽量放在最靠上的位置★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础插件，但是要基于核心才能运行：
 * 基于：
 *   - Drill_CoreOfBallistics       系统 - 弹道核心
 * 作用于：
 *   - Drill_BattleShatterEffect    战斗 - 方块粉碎效果
 *   - Drill_LayerShatterEffect     地图 - 方块粉碎效果
 *   - Drill_EventShatterEffect     行走图 - 方块粉碎效果
 *   - Drill_PictureShatterEffect   图片 - 方块粉碎效果
 *   - Drill_DialogShatterEffect    对话框 - 方块粉碎效果
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于贴图。
 * 碎片：
 *   (1.碎片的数量 = 切割矩阵列数 x 切割矩阵行数。
 *      数量太多可能会轻微影响性能。
 *   (2.碎片的发射、扩散轨迹完全可以通过弹道设置进行设计。
 *      你还可以设置使用插件指令控制反向弹道。
 *      具体配置方式可以看看"关于弹道.docx"。
 *   (3.原理为：将指定的图片根据行数列数切割成n块碎片。
 *      碎片编号为0至n-1，依次赋予弹道。
 *      如果弹道的随机值差异不大，则碎片散开的差异也不会很大。
 * 比例粉碎：
 *   (1.所有碎片，除了波动量设置，基本上速度都几乎一样。
 *      比如线性粉碎配置，你能够清晰地看到一个圆向外扩散的样子。
 *      因为所有碎片的速度都几乎一样。
 *   (2.而比例粉碎，最外面碎片的速度最快，里面的速度较慢。
 *      通过设置 "碎片速度是否分比例" 可以使得碎片里外的速度不一样。
 *   (3.碎片数量少时，比例扩散的直观感受不大。
 *      而碎片很多时，会有较明显的效果。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   无法测出具体值，需要根据基于该核心的子插件来判断。
 * 测试结果：   无
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了一些细节bug。
 * [v1.2]
 * 添加了碎片 比例扩散 的功能。
 * 
 * 
 * @param ---方块粉碎组 1至20---
 * @desc 
 * 
 * @param 方块粉碎-1
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-规则圆扩散==","切割矩阵行数":"7","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"80\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"3.0\",\"速度随机波动量\":\"0.5\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-2
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-规则半圆扩散==","切割矩阵行数":"7","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"80\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"2.5\",\"速度随机波动量\":\"0.5\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"扇形范围方向(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"-90.0\",\"扇形角度\":\"180.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-3
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-普通扩散==","切割矩阵行数":"7","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"90\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"1.8\",\"速度随机波动量\":\"3.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(随机)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-4
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-普通半圆扩散==","切割矩阵行数":"7","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"90\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"1.8\",\"速度随机波动量\":\"3.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"扇形范围方向(随机)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"-90.0\",\"扇形角度\":\"180.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-5
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-抖动扩散==","切割矩阵行数":"5","切割矩阵列数":"5","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"80\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"1.0\",\"速度随机波动量\":\"1.6\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(抖动)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-6
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-碎片抖动==","切割矩阵行数":"6","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==随机抖动==\",\"移动时长\":\"120\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"路程计算公式\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return Math.random() * 4\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-7
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-减速扩散-小==","切割矩阵行数":"7","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"120\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量+加速度+最大最小\",\"初速度\":\"4.0\",\"速度随机波动量\":\"1.8\",\"加速度\":\"-0.08\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(随机)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-8
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-减速扩散-大==","切割矩阵行数":"7","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"120\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量+加速度+最大最小\",\"初速度\":\"8.5\",\"速度随机波动量\":\"3.8\",\"加速度\":\"-0.09\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(随机)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-9
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-10
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-抛物线掉落==","切割矩阵行数":"6","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==抛物线弹道==\",\"移动时长\":\"120\",\"移动模式\":\"直角坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"初速度+波动量\",\"X轴初速度\":\"0.0\",\"X轴速度随机波动量\":\"3.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"初速度+波动量+加速度\",\"Y轴初速度\":\"-5.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.18\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-11
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-蛇线粉碎==","切割矩阵行数":"6","切割矩阵列数":"6","粒子自旋转速度":"0.03","碎片弹道":"{\"标签\":\"==抛物线弹道==\",\"移动时长\":\"120\",\"移动模式\":\"直角坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"路程计算公式\",\"X轴初速度\":\"4.5\",\"X轴速度随机波动量\":\"3.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return vRan*time + 35 * Math.sin( 3*v0*time/180*Math.PI );\\\"\",\"Y轴速度类型\":\"初速度+波动量+加速度\",\"Y轴初速度\":\"1.4\",\"Y轴速度随机波动量\":\"0.3\",\"Y轴加速度\":\"0.02\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-12
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-13
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-比例扩散==","切割矩阵行数":"9","切割矩阵列数":"8","碎片速度是否分比例":"true","最小速度比例":"0.15","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"80\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"5.0\",\"速度随机波动量\":\"0.5\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-14
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-比例半圆扩散==","切割矩阵行数":"9","切割矩阵列数":"8","碎片速度是否分比例":"true","最小速度比例":"0.15","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"80\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"4.5\",\"速度随机波动量\":\"0.2\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"扇形范围方向(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"-90.0\",\"扇形角度\":\"180.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-15
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==小图-比例抛物线==","切割矩阵行数":"9","切割矩阵列数":"8","碎片速度是否分比例":"true","最小速度比例":"0.15","碎片弹道":"{\"标签\":\"==抛物线弹道==\",\"移动时长\":\"120\",\"移动模式\":\"直角坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"初速度+波动量\",\"X轴初速度\":\"0.0\",\"X轴速度随机波动量\":\"3.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"初速度+波动量+加速度\",\"Y轴初速度\":\"-6.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.28\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-16
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-17
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-18
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-19
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-20
 * @parent ---方块粉碎组 1至20---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 * 
 * @param ---方块粉碎组21至40---
 * @desc 
 * 
 * @param 方块粉碎-21
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==大图-规则圆扩散==","切割矩阵行数":"16","切割矩阵列数":"24","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"90\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量\",\"初速度\":\"15.0\",\"速度随机波动量\":\"1.5\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-22
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==大图-减速扩散==","切割矩阵行数":"16","切割矩阵列数":"24","碎片弹道":"{\"标签\":\"==扩散弹道==\",\"移动时长\":\"110\",\"移动模式\":\"极坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"初速度+波动量+加速度+最大最小\",\"初速度\":\"12.0\",\"速度随机波动量\":\"4.8\",\"加速度\":\"-0.12\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(随机)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"只初速度\",\"X轴初速度\":\"1.0\",\"X轴速度随机波动量\":\"2.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"只初速度\",\"Y轴初速度\":\"1.0\",\"Y轴速度随机波动量\":\"2.0\",\"Y轴加速度\":\"0.0\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-23
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default {"标签":"==大图-抛物线掉落==","切割矩阵行数":"16","切割矩阵列数":"24","碎片弹道":"{\"标签\":\"==抛物线弹道==\",\"移动时长\":\"150\",\"移动模式\":\"直角坐标模式\",\"---极坐标模式---\":\"\",\"速度类型\":\"只初速度\",\"初速度\":\"1.0\",\"速度随机波动量\":\"2.0\",\"加速度\":\"0.0\",\"最大速度\":\"99.0\",\"最小速度\":\"0.0\",\"路程计算公式\":\"\\\"return 0.0\\\"\",\"方向类型\":\"四周扩散(线性)\",\"固定方向\":\"90.0\",\"扇形朝向\":\"45.0\",\"扇形角度\":\"90.0\",\"方向公式\":\"\\\"return 0.0\\\"\",\"---直角坐标模式---\":\"\",\"X轴速度类型\":\"初速度+波动量\",\"X轴初速度\":\"0.0\",\"X轴速度随机波动量\":\"12.0\",\"X轴加速度\":\"0.0\",\"X轴最大速度\":\"99.0\",\"X轴最小速度\":\"0.0\",\"X轴路程计算公式\":\"\\\"return 0.0\\\"\",\"Y轴速度类型\":\"初速度+波动量+加速度\",\"Y轴初速度\":\"-14.0\",\"Y轴速度随机波动量\":\"10.0\",\"Y轴加速度\":\"0.38\",\"Y轴最大速度\":\"99.0\",\"Y轴最小速度\":\"0.0\",\"Y轴路程计算公式\":\"\\\"return 0.0\\\"\"}"}
 *
 * @param 方块粉碎-24
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-25
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-26
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-27
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-28
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-29
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-30
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 * 
 * @param 方块粉碎-31
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-32
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-33
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-34
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-35
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-36
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-37
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-38
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-39
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-40
 * @parent ---方块粉碎组21至40---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 * 
 * @param ---方块粉碎组41至60---
 * @desc 
 * 
 * @param 方块粉碎-41
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-42
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-43
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-44
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-45
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-46
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-47
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-48
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-49
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-50
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 * 
 * @param 方块粉碎-51
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-52
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-53
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-54
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-55
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-56
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-57
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-58
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-59
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param 方块粉碎-60
 * @parent ---方块粉碎组41至60---
 * @type struct<DrillCOSEShatter>
 * @desc GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~DrillCOSEShatter:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的粉碎设置==
 *
 * @param 切割矩阵行数
 * @type number
 * @min 1
 * @desc 指定贴图切割的行数。碎片数 = 行数 x 列数。
 * @default 6
 * 
 * @param 切割矩阵列数
 * @type number
 * @min 1
 * @desc 指定贴图切割的行数。碎片数 = 行数 x 列数。
 * @default 6
 *
 * @param 碎片速度是否分比例
 * @type boolean
 * @on 分比例
 * @off 速度一致
 * @desc true - 分比例，false - 速度一致
 * @default false
 * 
 * @param 最小速度比例
 * @parent 碎片速度是否分比例
 * @desc 中心的碎片的速度最小，最边缘碎片的速度的最大。
 * @default 0.2
 *
 * @param 碎片弹道
 * @type struct<DrillCOSEBallistic>
 * @desc 碎片弹道运动轨迹的详细配置信息。
 * @default {}
 * 
 */
/*~struct~DrillCOSEBallistic:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的运动模式==
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 碎片移动的持续时长，过了时间之后，碎片消失或者停止移动，单位帧。
 * @default 120
 *
 * @param 移动模式
 * @type select
 * @option 直角坐标模式
 * @value 直角坐标模式
 * @option 极坐标模式
 * @value 极坐标模式
 * @desc 描述碎片运动的模式。
 * @default 极坐标模式
 * 
 * 
 * @param ---极坐标模式---
 * @desc 
 *
 * @param 速度类型
 * @parent ---极坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述碎片速度的模式。
 * @default 只初速度
 * 
 * @param 初速度
 * @parent 速度类型
 * @desc 碎片的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param 速度随机波动量
 * @parent 速度类型
 * @desc 碎片速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param 加速度
 * @parent 速度类型
 * @desc 碎片的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 最大速度
 * @parent 速度类型
 * @desc 碎片的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param 最小速度
 * @parent 速度类型
 * @desc 碎片的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param 路程计算公式
 * @parent 速度类型
 * @type note
 * @desc 碎片的路程计算公式，可使用参数"id","time","v0","vRan", "a","vMax","vMin"。具体可以看看文档介绍。
 * @default "return 0.0"
 * 
 * @param 方向类型
 * @parent ---极坐标模式---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 四周扩散(抖动)
 * @value 四周扩散(抖动)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向公式
 * @value 方向公式
 * @desc 描述碎片速度的模式。
 * @default 四周扩散(线性)
 * 
 * @param 固定方向
 * @parent 方向类型
 * @desc 类型为固定方向时，碎片固定方向的角度值。
 * @default 90.0
 * 
 * @param 扇形朝向
 * @parent 方向类型
 * @desc 类型为扇形范围方向时，扇形的朝向角度。
 * @default 45.0
 * 
 * @param 扇形角度
 * @parent 方向类型
 * @desc 类型为扇形范围方向时，扇形弧的角度数。
 * @default 90.0
 * 
 * @param 方向公式
 * @parent 方向类型
 * @type note
 * @desc 碎片的方向公式，"id"表示碎片id，"time"表示时间参数，例如"5+0.5*time"。具体可以看看文档介绍。
 * @default "return 0.0"
 * 
 * @param ---直角坐标模式---
 * @desc 
 *
 * @param X轴速度类型
 * @parent ---直角坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述碎片速度的模式。
 * @default 只初速度
 * 
 * @param X轴初速度
 * @parent X轴速度类型
 * @desc 碎片的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param X轴速度随机波动量
 * @parent X轴速度类型
 * @desc 碎片速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param X轴加速度
 * @parent X轴速度类型
 * @desc 碎片的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴最大速度
 * @parent X轴速度类型
 * @desc 碎片的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param X轴最小速度
 * @parent X轴速度类型
 * @desc 碎片的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param X轴路程计算公式
 * @parent X轴速度类型
 * @type note
 * @desc 碎片的路程计算公式，可使用参数"id","time","v0","vRan", "a","vMax","vMin"。具体可以看看文档介绍。
 * @default "return 0.0"
 *
 * @param Y轴速度类型
 * @parent ---直角坐标模式---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @option 初速度+波动量+加速度
 * @value 初速度+波动量+加速度
 * @option 初速度+波动量+加速度+最大最小
 * @value 初速度+波动量+加速度+最大最小
 * @option 路程计算公式
 * @value 路程计算公式
 * @desc 描述碎片速度的模式。
 * @default 只初速度
 * 
 * @param Y轴初速度
 * @parent Y轴速度类型
 * @desc 碎片的基本速度，单位 像素/帧。
 * @default 1.0
 * 
 * @param Y轴速度随机波动量
 * @parent Y轴速度类型
 * @desc 碎片速度上下随机浮动的量，单位 像素/帧。
 * @default 2.0
 * 
 * @param Y轴加速度
 * @parent Y轴速度类型
 * @desc 碎片的加速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴最大速度
 * @parent Y轴速度类型
 * @desc 碎片的最大速度，单位 像素/帧。
 * @default 99.0
 * 
 * @param Y轴最小速度
 * @parent Y轴速度类型
 * @desc 碎片的最小速度，单位 像素/帧。
 * @default 0.0
 * 
 * @param Y轴路程计算公式
 * @parent Y轴速度类型
 * @type note
 * @desc 碎片的路程计算公式，可使用参数"id","time","v0","vRan", "a","vMax","vMin"。具体可以看看文档介绍。
 * @default "return 0.0"
 * 
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COSE（Core_Of_Shatter_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_COSE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理) 每帧
//		性能测试因素	无
//		性能测试消耗	1163.34ms（由于覆写了sprite.update函数，结果全算到这个插件上了）
//		最坏情况		不可估计
//		备注			可以确定的是，消耗要比滤镜的多一点。
//
//插件记录：
//		★大体框架与功能如下：
//			方块粉碎：
//				->建立粉碎块
//				->清理粉碎块
//				->重建
//				->弹道参数
//					->弹道（坐标）
//					->弹道（透明度）固定消失
//					->反向弹道
//					->碎片自旋转	x
//				->一个个掉落粉碎?
//
//		★必要注意事项：
//			1.这里引用了弹道核心的：坐标、透明度 功能。
//			  注意，【透明度】这里强制固定了配置内容。经过了一次转换。
//			2.用法：
//				sprite.drill_COSE_setShatter( data )	//初始化
//			  只要调用这个函数就可以了，粉碎会自动update。
//			  如果你想强制控制一些参数，可以直接对this._drill_COSE_data['xxx']赋值。
//			
//		★其它说明细节：
//			1.该核心的数据都依托在sprite上，
//			  你需要考虑确保切换菜单时cur_time等数据不被重置。
//
//		★存在的问题：
//			1.参数过多，拆解极其麻烦。概念上，一直在纠结碎片行数列数是否要下发到子插件中设置。
//			虽然这里完全封装成了一个单一函数接口。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfShatterEffect');
	
	/*-----------------获取函数 - 弹道（必须写在前面）------------------*/
	DrillUp.drill_COSE_ballisticsInit = function( dataFrom ) {
		var data = {};
		//   移动（movement）
		//data['movementNum'] = Number( dataFrom["数量"] || 1);
		data['movementTime'] = Number( dataFrom["移动时长"] || 0);
		data['movementMode'] = String( dataFrom["移动模式"] || "极坐标模式" );
		//   极坐标（polar）
		data['polarSpeedType'] = String( dataFrom["速度类型"] || "只初速度" );
		data['polarSpeedBase'] = Number( dataFrom["初速度"] || 0.0);
		data['polarSpeedRandom'] = Number( dataFrom["速度随机波动量"] || 0.0);
		data['polarSpeedInc'] = Number( dataFrom["加速度"] || 0);
		data['polarSpeedMax'] = Number( dataFrom["最大速度"] || 0);
		data['polarSpeedMin'] = Number( dataFrom["最小速度"] || 0);
		var temp_str = String( dataFrom["路程计算公式"] || "\"return 0\"" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		data['polarDistanceFormula'] = temp_str.replace(/\\\\/g,"\\");
		data['polarDirType'] = String( dataFrom["方向类型"] || "只初速度" );
		data['polarDirFixed'] = Number( dataFrom["固定方向"] || 0);
		data['polarDirSectorFace'] = Number( dataFrom["扇形朝向"] || 0);
		data['polarDirSectorDegree'] = Number( dataFrom["扇形角度"] || 0);
		data['polarDirFormula'] = String( dataFrom["方向公式"] || "return 0" );
		//   直角坐标（cartesian）
		data['cartXSpeedType'] = String( dataFrom["X轴速度类型"] || "只初速度" );
		data['cartXSpeedBase'] = Number( dataFrom["X轴初速度"] || 0.0);
		data['cartXSpeedRandom'] = Number( dataFrom["X轴速度随机波动量"] || 0.0);
		data['cartXSpeedInc'] = Number( dataFrom["X轴加速度"] || 0);
		data['cartXSpeedMax'] = Number( dataFrom["X轴最大速度"] || 0);
		data['cartXSpeedMin'] = Number( dataFrom["X轴最小速度"] || 0);
		temp_str = String( dataFrom["X轴路程计算公式"] || "return 0" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		data['cartXDistanceFormula'] = temp_str.replace(/\\\\/g,"\\");
		data['cartYSpeedType'] = String( dataFrom["Y轴速度类型"] || "只初速度" );
		data['cartYSpeedBase'] = Number( dataFrom["Y轴初速度"] || 0.0);
		data['cartYSpeedRandom'] = Number( dataFrom["Y轴速度随机波动量"] || 0.0);
		data['cartYSpeedInc'] = Number( dataFrom["Y轴加速度"] || 0);
		data['cartYSpeedMax'] = Number( dataFrom["Y轴最大速度"] || 0);
		data['cartYSpeedMin'] = Number( dataFrom["Y轴最小速度"] || 0);
		temp_str = String( dataFrom["Y轴路程计算公式"] || "return 0" );
		temp_str = temp_str.substring(1,temp_str.length-1);
		data['cartYDistanceFormula'] = temp_str.replace(/\\\\/g,"\\");
		return data;
	}
	
	/*-----------------方块粉碎（配置）------------------*/
	DrillUp.g_COSE_style_list_length = 60;
	DrillUp.g_COSE_style_list = [];
	for (var i = 0; i < DrillUp.g_COSE_style_list_length ; i++ ) {
		if( DrillUp.parameters['方块粉碎-' + String(i+1) ] != "" ){
			DrillUp.g_COSE_style_list[i] = JSON.parse(DrillUp.parameters['方块粉碎-' + String(i+1)] );
			DrillUp.g_COSE_style_list[i]['splitRowCount'] = Number(DrillUp.g_COSE_style_list[i]['切割矩阵行数'] || 5);
			DrillUp.g_COSE_style_list[i]['splitColCount'] = Number(DrillUp.g_COSE_style_list[i]['切割矩阵列数'] || 5);
			DrillUp.g_COSE_style_list[i]['speedPer'] = String(DrillUp.g_COSE_style_list[i]['碎片速度是否分比例'] || "false") == "true";
			DrillUp.g_COSE_style_list[i]['speedPerMin'] = Number(DrillUp.g_COSE_style_list[i]['最小速度比例'] || 0.2);
			//DrillUp.g_COSE_style_list[i]['rotation'] = Number(DrillUp.g_COSE_style_list[i]['粒子自旋转速度'] || 0);
			
			var temp = JSON.parse(DrillUp.g_COSE_style_list[i]['碎片弹道'] || {} );
			DrillUp.g_COSE_style_list[i]['ballistics'] = DrillUp.drill_COSE_ballisticsInit( temp );
		}else{
			DrillUp.g_COSE_style_list[i] = null;
		}
	};
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
//=============================================================================
// ** 贴图
//=============================================================================
//==============================
// * 贴图 - 初始化
//==============================
var _drill_COSE_nitialize = Sprite.prototype.initialize;
Sprite.prototype.initialize = function(bitmap){
	_drill_COSE_nitialize.call(this, bitmap);
	this._drill_COSE_data = {};
	this._drill_COSE_data['enable'] = false;
}
//==============================
// * 贴图 - 帧刷新
//==============================
var _drill_COSE_update = Sprite.prototype.update;
Sprite.prototype.update = function(){
	_drill_COSE_update.call(this);
	if( this._drill_COSE_data['enable'] == false ){ return; }
	
	this.drill_COSE_updateMove();	//帧刷新 - 移动属性 
}

//=============================================================================
// ** 方块粉碎（设置）
//=============================================================================
//==============================
// * 方块粉碎 - 设置（功能接口）
//
//			说明：对所有贴图有效，使其分割成许多子sprite。
//			参数：data见默认值的"*"号参数，只要看*号的就可以
//			返回：无
//==============================
Sprite.prototype.drill_COSE_setShatter = function( data ){
	
	// > 默认值
	data['enable'] = true;																//开关
	if( data['bitmap'] == undefined ){ data['bitmap'] = this.bitmap };					//*bitmap对象
	if(!data['bitmap'].isReady() ){ return; }											//对象未准备则退出
	if( data['frameX'] == undefined ){ data['frameX'] = 0 };							//*切割框架x
	if( data['frameY'] == undefined ){ data['frameY'] = 0 };							//*切割框架y
	if( data['frameW'] == undefined ){ data['frameW'] = data['bitmap'].width };			//*切割框架w
	if( data['frameH'] == undefined ){ data['frameH'] = data['bitmap'].height };		//*切割框架h

	if( data['shatter_id'] == undefined ){ data['shatter_id'] = 0 };							//*粉碎样式id
	if( data['shatter_converted'] == undefined ){ data['shatter_converted'] = false };			//*反向弹道
	if( data['shatter_opacityType'] == undefined ){ data['shatter_opacityType'] = "线性消失" };	//*透明度类型
	if( data['shatter_autoHide'] == undefined ){ data['shatter_autoHide'] = true };				//*图层自动隐藏
	
	
	this.drill_COSE_initBallisticsMove( data );			//弹道初始化（坐标）
	this.drill_COSE_initBallisticsOpacity( data );		//弹道初始化（透明度）
	
	// > 配置值
	data['cur_time'] = 0;																		//当前时间进度
	if( data['shatter_converted'] == true ){ data['cur_time'] = data['movementTime']-1; }		//反向弹道
	
	this._drill_COSE_data = data;
	this.drill_COSE_initShatterSprite();		//贴图初始化
}
//==============================
// * 方块粉碎 - 立即复原（功能接口）
//
//			说明：对所有贴图有效，执行后复原。
//			参数：无
//			返回：无
//==============================
Sprite.prototype.drill_COSE_restoreShatter = function(){
	var data = this._drill_COSE_data;
	
	data['enable'] = false;							//关闭粉碎核心的开关
	
	if( this._drill_COSE_layer ){					//隐藏碎片层
		this._drill_COSE_layer.visible = false;
	}
}
//==============================
// * 方块粉碎 - 弹道初始化（坐标）
//==============================
Sprite.prototype.drill_COSE_initBallisticsMove = function( data ){
	
	// > 检查
	var style_data = DrillUp.g_COSE_style_list[ data['shatter_id'] ];
	if( style_data == null ){
		alert(
			"【Drill_CoreOfShatterEffect.js 系统-方块粉碎核心】\n"+
			"没有找到编号为"+ (data['shatter_id']+1) +"的方块粉碎配置，请查看插件参数的配置内容。"
		);
	}
	
	var ballistics_data = style_data["ballistics"];
	data['splitRowCount'] = style_data["splitRowCount"];
	data['splitColCount'] = style_data["splitColCount"];
	data['speedPer'] = style_data["speedPer"];
	data['speedPerMin'] = style_data["speedPerMin"];
		
	//   移动（movement）
	data['movementNum'] = data['splitRowCount'] * data['splitColCount'];		//碎片数量
	data['movementTime'] = ballistics_data["movementTime"];						//时长
	data['movementMode'] = ballistics_data["movementMode"];						//移动模式
	//   极坐标（polar）
	data['polarSpeedType'] = ballistics_data["polarSpeedType"];					//极坐标 - 速度 - 类型
	data['polarSpeedBase'] = ballistics_data["polarSpeedBase"];					//极坐标 - 速度 - 初速度
	data['polarSpeedRandom'] = ballistics_data["polarSpeedRandom"];				//极坐标 - 速度 - 速度随机波动量
	data['polarSpeedInc'] = ballistics_data["polarSpeedInc"];					//极坐标 - 速度 - 加速度
	data['polarSpeedMax'] = ballistics_data["polarSpeedMax"];					//极坐标 - 速度 - 最大速度
	data['polarSpeedMin'] = ballistics_data["polarSpeedMin"];					//极坐标 - 速度 - 最小速度
	data['polarDistanceFormula'] = ballistics_data["polarDistanceFormula"];		//极坐标 - 速度 - 路程计算公式
	data['polarDirType'] = ballistics_data["polarDirType"];						//极坐标 - 方向 - 类型
	data['polarDirFixed'] = ballistics_data["polarDirFixed"];					//极坐标 - 方向 - 固定方向
	data['polarDirSectorFace'] = ballistics_data["polarDirSectorFace"];			//极坐标 - 方向 - 扇形朝向
	data['polarDirSectorDegree'] = ballistics_data["polarDirSectorDegree"];		//极坐标 - 方向 - 扇形角度
	data['polarDirFormula'] = ballistics_data["polarDirFormula"];				//极坐标 - 方向 - 方向公式
	//   直角坐标（cartesian）
	data['cartXSpeedType'] = ballistics_data["cartXSpeedType"];					//直角坐标 - x - 类型
	data['cartXSpeedBase'] = ballistics_data["cartXSpeedBase"];					//直角坐标 - x - 初速度
	data['cartXSpeedRandom'] = ballistics_data["cartXSpeedRandom"];				//直角坐标 - x - 速度随机波动量
	data['cartXSpeedInc'] = ballistics_data["cartXSpeedInc"];					//直角坐标 - x - 加速度
	data['cartXSpeedMax'] = ballistics_data["cartXSpeedMax"];					//直角坐标 - x - 最大速度
	data['cartXSpeedMin'] = ballistics_data["cartXSpeedMin"];					//直角坐标 - x - 最小速度
	data['cartXDistanceFormula'] = ballistics_data["cartXDistanceFormula"];		//直角坐标 - x - 路程计算公式
	data['cartYSpeedType'] = ballistics_data["cartYSpeedType"];					//直角坐标 - y - 类型
	data['cartYSpeedBase'] = ballistics_data["cartYSpeedBase"];					//直角坐标 - y - 初速度
	data['cartYSpeedRandom'] = ballistics_data["cartYSpeedRandom"];				//直角坐标 - y - 速度随机波动量
	data['cartYSpeedInc'] = ballistics_data["cartYSpeedInc"];					//直角坐标 - y - 加速度
	data['cartYSpeedMax'] = ballistics_data["cartYSpeedMax"];					//直角坐标 - y - 最大速度
	data['cartYSpeedMin'] = ballistics_data["cartYSpeedMin"];					//直角坐标 - y - 最小速度
	data['cartYDistanceFormula'] = ballistics_data["cartYDistanceFormula"];		//直角坐标 - y - 路程计算公式
	
	$gameTemp.drill_COBa_setBallisticsMove( data );								//弹道核心 - 坐标初始化
}
//==============================
// * 方块粉碎 - 弹道初始化（透明度）
//==============================
Sprite.prototype.drill_COSE_initBallisticsOpacity = function( data ){
	
	// > 弹道初始化（透明度）
	if( data['shatter_opacityType'] == "不消失" ){				//透明度这里直接固定配置内容
		data['opacityTime'] = data['movementTime'];								//时间同步
		data['opacityType'] = "固定数值";										//固定数值
		data['opacityFix'] = 255;												//
	}
	if( data['shatter_opacityType'] == "线性消失" ){		
		data['opacityTime'] = data['movementTime'];								//时间同步
		data['opacityType'] = "线性变化";										//固定线性变化
		data['opacityTarget'] = 0 ;												//目标透明度（注意，与反向无关，反向=倒放）
		data['opacityDelay'] = 0 ;												//变化延迟
		data['opacityTranTime'] = data['movementTime'] ;						//变化时长
	}
	if( data['shatter_opacityType'] == "等一半时间后线性消失" ){	
		data['opacityTime'] = data['movementTime'];								//时间同步
		data['opacityType'] = "线性变化";										//固定线性变化
		data['opacityTarget'] = 0 ;												//目标透明度（注意，与反向无关，反向=倒放）
		data['opacityDelay'] = data['movementTime']/2 ;							//变化延迟
		data['opacityTranTime'] = data['movementTime']/2 ;						//变化时长
	}
	
	$gameTemp.drill_COBa_setBallisticsOpacity( data );							//弹道核心 - 透明度初始化
}
//==============================
// * 方块粉碎 - 贴图初始化
//==============================
Sprite.prototype.drill_COSE_initShatterSprite = function(){
	var data = this._drill_COSE_data;
	
	// > 清理
	this.drill_COSE_clearShatter();
	
	// > 粉碎层
	var temp_layer = new Sprite();
	temp_layer.anchor.x = 0;
	temp_layer.anchor.y = 0;
	temp_layer.x = -1 * this.anchor.x * data['frameW'];
	temp_layer.y = -1 * this.anchor.y * data['frameH'];
	
	this._drill_COSE_layer = temp_layer;
	this.addChild( temp_layer );
	
	// > 变速矩阵（测试显示）
	//var ss = "";
	//var max_per = Math.floor( Math.abs( (Math.max( data['splitColCount'],data['splitRowCount'] )-1) /2 ) );
	//for( var i=0; i < data['splitColCount']; i++){
	//	var sss = "";
	//	for( var j=0; j < data['splitRowCount']; j++){
	//		var a = Math.abs( i - (data['splitColCount']-1)/2 );
	//		var b = Math.abs( j - (data['splitRowCount']-1)/2 );
	//		a = Math.floor( Math.max( a,b ) );
	//		a = a/max_per;
	//		
	//		sss += String(a) + "  ";
	//		//sss += String(j + i * data['splitRowCount']) + "  ";
	//	}
	//	ss += sss + "\n";
	//}
	//alert(ss);
	
	
	// > 粉碎块
	var max_per = Math.floor( Math.abs( (Math.max( data['splitColCount'],data['splitRowCount'] )-1) /2 ) );
	var ww = data['frameW']/data['splitColCount'];
	var hh = data['frameH']/data['splitRowCount'];
	this._drill_COSE_sprites = [];
	for( var i=0; i < data['splitColCount']; i++){
		for( var j=0; j < data['splitRowCount']; j++){
			
			// > 碎块初始化
			var temp_sprite = new Sprite();
			var xx = data['frameX'] + ww * i;
			var yy = data['frameY'] + hh * j;
			temp_sprite._orgX = 0 + ww * i;
			temp_sprite._orgY = 0 + hh * j;
			temp_sprite._orgOpacity = 255;
			temp_sprite.x = temp_sprite._orgX;
			temp_sprite.y = temp_sprite._orgY;
			temp_sprite.bitmap = data['bitmap'];
			temp_sprite.setFrame( xx,yy,ww,hh );
			
			// > 弹道核心 - 推演
			$gameTemp.drill_COBa_preBallisticsMove( temp_sprite, i*data['splitRowCount']+j , temp_sprite._orgX, temp_sprite._orgY );
			$gameTemp.drill_COBa_preBallisticsOpacity( temp_sprite, i*data['splitRowCount']+j , temp_sprite._orgOpacity );
			
			// > 变速矩阵
			if( data['speedPer'] == true ){
				var a = Math.abs( i - (data['splitColCount']-1)/2 );
				var b = Math.abs( j - (data['splitRowCount']-1)/2 );
				a = Math.floor( Math.max( a,b ) );
				a = a/max_per;
				
				a = a *( 1-data['speedPerMin'] ) + data['speedPerMin'];
				
				for( var n = 0; n < temp_sprite["_drill_COBa_x"].length; n++ ){
					temp_sprite["_drill_COBa_x"][n] = temp_sprite["_drill_COBa_x"][n] * a + temp_sprite._orgX * (1-a);
				}
				for( var n = 0; n < temp_sprite["_drill_COBa_y"].length; n++ ){
					temp_sprite["_drill_COBa_y"][n] = temp_sprite["_drill_COBa_y"][n] * a + temp_sprite._orgY * (1-a);
				}
			}


			this._drill_COSE_sprites.push( temp_sprite );
			temp_layer.addChild( temp_sprite );
		}
	}	
	this.drill_COSE_updateMove();		//这里强制刷新一次，确保初始化位置
}
//==============================
// * 方块粉碎 - 清理
//==============================
Sprite.prototype.drill_COSE_clearShatter = function(){
	
	// > 去除节点
	if( this._drill_COSE_layer != undefined  ){
		if( this._drill_COSE_sprites != undefined && 
			this._drill_COSE_sprites.length > 0 ){
			for( var i=0; i < this._drill_COSE_sprites.length; i++){
				var temp_sprite = this._drill_COSE_sprites[i];
				this._drill_COSE_layer.removeChild(temp_sprite);
			}
		}
		this.removeChild(this._drill_COSE_layer);
	}
	// > 清理指针
	this._drill_COSE_layer = null;
	this._drill_COSE_sprites = [];
	
}
//==============================
// * 方块粉碎 - 移动
//==============================
Sprite.prototype.drill_COSE_updateMove = function(){
	var data = this._drill_COSE_data;
	
	// > 时间播放
	if( data['shatter_converted'] == true ){
		data['cur_time'] -= 1;
	}else{
		data['cur_time'] += 1;
	}
	
	// > 根据轨迹进行播放
	for( var i=0; i < this._drill_COSE_sprites.length; i++){
		var temp_sprite = this._drill_COSE_sprites[i];
		var time = data['cur_time'];
		if( time <= 0 ){ time = 0; }
		if( time >= temp_sprite['_drill_COBa_x'].length ){
			time = temp_sprite['_drill_COBa_x'].length-1;
		}
		temp_sprite.x = temp_sprite['_drill_COBa_x'][time];		//播放弹道轨迹
		temp_sprite.y = temp_sprite['_drill_COBa_y'][time];
		temp_sprite.opacity = temp_sprite['_drill_COBa_opacity'][time];
	}
	
	// > 碎片层自动隐藏
	if( data['shatter_autoHide'] == true ){
		this._drill_COSE_layer.visible = this.drill_COSE_isShattering();
	}
}
//==============================
// * 方块粉碎 - 判断粉碎情况
//==============================
Sprite.prototype.drill_COSE_isShattering = function(){
	var data = this._drill_COSE_data;
	return data['enable'] && data['cur_time'] >= 0;
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfShatterEffect = false;
		alert(
			"【Drill_CoreOfShatterEffect.js 系统-方块粉碎核心】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心"
		);
}



