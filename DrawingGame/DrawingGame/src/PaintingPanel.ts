class PaintingPanel extends egret.Sprite {
	private lx: number = -1;
	private ly: number = -1;
	private paint: DrawedLine[][] = [];
	private currentLine: number = -1;

	private size: number = 5;
	private color = 0x000000;

	public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event)
    {
        this.graphics.beginFill( 0xffffff );
        this.graphics.drawRect( 0, 0, 1600,2600 );
        this.graphics.endFill();

		//设置显示对象可以相应触摸事件
        this.touchEnabled = true;
        //注册事件
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

	private onTouchMove( e: egret.TouchEvent)
	{
		console.log("touch move");
		let cf = this.paint[this.currentLine].length;
		if(this.lx != -1) {
			
			this.graphics.lineStyle(this.size, this.color);
			this.graphics.moveTo(this.lx, this.ly);
			this.graphics.lineTo(e.localX, e.localY);
			this.graphics.endFill();

			var fragment: DrawedLine = new DrawedLine();
			fragment.beginX = this.lx;
			fragment.beginY = this.ly;
			fragment.endX = e.localX;
			fragment.endY = e.localY;
			fragment.color = this.color;
			fragment.size = this.size;
			this.paint[this.currentLine][cf] = fragment;
		}
		this.lx = e.localX;
		this.ly = e.localY;
	}

	private onTouchBegin( e: egret.TouchEvent)
	{
		this.lx = e.localX;
		this.ly = e.localY;
		this.currentLine++;
		this.paint[this.currentLine] = [];
	}

	private onTouchEnd( e: egret.TouchEvent)
	{
		this.lx = -1;
		this.ly = -1;
	}

	public onBtnBack(e: egret.TouchEvent) {
		console.log("back");
		if(this.currentLine >= 0)
			this.currentLine--;
		this.paint.pop();
		this.rerender();
	}

	public onBtnClean(e: egret.TouchEvent) {
		console.log("clean");
		this.currentLine = -1;
		this.rerender();
	}

	private rerender() {
		this.graphics.clear();
		this.graphics.beginFill( 0xffffff );
        this.graphics.drawRect( 0, 0, 1600,2600 );
        this.graphics.endFill();
		for(var i = 0; i <= this.currentLine; i++) {
			for(var j = 0; j < this.paint[i].length; j++) {
			let frag = this.paint[i][j];

			this.graphics.lineStyle(frag.size, frag.color);
			this.graphics.moveTo(frag.beginX, frag.beginY);
			this.graphics.lineTo(frag.endX, frag.endY);
			this.graphics.endFill();
			}
		}
	}
}