import { _decorator, Component, Node, instantiate, Prefab } from 'cc';
import { chikenControl } from './chikenControl';
const { ccclass, property } = _decorator;

@ccclass('enemyBorn')
export class enemyBorn extends Component {

    @property(Prefab)
    chikenPrefab : Prefab = null;

    // 定义一个计数器，初始值为 0
    counter: number = 0;
    start() {
        // 在每隔 1 秒执行一次 chikenBorn 函数
        this.schedule(this.chikenBorn, 1.0);
    }

    update(deltaTime: number) {
        
    }

    chikenBorn()
    {
        //新的子弹生成新的预制体
        let chiken:Node = instantiate(this.chikenPrefab);
        
        this.node.addChild(chiken);

        //设置相对父节点位置
        chiken.setPosition(Math.random() * 960, Math.random() * 640);

        //给chiken添加移动组件
        chiken.addComponent(chikenControl);
        this.counter++;

        //数量等于10就不继续生成
        if(this.counter ==10)
        {
            this.unschedule(this.chikenBorn);
        }
    }

}


