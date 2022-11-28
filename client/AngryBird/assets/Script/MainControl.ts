import { _decorator, Component, Node, CCObject, Sprite, sp, Vec3 ,Prefab, instantiate, director,CollisionEventType, BoxCollider2D, PhysicsSystem2D, Contact2DType,Collider2D, IPhysics2DContact, log} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainControl')
export class MainControl extends Component {

    @property(Sprite)
    spBg : Sprite [] = [null, null];

    @property(Prefab)
    pipePrefab : Prefab = null;

    
    pipe: Node[] = [null, null, null]


     start() {
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = instantiate(this.pipePrefab);
            this.node.addChild(this.pipe[i]);
            var minY = -120;
            var maxY = 120;
            this.pipe[i].setPosition(new Vec3(190 + 170 * i,minY + Math.random() * (maxY - minY)));
            //console.log(this.pipe[i].getPosition());
        }
     }
     
    /* onLoad(){
        //let collider = this.getComponent(BoxCollider2D);
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            //PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            //PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            //PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }

     }
     onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact| null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact');
    }
    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        console.log('onPreSolve');
    }
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        console.log('onPostSolve');
    }

*/

     @property
     secChangeOffset = new Vec3();

     @property
    resetOffset = new Vec3();

     secOffset = new Vec3();

     tempVec3 = new Vec3();

     tmpX = new Vec3(); //日志x
     update(deltaTime: number) {

        // move pipes
        for (let i = 0; i < this.pipe.length; i++) {
            //this.pipe[i].getPosition().x -= 1.0;
            this.pipe[i].setPosition(this.pipe[i].getPosition().subtract(this.secChangeOffset));
            if (this.pipe[i].getPosition().x <= -170) {
                //this.pipe[i].x = 430;
                var minY = -120;
                var maxY = 120;
                //this.pipe[i].y = minY + Math.random() * (maxY - minY);
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

          

    }
}







