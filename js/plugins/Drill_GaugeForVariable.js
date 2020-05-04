//=============================================================================
// Drill_GaugeForVariable.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        UI - 高级变量固定框
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_GaugeForVariable +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能在战斗界面显示多个不同的变量参数框。
 * 该插件设置非常全面，你需要仔细学习以下文档：
 * "关于高级变量固定框.docx"，"关于参数条.docx"
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面
 *   变量框可以在地图和战斗中显示。
 * 2.变量框在战斗界面中，固定放在战斗层级的 上层 。
 *   变量框在地图界面中，固定放在地图层级的 图片层 。
 *   你需要耐心规划 变量框 与 其他共享层级的贴图 的先后顺序与位置。
 * 3.不流动参数条的长度是原资源图片长度。
 *   流动参数条的长度是资源图片长度的三分之一。
 *   如果开启了参数条流动，那么参数条的图片会分成3等份，第1份和第3份要
 *   一模一样，第2份是第1份和第3份的过渡。
 *   开启流动，需要同时配置三分之一长度的 遮罩、凹槽条 资源。
 * 4.参数条可以有很多层，表示不同颜色的血量。魔法、怒气也都可以设置多层。
 * 5.参数数值图片会被分割成12份用于字符。除了0-9数字，还有"/"和"x"。
 *   分别用于最大参数(100/100)和参数层级数(x10)。
 *   这里的变量值/物品值，是可以超过最大值的。
 * 6.参数层级数 = 当前参数 / 层值
 *   100的参数，100的层值，则层值为:"x1"。
 *   99的参数，100的层值，则层值为:"x0"。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，也可以与其它插件组合。
 * 被扩展：
 *   - Drill_MiniPlateForState 状态和buff说明窗口
 *     通过该插件，可以状态能显示详细说明。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__meter （Special后面有两个下划线）
 * 资源路径：img/Special__variable （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__meter文件夹。
 * 先确保项目img文件夹下是否有Special__variable文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 样式1 资源-固定框背景 （img/Special__variable）
 * 样式1 资源-固定框前景 （img/Special__variable）
 * 样式1 资源-参数数值   （img/Special__variable）
 * 样式2 ……
 * ……
 *
 * 样式1 参数条 资源-参数条     （img/Special__meter）
 * 样式1 参数条 资源-参数条遮罩 （img/Special__meter）
 * 样式1 参数条 资源-凹槽条     （img/Special__meter）
 * 样式1 参数条 资源-粒子       （img/Special__meter）
 * 样式1 魔法条 资源-参数条     （img/Special__meter）
 * 样式1 魔法条 资源-参数条遮罩 （img/Special__meter）
 * 样式1 魔法条 资源-凹槽条     （img/Special__meter）
 * 样式1 魔法条 资源-粒子       （img/Special__meter）
 * 样式2 ……
 * ……
 *
 * 需要配置的资源非常多，你需要仔细给你的文件分门别类。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改部分设置：
 * （冒号左右都有一个空格）
 *
 * 插件指令： >高级变量框 : 隐藏框 : 1
 * 插件指令： >高级变量框 : 显示框 : 1
 * 插件指令： >高级变量框 : 隐藏框 : 1,2,3,4
 * 插件指令： >高级变量框 : 显示框 : 1,2,3,4
 * 插件指令： >高级变量框 : 隐藏框 : 全部
 * 插件指令： >高级变量框 : 显示框 : 全部
 * 
 * 插件指令： >高级变量框 : 修改层值 : 1 : 300
 * 插件指令： >高级变量框 : 修改层值(变量) : 1 : 20
 * 插件指令： >高级变量框 : 修改自定义最大值 : 1 : 300
 * 插件指令： >高级变量框 : 修改自定义最大值(变量) : 1 : 20
 * 插件指令： >高级变量框 : 修改自定义名称 : 1 : 蔬菜
 *
 * 1.数值对应配置中绑定的id。用逗号隔开可以设置多个。
 * 2.你需要尽量减少变量框的显示隐藏指令，因为每个隐藏显示指令都会刷新
 *   所有变量框。
 * 3.层值 控制 参数条，自定义最大值 控制 参数条旁边显示的数字。
 *   注意，插件指令里面，修改的名字不能出现 空格 和 英文冒号。
 *   修改后永久有效。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了数值显示最大值的bug。
 * [v1.2]
 * 添加了刷菜单时不初始化数值的设置。
 * [v1.3]
 * 优化了层级位置。
 * [v1.4]
 * 添加了修改层值、自定义最大值的插件指令。
 * [v1.5]
 * 修改了插件关联的资源文件夹。
 * [v1.6]
 * 添加了地图活动镜头缩放时的支持。
 *
 *
 * @param ---固定框样式---
 * @default
 *
 * @param 固定框样式-1
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==胶囊框样式==","----整体框架----":"","参数条":"{\"标签\":\"--参数条--\",\"----主体----\":\"\",\"平移-条 X\":\"16\",\"平移-条 Y\":\"19\",\"条整体旋转角度\":\"0\",\"资源-条\":\"变量框样式1-参数条\",\"资源-条遮罩\":\"\",\"条层级\":\"1\",\"层级是否循环\":\"true\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"false\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"false\",\"资源-凹槽条\":\"\",\"扣除速度\":\"15\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"当前参数条\",\"弹出X速度公式\":\"2*ran -1\",\"弹出Y速度公式\":\"-9 + time*0.9\",\"持续时间\":\"60\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"\",\"粒子出现模式\":\"底部出现\",\"粒子流动X速度\":\"0\",\"粒子流动Y速度\":\"-1.5\",\"粒子数量\":\"20\",\"粒子持续时间\":\"20\",\"----游标----\":\"\",\"是否启用游标\":\"true\",\"游标显示模式\":\"一直显示\",\"是否启用多层重置\":\"false\",\"资源-游标\":\"[\\\"变量框样式1-参数条-游标1\\\",\\\"变量框样式1-参数条-游标2\\\",\\\"变量框样式1-参数条-游标3\\\",\\\"变量框样式1-参数条-游标2\\\"]\",\"偏移-游标 X\":\"0\",\"偏移-游标 Y\":\"0\",\"动画帧间隔\":\"4\",\"是否倒放\":\"false\"}","资源-固定框背景":"变量框样式1-框架","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----名称显示----":"","是否显示名称":"false","平移-名称 X":"15","平移-名称 Y":"25","名称字体大小":"20","----参数数值----":"","资源-参数数值":"变量框样式1-数值","是否显示参数数值":"true","是否包含最大参数值":"false","平移-参数数值 X":"286","平移-参数数值 Y":"21","参数数值变化速度":"18","参数数值对齐方式":"右对齐","是否显示参数层级数":"false","平移-参数层级数 X":"540","平移-参数层级数 Y":"22","参数层级数对齐方式":"右对齐"}
 *
 * @param 固定框样式-2
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==胶囊框多层样式==","----整体框架----":"","参数条":"{\"标签\":\"--参数条--\",\"----主体----\":\"\",\"平移-条 X\":\"16\",\"平移-条 Y\":\"19\",\"条整体旋转角度\":\"0\",\"资源-条\":\"变量框样式2-参数条\",\"资源-条遮罩\":\"\",\"条层级\":\"3\",\"层级是否循环\":\"false\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"false\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"false\",\"资源-凹槽条\":\"\",\"扣除速度\":\"15\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"当前参数条\",\"弹出X速度公式\":\"2*ran -1\",\"弹出Y速度公式\":\"-9 + time*0.9\",\"持续时间\":\"60\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"\",\"粒子出现模式\":\"底部出现\",\"粒子流动X速度\":\"0\",\"粒子流动Y速度\":\"-1.5\",\"粒子数量\":\"20\",\"粒子持续时间\":\"20\",\"----游标----\":\"\",\"是否启用游标\":\"true\",\"游标显示模式\":\"变化模式\",\"是否启用多层重置\":\"true\",\"资源-游标\":\"[\\\"变量框样式2-参数条-亮光游标\\\"]\",\"偏移-游标 X\":\"-20\",\"偏移-游标 Y\":\"0\",\"动画帧间隔\":\"4\",\"是否倒放\":\"false\"}","资源-固定框背景":"变量框样式1-框架","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----名称显示----":"","是否显示名称":"false","平移-名称 X":"15","平移-名称 Y":"25","名称字体大小":"20","----参数数值----":"","资源-参数数值":"变量框样式1-数值","是否显示参数数值":"true","是否包含最大参数值":"false","平移-参数数值 X":"286","平移-参数数值 Y":"21","参数数值变化速度":"18","参数数值对齐方式":"右对齐","是否显示参数层级数":"false","平移-参数层级数 X":"540","平移-参数层级数 Y":"22","参数层级数对齐方式":"右对齐"}
 *
 * @param 固定框样式-3
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==进度槽样式==","----整体框架----":"","参数条":"{\"标签\":\"--参数条--\",\"----主体----\":\"\",\"平移-条 X\":\"21\",\"平移-条 Y\":\"39\",\"条整体旋转角度\":\"0\",\"资源-条\":\"变量框样式4-参数条\",\"资源-条遮罩\":\"变量框样式4-参数条遮罩\",\"条层级\":\"1\",\"层级是否循环\":\"false\",\"----缩短效果----\":\"\",\"条是否瞬间缩短\":\"false\",\"缩短速度\":\"2.5\",\"----流动效果----\":\"\",\"条是否流动\":\"true\",\"条流动速度\":\"5.0\",\"----凹槽条----\":\"\",\"是否启用凹槽条\":\"false\",\"资源-凹槽条\":\"\",\"扣除速度\":\"15\",\"扣除方式\":\"缩短扣除\",\"扣除延迟\":\"60\",\"连续减少是否刷新延迟\":\"true\",\"----弹出条----\":\"\",\"是否启用弹出效果\":\"false\",\"弹出条块模式\":\"当前参数条\",\"弹出X速度公式\":\"2*ran -1\",\"弹出Y速度公式\":\"-9 + time*0.9\",\"持续时间\":\"60\",\"----粒子效果----\":\"\",\"是否启用粒子效果\":\"false\",\"资源-粒子\":\"\",\"粒子出现模式\":\"底部出现\",\"粒子流动X速度\":\"0\",\"粒子流动Y速度\":\"-1.5\",\"粒子数量\":\"20\",\"粒子持续时间\":\"20\",\"----游标----\":\"\",\"是否启用游标\":\"false\",\"游标显示模式\":\"一直显示\",\"是否启用多层重置\":\"false\",\"资源-游标\":\"[]\",\"偏移-游标 X\":\"0\",\"偏移-游标 Y\":\"0\",\"动画帧间隔\":\"4\",\"是否倒放\":\"false\"}","资源-固定框背景":"变量框样式4-框架","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----名称显示----":"","是否显示名称":"true","平移-名称 X":"15","平移-名称 Y":"5","名称字体大小":"22","----参数数值----":"","资源-参数数值":"变量框样式1-数值","是否显示参数数值":"true","是否包含最大参数值":"true","切换菜单时是否初始化数值":"false","平移-参数数值 X":"210","平移-参数数值 Y":"16","参数数值变化速度":"18","参数数值对齐方式":"右对齐","是否显示参数层级数":"false","平移-参数层级数 X":"540","平移-参数层级数 Y":"22","参数层级数对齐方式":"右对齐"}
 * 
 * @param 固定框样式-4
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==计分板样式==","----整体框架----":"","参数条":"","资源-固定框背景":"变量框样式3-框架","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----名称显示----":"","是否显示名称":"true","平移-名称 X":"8","平移-名称 Y":"18","名称字体大小":"20","----参数数值----":"","资源-参数数值":"变量框样式1-数值","是否显示参数数值":"true","是否包含最大参数值":"true","切换菜单时是否初始化数值":"false","平移-参数数值 X":"160","平移-参数数值 Y":"30","参数数值变化速度":"18","参数数值对齐方式":"右对齐","是否显示参数层级数":"false","平移-参数层级数 X":"540","平移-参数层级数 Y":"22","参数层级数对齐方式":"右对齐"}
 * 
 * @param 固定框样式-5
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==计分板样式_紫红==","----整体框架----":"","参数条":"","资源-固定框背景":"变量框样式5-框架_紫红","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----名称显示----":"","是否显示名称":"true","平移-名称 X":"8","平移-名称 Y":"18","名称字体大小":"20","----参数数值----":"","资源-参数数值":"变量框样式5-数值_紫红","是否显示参数数值":"true","是否包含最大参数值":"true","切换菜单时是否初始化数值":"false","平移-参数数值 X":"160","平移-参数数值 Y":"30","参数数值变化速度":"18","参数数值对齐方式":"右对齐","是否显示参数层级数":"false","平移-参数层级数 X":"540","平移-参数层级数 Y":"22","参数层级数对齐方式":"右对齐"}
 *
 * @param 固定框样式-6
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-7
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-8
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-9
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-10
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-11
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-12
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-13
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-14
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-15
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-16
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-17
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-18
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-19
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-20
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param ---变量框设置 1至20---
 * @default
 *
 * @param 变量框设置-1
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-2
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-3
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-4
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-5
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-6
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-7
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-8
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-9
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-10
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-11
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-12
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-13
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-14
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-15
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-16
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-17
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-18
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-19
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-20
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param ---变量框设置21至40---
 * @default
 *
 * @param 变量框设置-21
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-22
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-23
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-24
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-25
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-26
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-27
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-28
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-29
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-30
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-31
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-32
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-33
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-34
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-35
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-36
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-37
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-38
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-39
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-40
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param ---变量框设置41至60---
 * @default
 *
 * @param 变量框设置-41
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-42
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-43
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-44
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-45
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-46
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-47
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-48
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-49
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-50
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-51
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-52
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-53
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-54
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-55
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-56
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-57
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-58
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-59
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-60
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 */
/*~struct~GFVStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的变量框样式==
 *
 * @param ----整体框架----
 * @desc 
 *
 * @param 参数条
 * @parent ----整体框架----
 * @type struct<GaugeMeter>
 * @desc 参数条的设置。
 * @default 
 *
 * @param 资源-固定框背景
 * @parent ----整体框架----
 * @desc 固定框背景的图片资源。
 * @default 变量框背景-默认
 * @require 1
 * @dir img/Special__variable/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ----整体框架----
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ----整体框架----
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ----整体框架----
 * @desc 固定框前景的图片资源，可以遮住参数条。
 * @default 变量框前景-默认
 * @require 1
 * @dir img/Special__variable/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ----整体框架----
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ----整体框架----
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。
 * @default 0
 * 
 * @param ----名称显示----
 * @desc 
 * 
 * @param 是否显示名称
 * @parent ----名称显示----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 平移-名称 X
 * @parent ----名称显示----
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 15
 *
 * @param 平移-名称 Y
 * @parent ----名称显示----
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 25
 *
 * @param 名称字体大小
 * @parent ----名称显示----
 * @type number
 * @min 1
 * @desc 姓名的字体大小。
 * @default 20
 * 
 * @param ----参数数值----
 * @desc 
 *
 * @param 资源-参数数值
 * @parent ----参数数值----
 * @desc 显示参数数值的图片资源。
 * @default 变量框参数数值-默认
 * @require 1
 * @dir img/Special__variable/
 * @type file
 * 
 * @param 是否显示参数数值
 * @parent ----参数数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 * 
 * @param 是否包含最大参数值
 * @parent 是否显示参数数值
 * @type boolean
 * @on 包含
 * @off 不包含
 * @desc true - 包含，false - 不包含。包含则显示"100/100"，不包含只显示"100"。
 * @default false
 * 
 * @param 切换菜单时是否初始化数值
 * @parent 是否显示参数数值
 * @type boolean
 * @on 初始化
 * @off 不初始化
 * @desc 若设置初始化，进入菜单再返回地图，可以看到数值从0向上涨。数值越大越明显。
 * @default false
 *
 * @param 平移-参数数值 X
 * @parent 是否显示参数数值
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 555
 *
 * @param 平移-参数数值 Y
 * @parent 是否显示参数数值
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 62
 *
 * @param 参数数值变化速度
 * @parent 是否显示参数数值
 * @type number
 * @min 1
 * @desc 参数数值变化的速度。速度为比例除数，值越高速度越慢，1表示瞬间变化。
 * @default 18
 *
 * @param 参数数值对齐方式
 * @parent 是否显示参数数值
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 参数数值的对齐方式。
 * @default 右对齐
 * 
 * @param 是否显示参数层级数
 * @parent ----参数数值----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏。显示"x10"层级数。
 * @default true
 *
 * @param 平移-参数层级数 X
 * @parent 是否显示参数层级数
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 540
 *
 * @param 平移-参数层级数 Y
 * @parent 是否显示参数层级数
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 22
 *
 * @param 参数层级数对齐方式
 * @parent 是否显示参数层级数
 * @type select
 * @option 右对齐
 * @value 右对齐
 * @option 左对齐
 * @value 左对齐
 * @desc 参数层级数的对齐方式。
 * @default 右对齐
 *
 */
/*~struct~GFVBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的变量框绑定--
 * 
 * @param ----常规----
 * @desc 
 * 
 * @param 初始是否显示
 * @parent ----常规----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 平移-固定框 X
 * @parent ----常规----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-固定框 Y
 * @parent ----常规----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 固定框起点 X
 * @parent ----常规----
 * @desc 固定框初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 固定框起点 Y
 * @parent ----常规----
 * @desc 固定框初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 固定框移动时长
 * @parent ----常规----
 * @type number
 * @min 1
 * @desc 从起点位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 60
 * 
 * @param ----绑定关联----
 * @desc 
 *
 * @param 绑定类型
 * @parent ----绑定关联----
 * @type select
 * @option 绑定变量id
 * @value 绑定变量id
 * @option 绑定物品id
 * @value 绑定物品id
 * @desc 变量框场景显示的模式。
 * @default 绑定变量id
 *
 * @param 绑定的变量id
 * @parent 绑定类型
 * @desc 变量类型下对应变量id号，如果是物品类型，此项无效。
 * @type variable
 * @default 0
 *
 * @param 绑定的物品id
 * @parent 绑定类型
 * @desc 物品类型下对应变量id号，如果是变量类型，此项无效。
 * @type item
 * @default 0
 *
 * @param 自定义最大值
 * @parent ----绑定关联----
 * @desc 只用于样式中数值显示的最大值。注意，定义条上限的是层值，这个只是作为显示的最大值。
 * @type number
 * @min 0
 * @default 100
 *
 * @param 自定义名称
 * @parent ----绑定关联----
 * @desc 变量框显示的名称。
 * @default 新的变量框名
 *
 * @param 绑定的样式
 * @parent ----绑定关联----
 * @desc 变量框对应的样式的id。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param ----层值----
 * @desc 
 *
 * @param 单层参数条的层值
 * @parent ----层值----
 * @desc 作用于参数条。根据该框内容的最大参数值，分配到单层参数条的值。
 * @type number
 * @min 1
 * @default 500
 *
 * @param ----界面层级----
 * @desc 
 *
 * @param 显示场合
 * @parent ----界面层级----
 * @type select
 * @option 只地图界面
 * @value 只地图界面
 * @option 只战斗界面
 * @value 只战斗界面
 * @option 都有
 * @value 都有
 * @desc 变量框场景显示的模式。
 * @default 都有
 *
 * @param 战斗界面图片层级
 * @parent ----界面层级----
 * @type number
 * @min 0
 * @desc 战斗界面中，固定放在战斗层级的 上层 ，图片层级控制这些层的先后顺序。与多层战斗背景的层级共享。
 * @default 10
 *
 * @param 地图界面图片层级
 * @parent ----界面层级----
 * @type number
 * @min 0
 * @desc 地图界面中，固定放在地图层级的 图片层 ，图片层级控制相同层的先后顺序。与多层地图背景的层级共享。
 * @default 10
 *
 */
/*~struct~GaugeMeter:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的参数条--
 *
 * @param ----主体----
 * @desc 
 *
 * @param 平移-条 X
 * @parent ----主体----
 * @desc 以固定框的位置为基准，x轴方向平移，单位像素。
 * @default 76
 *
 * @param 平移-条 Y
 * @parent ----主体----
 * @desc 以固定框的位置为基准，x轴方向平移，单位像素。
 * @default 14
 *
 * @param 条整体旋转角度
 * @parent ----主体----
 * @type number
 * @min 0
 * @desc 整个条的旋转角度。
 * @default 0
 *
 * @param 资源-条
 * @parent ----主体----
 * @desc 条的图片资源。
 * @default 变量框参数条-默认
 * @require 1
 * @dir img/Special__meter/
 * @type file
 *
 * @param 资源-条遮罩
 * @parent ----主体----
 * @desc 条的遮罩资源。注意，如果设置流动，遮罩只需要条的三分之一长度。
 * @default 
 * @require 1
 * @dir img/Special__meter/
 * @type file
 *
 * @param 条层级
 * @parent ----主体----
 * @type number
 * @min 1
 * @desc 资源中对应的条层级数量。
 * @default 4
 *
 * @param 层级是否循环
 * @parent ----主体----
 * @type boolean
 * @on 循环
 * @off 不循环
 * @desc 如果敌人的参数值比最大的层级还要大，则循环使用层级。不循环则一直保持在最大层级。
 * @default true
 *
 * @param ----缩短效果----
 * @desc 
 *
 * @param 条是否瞬间缩短
 * @parent ----缩短效果----
 * @type boolean
 * @on 瞬间缩短
 * @off 匀速缩短
 * @desc 你需要考虑与弹出条的组合关系，如果有弹出条，建议瞬间缩短。
 * @default true
 *
 * @param 缩短速度
 * @parent ----缩短效果----
 * @desc 条变长或者缩短的速度，速度为比例除数，值越小，速度越快。
 * @default 2.5
 *
 * @param ----流动效果----
 * @desc 
 *
 * @param 条是否流动
 * @parent ----流动效果----
 * @type boolean
 * @on 流动
 * @off 不流动
 * @desc 注意，设置流动后，素材长度取三分之一。
 * @default true
 *
 * @param 条流动速度
 * @parent ----流动效果----
 * @desc 条向右流动的速度，单位像素/帧。可为小数，可为负数，负数向左流动。
 * @default 5.0
 *
 * @param ----凹槽条----
 * @desc 
 *
 * @param 是否启用凹槽条
 * @parent ----凹槽条----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 资源-凹槽条
 * @parent ----凹槽条----
 * @desc 参数凹槽条的图片资源。注意，设置流动，凹槽条为参数条的三分之一长。
 * @default 变量框凹槽条-默认
 * @require 1
 * @dir img/Special__meter/
 * @type file
 *
 * @param 扣除速度
 * @parent ----凹槽条----
 * @type number
 * @min 1
 * @desc 凹槽条缩短的速度，单位像素/帧。
 * @default 15
 *
 * @param 扣除方式
 * @parent ----凹槽条----
 * @type select
 * @option 缩短扣除
 * @value 缩短扣除
 * @desc 凹槽条的扣除方式。
 * @default 缩短扣除
 *
 * @param 扣除延迟
 * @parent ----凹槽条----
 * @type number
 * @min 0
 * @desc 凹槽条执行扣除的延迟时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param 连续减少是否刷新延迟
 * @parent ----凹槽条----
 * @type boolean
 * @on 刷新
 * @off 不刷新
 * @desc 参数连续减少时，比如连续受伤，会重新计算延迟时间，这时候你会看见一长条的红色凹槽条，等同于打出的伤害。
 * @default true
 *
 * @param ----弹出条----
 * @desc 
 *
 * @param 是否启用弹出效果
 * @parent ----弹出条----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 弹出条块模式
 * @parent ----弹出条----
 * @type select
 * @option 当前参数条
 * @value 当前参数条
 * @option 白色块
 * @value 白色块
 * @option 黑色块
 * @value 黑色块
 * @desc 弹出条的块图片模式，当前参数条是指切割参数条一部分并弹出的效果。
 * @default 当前参数条
 *
 * @param 弹出X速度公式
 * @parent ----弹出条----
 * @desc 弹出的x方向速度公式。公式中可用时间变量time以及随机数ran（0到1之间）。time单位为帧。（1秒60帧）
 * @default 2*ran -1
 *
 * @param 弹出Y速度公式
 * @parent ----弹出条----
 * @desc 弹出的y方向速度公式。公式中可用时间变量time以及随机数ran（0到1之间）。time单位为帧。（1秒60帧）
 * @default -9 + time*0.9
 *
 * @param 持续时间
 * @parent ----弹出条----
 * @type number
 * @min 0
 * @desc 弹出条弹出后到消失的持续时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param ----粒子效果----
 * @desc 
 *
 * @param 是否启用粒子效果
 * @parent ----粒子效果----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param 资源-粒子
 * @parent ----粒子效果----
 * @desc 参数条中的粒子效果的粒子图片资源。
 * @default 变量框粒子-默认
 * @require 1
 * @dir img/Special__meter/
 * @type file
 *
 * @param 粒子出现模式
 * @parent ----粒子效果----
 * @type select
 * @option 随机出现
 * @value 随机出现
 * @option 左侧出现
 * @value 左侧出现
 * @option 右侧出现
 * @value 右侧出现
 * @option 顶部出现
 * @value 顶部出现
 * @option 底部出现
 * @value 底部出现
 * @desc 上下左右分别对应长方形的四个边的区域。
 * @default 底部出现
 *
 * @param 粒子流动X速度
 * @parent ----粒子效果----
 * @desc 粒子在x轴方向移动的速度。可为小数，可为负数。
 * @default 0
 *
 * @param 粒子流动Y速度
 * @parent ----粒子效果----
 * @desc 粒子在y轴方向移动的速度。可为小数，可为负数。
 * @default -1.5
 *
 * @param 粒子数量
 * @parent ----粒子效果----
 * @type number
 * @min 0
 * @desc 条中出现的粒子的数量。
 * @default 20
 *
 * @param 粒子持续时间
 * @parent ----粒子效果----
 * @type number
 * @min 1
 * @desc 粒子出现到粒子消失的时间。如果粒子离开参数条边界，则视为该粒子已经消失。
 * @default 20
 *
 * @param ----游标----
 * @desc 
 *
 * @param 是否启用游标
 * @parent ----游标----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default false
 *
 * @param 游标显示模式
 * @parent ----游标----
 * @type select
 * @option 亮光模式
 * @value 亮光模式
 * @option 闪烁模式
 * @value 闪烁模式
 * @option 受伤模式
 * @value 受伤模式
 * @option 增量模式
 * @value 增量模式
 * @option 变化模式
 * @value 变化模式
 * @option 一直显示
 * @value 一直显示
 * @desc 游标的显示模式，详细介绍见文档"关于参数条.docx"中游标介绍。
 * @default 一直显示
 *
 * @param 是否启用多层重置
 * @parent ----游标----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 参数有多层时，重置游标将根据多层的位置浮动。如果不重置，第一层满了，游标将一直停在满的位置。
 * @default false
 *
 * @param 资源-游标
 * @parent ----游标----
 * @desc 参数条中游标的图片资源。可以为单张，也可以为多张形成gif。
 * @default ["变量框游标-默认"]
 * @require 1
 * @dir img/Special__meter/
 * @type file[]
 *
 * @param 偏移-游标 X
 * @parent ----游标----
 * @desc 以游标浮动的位置为基准，x轴方向偏移，单位像素。
 * @default 0
 *
 * @param 偏移-游标 Y
 * @parent ----游标----
 * @desc 以游标浮动的位置为基准，y轴方向偏移，单位像素。
 * @default 0
 *
 * @param 动画帧间隔
 * @parent ----游标----
 * @type number
 * @min 1
 * @desc 多帧游标的播放帧间隔，间隔越小，播放速度越快。
 * @default 4
 *
 * @param 是否倒放
 * @parent ----游标----
 * @type boolean
 * @on 倒放
 * @off 正常播放
 * @desc true - 倒放，false - 正常播放。多帧游标的播放顺序。
 * @default false
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		GFV (Gauge_For_Variable)
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			固定框样式：（GFVStyle）
//				->背景/前景布局
//				->生命条（参数条）
//				->魔法条（参数条）
//				->怒气条（参数条）
//				->震动效果
//				->加满动画
//				->数值显示
//				->状态显示
//			参数条：（GaugeMeter）
//				->位置、图片、遮罩
//				->层级
//				->缩短效果
//				->流动效果
//				->凹槽条
//				->弹出条
//				->粒子效果
//				->游标
//			BOSS绑定：（GFVBind）
//				->位置、可见初始化
//				->初始位移
//				->绑定关联
//				->BOSS头像
//				->单层生命条的层值
//				->单层魔法条的层值
//				->单层怒气条的层值
//				->战斗界面层级
//				->地图界面层级
//
//		★私有类如下：
//			* Drill_GFV_StyleSprite【固定框样式】
//			* Drill_GaugeMeter_SpriteMask【参数条遮罩】
//			* Drill_GaugeMeter_Sprite【参数条】
//			* Drill_SpringMeter_Sprite【弹出条】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.由于该插件是【带核+定制化】插件。变量框的杂七杂八直接加就好了。不要考虑继续分离/模块化了。
//			3.【核是一个类，重复定义时要注意.initialize】。需要确保自身function已被定义，以及initialize被定义。
//
//		【其他原理细节，见Drill_GaugeForBoss UI-高级BOSS生命固定框】
//		这里只是删减了部分内容，并修改了许多参数设置。

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeForVariable = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GaugeForVariable');
	
	// * 变量获取 - 参数条初始化函数（必须写在前面）
	DrillUp.g_GFV_GaugeMeter_Init = function( dataFrom ) {
		var data = {};
		/*----------------GaugeMeter---------------*/
		//->图片、位置、遮罩
		data['x'] = Number( dataFrom["平移-条 X"] || 47);
		data['y'] = Number( dataFrom["平移-条 Y"] || 28);
		data['rotation'] = Number( dataFrom["条整体旋转角度"] || 0);
		data['src_meter'] = String( dataFrom["资源-条"] );
		data['src_meterMask'] = String( dataFrom["资源-条遮罩"] );
		//->层级
		data['level_count'] = Number( dataFrom["条层级"] || 1);
		data['level_is_loop'] = String( dataFrom["层级是否循环"] || "true") === "true";
		//->缩短效果
		data['shorten_speed'] = Math.abs( Number( dataFrom["缩短速度"] || 5.0) );
		data['shorten_speed'] = (String( dataFrom["条是否瞬间缩短"] || "true") === "true") ? 0.0 : data['shorten_speed'] ;
		//->流动效果
		data['m_enable'] = String( dataFrom["条是否流动"] || "true") === "true";
		data['m_speed'] = Number( dataFrom["条流动速度"] || 0);
		//->凹槽条
		data['l_enable'] = String( dataFrom["是否启用凹槽条"] || "true") === "true";
		data['l_meter'] = String( dataFrom["资源-凹槽条"] );
		data['l_speed'] = Number( dataFrom["扣除速度"] || 4);
		data['l_type'] = String( dataFrom["扣除方式"] || "缩短扣除");
		data['l_delay'] = Number( dataFrom["扣除延迟"] || 0);
		data['l_delayReflash'] = String( dataFrom["连续减少是否刷新延迟"] || "true") === "true";
		//->弹出条
		data['s_enable'] = String( dataFrom["是否启用弹出效果"] || "true") === "true";
		data['s_type'] = String( dataFrom["弹出条块模式"] || "当前参数条");
		data['s_formulaX'] = String( dataFrom["弹出X速度公式"] || "2*ran -1");
		data['s_formulaY'] = String( dataFrom["弹出Y速度公式"] || "-9 + time*0.9");
		data['s_life'] = Number( dataFrom["持续时间"] || 60);
		//->粒子效果
		data['p_enable'] = String( dataFrom["是否启用粒子效果"] || "true") === "true";
		data['p_src'] = String( dataFrom["资源-粒子"] );
		data['p_mode'] = String( dataFrom["粒子出现模式"] || "底部出现");
		data['p_speedX'] = Number( dataFrom["粒子流动X速度"] || 0);
		data['p_speedY'] = Number( dataFrom["粒子流动Y速度"] || -1.5);
		data['p_count'] = Number( dataFrom["粒子数量"] || 20);
		data['p_life'] = Number( dataFrom["粒子持续时间"] || 20);
		//->游标
		data['f_enable'] = String( dataFrom["是否启用游标"] || "false") === "true";
		data['f_mode'] = String( dataFrom["游标显示模式"] || "一直显示");
		data['f_reset'] = String( dataFrom["是否启用多层重置"] || "false") === "true";
		if( dataFrom['资源-游标'] ){
			data['f_src'] = JSON.parse( dataFrom['资源-游标'] );
		}else{
			data['f_src'] = [];
		}
		data['f_x'] = Number( dataFrom["偏移-游标 X"] || 0);
		data['f_y'] = Number( dataFrom["偏移-游标 Y"] || 0);
		data['f_interval'] = Number( dataFrom["动画帧间隔"] || 0);
		data['f_backrun'] = String( dataFrom["是否倒放"] || "true") === "true";
		
		return data;
	};
	
	DrillUp.g_GFV_Style_max = 10;
	DrillUp.g_GFV_Style = [];
	for (var i = 0; i < DrillUp.g_GFV_Style_max; i++) {
		if( DrillUp.parameters['固定框样式-' + String(i+1) ] != "" ){
			DrillUp.g_GFV_Style[i] = JSON.parse(DrillUp.parameters['固定框样式-' + String(i+1) ]);
			
			/*----------------GFV_Style---------------*/
			//->背景/前景布局
			DrillUp.g_GFV_Style[i]['src_background'] = String(DrillUp.g_GFV_Style[i]["资源-固定框背景"]);
			DrillUp.g_GFV_Style[i]['src_foreground'] = String(DrillUp.g_GFV_Style[i]["资源-固定框前景"]);
			DrillUp.g_GFV_Style[i]['background_x'] = Number(DrillUp.g_GFV_Style[i]["平移-固定框背景 X"] || 0);
			DrillUp.g_GFV_Style[i]['background_y'] = Number(DrillUp.g_GFV_Style[i]["平移-固定框背景 Y"] || 0);
			DrillUp.g_GFV_Style[i]['foreground_x'] = Number(DrillUp.g_GFV_Style[i]["平移-固定框前景 X"] || 0);
			DrillUp.g_GFV_Style[i]['foreground_y'] = Number(DrillUp.g_GFV_Style[i]["平移-固定框前景 Y"] || 0);
			//->参数条
			if( DrillUp.g_GFV_Style[i]['参数条'] != "" ){
				var hp = JSON.parse(DrillUp.g_GFV_Style[i]['参数条']);
				DrillUp.g_GFV_Style[i]['hp'] = DrillUp.g_GFV_GaugeMeter_Init( hp );
			}
			
			//->名称显示
			DrillUp.g_GFV_Style[i]['name_enable'] = String(DrillUp.g_GFV_Style[i]["是否显示名称"] || "true") === "true";
			DrillUp.g_GFV_Style[i]['name_x'] = Number(DrillUp.g_GFV_Style[i]["平移-名称 X"] || 0);
			DrillUp.g_GFV_Style[i]['name_y'] = Number(DrillUp.g_GFV_Style[i]["平移-名称 Y"] || 0);
			DrillUp.g_GFV_Style[i]['name_fontsize'] = Number(DrillUp.g_GFV_Style[i]["名称字体大小"] || 22);
			
			//->数值显示
			DrillUp.g_GFV_Style[i]['num_hp_src'] = String(DrillUp.g_GFV_Style[i]["资源-参数数值"] );
			DrillUp.g_GFV_Style[i]['num_hp_enable'] = String(DrillUp.g_GFV_Style[i]["是否显示参数数值"] || "true") === "true";
			DrillUp.g_GFV_Style[i]['num_hp_init'] = String(DrillUp.g_GFV_Style[i]["切换菜单时是否初始化数值"] || "false") === "true";
			DrillUp.g_GFV_Style[i]['num_hp_enable_max'] = String(DrillUp.g_GFV_Style[i]["是否包含最大参数值"] || "false") === "true";
			DrillUp.g_GFV_Style[i]['num_hp_x'] = Number(DrillUp.g_GFV_Style[i]["平移-参数数值 X"] || 555);
			DrillUp.g_GFV_Style[i]['num_hp_y'] = Number(DrillUp.g_GFV_Style[i]["平移-参数数值 Y"] || 62);
			DrillUp.g_GFV_Style[i]['num_hp_speed'] = Number(DrillUp.g_GFV_Style[i]["参数数值变化速度"] || 18);
			DrillUp.g_GFV_Style[i]['num_hp_align'] = String(DrillUp.g_GFV_Style[i]["参数数值对齐方式"] || "右对齐");
			DrillUp.g_GFV_Style[i]['num_hp_level_enable'] = String(DrillUp.g_GFV_Style[i]["是否显示参数层级数"] || "true") === "true";
			DrillUp.g_GFV_Style[i]['num_hp_level_x'] = Number(DrillUp.g_GFV_Style[i]["平移-参数层级数 X"] || 540);
			DrillUp.g_GFV_Style[i]['num_hp_level_y'] = Number(DrillUp.g_GFV_Style[i]["平移-参数层级数 Y"] || 22);
			DrillUp.g_GFV_Style[i]['num_hp_level_align'] = String(DrillUp.g_GFV_Style[i]["参数层级数对齐方式"] || "右对齐");

			//alert(JSON.stringify(DrillUp.g_GFV_Style[i]));
		}else{
			DrillUp.g_GFV_Style[i] = [];
		}
	}
	
	DrillUp.g_GFV_Bind_max = 60;
	DrillUp.g_GFV_Bind = [];
	for (var i = 0; i < DrillUp.g_GFV_Bind_max; i++) {
		if( DrillUp.parameters['变量框设置-' + String(i+1) ] != "" ){
			DrillUp.g_GFV_Bind[i] = JSON.parse(DrillUp.parameters['变量框设置-' + String(i+1) ]);

			/*----------------GFV_Bind---------------*/
			//->位置、可见初始化
			DrillUp.g_GFV_Bind[i]['frame_x'] = Number(DrillUp.g_GFV_Bind[i]["平移-固定框 X"] || 0);
			DrillUp.g_GFV_Bind[i]['frame_y'] = Number(DrillUp.g_GFV_Bind[i]["平移-固定框 Y"] || 0);
			DrillUp.g_GFV_Bind[i]['visible'] = String(DrillUp.g_GFV_Bind[i]["初始是否显示"] || "true") === "true";
			DrillUp.g_GFV_Bind[i]['frame_slide_x'] = Number(DrillUp.g_GFV_Bind[i]["固定框起点 X"] || 0);
			DrillUp.g_GFV_Bind[i]['frame_slide_y'] = Number(DrillUp.g_GFV_Bind[i]["固定框起点 Y"] || -80);
			DrillUp.g_GFV_Bind[i]['frame_slide_time'] = Number(DrillUp.g_GFV_Bind[i]["固定框移动时长"] || 60);
			//->绑定关联
			DrillUp.g_GFV_Bind[i]['type'] = String(DrillUp.g_GFV_Bind[i]["绑定类型"] || "绑定变量id");
			DrillUp.g_GFV_Bind[i]['var_id'] = Number(DrillUp.g_GFV_Bind[i]["绑定的变量id"] || 0);
			DrillUp.g_GFV_Bind[i]['item_id'] = Number(DrillUp.g_GFV_Bind[i]["绑定的物品id"] || 0);
			DrillUp.g_GFV_Bind[i]['max'] = Number(DrillUp.g_GFV_Bind[i]["自定义最大值"] || 100);
			DrillUp.g_GFV_Bind[i]['name'] = String(DrillUp.g_GFV_Bind[i]["自定义名称"] || "");
			DrillUp.g_GFV_Bind[i]['style_id'] = Number(DrillUp.g_GFV_Bind[i]["绑定的样式"] || 1);
			//->单层条的层值
			DrillUp.g_GFV_Bind[i]['hp_level_max'] = Number(DrillUp.g_GFV_Bind[i]["单层参数条的层值"] || 500);
			
			//->界面层级
			DrillUp.g_GFV_Bind[i]['stageMode'] = String(DrillUp.g_GFV_Bind[i]["显示场合"] || "都有");
			DrillUp.g_GFV_Bind[i]['b_z_index'] = Number(DrillUp.g_GFV_Bind[i]["战斗界面图片层级"] || 10);
			DrillUp.g_GFV_Bind[i]['m_z_index'] = Number(DrillUp.g_GFV_Bind[i]["地图界面图片层级"] || 10);
			
			
		}else{
			DrillUp.g_GFV_Bind[i] = [];
		}
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialVariable = function(filename) {
    return this.loadBitmap('img/Special__variable/', filename, 0, true);
};
ImageManager.load_SpecialMeter = function(filename) {
    return this.loadBitmap('img/Special__meter/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_GFV_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFV_pluginCommand.call(this, command, args);
	if (command === '>高级变量框') {
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if (type === '显示框') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						if( bind['visible'] === false ){
							bind['visible'] = true;
						}
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						if( bind['visible'] === false ){
							bind['visible'] = true;
						}
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
			if (type === '隐藏框') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						if( bind['visible'] === true ){
							bind['visible'] = false;
						}
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						if( bind['visible'] === true ){
							bind['visible'] = false;
						}
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if (type === '修改层值') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						bind['hp_level_max'] = Number(temp2);
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						bind['hp_level_max'] = Number(temp2);
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
			if (type === '修改层值(变量)') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						bind['hp_level_max'] = $gameVariables.value( Number(temp2) );
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						bind['hp_level_max'] = $gameVariables.value( Number(temp2) );
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
			if (type === '修改自定义最大值') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						bind['max'] = Number(temp2);
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						bind['max'] = Number(temp2);
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
			if (type === '修改自定义最大值(变量)') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						bind['max'] = $gameVariables.value( Number(temp2) );
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						bind['max'] = $gameVariables.value( Number(temp2) );
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
			if (type === '修改自定义名称') {
				if( temp1 == '全部' ){
					for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[j];
						bind['name'] = temp2;
					}
				}else{
					var list = temp1.split(',');
					for(var j = 0; j< list.length; j++ ){
						var bind = $gameSystem._drill_GFV_binds[ Number(list[j])-1];
						bind['name'] = temp2;
					}
				}
				$gameTemp._drill_GFVGauge_needReflash = true;
			}
		}
	}
};
//=============================================================================
// * 存储初始化
//=============================================================================
var _drill_GFV_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GFV_system_initialize.call(this);
	
	this._drill_GFV_binds = [];
	for(var i = 0; i<DrillUp.g_GFV_Bind.length; i++ ){
		this._drill_GFV_binds.push( DrillUp.g_GFV_Bind[i] );
	}
};	


//=============================================================================
// * 地图层级
//=============================================================================
//==============================
// ** 图片层
//==============================
var _drill_GFV_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFV_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Spriteset_Map.prototype.drill_GFV_sortByZIndex = function() {
	this._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// * 地图界面添加固定框
//=============================================================================
//==============================
// * 地图 - 最顶层
//==============================
var _drill_GFV_s_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFV_s_createPictures.call(this);
	
	this._drill_GFV_tank = [];
	this.drill_refreshGFVGauge();
};
//==============================
// * 地图 - 清除变量框
//==============================
Spriteset_Map.prototype.drill_removeAllGFVGauge = function() {
	for(var j = this._drill_GFV_tank.length-1; j>=0 ; j-- ){
		var temp_sprite = this._drill_GFV_tank[j];
		this._drill_mapPicArea.removeChild(temp_sprite);
		this._drill_GFV_tank.splice(j,1);
		delete temp_sprite;
	}
}
//==============================
// * 地图 - 刷新变量框
//==============================
Spriteset_Map.prototype.drill_refreshGFVGauge = function() {
	this.drill_removeAllGFVGauge();
	for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
		var bind = $gameSystem._drill_GFV_binds[j];
		if( bind['visible'] == true && 
			( bind['stageMode'] == "都有" || bind['stageMode'] == "只地图界面" ) ){

			bind['parentName'] = 'Spriteset_Map';
			var temp_sprite = new Drill_GFV_StyleSprite(bind);
			this._drill_GFV_tank.push(temp_sprite);
			this._drill_mapPicArea.addChild(temp_sprite);
		}
	}
	//层级排序
	this.drill_GFV_sortByZIndex();
}

//==============================
// * 地图 - 帧刷新
//==============================
var _drill_GFV_smap_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {	
	_drill_GFV_smap_update.call(this);
	if( $gameTemp._drill_GFVGauge_needReflash == true ){
		$gameTemp._drill_GFVGauge_needReflash = false;
		this.drill_refreshGFVGauge();
	}
};

//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_GFV_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GFV_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// ** 层级排序
//==============================
Spriteset_Battle.prototype.drill_GFV_sortByZIndex = function() {
	this._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// * 战斗界面添加固定框
//=============================================================================
//==============================
// * 战斗 - 最顶层
//==============================
var _drill_GFV_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GFV_createLowerLayer.call(this);
	
	this._drill_GFV_tank = [];
	this.drill_refreshGFVGauge();
}
//==============================
// * 战斗 - 清除变量框
//==============================
Spriteset_Battle.prototype.drill_removeAllGFVGauge = function() {
	for(var j = this._drill_GFV_tank.length-1; j>=0 ; j-- ){
		var temp_sprite = this._drill_GFV_tank[j];
		this._drill_battleUpArea.removeChild(temp_sprite);
		this._drill_GFV_tank.splice(j,1);
		delete temp_sprite;
	}
}
//==============================
// * 战斗 - 刷新变量框
//==============================
Spriteset_Battle.prototype.drill_refreshGFVGauge = function() {
	this.drill_removeAllGFVGauge();
	for(var j = 0; j< $gameSystem._drill_GFV_binds.length; j++ ){
		var bind = $gameSystem._drill_GFV_binds[j];
		if( bind['visible'] == true && 
			( bind['stageMode'] == "都有" || bind['stageMode'] == "只战斗界面" ) ){

			bind['parentName'] = 'Spriteset_Battle';
			var temp_sprite = new Drill_GFV_StyleSprite(bind);
			this._drill_GFV_tank.push(temp_sprite);
			this._drill_battleUpArea.addChild(temp_sprite);
		}
	}
	//层级排序
	this.drill_GFV_sortByZIndex();
}

//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_GFV_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _drill_GFV_update.call(this);
	if( $gameTemp._drill_GFVGauge_needReflash == true ){
		$gameTemp._drill_GFVGauge_needReflash = false;
		this.drill_refreshGFVGauge();
	}
};

//=============================================================================
// * Drill_GFV_StyleSprite 固定框样式
//=============================================================================
function Drill_GFV_StyleSprite() {
    this.initialize.apply(this, arguments);
};

Drill_GFV_StyleSprite.prototype = Object.create(Sprite.prototype);
Drill_GFV_StyleSprite.prototype.constructor = Drill_GFV_StyleSprite;

//==============================
// * 初始化-设置
//==============================
Drill_GFV_StyleSprite.prototype.initialize = function(bind) {
	Sprite.prototype.initialize.call(this);
	this._drill_bind = bind;	//绑定数据
	this._drill_style = DrillUp.g_GFV_Style[ bind['style_id']-1 ];	//样式数据
	
	this.visible = this._drill_bind['visible'];
	this._move = 0;
	this.opacity = 0;
	if( this._drill_bind['parentName'] == 'Spriteset_Map' ){ this.zIndex = this._drill_bind['b_z_index']; }
	if( this._drill_bind['parentName'] == 'Spriteset_Battle' ){ this.zIndex = this._drill_bind['m_z_index']; }
	
	this._drill_num_initFinished = false;	//数值初始化
	this._drill_num_hp_needDraw = true;
	this._drill_num_cur_hp = 0;
	this._drill_num_hp_tank = [];
	if(this._drill_style['num_hp_init'] == false){		//关闭初始化
		if( this._drill_bind['type'] == "绑定变量id" ){
			this._drill_param_value = Number( $gameVariables.value( this._drill_bind['var_id'] ) );
		}else{
			this._drill_param_value = Number( $gameParty.numItems( $dataItems[ this._drill_bind['item_id'] ] ) );
		}
		this._drill_num_cur_hp = this._drill_param_value;
	}
	
	this._drill_system_icon = ImageManager.loadSystem("IconSet");
	this._drill_states_initFinished = false;
	
	this.drill_createBackground();	//建立背景
	this.drill_createHPMeter();		//建立参数参数条
	this.drill_createForeground();	//建立前景
	this.drill_createName();		//建立名称
	this.drill_createNumbers();		//建立数值
};
//==============================
// * 初始化-背景
//==============================
Drill_GFV_StyleSprite.prototype.drill_createBackground = function() {
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialVariable(this._drill_style['src_background']);
	temp_sprite.x = this._drill_style['background_x'];
	temp_sprite.y = this._drill_style['background_y'];
	this.addChild(temp_sprite);
}
//==============================
// * 初始化-参数条
//==============================
Drill_GFV_StyleSprite.prototype.drill_createHPMeter = function() {
	if( !this._drill_style['hp'] ){ return }
	var settings = JSON.parse(JSON.stringify( this._drill_style['hp'] ));	//拷贝object
	settings['level_max'] = this._drill_bind['hp_level_max'];
	
	this._drill_hp_meter = new Drill_GaugeMeter_Sprite(settings);	//参数条包含初始位置定义 + 动画遮罩
	this.addChild(this._drill_hp_meter);
	
}
//==============================
// * 初始化-前景
//==============================
Drill_GFV_StyleSprite.prototype.drill_createForeground = function() {
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialVariable(this._drill_style['src_foreground']);
	temp_sprite.x = this._drill_style['foreground_x'];
	temp_sprite.y = this._drill_style['foreground_y'];
	this.addChild(temp_sprite);
}
//==============================
// * 初始化-名称
//==============================
Drill_GFV_StyleSprite.prototype.drill_createName = function() {
	if( this._drill_style['name_enable'] == false ){ return }
	
	var font_size = this._drill_style['name_fontsize'];
	this._drill_name_sprite = new Sprite(new Bitmap(360, font_size+4 ));
	this._drill_name_sprite.x = this._drill_style['name_x'];
	this._drill_name_sprite.y = this._drill_style['name_y'];
	this._drill_name_sprite.bitmap.fontSize = font_size;
	this.drill_drawName();
	this.addChild(this._drill_name_sprite);
}
Drill_GFV_StyleSprite.prototype.drill_drawName = function() {
	this._drill_name_sprite.bitmap.drawText(this._drill_bind['name'], 0, 0, this._drill_name_sprite.width, this._drill_name_sprite.bitmap.fontSize,0);	
}
//==============================
// * 初始化-数值
//==============================
Drill_GFV_StyleSprite.prototype.drill_createNumbers = function() {
	// ->hp
	this._drill_num_hp_bitmap = ImageManager.load_SpecialVariable(this._drill_style['num_hp_src']);
	if( this._drill_style['num_hp_enable'] ){		// 参数 + 最大 （父类）
		this._drill_num_hp = new Sprite();
		this._drill_num_hp.anchor.x = 0.5;
		this._drill_num_hp.anchor.y = 0.5;
		this._drill_num_hp.x = this._drill_style['num_hp_x'];
		this._drill_num_hp.y = this._drill_style['num_hp_y'];
		this.addChild(this._drill_num_hp);
	}
	if( this._drill_style['num_hp_level_enable'] ){	// 参数层级（父类）
		this._drill_num_hp_level = new Sprite();
		this._drill_num_hp_level.anchor.x = 0.5;
		this._drill_num_hp_level.anchor.y = 0.5;
		this._drill_num_hp_level.x = this._drill_style['num_hp_level_x'];
		this._drill_num_hp_level.y = this._drill_style['num_hp_level_y'];
		this.addChild(this._drill_num_hp_level);
	}
	this._drill_num_hp_tank = [];
	this._drill_num_hp_level_tank = [];
	if( this._drill_style['num_hp_enable'] ){
		if( this._drill_style['num_hp_enable_max'] ){	// 参数 + 最大
			for(var i=0; i<33; i++){
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_hp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_hp_tank.push(temp_sprite);
				this._drill_num_hp.addChild(temp_sprite);
			}
		}else{
			for(var i=0; i<16; i++){	// 参数
				var temp_sprite = new Sprite();
				temp_sprite.visible = false;
				temp_sprite.bitmap = this._drill_num_hp_bitmap;
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				this._drill_num_hp_tank.push(temp_sprite);
				this._drill_num_hp.addChild(temp_sprite);
			}
		}
	}
	if( this._drill_style['num_hp_level_enable'] ){		// 参数层级
		for(var i=0; i<5; i++){	
			var temp_sprite = new Sprite();
			temp_sprite.visible = false;
			temp_sprite.bitmap = this._drill_num_hp_bitmap;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			this._drill_num_hp_level_tank.push(temp_sprite);
			this._drill_num_hp_level.addChild(temp_sprite);
		}
	}
}

//==============================
// * 帧刷新
//==============================
Drill_GFV_StyleSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	// >数值初始化
	if(	this._drill_num_hp_bitmap.isReady() ){	
		this._drill_num_initFinished = true;
	}
	
	// >参数条值刷新
	if( this._drill_bind['type'] == "绑定变量id" ){
		this._drill_param_value = Number( $gameVariables.value( this._drill_bind['var_id'] ) );
	}else{
		this._drill_param_value = Number( $gameParty.numItems( $dataItems[ this._drill_bind['item_id'] ] ) );
	}
	if(this._drill_hp_meter){ this._drill_hp_meter.drill_reflashValue(this._drill_param_value); }
	
	this.updatePos();			//初始位移
	this.updateNumbersValue();	//数值缓冲
	this.updateNumbers();		//数值绘制
}
//==============================
// * 帧刷新 - 初始位移
//==============================
Drill_GFV_StyleSprite.prototype.updatePos = function() {
	//（由于镜头实时会变，xy需要时刻固定重新计算位置）
	this.x = this._drill_bind['frame_x'] + this._drill_bind['frame_slide_x'];
	this.y = this._drill_bind['frame_y'] + this._drill_bind['frame_slide_y'];
	this.scale.x = 1.00;
	this.scale.y = 1.00;
	this._move += 1;
	
	var cur_t = Math.min( this._drill_bind['frame_slide_time'] , this._move );
	this.x -= cur_t /this._drill_bind['frame_slide_time'] * this._drill_bind['frame_slide_x'];
	this.y -= cur_t /this._drill_bind['frame_slide_time'] * this._drill_bind['frame_slide_y'];
	this.opacity += 255/this._drill_bind['frame_slide_time'];
	
	if( Imported.Drill_BattleCamera 	//战斗镜头修正
		&& this._drill_bind['parentName'] == "Spriteset_Battle" ){
		this.x -= $gameTemp._drill_cam_pos[0];
		this.y -= $gameTemp._drill_cam_pos[1];
	}
	if( Imported.Drill_LayerCamera 		//地图镜头修正
		&& this._drill_bind['parentName'] == "Spriteset_Map" ){
		this.x = $gameSystem.drill_LCa_cameraToMapX( this.x );
		this.y = $gameSystem.drill_LCa_cameraToMapY( this.y );
		this.scale.x = this.scale.x / $gameSystem.drill_LCa_curScaleX();
		this.scale.y = this.scale.y / $gameSystem.drill_LCa_curScaleY();
	}
	
}
//==============================
// * 帧刷新 - 数值缓冲
//==============================
Drill_GFV_StyleSprite.prototype.updateNumbersValue = function() {
	if( this._drill_num_initFinished == false){ return }
	
	// >hp数值 缓冲下降
	if( this._drill_num_cur_hp != this._drill_param_value ){
		this._drill_num_hp_needDraw = true;

		if( this._drill_param_value < this._drill_num_cur_hp ){
			var diff = Math.max( Math.floor(( this._drill_num_cur_hp - this._drill_param_value)/this._drill_style['num_hp_speed'] ) , 1 );
			this._drill_num_cur_hp -= diff;
			if( this._drill_num_cur_hp < this._drill_param_value ){
				this._drill_num_cur_hp = this._drill_param_value;
			}
		}
		if( this._drill_param_value > this._drill_num_cur_hp ){
			var diff = Math.max( Math.floor(( this._drill_param_value - this._drill_num_cur_hp)/this._drill_style['num_hp_speed'] ) , 1 );
			this._drill_num_cur_hp += diff;
			if( this._drill_num_cur_hp > this._drill_param_value ){
				this._drill_num_cur_hp = this._drill_param_value;
			}
		}
	}
	
}
//==============================
// * 帧刷新 - 数值绘制
//==============================
Drill_GFV_StyleSprite.prototype.updateNumbers = function() {
	if( this._drill_num_initFinished == false){ return }
	
	if( this._drill_num_hp_needDraw == true){ 
		this._drill_num_hp_needDraw = false;
		// >hp数值 分割数值符
		var hp_temp_cur_hp = this._drill_num_cur_hp;
		var hp_temp_cur_maxhp = this._drill_bind['max'];
		var hp_temp_tank = [];
		var align = this._drill_style['num_hp_align'];
		if( align == "右对齐" ){
			if( this._drill_style['num_hp_enable_max'] ){
				hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_maxhp ) ); 
				hp_temp_tank.push(10);	//加入"/"符号
			}
			hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_hp ) ); 
		}else{
			hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_hp ).reverse() ); 	//左对齐为反向插入
			if( this._drill_style['num_hp_enable_max'] ){
				hp_temp_tank.push(10);
				hp_temp_tank = hp_temp_tank.concat( this.drill_splitNumber( hp_temp_cur_maxhp ).reverse() ); 
			}
		}
		// >hp数值 显示数值符
		var hp_w = this._drill_num_hp_bitmap.width / 12;
		var hp_h = this._drill_num_hp_bitmap.height;
		for(var i=0; i<this._drill_num_hp_tank.length; i++){
			var temp_sprite = this._drill_num_hp_tank[i];
			if( i < hp_temp_tank.length ){
				var pos = hp_temp_tank[i];
				temp_sprite.setFrame(pos*hp_w,0,hp_w,hp_h);
				if( align == "右对齐" ){
					temp_sprite.x = -1 * i * hp_w - hp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * hp_w - hp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
		// >hp层级数值 分割数值符
		var hp_temp_cur_levelhp = Math.floor( this._drill_param_value / this._drill_bind['hp_level_max'] );
		var hp_temp_level_tank = [];
		var level_align = this._drill_style['num_hp_level_align'];
		if( level_align == "右对齐" ){
			hp_temp_level_tank = hp_temp_level_tank.concat( this.drill_splitNumber( hp_temp_cur_levelhp ) ); 
		}else{ 
			hp_temp_level_tank = hp_temp_level_tank.concat( this.drill_splitNumber( hp_temp_cur_levelhp ).reverse() ); 
		}
		hp_temp_level_tank.push(11);	//加入"x"符号
		// >hp层级数值 显示数值符
		for(var i=0; i<this._drill_num_hp_level_tank.length; i++){
			var temp_sprite = this._drill_num_hp_level_tank[i];
			if( i < hp_temp_level_tank.length ){
				var pos = hp_temp_level_tank[i];
				temp_sprite.setFrame(pos*hp_w,0,hp_w,hp_h);
				if( level_align == "右对齐" ){
					temp_sprite.x = -1 * i * hp_w - hp_w/2 ;
				}else{
					temp_sprite.x = 1 * i * hp_w - hp_w/2 ;
				}
				temp_sprite.visible = true;
			}else{
				temp_sprite.visible = false;
			}
		}
	}
	
}
//==============================
// * 帧刷新 - 数值分割
//==============================
Drill_GFV_StyleSprite.prototype.drill_splitNumber = function(num_value) {
	var arr = [];
	for(var i=0; i<33; i++){		//将 1234 变成 [1,2,3,4]
		var a1 = Math.floor(num_value / 10);
		var a2 = Math.floor(num_value % 10);
		if(a1 <= 0){
			arr.push(a2);
			break;
		}else{
			arr.push(a2);
		}
		num_value = a1;
	}
	return arr;
}

//=============================================================================
// * 	Drill_GaugeMeter_Sprite 参数条类
//
//		初始化参数：见initialize函数中的方括号。
//		使用方法：	1.将sprite贴在任意地方即可。
//					2.实时调用函数.drill_reflashValue(value)改变参数条的值。
//					3.值减少时，凹槽条、弹出条会产生效果，值增加不会。
//=============================================================================
if( typeof(Drill_GaugeMeter_Sprite) == "undefined"
	|| typeof(Drill_GaugeMeter_Sprite.prototype.initialize) == "undefined"  ){	//防止重复定义

	function Drill_GaugeMeter_Sprite() {
		this.initialize.apply(this, arguments);
	}

	Drill_GaugeMeter_Sprite.prototype = Object.create(Sprite.prototype);
	Drill_GaugeMeter_Sprite.prototype.constructor = Drill_GaugeMeter_Sprite;

	Drill_GaugeMeter_Sprite.prototype.initialize = function(settings) {
		Sprite.prototype.initialize.call(this);
		this._drill_data = JSON.parse(JSON.stringify( settings ));	//拷贝object
		//alert(JSON.stringify(settings));
		
		// ->核心 - 变化因子
		this._drill_new_value = 0;				//新变化参数【使用时只读】
		this._drill_cur_value = 0;				//当前参数【使用时只读】
		
		// ->核心 - 层级结构
		this._drill_main = null;				//主层
		this._drill_mainMask = null;			//主层遮罩
		this._drill_up = null;					//	-上层
		this._drill_center = null;				//	-中层
		this._drill_down = null;				//	-下层
		this._drill_up_meter = null;			//  *上层条
		this._drill_center_meter = null;		//  *中层条（凹槽条）
		this._drill_down_meter = null;			//  *下层条
			
		// ->位置、图片、遮罩
		this.x = this._drill_data['x'];	
		this.y = this._drill_data['y'];	
		this.rotation = this._drill_data['rotation'] /180 * Math.PI;	
		this._drill_src_meter = this._drill_data['src_meter'];			//参数条资源（字符串）
		this._drill_src_meterMask = this._drill_data['src_meterMask'];	//参数条遮罩（字符串）
		this._drill_meter_bitmap = null;								//参数条bitmap
		this._drill_level_bitmaps = [];									//参数条层级bitmap
		this._drill_level_needInit = true;								//层级图片初始化 锁
		this._drill_level_height = 0;									//层级图高度
		this._drill_level_width = 0;									//层级图宽度（不流动的宽度）

		// ->层级
		this._drill_is_level_blocked = false;							//层级变换阻塞（每次层级降1时自动阻塞）
		this._drill_level_cur_value = 0;								//层级条缓冲值
		this._drill_level_count = this._drill_data['level_count'];		//层级数量
		this._drill_level_loop = this._drill_data['level_is_loop'];		//层级是否循环
		this._drill_cur_level = -1;										//当前所处的层级
		// ->单层条的层值
		this._drill_level_max = this._drill_data['level_max'];			//单层最大值
		
		// ->缩短效果
		this._drill_shorten_speed = this._drill_data['shorten_speed'];	//上层缩短速度（0表示瞬间缩短）
		
		// ->流动效果
		this._drill_is_meter_moving = this._drill_data['m_enable'];		//条是否流动
		this._drill_meter_moving_speed = this._drill_data['m_speed'];	//条流动速度

		// ->凹槽条
		this._drill_leaking_enable = this._drill_data['l_enable'];					//是否启用凹槽条
		this._drill_src_leaking_meter = this._drill_data['l_meter'];				//凹槽条资源（字符串）
		this._drill_leaking_cur_value = 0;											//凹槽条缓冲值
		this._drill_leaking_time = 0;												//凹槽条延时时间
		this._drill_leaking_speed = this._drill_data['l_speed'];					//条扣除速度
		this._drill_leaking_type = this._drill_data['l_type'];						//条扣除方式
		this._drill_leaking_delay = this._drill_data['l_delay'];					//条扣除延迟
		this._drill_is_leaking_delayReflash = this._drill_data['l_delayReflash'];	//连续受伤时，是否刷新延迟
		
		// ->弹出条
		this._drill_spring_enable = this._drill_data['s_enable'];		//是否启用弹出效果
		this._drill_spring = null;										//弹出层
		this._drill_spring_tank = [];									//弹出条容器
		this._drill_spring_cur_value = 0;								//弹出条缓冲值
		this._drill_spring_type = this._drill_data['s_type'];			//弹出条块模式
		this._drill_spring_formulaX = this._drill_data['s_formulaX'];	//弹出X速度公式
		this._drill_spring_formulaY = this._drill_data['s_formulaY'];	//弹出Y速度公式
		this._drill_spring_life = this._drill_data['s_life'];			//弹出条持续时间
		
		// ->粒子效果	
		this._drill_particles_enable = this._drill_data['p_enable'];	//是否启用粒子效果
		this._drill_particles_needInit = true;
		this._drill_particles = [];										//粒子容器
		this._drill_particles_mode = this._drill_data['p_mode'];		//粒子出现模式（字符串）
		this._drill_particles_speedX = this._drill_data['p_speedX'];	//粒子流动X速度
		this._drill_particles_speedY = this._drill_data['p_speedY'];	//粒子流动Y速度
		this._drill_particles_count = this._drill_data['p_count'];		//粒子数量
		this._drill_particles_life = this._drill_data['p_life'];		//粒子持续时间
		if(this._drill_particles_enable){
			this._drill_particles_bitmap = ImageManager.load_SpecialMeter(this._drill_data['p_src']);	//粒子资源
		}
		
		// ->游标
		this._drill_floating_enable = this._drill_data['f_enable'];		//是否启用游标
		this._drill_floating_needInit = true;							//游标初始化开关
		this._drill_floating_reset = this._drill_data['f_reset'];		//是否多层重置
		this._drill_floating_mode = this._drill_data['f_mode'];			//游标显示模式
		this._drill_floating_flash = 1;									//游标闪烁方向
		this._drill_floating_src = this._drill_data['f_src'];			//图片资源
		this._drill_floating_sprite = null;								//游标
		this._drill_floating_bitmaps = [];								//游标资源
		this._drill_floating_x = this._drill_data['f_x'];				//平移-游标 X
		this._drill_floating_y = this._drill_data['f_y'];				//平移-游标 Y
		this._drill_floating_time = 0;									//当前动画帧
		this._drill_floating_cur = 0;									//当前动画帧
		this._drill_floating_interval = this._drill_data['f_interval'];	//动画帧间隔
		this._drill_floating_backrun = this._drill_data['f_backrun'];	//是否倒放
		if(this._drill_floating_enable){
			for(var j=0; j<this._drill_floating_src.length; j++){
				this._drill_floating_bitmaps[j] = ImageManager.load_SpecialMeter(String(this._drill_floating_src[j]));	//游标资源
			}
		}
		
		// 初始化（create函数：可以直接初始化，init函数：必须等图片加载参数完毕后初始化）
		this.drill_createFrames();
		this.drill_createMeters();
	};

	//==============================
	// * 初始化-框架
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_createFrames = function() {
		
		this._drill_main = new Sprite();			//主层
		this._drill_mainMask = new Sprite();		//主层遮罩
		this._drill_mainMask.bitmap = ImageManager.load_SpecialMeter(this._drill_src_meterMask);
		
		this._drill_spring = new Sprite();			//弹出层
		this._drill_up = new Sprite();				//上层
		this._drill_center = new Sprite();			//中层
		this._drill_down = new Sprite();			//下层
		this._drill_up.zIndex = 30;	
		this._drill_center.zIndex = 20;	
		this._drill_down.zIndex = 10;
		this._drill_main.addChild(this._drill_down);
		this._drill_main.addChild(this._drill_center);
		this._drill_main.addChild(this._drill_up);
		
		if(this._drill_src_meterMask != ""){
			this._drill_main.addChild(this._drill_mainMask);
			this._drill_main.mask = this._drill_mainMask;
		}
		this.addChild(this._drill_main);
		this.addChild(this._drill_spring);			//弹出层在主层前面
	}
	//==============================
	// * 初始化-层条
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_createMeters = function() {
		
		this._drill_up_meter = new Sprite();				//上层条
		this._drill_center_meter = new Sprite();			//中层条（凹槽条）
		this._drill_down_meter = new Sprite();				//下层条
		this._drill_up.addChild(this._drill_up_meter);
		this._drill_center.addChild(this._drill_center_meter);
		this._drill_down.addChild(this._drill_down_meter);
		
		this._drill_up_meter_move = 0;			//流动效果-上层条初始位置
		this._drill_down_meter_move = 0;		//流动效果-下层条初始位置
		
		this._drill_meter_bitmap = ImageManager.load_SpecialMeter(this._drill_src_meter);		//参数条资源
		if(this._drill_leaking_enable ){
			this._drill_center_meter.bitmap = ImageManager.load_SpecialMeter(this._drill_src_leaking_meter);	//凹槽条资源
			this._drill_center_meter.setFrame(0,0,0,0);
		}
	}

	//==============================
	// * 初始化-层级
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_initMeterBitmap = function() {
		this._drill_level_bitmaps = [];	
		
		for(var i=0; i<this._drill_level_count; i++){	//层级内容 根据资源全部切割重绘
			var _bitmap = this._drill_meter_bitmap;
			this._drill_level_height = _bitmap.height /this._drill_level_count;
			this._drill_level_width = _bitmap.width;
			var new_bitmap = new Bitmap( this._drill_level_width, this._drill_level_height );
			
			var x = 0;
			var y = this._drill_level_height * i;
			var w = this._drill_level_width;
			var h = this._drill_level_height;
			new_bitmap.blt( _bitmap,  x, y, w, h,  0,0, w, h);
			
			this._drill_level_bitmaps.push(new_bitmap);
			
			if(this._drill_src_meterMask == ""){	//根据层级信息，初始化主层的默认遮罩（遮挡粒子）
				this._drill_mainMask.bitmap = new Bitmap( this.drill_width() , this.drill_height() );
				this._drill_mainMask.bitmap.fillRect(0, 0, this.drill_width() , this.drill_height(), "#ffffff");
				this._drill_main.addChild(this._drill_mainMask);
				this._drill_main.mask = this._drill_mainMask;
			}
		}
	}
	//==============================
	// * 初始化-粒子
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_initParticle = function() {
		if( !this._drill_particles_enable ){ return }
		
		for( var j = 0; j < this._drill_particles_count ; j++ ){
			var par = new Sprite(this._drill_particles_bitmap);
			par.anchor.x = 0.5;
			par.anchor.y = 0.5;
			par.opacity = 0;
			par.cur_life = Math.random() * this._drill_particles_life;
			par.cur_random = 0.3*(Math.random()-0.5)	//随机因子
			
			this._drill_particles.push(par);
			this._drill_up.addChild(par);
		}
	}
	//==============================
	// * 初始化-游标
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_initFloating = function() {
		if( !this._drill_floating_enable ){ return }
		
		this._drill_floating_sprite = new Sprite(this._drill_floating_bitmaps[0]);
		this._drill_floating_sprite.anchor.x = 0.5;
		this._drill_floating_sprite.anchor.y = 0.5;
		this._drill_floating_sprite.opacity = 0;
		
		this._drill_spring.addChild(this._drill_floating_sprite);		//游标在弹出层上
		
		
	}
	//==============================
	// * 变化因子
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_reflashValue = function(value) {
		this._drill_new_value = value;
	}
	//==============================
	// * 帧刷新
	//==============================
	Drill_GaugeMeter_Sprite.prototype.update = function() {
		Sprite.prototype.update.call(this);
		
		//层级初始化
		if(this._drill_meter_bitmap.isReady() && this._drill_level_needInit){	
			this._drill_level_needInit = false;
			this.drill_initMeterBitmap();
		}
		//粒子初始化
		if( this._drill_particles_bitmap && this._drill_particles_bitmap.isReady() && this._drill_particles_needInit){	
			this._drill_particles_needInit = false;
			this.drill_initParticle();
		}
		//游标初始化
		if(this._drill_meter_bitmap.isReady() && this._drill_floating_needInit){	
			this._drill_floating_needInit = false;
			this.drill_initFloating();
		}
		
		if( this.drill_isLevelsReady() ){
			this.updateLevelValue();		//参数条数值
			this.updateLevel(); 			//参数条层级
			this.updateMeter(); 			//参数条绘制
			this.updateLeakingValue();		//凹槽条数值
			this.updateLeakingMeter(); 		//凹槽条绘制
			this.updateBlock(); 			//阻塞条件控制
			this.drill_sortByZIndex();		//层级排序
			
			if( this._drill_spring_enable ){
				this.updateSpringInit();		//弹出条建立
				this.updateSpringDestroy(); 	//弹出条销毁
			}
			this.updateParticle(); 			//粒子效果
			this.updateFloating(); 			//游标
		}
		this._drill_cur_value = this._drill_new_value;
	}
	//==============================
	// * 帧刷新 - 参数条数值（可以最直接地瞬间缩短，也可以缓冲计算）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLevelValue = function() {
		
		if( this._drill_is_level_blocked == false ){	//特殊情况阻止条缩短或增加
			
			// ->缩短效果 - 瞬间/弹性缩短
			if( this._drill_shorten_speed == 0 ){
				this._drill_level_cur_value = this._drill_new_value;
			}else{
				if(this._drill_level_cur_value < this._drill_new_value){
					var diff = Math.max( ( this._drill_new_value - this._drill_level_cur_value)/this._drill_shorten_speed , 1 );
					this._drill_level_cur_value += diff;
					if( this._drill_level_cur_value > this._drill_new_value ){
						this._drill_level_cur_value = this._drill_new_value;
					}
				}
				if(this._drill_level_cur_value > this._drill_new_value){
					var diff = Math.max( ( this._drill_level_cur_value - this._drill_new_value)/this._drill_shorten_speed , 1 );
					this._drill_level_cur_value -= diff;
					if( this._drill_level_cur_value < this._drill_new_value ){
						this._drill_level_cur_value = this._drill_new_value;
					}
				}
			}
			
			// #阻塞 - 小于指定层级最大值时，阻塞
			var cur_max = this._drill_cur_level * this._drill_level_max -1;
			if( this._drill_level_cur_value < cur_max ){
				this._drill_level_cur_value = cur_max;
				//alert(cur_max);
			}
		}
	}
	//==============================
	// * 帧刷新 - 参数条层级
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLevel = function() {
		
		var a1 = Math.floor(this._drill_level_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_level_cur_value % this._drill_level_max);
		
		if( this._drill_cur_level != a1 ){
		
			// #层级阻塞
			// （小于层级时，必然阻塞。后面根据条件解除。）
			if(this._drill_cur_level > a1){ this._drill_cur_level -= 1;this._drill_is_level_blocked = true;}
			if(this._drill_cur_level < a1){ this._drill_cur_level = a1;this._drill_is_level_blocked = false;}
			
		
			// #层级变换
			if(a1 == 0 ){
				//只剩最后一层时
				this._drill_up_meter.bitmap = this._drill_level_bitmaps[0];	
				this._drill_down_meter.bitmap = null;
			}else if( a1 >= this._drill_level_count ){
				//参数值超过最大层时
				if( this._drill_level_loop ){
					//循环色
					var a3 = a1 % this._drill_level_count;
					if( a3 == 0  ){
						this._drill_up_meter.bitmap = this._drill_level_bitmaps[0];
						this._drill_down_meter.bitmap = this._drill_level_bitmaps[this._drill_level_count - 1];
					}else{
						this._drill_up_meter.bitmap = this._drill_level_bitmaps[a3];
						this._drill_down_meter.bitmap = this._drill_level_bitmaps[a3-1];
					}
				}else{
					//不循环色
					this._drill_up_meter.bitmap = this._drill_level_bitmaps[this._drill_level_count - 1];
					this._drill_down_meter.bitmap = this._drill_level_bitmaps[this._drill_level_count - 1];
				}
			}else{
				//	正常层
				this._drill_up_meter.bitmap = this._drill_level_bitmaps[a1];
				this._drill_down_meter.bitmap = this._drill_level_bitmaps[a1-1];
			}
			
		}
	}
	//==============================
	// * 帧刷新 - 参数条绘制（流动、长度控制）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateMeter = function() {
		var a1 = Math.floor(this._drill_level_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_level_cur_value % this._drill_level_max);
		
		// #上层条长度
		var ww = this._drill_level_width / this._drill_level_max * a2;
		if( this._drill_is_meter_moving ){ ww = ww/3 }
		if( a2 == this._drill_level_max -1 ){ ww += 1 }	//799这种差一点点的参数值，补满条
				
		// ->流动效果
		var w = Math.floor(this._drill_level_width);
		if( this._drill_is_meter_moving ){
			w = w/3;
			if(this._drill_meter_moving_speed > 0){
				this._drill_up_meter_move += this._drill_meter_moving_speed;
				if( this._drill_up_meter_move >= w*2 ){
					this._drill_up_meter_move = this._drill_up_meter_move % w ;
				}
			}else if(this._drill_meter_moving_speed < 0){
				this._drill_up_meter_move += this._drill_meter_moving_speed;
				if( this._drill_up_meter_move <= w ){
					this._drill_up_meter_move += w ;
				}
			}
			if(this._drill_meter_moving_speed > 0){
				this._drill_down_meter_move += this._drill_meter_moving_speed;
				if( this._drill_down_meter_move >= w*2 ){
					this._drill_down_meter_move = this._drill_down_meter_move % w ;
				}
			}else if(this._drill_meter_moving_speed < 0){
				this._drill_down_meter_move += this._drill_meter_moving_speed;
				if( this._drill_down_meter_move <= w ){
					this._drill_down_meter_move += w ;
				}
			}
		}
		if(this._drill_up_meter.bitmap != null){	//（流动和长度都只能通过setFrame一个函数控制，不能分开）
			this._drill_up_meter.setFrame( this._drill_up_meter_move, 0, ww, this._drill_level_height );
		}
		if(this._drill_down_meter.bitmap != null){
			this._drill_down_meter.setFrame( this._drill_down_meter_move, 0, w, this._drill_level_height );
		}
	}
	//==============================
	// * 帧刷新 - 凹槽条数值
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLeakingValue = function() {
		
		// #凹槽条持平
		if( this._drill_leaking_cur_value <= this._drill_level_cur_value ){
			this._drill_leaking_cur_value = this._drill_level_cur_value;
			this._drill_leaking_time = this._drill_leaking_delay;
		}
		
		// #延迟 - 连续受伤刷新延迟
		if( this._drill_is_leaking_delayReflash &&
			this._drill_new_value != this._drill_cur_value ){
			this._drill_leaking_time = this._drill_leaking_delay;
		}
		
		// #延迟 - 达到时间后开始缩短
		this._drill_leaking_time -= 1;
		if(this._drill_leaking_time <= 0 ){
		
			if(this._drill_leaking_cur_value > this._drill_level_cur_value){
				this._drill_leaking_cur_value -= ( this._drill_leaking_speed * this._drill_level_max / this._drill_level_width );
			}
		}
		
		// #阻塞 - 凹槽条动作
		// （单层的参数扣完，但是凹槽仍在，这时候需要等凹槽结束缩短后进行下一轮伤害）
		var a1 = Math.floor(this._drill_leaking_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_leaking_cur_value % this._drill_level_max);
		
		if( this._drill_is_level_blocked == true ){		//阻塞时，解除等待延迟
			this._drill_leaking_time = 0;
		}
		
		if(a2 == 0 && this._drill_leaking_cur_value > 0 && 
			this._drill_leaking_cur_value > this._drill_level_cur_value ){ 	//如果当前层耗尽，强制减一，确保下一层的凹槽是满的
			this._drill_leaking_cur_value -= 1; 
		}
		
	}
	//==============================
	// * 帧刷新 - 凹槽条绘制
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateLeakingMeter = function() {
		var a1 = Math.floor(this._drill_leaking_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_leaking_cur_value % this._drill_level_max);
		
		// #凹槽条长度
		var ww = this._drill_level_width / this._drill_level_max * a2;
		if( this._drill_is_meter_moving ){ ww = ww/3 }
			
		if(this._drill_center_meter.bitmap != null){
			this._drill_center_meter.setFrame( 0, 0, ww, this._drill_level_height );
		}
	}
	//==============================
	// * 帧刷新 - 阻塞条件控制
	//			（阻塞状态：指层级下降一层时，等待凹槽条流逝完毕的状态，该状态显示的参数条会卡在下层的最大值位置）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateBlock = function() {
		
		// #凹槽条 - 流逝完毕后结束阻塞
		if(this._drill_leaking_cur_value <= this._drill_level_cur_value){
			this._drill_is_level_blocked = false;
		}
		
		// #排序 - 阻塞时的中层条放在最上层
		if(this._drill_is_level_blocked){
			this._drill_center.zIndex = 40;
		}else{
			this._drill_center.zIndex = 20;
		}
	}

	//==============================
	// ** 层级排序
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_sortByZIndex = function() {
	   this._drill_main.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	};

	//==============================
	// ** 帧刷新 - 弹出条建立
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateSpringInit = function() {
		
		var w1 = Math.floor(this._drill_spring_cur_value % this._drill_level_max);
		var w2 = Math.floor(this._drill_new_value % this._drill_level_max);
		w1 = this.drill_width() / this._drill_level_max * w1;		//弹出条长度值
		w2 = this.drill_width() / this._drill_level_max * w2;
		var cur_max = this._drill_cur_level * this._drill_level_max -1;

			
		if( this._drill_spring_cur_value != this._drill_new_value ){
			if(this._drill_spring_cur_value < cur_max){ w1 = 0; }
			if(this._drill_new_value < cur_max){ w2 = 0; }
			
			if( w1>w2 ){	//扣除参数的弹出条
				var up_bitmap = this._drill_up_meter.bitmap;
				
				var spring_bitmap = new Bitmap( w1-w2 , this._drill_level_height );
				var ux = w2;
				var uy = 0;
				var uw = w1-w2;
				var uh = this._drill_level_height;
				if( this._drill_spring_type == "白色块"){
					spring_bitmap.fillRect( 0, 0, uw, uh, "#ffffff");
				}else if(this._drill_spring_type == "黑色块"){
					spring_bitmap.fillRect( 0, 0, uw, uh, "#000000");
				}else{
					spring_bitmap.blt( up_bitmap, ux, uy, uw, uh, 0, 0, uw, uh);	//当前参数条
				}
				
				var spring_setting = {};		//重新组装必要参数
				spring_setting['s_x'] = ux;
				spring_setting['s_y'] = uy;
				spring_setting['s_bitmap'] = spring_bitmap;
				spring_setting['s_type'] = this._drill_spring_type;
				spring_setting['s_formulaX'] = this._drill_spring_formulaX;
				spring_setting['s_formulaY'] = this._drill_spring_formulaY;
				spring_setting['s_life'] = this._drill_spring_life;
				var new_spring_sprite = new Drill_SpringMeter_Sprite(spring_setting);
				this._drill_spring_tank.push(new_spring_sprite);
				this._drill_spring.addChild(new_spring_sprite);
			}
			this._drill_spring_cur_value = this._drill_new_value;
		}
		
	}
	//==============================
	// ** 帧刷新 - 弹出条销毁
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateSpringDestroy = function() {
		for(var i= this._drill_spring_tank.length-1; i>= 0; i--){
			var spring_sprite = this._drill_spring_tank[i];
			if( spring_sprite._drill_time > spring_sprite._drill_life ){
				this._drill_spring_tank.splice(i,1);
				delete spring_sprite;
			}
		}
	}
	//==============================
	// ** 帧刷新 - 粒子效果
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateParticle = function() {
		if( !this._drill_particles_enable ){ return }
		if( !this._drill_particles_bitmap || !this._drill_particles_bitmap.isReady() ){ return }
		
		var pw = this._drill_particles_bitmap.width;
		var ph = this._drill_particles_bitmap.height;
		
		for(var i= 0; i< this._drill_particles.length; i++){
			var par = this._drill_particles[i];
			
			if( par.x < 0 - pw ||		 //超出边界判定
				par.x > this.drill_widthInLeft() + pw ||
				par.y < 0 - ph ||
				par.y > this.drill_height() + ph ){
				par.cur_life -= par.cur_life/3;
			}
			
			par.x += (this._drill_particles_speedX + par.cur_random);
			par.y += (this._drill_particles_speedY + par.cur_random);
			par.cur_life -= 1;
			if( this._drill_particles_mode == "随机出现" ||
				this._drill_particles_mode == "左侧出现" ){	//随机出现有先显示后消失的过程
				var q = this._drill_particles_life/4;
				if( par.cur_life < q ){
					par.opacity = 255 * ( par.cur_life / q) ;
				}else if( par.cur_life > q*3 ){
					par.opacity = 255 * (( par.cur_life-q*3)/ q) ;
				}
			}else{
				par.opacity = 255 * ( par.cur_life / this._drill_particles_life);
			}
			
			if( par.cur_life <= 0 ){	//重新出现粒子
				par.cur_life = this._drill_particles_life + Math.random()*0.4*this._drill_particles_life;
				if( this._drill_particles_mode == "底部出现" ){
					par.x = this.drill_widthInLeft() * Math.random();
					par.y = this.drill_height() + ph/2;
				}else if( this._drill_particles_mode == "顶部出现" ){
					par.x = this.drill_widthInLeft() * Math.random();
					par.y = 0 - ph/2;
				}else if( this._drill_particles_mode == "左侧出现" ){
					par.opacity = 0;
					par.x = 0 - pw/2 * Math.random();
					par.y = this.drill_height() * Math.random();
				}else if( this._drill_particles_mode == "右侧出现" ){
					par.x = this.drill_widthInLeft() + pw/2;
					par.y = this.drill_height() * Math.random();
				}else{
					par.opacity = 0;		//随机出现
					par.x = this.drill_widthInLeft() * Math.random();
					par.y = this.drill_height() * Math.random();
				}
			}
		}
	}
	//==============================
	// ** 帧刷新 - 游标
	//==============================
	Drill_GaugeMeter_Sprite.prototype.updateFloating = function() {
		if( !this._drill_floating_enable ){ return }
		
		var temp_sprite = this._drill_floating_sprite;
		var float_pos;
		var float_cur = this._drill_level_cur_value;
		var float_max = this._drill_level_max;
		if(this._drill_floating_reset){
			var a2 = Math.floor( float_cur % float_max);
			float_pos = this.drill_width() * a2 / float_max;
		}else{
			float_pos = this.drill_widthInLeft(); 
		}
		temp_sprite.x = float_pos; 
		temp_sprite.y = this.drill_height()/2;
		temp_sprite.x += this._drill_floating_x;
		temp_sprite.y += this._drill_floating_y;
		
		//>动画帧
		this._drill_floating_time += 1;
		if( this._drill_floating_time > this._drill_floating_interval ){
			this._drill_floating_time = 0;
			
			this._drill_floating_cur += 1;
			var len = this._drill_floating_bitmaps.length;
			if(this._drill_floating_cur >= len ){
				this._drill_floating_cur = 0;
			}
			if( this._drill_floating_backrun ){
				temp_sprite.bitmap = this._drill_floating_bitmaps[len - 1 - this._drill_floating_cur];
			}else{
				temp_sprite.bitmap = this._drill_floating_bitmaps[this._drill_floating_cur];
			}
		}
		
		//>游标模式
		if(this._drill_floating_mode == "亮光模式"){
			var a2 = Math.floor( float_cur % float_max);
			var tar_o ;
			if( a2 < float_max/3){
				tar_o = 255 * a2/(float_max/3);
			}
			if( a2 > float_max/3*2){
				tar_o = 255 - 255 * (a2 - float_max/3*2)/(float_max/3);
			}
			if(temp_sprite.opacity > tar_o){
				temp_sprite.opacity -= 3;
				if(temp_sprite.opacity < tar_o){
					temp_sprite.opacity = tar_o;
				}
			}
			if(temp_sprite.opacity < tar_o){
				temp_sprite.opacity += 3;
				if(temp_sprite.opacity > tar_o){
					temp_sprite.opacity = tar_o;
				}
			}
		}else if(this._drill_floating_mode == "闪烁模式"){
			temp_sprite.opacity += this._drill_floating_flash * 5;
			if(temp_sprite.opacity == 255){
				this._drill_floating_flash = -1;
			}
			if(temp_sprite.opacity == 0){
				this._drill_floating_flash = 1;
			}
		}else if(this._drill_floating_mode == "受伤模式"){
			temp_sprite.opacity -= 5;
			if( this._drill_cur_value > this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
		}else if(this._drill_floating_mode == "增量模式"){
			temp_sprite.opacity -= 5;
			if( this._drill_cur_value < this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
		}else if(this._drill_floating_mode == "变化模式"){
			temp_sprite.opacity -= 5;
			if( this._drill_cur_value > this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
			if( this._drill_cur_value < this._drill_new_value ){
				temp_sprite.opacity = 255;
			}
		}else{
			temp_sprite.opacity = 255;
		}
		
	}

	//==============================
	// * 获取 - 层级图片是否准备就绪
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_isLevelsReady = function() {
		if( !this._drill_level_bitmaps ){ return false; }
		if( this._drill_level_bitmaps.length == 0 ){ return false; }
		var result = true;
		for( var i=0; i<this._drill_level_bitmaps.length; i++ ){
			if( !this._drill_level_bitmaps[i].isReady() ){ result = false; }
		}
		return result;
	}
	//==============================
	// * 获取 - 宽度（如果流动，返回三分之一）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_width = function(){
		if( this._drill_level_bitmaps.length == 0 ){ return 0; } 
		if( this._drill_level_bitmaps[0].isReady() == false ){ return 0; }
		if(this._drill_is_meter_moving){
			return this._drill_level_bitmaps[0].width /3;
		}else{
			return this._drill_level_bitmaps[0].width;
		}
	}
	//==============================
	// * 获取 - 高度
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_height = function() {
		if( this._drill_level_bitmaps.length == 0 ){ return 0; }
		if( this._drill_level_bitmaps[0].isReady() == false ){ return 0; }
		return this._drill_level_bitmaps[0].height;
	}
	//==============================
	// * 获取 - 参数条宽度（根据剩余的参数条的宽度来确定）
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_widthInLeft = function(){
		if( this._drill_level_bitmaps.length == 0 ){ return 0; } 
		if( this._drill_level_bitmaps[0].isReady() == false ){ return 0; }
		
		var a1 = Math.floor(this._drill_level_cur_value / this._drill_level_max);
		var a2 = Math.floor(this._drill_level_cur_value % this._drill_level_max);
		var ww = this._drill_level_width / this._drill_level_max * a2;
		if(this._drill_is_meter_moving){
			if(a1 == 0 ){	//只剩最后一层时
				return ww/3;
			}else{
				return this._drill_level_bitmaps[0].width /3;
			}
		}else{
			if(a1 == 0 ){	//只剩最后一层时
				return ww;
			}else{
				return this._drill_level_bitmaps[0].width;
			}
		}
	}
	//==============================
	// * 获取 - 层级数量
	//==============================
	Drill_GaugeMeter_Sprite.prototype.drill_getCurLevelNum = function() {
		return Math.floor(this._drill_level_cur_value / this._drill_level_max);
	}

	//=============================================================================
	// * 	Drill_SpringMeter_Sprite 弹出条类
	//
	//		初始化参数：见initialize函数中的方括号。
	//		使用方法：	1.属参数条专用。也可以外部使用。
	//					2.在参数条中直接new，设置速度、图像、持续时间 等参数，弹出条自己刷新轨迹。
	//=============================================================================
	function Drill_SpringMeter_Sprite() {
		this.initialize.apply(this, arguments);
	}

	Drill_SpringMeter_Sprite.prototype = Object.create(Sprite.prototype);
	Drill_SpringMeter_Sprite.prototype.constructor = Drill_SpringMeter_Sprite;

	Drill_SpringMeter_Sprite.prototype.initialize = function(settings) {
		Sprite.prototype.initialize.call(this);
		this._drill_data = settings;	//链接对象（包含object）
		//alert(JSON.stringify(settings));
		
		this._drill_type = this._drill_data['s_type'];			//模式
		this._drill_life = this._drill_data['s_life'];			//持续时间
		this._drill_time = 0;									//计时器
		this._drill_ran = Math.random();						//随机速度
		
		this.bitmap = this._drill_data['s_bitmap'];
		this.x = this._drill_data['s_x'];
		this.y = this._drill_data['s_y'];
		eval( "this._drill_function_formulaX = function( time ){ return " + this._drill_data['s_formulaX'] + "; }")
		eval( "this._drill_function_formulaY = function( time ){ return " + this._drill_data['s_formulaY'] + "; }")
	}
	//==============================
	// ** 帧刷新 - 弹出轨迹
	//==============================
	Drill_SpringMeter_Sprite.prototype.update = function() {
		Sprite.prototype.update.call(this);
		
		this._drill_time += 1;
		
		var time = this._drill_time;
		var ran = this._drill_ran;
		this.opacity -= 255 / this._drill_life;
		this.x += this._drill_function_formulaX.call(this,time);
		this.y += this._drill_function_formulaY.call(this,time);
		
	}

}


