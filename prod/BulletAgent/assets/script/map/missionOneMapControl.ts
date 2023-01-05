import { _decorator, Component, Node, Prefab, Vec3, instantiate } from 'cc';
import { heroControl } from '../hero/heroControl';
const { ccclass, property } = _decorator;

@ccclass('missionOneMapControl')
export class missionOneMapControl extends Component {

    @property(Prefab)
    cityMap : Prefab = null;

    @property(Node)
    heroNode : Node;

    heroControl : heroControl;

    //已生成的地图集合
    mapList : Array<Node> = new Array();

    onLoad() {
        this.heroControl = this.heroNode.getComponent(heroControl);
        let BGcity01 = this.node.getChildByName("BG_city_01");
        this.mapList.push(BGcity01);
    }

    start() {
        
    }

    update(deltaTime: number) {
        let playerWorldPosition = this.heroControl.playerMoveNode.getWorldPosition();
    }

    cityMapGenerate(position : Vec3){
        let cityMapInstance = instantiate(this.cityMap);
        cityMapInstance.setPosition(position);
        this.node.addChild(cityMapInstance);
    }
}


