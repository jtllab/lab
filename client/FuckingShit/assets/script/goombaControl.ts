import { _decorator, Component, Node, Input, input,Animation, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('goombaControl')
export class goombaControl extends Component {

    heroLoc : number = 0;
    left : boolean;
    right : boolean;
    private _state : string = '';
    private _playerAni: Animation = null;
    start() {
        this.setState('stand');
    }

    update(deltaTime: number) {

        if(this.left)
        {
            //节点X坐标左移
            this.node.setPosition(this.node.getPosition().x-3,this.node.getPosition().y);
        }
        else if(this.right)
        {
            //节点X坐标右移
            this.node.setPosition(this.node.getPosition().x+3,this.node.getPosition().y);
            //this.setState('walk_right');
        }//ss
        
    }
    onLoad()
    {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this.heroLoc = this.node.getPosition().x;
        console.log(this.heroLoc);
        this.left = false;
        this.right = false;
        this._playerAni = this.node.getComponent(Animation);
        console.log('start');
        
        
    }

    onKeyDown(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            //键盘A触发
            case KeyCode.KEY_A:
                //this.node.getPosition().x+1;
                console.log('AAAA');
                //this.node.setPosition(this.node.getPosition().x-10,this.node.getPosition().y);
                this.left = true;
                break;
            
            //键盘D触发
            case KeyCode.KEY_D:
                console.log('DDDD');
                //this.node.setPosition(this.node.getPosition().x+10,this.node.getPosition().y);
                this.right = true;
                this.setState('walk_right');
                break;

        }
    }

    onKeyUp(enevt:EventKeyboard)
    {
        switch(enevt.keyCode)
        {
            case KeyCode.KEY_A:
                //this.node.getPosition().x+1;
                this.left = false;
                break;
            case KeyCode.KEY_D:
                this.right = false;
                this.setState('stand');
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
}


