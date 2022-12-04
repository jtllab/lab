import { _decorator, Component, Node, input, Input, EventMouse, Vec3, Collider2D, BoxCollider2D, IPhysics2DContact, Contact2DType } from 'cc';
import { GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;

@ccclass('bird_control')
export class bird_control extends Component {

    //上升坐标
    speedVec = new Vec3();

    //上升速度
    speed: number = 0;



    start() {

        
    }

    onLoad() {
        
        //鼠标监听
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        //碰撞监听
        let boxCollider = this.node.getComponent(BoxCollider2D);
        boxCollider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }


    onMouseDown(event: EventMouse) {
        this.speed = 1.6;
    }


    update(deltaTime: number) {

        if(GameStatus.gamestate == GameState.GamePlaying) {
            
            this.speed -= 0.02
            this.speedVec.set(0, this.node.getPosition().y + this.speed,0);
            this.node.setPosition(this.speedVec);
            
        }

        //重置
        if(GameStatus.gamestate == GameState.GameReady){
            this.node.setPosition(new Vec3(0,0,0));
            this.speed = 0;
        }

        //出界
        if( this.node.getPosition().y < -256 || this.node.getPosition().y > 256) {
            GameStatus.setGameStateOver();
        }

        


    }

    //碰撞检测
    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null){

        if(other.tag === 0){
            
            GameStatus.setGameStateOver();
            
        }

    }
}


