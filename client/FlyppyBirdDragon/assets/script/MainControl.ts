import { _decorator, Component, Node, Sprite, Vec3, Prefab, instantiate, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainControl')
export class MainControl extends Component {

    @property(Sprite)
    spBg : Sprite [] = [null, null];

    @property(Prefab)
    pipePrefab : Prefab;

    pipe : Node[] = [null, null, null]


    @property
    secChangeOffset = new Vec3();

    @property
    resetOffset = new Vec3();

    spGameOver: Sprite = null;

    onLoad(){
        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(Sprite);
        this.spGameOver.node.active = false;
    }
    onBeginContact (self : Collider2D, other : Collider2D, contact : IPhysics2DContact | null){
        console.log("game over");
        this.spGameOver.node.active = true;
    }

    start() {

        //生成管道
        for (let i = 0; i < this.pipe.length; i++){
            this.pipe[i] = instantiate(this.pipePrefab);
            this.node.addChild(this.pipe[i]);
            let minY = -120;
            let maxY = 120;
            this.pipe[i].setPosition(new Vec3(190 + 170 * i, minY + Math.random() * (maxY - minY)));
            console.log(this.pipe[i].getPosition());
        }
    }


    update(deltaTime: number) {
        for (let i = 0; i < this.spBg.length; i++){
            this.spBg[i].node.setPosition(this.spBg[i].node.getPosition().subtract(this.secChangeOffset));
            if (this.spBg[i].node.getPosition().x <= -288 ){
                this.spBg[i].node.setPosition(this.resetOffset);
            }
        }

        //移动管道
        for (let i = 0; i < this.pipe.length; i++){
            this.pipe[i].setPosition(this.pipe[i].getPosition().subtract(this.secChangeOffset));
            if (this.pipe[i].getPosition().x <= -170){
                let minY = -120;
                let maxY = 120;
                this.pipe[i].setPosition(new Vec3(340, minY + Math.random() * (maxY - minY)));
            }
        }
    }

   
}


