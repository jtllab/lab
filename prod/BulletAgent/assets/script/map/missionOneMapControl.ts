import { _decorator, Component, Node, Prefab, Vec3, instantiate } from 'cc';
import { heroControl } from '../hero/heroControl';
import { CoordinateUnit, Degree } from '../utils/commonUtils';
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

    upBorder : number = 1920;

    downBorder : number = -1920;

    leftBorder : number = -1920;

    rightBorder : number = 1920;

    //地图半径
    mapPrefabRadius : number = 1920;

    onLoad() {
        this.heroControl = this.heroNode.getComponent(heroControl);
        let BG = this.node.getChildByName("BG");
        this.mapList.push(BG);

    }

    start() {
        
    }

    update(deltaTime: number) {
        let playerWorldPosition = this.heroControl.playerMoveNode.getWorldPosition();
        //玩家逼近上边界
        if (this.upBorder - playerWorldPosition.y < 50){
            let nearMap = this.getMaxPositionOffset(CoordinateUnit.Y, Degree.MAX);
            let mapInstance = instantiate(this.cityMap);
            // mapInstance.setPosition();
        }
        //玩家逼近下边界
        if (this.downBorder - playerWorldPosition.y > -50){

        }
        //玩家逼近左边界
        if (this.leftBorder - playerWorldPosition.x > -50){

        }
        //玩家逼近右边界
        if (this.rightBorder - playerWorldPosition.x < 50){

        }
    }

    cityMapGenerate(position : Vec3){
        let cityMapInstance = instantiate(this.cityMap);
        cityMapInstance.setPosition(position);
        this.node.addChild(cityMapInstance);
    }

    getMaxPositionOffset(unit : CoordinateUnit, degree : Degree):Vec3{
        this.mapList.forEach(e => {
        });
        return new Vec3();
    }
}


