import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export enum CoordinateUnit {
    X = "X",
    Y = "Y",
    Z = "Z"
}

export enum Degree {
    MAX = "MAX",
    MIN = "MIN",
    MID = "MID"
}

@ccclass('commonUtils')
export class commonUtils extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public static getRandomNum(min: number, max: number): number{
        return min + Math.round(Math.random() * (max - min));
    }

    public static getRandomBinary(): number{
        return Math.random() > 0.5 ? 1 : -1;
    }

    public static convertVec3ToVec2(source: Vec3): Vec2{
        return new Vec2(source.x, source.y);
    }

    /**
     * @description 返回目标坐标周围的随机位置
     * @param target 
     * @param randomRate 
     * @returns 
     */
    public static getRandomVec3AroundTarget(target: Vec3, randomRate: number): Vec3{
        return new Vec3(target.x + this.getRandomNum(-randomRate,randomRate),target.y + this.getRandomNum(-randomRate,randomRate));
    }
}


