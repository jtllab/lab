import { _decorator, Component, Node,EventTouch, input, Input, EventMouse, Collider, ITriggerEvent } from 'cc';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    
    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    private _onTriggerEnter(event: ITriggerEvent){
        const collisionGroup = event.otherCollider.getGroup();
        if(collisionGroup === Constant.CollisionType.ENEMY_PLANE){
            console.log('game over');
        }
    }
}


