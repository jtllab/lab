import { _decorator, Component, Node, UITransform, input, Input, Vec3, Button, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property
    // knifeList: Node[] = new Array(4)
    knifeNode: Node = null
    heroNode: Node = null
    woodNode: Node = null
    addKnifeButton: Node = null
    rotation: number = 2
    startPosition: any = null
    step: number = 10

    @property(Prefab)
    // knifePrefab : Prefab = null;
    pipePrefab : Prefab;

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.touch_move, this)
        input.on(Input.EventType.TOUCH_START, this.touch_start, this)
        console.log(instantiate(this.pipePrefab));
    }

    update(deltaTime: number) {
        this.knifeNode.angle += this.rotation
    }

    onEnable() {
        this.knifeNode = this.node.getChildByName("knife")
        this.heroNode = this.node.getChildByName("hero")
        this.woodNode = this.node.getChildByName("target")
        this.addKnifeButton = this.node.getChildByName("AddKnife")
        // this.heroNode.active = false
        // this.addKnifeButton.active = false
        // this.woodNode.active = false
        this.knifeNode.getComponent(UITransform).setAnchorPoint(0.5, -0.7)
        this.addKnifeButton.on(Button.EventType.CLICK, this.addKnifeCallBack, this)
        // this.knifeList.push(this.knifeNode)
    }

    addKnifeCallBack(){
        // this.knifeList.push(instantiate(this.knifePrefab))
        console.log(this.pipePrefab);
        // console.log(this.knifeList);
    }

    getAnchor() {
        let diffY = this.heroNode.position.y - this.heroNode.getComponent(UITransform).height / 2
        console.log(diffY);
    }

    touch_start(e) {
        console.log(this.node)
        let location = e.getLocation()
        this.startPosition = location
        console.log("start", location);
    }
    
    touch_move(e) {
        let location = e.getLocation()
        let x = (location.x - this.startPosition.x) / 100
        let y = (location.y - this.startPosition.y) / 100
        let newPosition = new Vec3(this.heroNode.position.x + x, this.heroNode.position.y + y, this.heroNode.position.z)
        let knifeNewPosition = new Vec3(this.knifeNode.position.x + x, this.knifeNode.position.y + y, this.knifeNode.position.z)
        this.heroNode.setPosition(newPosition);
        this.knifeNode.setPosition(knifeNewPosition);
        console.log("move", location);
    }
}


