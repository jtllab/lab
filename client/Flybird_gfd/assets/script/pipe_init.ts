import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pipe_init')
export class pipe_init extends Component {

    @property(Prefab)
    pipe_down: Prefab = null;

    @property(Prefab)
    pipe_up: Prefab = null;


    start() {
        this.pipe_init();
    }

    pipe_init() {
        var pipe_num = 100;
        for(let i = 0; i < pipe_num; i++) {
            var pipeDown = instantiate(this.pipe_down);
            this.node.addChild(pipeDown);
            var minY = 190;
            var maxY = 300;
            pipeDown.setPosition(new Vec3(160 + 144 * i,minY + Math.random() * (maxY - minY)));

        }
 
        for(let i = 0; i < pipe_num; i++) {
            
            var pipeUp = instantiate(this.pipe_up);
            this.node.addChild(pipeUp)
            var minY = -280;
            var maxY = -200;
            pipeUp.setPosition(new Vec3(160 + 144 * i,minY + Math.random() * (maxY - minY)));

        }

        
    }

    Reset() {
        
    }

    update(deltaTime: number) {
        if (this.node.getPosition().x <= -144 ){
            this.Reset()
        }
    }
}


