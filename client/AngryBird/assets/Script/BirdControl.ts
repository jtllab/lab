import { _decorator, Component, Node, Canvas,Event,UITransform, input,Input,EventMouse, Animation, Vec3, Collider, log, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact, BoxCollider, BoxCollider2D } from 'cc';
import { MainControl } from './MainControl';
import { GameStatus } from './MainControl';
const { ccclass, property } = _decorator;

@ccclass('BirdControl')
export class BirdControl extends Component {
    
    @property
    setPosition = new Vec3();
    speedVec = new Vec3();
    x = new Vec3();
    //鸟的速度
    speed: number = 0;

    @property(Node)
    canvas : Node = null;

    //主逻辑脚本引用
    mainControl : MainControl = null;
    
    onLoad () {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.mainControl = this.canvas.getComponent(MainControl);
    }
    
    start() {

    }


    update(deltaTime: number) {
        
        //如果游戏状态不是Game_Playing，直接返回
       if(this.mainControl.gameStatus != GameStatus.Game_Playing)return;

        this.speed -= 0.02;
        this.speedVec.set(0,this.node.getPosition().y+this.speed,0);
        this.node.setPosition(this.speedVec);

        
        var angle = -(this.speed/2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        this.node.setRotationFromEuler(new Vec3(0,0,-angle));
        
    }
    onMouseDown(event: EventMouse) {
            this.speed = 1.5;
    }

    onTouchStart(even:EventMouse)
    {
        //如果游戏状态不是Game_Playing，直接返回
        if(this.mainControl.gameStatus != GameStatus.Game_Playing)return;
    }

    onCollisionEnter()
    {
        //游戏结束
        this.mainControl.gameOver();
        this.speed = 0;
    }
    
}


