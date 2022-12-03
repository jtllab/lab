import { _decorator, Component, Node, Vec2, NodePool, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    @property(SpriteFrame)
    bulleteicon : SpriteFrame = null;

    onLoad(){
        this.node.on("touchstart",this.onTouch,this)
    }

    start() {

    }

    update(deltaTime: number) {
        
    
    }

    onTouch()
    {
        this.fire();
    }

    fire()
    {
        let bulle : Node = new Node();
        let sprite : Sprite = this.bulleteicon;

        bullet.parent = this.node;
        bullet.setPosition(0,0,0);
    }
}


