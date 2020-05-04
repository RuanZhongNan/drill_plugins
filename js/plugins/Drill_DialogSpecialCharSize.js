//=============================================================================
// Drill_DialogSpecialCharSize.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        对话框 - 特殊字符大小控制器
 * @author Drill_up
 * 
 *
 * @param ----缩放符----
 * @default 
 *
 * @param 字体缩放值
 * @parent ----缩放符----
 * @type number
 * @min 1
 * @desc 对话框中， \{ 放大、 \} 缩小 字体的像素值。（rmmv默认：12，建议：8）
 * @default 8
 *
 * @param 字体缩放上限
 * @parent ----缩放符----
 * @type number
 * @min 1
 * @desc 对话框中， \{ 字符放大字体的最大像素值。（rmmv默认：96）
 * @default 180
 *
 * @param 字体缩放下限
 * @parent ----缩放符----
 * @type number
 * @min 1
 * @desc 对话框中， \} 字符缩小字体的最小像素值。（rmmv默认：24）
 * @default 8
 *
 * @param ----图标符----
 * @default 
 * 
 * @param 图标是否根据字体大小变换
 * @parent ----图标符----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。字体大小将会影响图标大小。
 * @default true
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogSpecialCharSize +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以控制 \{ 和 \} 修改字体大小。并且图标大小也可以修改。
 * rmmv默认图标符大小不随字体变化。
 * ★★必须放在 对话框-消息核心 插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于所有窗口文本的地方。
 * 2.缩放符的缩放效果，是根据当前窗口的字体大小而决定的。
 * 3.不支持特殊字符的窗口，自然也不支持字体/图标缩放。
 * 4.如果字符太大，对话框中的字符是不会画出来的，要适当控制大小。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSCS（Dialog_Special_Char_Size）
//		临时全局变量	DrillUp.g_DSCS_xxx
//		临时局部变量	this._drill_DSCS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_Base.prototype.makeFontBigger
//						Window_Base.prototype.makeFontSmaller
//
//插件记录：
//		★大体框架与功能如下：
//			特殊字符：
//				->缩放符
//				->图标符
//
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			1.缩放符与YEP_MessageCore的设置会相互覆盖。
//			2.整个图标绘制围绕两个函数：
//				processDrawIcon 绘制字符图标
//				drawIcon 绘制图标
//			  要确定drawIcon函数执行的时候，是绘制字符在执行。
//			3.textState 框数据：
//				x - 【当前行】的偏移位置，超出位置则不会绘制字符
//				y - 第N行的高度
//				height - 当前行的高度（大字符会撑开高度，以最高为准）
//				index - 第N个字符（包括\n）
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogSpecialCharSize = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogSpecialCharSize');
	
	DrillUp.g_DSCS_scale = Number(DrillUp.parameters['字体缩放值'] || 8);	
	DrillUp.g_DSCS_scale_max = Number(DrillUp.parameters['字体缩放上限'] || 180);	
	DrillUp.g_DSCS_scale_min = Number(DrillUp.parameters['字体缩放下限'] || 8);	
	DrillUp.g_DSCS_icon_fit = String(DrillUp.parameters['图标是否根据字体大小变换'] || "true") === "true";	
	
//=============================================================================
// ** 缩放符
//=============================================================================
Window_Base.prototype.makeFontBigger = function() {
	var real_max = Math.max( DrillUp.g_DSCS_scale_max , this.standardFontSize() );
    if (this.contents.fontSize <= real_max ) {
        this.contents.fontSize += DrillUp.g_DSCS_scale;
		if( this.contents.fontSize > real_max ){
			this.contents.fontSize = real_max;
		}
    }
};
Window_Base.prototype.makeFontSmaller = function() {
	var real_min = Math.min( DrillUp.g_DSCS_scale_min , this.standardFontSize() );
    if (this.contents.fontSize >= real_min ) {
        this.contents.fontSize -= DrillUp.g_DSCS_scale;
		if( this.contents.fontSize < real_min ){
			this.contents.fontSize = real_min;
		}
    }
};

//=============================================================================
// ** 图标符
//=============================================================================
var _drill_DSCS_processDrawIcon = Window_Base.prototype.processDrawIcon;
Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
	if( DrillUp.g_DSCS_icon_fit ){
		this._drill_DSCS_isProcessingFont = true;
		this._drill_DSCS_textState = textState;
		_drill_DSCS_processDrawIcon.call(this, iconIndex, textState);
		this._drill_DSCS_isProcessingFont = false;
		textState.x -= ( Window_Base._iconWidth + 4 );	//下一个字符的偏移位置
		textState.x += this.contents.fontSize + 4 ;
	}else{
		_drill_DSCS_processDrawIcon.call(this, iconIndex, textState);
	}
};

var _drill_DSCS_drawIcon = Window_Base.prototype.drawIcon;
Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
	if( this._drill_DSCS_isProcessingFont == true && DrillUp.g_DSCS_icon_fit ){
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		var size = this.contents.fontSize ;		//图标/字体 大小
		var textState = this._drill_DSCS_textState;	//获取绘制文字时的textState框数据
		var yy = y + textState.height/2 - size/2;
		
		this.contents._context.imageSmoothingEnabled = false;
		this.contents.blt(bitmap, sx, sy, pw, ph, x, yy, size, size);
		this.contents._context.imageSmoothingEnabled = true;
	}else{
		_drill_DSCS_drawIcon.call(this,iconIndex, x, y);
	}
};



