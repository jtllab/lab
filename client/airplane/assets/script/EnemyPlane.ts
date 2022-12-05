
import { _decorator, Component, Node, sp, ITriggerEvent, Collider } from 'cc';
import { Constant } from './Constant';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public createBulletTime = 0.5;

    private _enemySpeed = 0;
    private _gameManager: GameManager = null;

    private _currCreateBulletTime = 0;

    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update (deltaTime: number) {
        const pos = this.node.position;
        const movePos = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);


        if(movePos > OUTOFBOUNCE){
            this.node.destroy();
        }
    }

    show(gameManager: GameManager, speed: number){
        this._gameManager = gameManager;
        this._enemySpeed = speed;

    }

    private _onTriggerEnter(event: ITriggerEvent){
        const collisionGroup = event.otherCollider.getGroup();
        if(collisionGroup === Constant.CollisionType.SELF_PLANE){
            //console.log('trigger enemy destroy');
            this.node.destroy();
        }
    }
}
