import { _decorator, Component, Node, CCObject, Sprite, sp, Vec3 ,Prefab, instantiate, director,CollisionEventType, BoxCollider2D, PhysicsSystem2D, Contact2DType,Collider2D, IPhysics2DContact, log, RigidBody2D, Button, EventMouse, EventTouch, Input} from 'cc';
const { ccclass, property } = _decorator;

export enum GameStatus
{
    Game_Ready = 0, //准备
    Game_Playing,      //正在游戏
    Game_Over,      //结束
}

@ccclass('MainControl')
export class MainControl extends Component {

    @property(Sprite)
    spBg : Sprite [] = [null, null];

    @property(Prefab)
    pipePrefab : Prefab = null;
 
    
    pipe: Node[] = [null, null, null]

    spGameOver: Sprite = null;


    //开始按钮
    btnStart : Button = null;
    //游戏状态
    gameStatus : GameStatus = GameStatus.Game_Ready;
    
        start() {
            //生成障碍物
            for (let i = 0; i < this.pipe.length; i++) {
                this.pipe[i] = instantiate(this.pipePrefab);
                this.node.getChildByName("Pipe").addChild(this.pipe[i]);
                var minY = -120;
                var maxY = 120;
                this.pipe[i].setPosition(new Vec3(190 + 170 * i,minY + Math.random() * (maxY - minY)));
            }
     }
     onLoad(){
        //获取开始按钮
        this.btnStart = this.node.getChildByName("BtnStart").getComponent(Button);
        //给开始按钮添加响应
        this.btnStart.node.on(Node.EventType.TOUCH_END,this.touchStarBtn,this)
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(Sprite);
        this.spGameOver.node.active = false;
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
     }
     onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null) {
        // 只在两个碰撞体开始接触时被调用一次
        this.spGameOver.node.active = true;
        this.gameOver();
        console.log('Game Over');

    }

    touchStarBtn(even:EventMouse){
        this.btnStart.node.active = false;
        this.gameStatus = GameStatus.Game_Playing;
        this.spGameOver.node.active = false;
        
        for (let i = 0; i < this.pipe.length; i++) {
            //this.pipe[i] = instantiate(this.pipePrefab);
            //this.node.getChildByName("Pipe").addChild(this.pipe[i]);
            var minY = -120;
            var maxY = 120;
            this.pipe[i].setPosition(new Vec3(190 + 170 * i,minY + Math.random() * (maxY - minY)));
        }
        
        var bird = this.node.getChildByName("Bird");
        bird.getPosition().y = 0;
        //bird.rotation = 0;
    }
    gameOver()
    {
        this.spGameOver.node.active = true;
        this.btnStart.node.active = true;
        this.gameStatus = GameStatus.Game_Over;
    }
 
     @property
     secChangeOffset = new Vec3();

     @property
    resetOffset = new Vec3();

     secOffset = new Vec3();

     tempVec3 = new Vec3();

     tmpX = new Vec3(); //日志x
     update(deltaTime: number) {

        if(this.gameStatus != GameStatus.Game_Playing)return;

        // move pipes
        for (let i = 0; i < this.pipe.length; i++) {
            //this.pipe[i].getPosition().x -= 1.0;
            this.pipe[i].setPosition(this.pipe[i].getPosition().subtract(this.secChangeOffset));
            //刚体随着pipe位置移动
            //console.log(this.pipe[i].getChildByName("pipeUp")+"aaaa");
            //console.log(this.pipe[i].getChildByName("pipeUp").getComponent(RigidBody2D)["_body"]);
            this.pipe[i].getChildByName("pipeUp").getComponent(RigidBody2D)["_body"].syncPositionToPhysics();
            this.pipe[i].getChildByName("pipeDown").getComponent(RigidBody2D)["_body"].syncPositionToPhysics();
            if (this.pipe[i].getPosition().x <= -170) {
                var minY = -120;
                var maxY = 120;
                this.pipe[i].setPosition(new Vec3(340, minY + Math.random() * (maxY - minY)));

            }
        }

         for (let i = 0; i < this.spBg.length; i++){
         this.spBg[i].node.getPosition(this.tempVec3);
         this.spBg[i].node.setPosition(this.tempVec3.subtract(this.secChangeOffset));

            //console.log(this.spBg[i].node.getPosition(this.tmpX));
         if (this.spBg[i].node.getPosition().x <= -288 ){
             this.spBg[i].node.setPosition(this.resetOffset);
            //console.log("resetOffset");
            }
         }

          

         //GameState.getInstance().score++;
    }
}







