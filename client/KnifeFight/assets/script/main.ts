import { _decorator, Component, Node, UITransform, input, Input, Vec3, Button, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property
    knifeList: Node[] = new Array()
    heroNode: Node = null
    woodNode: Node = null
    addKnifeButton: Node = null
    speedUpButton: Node = null
    rotation: number = 2
    startPosition: any = null
    step: number = 10

    @property(Prefab)
    knifePrefab : Prefab = null;

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.touch_move, this)
        input.on(Input.EventType.TOUCH_START, this.touch_start, this)
    }

    update(deltaTime: number) {
        for (let i = 1; i < this.knifeList.length + 1; i++){
            this.knifeList[i - 1].angle += this.rotation
        }
    }

    onEnable() {
        this.heroNode = this.node.getChildByName("hero")
        this.woodNode = this.node.getChildByName("target")
        this.addKnifeButton = this.node.getChildByName("AddKnife")
        this.speedUpButton = this.node.getChildByName("speedUp")
        // this.knifeNode.getComponent(UITransform).setAnchorPoint(0.5, -0.7)
        this.addKnifeButton.on(Button.EventType.CLICK, this.addKnifeCallBack, this)
        this.speedUpButton.on(Button.EventType.CLICK, this.speedUpCallBack, this)
        // this.knifeList.push(this.knifeNode)
    }

    modifyKnifeNode(knifeNode: Node){
        knifeNode.setPosition(this.heroNode.position.x, this.heroNode.position.y, 0)
        console.log(this.heroNode.position);
        console.log(knifeNode.position);
        
        knifeNode.setScale(0.2, 0.2, 1)
        knifeNode.getComponent(UITransform).setAnchorPoint(0.5, -0.7)
    }

    addKnifeCallBack(){
        let addKnife = instantiate(this.knifePrefab)
        this.modifyKnifeNode(addKnife)
        this.knifeList.push(addKnife)
        this.node.addChild(addKnife)
        if (this.knifeList.length === 6) {
            this.addKnifeButton.active = false
        }
        let angle = 360 / this.knifeList.length
        for (let i = 1; i < this.knifeList.length + 1; i++){
            this.knifeList[i - 1].angle = angle * i
        }
        console.log(this.knifeList);
    }

    speedUpCallBack(){
        if (this.rotation <= 5) {
            this.rotation += 1
        } else {
            this.speedUpButton.active = false
        }
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
        for (let i = 0; i < this.knifeList.length; i++){
            // let knifeNewPosition = new Vec3(this.knifeList[i].position.x + x, this.knifeList[i].position.y + y, this.knifeList[i].position.z)
            // this.knifeList[i].setPosition(knifeNewPosition);
            this.knifeList[i].setPosition(newPosition);
        }
        this.heroNode.setPosition(newPosition);
        console.log("move", location);
    }
}


