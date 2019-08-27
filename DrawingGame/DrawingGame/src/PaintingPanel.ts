class PaintingPanel extends egret.Sprite {
	private lx: number = -1;
	private ly: number = -1;

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
		if(this.lx != -1) {
			this.graphics.lineStyle(5, 0x000000);
			this.graphics.moveTo(this.lx, this.ly);
			this.graphics.lineTo(e.localX, e.localY);
			this.graphics.endFill();
		}
		this.lx = e.localX;
		this.ly = e.localY;
	}

	private onTouchBegin( e: egret.TouchEvent)
	{
		this.lx = e.localX;
		this.ly = e.localY;
	}

	private onTouchEnd( e: egret.TouchEvent)
	{
		this.lx = -1;
		this.ly = -1;
	}
}