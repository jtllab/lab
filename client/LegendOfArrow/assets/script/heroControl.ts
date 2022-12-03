import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode,Animation, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('heroControl')
export class heroControl extends Component {

    heroLoc : number = 0;
    left : boolean;
    right : boolean;
    up : boolean;
    down : boolean;
    private _state : string = '';
    private _playerAni: Animation = null;

    //hero移动速度
    speed:number = 2;

    @property(SpriteFrame)
    bulleteicon : SpriteFrame = null;

    start() {

    }

    onLoad()
    {
         input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this.heroLoc = this.node.getPosition().x;
        console.log(this.heroLoc);
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this._playerAni = this.node.getComponent(Animation);

        input.on(Input.EventType.MOUSE_DOWN, this.onTouch, this);

    }

    update(deltaTime: number) {
        
        if(this.left)
        {
            //节点X坐标正方向移动
            this.node.setPosition(this.node.getPosition().x-this.speed,this.node.getPosition().y);
        }
        else if(this.right)
        {
            //节点X坐标负方向移动
            this.node.setPosition(this.node.getPosition().x+this.speed,this.node.getPosition().y);
            //this.setState('walk_right');
        }
        else if(this.up)
        {
            //节点y坐标正方向移动
            this.node.setPosition(this.node.getPosition().x,this.node.getPosition().y+this.speed);

        }
        else if(this.down)
        {
            //节点y坐标负方向移动
            this.node.setPosition(this.node.getPosition().x,this.node.getPosition().y-this.speed);

        }
    }

    //按下按键时
    onKeyDown(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            //键盘A触发
            case KeyCode.KEY_A:
                console.log('AAAA');
                this.left = true;
                this.setState('hero_left');
                break;
            
            //键盘D触发
            case KeyCode.KEY_D:
                console.log('DDDD');
                this.right = true;
                this.setState('hero_right');
                break;
             //键盘W触发
            case KeyCode.KEY_W:
                console.log('WWW');
                this.up = true;
                this.setState('hero_up');
                break;
             //键盘S触发
            case KeyCode.KEY_S:
                console.log('SSS');
                this.down = true;
                this.setState('hero_down');
                break;
        }
    }
    //按键起升时触发
    onKeyUp(enevt:EventKeyboard)
    {
        switch(enevt.keyCode)
        {
            case KeyCode.KEY_A:
                this.left = false;
                break;
            case KeyCode.KEY_D:
                this.right = false;
                break;
            case KeyCode.KEY_W:
                this.up = false;
                break;
            case KeyCode.KEY_S:
                this.down = false;
                break;
        }
    }

    setState(state){
        if (this._state == state) return;

        this._state = state;
        if (this._playerAni){
            this._playerAni.play(this._state);
        }
    }

    
    onTouch()
    {
        this.fire();
        console.log('fire');
    }
    //开火射击
    fire()
    {
        let bullet:Node=new Node();
        let sprite:Sprite=bullet.addComponent(Sprite);
        //子弹图片赋值
        sprite.spriteFrame=this.bulleteicon;

        //挂载到炮台节点下
        bullet.parent=this.node;
        //设置相对父节点位置
        bullet.setPosition(0,80,0);
    }


}


