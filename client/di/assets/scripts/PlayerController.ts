import { _decorator, Component, Node, KeyCode, Vec2, Animation, EventMouse, EventKeyboard, input, Input, RigidBody2D, math, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _speed : number = 8; 
    private _state : string = ''; 
    private _curPos: Vec2 = new Vec2();
    private _playerAni: Animation = null;

    start() {
        let collider = this.node.getComponent(BoxCollider2D);
    }

    update(deltaTime: number) {
        
    }

    onLoad() {
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
        this._playerAni = this.node.getComponent(Animation);
    }

    onMouseUp(event: EventMouse) {
    }

    getPlayerControl(event: EventKeyboard){
        if (event.keyCode == KeyCode.KEY_A || event.keyCode == KeyCode.ARROW_LEFT){
            this.Move(-this._speed, 0); 
            this.setState('player_left');
        }

        if (event.keyCode == KeyCode.KEY_D || event.keyCode ==KeyCode.ARROW_RIGHT){
            this.Move(this._speed, 0); 
            this.setState('player_right');
        }

        if (event.keyCode == KeyCode.KEY_W || event.keyCode == KeyCode.ARROW_UP){
            this.Move(0, this._speed); 
            this.setState('player_up');
        }

        if (event.keyCode == KeyCode.KEY_S || event.keyCode == KeyCode.ARROW_DOWN){
            this.Move(0, -this._speed); 
            this.setState('player_down');
        }
    }

    onKeyDown(event: EventKeyboard){
        //Input[event.keyCode] = true;

        this.getPlayerControl(event);
    }

    Move(x, y){
        let body = this.node.getComponent(RigidBody2D);
        let move = new math.Vec2(x, y);
        body.linearVelocity = move;
        body.linearDamping = 1;
    }

    onKeyUp(event: EventKeyboard){
        
    }

    onKeyPressing(event: EventKeyboard){
        this.getPlayerControl(event);
    }

    setState(state){
        if (this._state == state) return;

        this._state = state;
        if (this._playerAni){
            this._playerAni.play(this._state);
        }
    }
}


