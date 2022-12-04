import { _decorator, Component, Node, Contact2DType, Collider2D, BoxCollider2D, IPhysics2DContact, Label } from 'cc';
import { GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;

@ccclass('score_control')
export class score_control extends Component {

    score:number = 0;

    start() {
        
        //碰撞监听
        let boxCollider = this.node.getComponent(BoxCollider2D);
        boxCollider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);

    }
    onLoad() {
        
    }



    update(deltaTime: number) {

        if(GameStatus.gamestate == GameState.GameReady ){
            this.score = 0;
            this.node.getComponent(Label).string = this.score.toString();
        }
        
    }


    onBeginContact(self: BoxCollider2D, other: BoxCollider2D, contact: IPhysics2DContact | null){
        
        if(other.tag === 0){           
            this.score += 1;
            this.node.getComponent(Label).string = this.score.toString();

        }

    }
}


