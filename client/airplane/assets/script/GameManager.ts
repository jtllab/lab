
import { _decorator, Component, Node, Prefab, instantiate, math, sp, Vec3, BoxCollider } from 'cc';
import { EnemyPlane } from './EnemyPlane';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;

    // enemy
    @property(Prefab)
    public enemy01: Prefab = null;
    @property(Prefab)
    public enemy02: Prefab = null;
    @property
    public createEnemyTime = 1;
    @property
    public enemy1Speed = 0.5;
    @property
    public enemy2Speed = 0.7;

    private _currCreateEnemyTime = 0;
    private _combinationInterval = Constant.Combination.PLAN1;

    update (deltaTime: number) {

        this._currCreateEnemyTime += deltaTime;
        if(this._combinationInterval === Constant.Combination.PLAN1){
            if(this._currCreateEnemyTime > this.createEnemyTime){
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        } else if(this._combinationInterval === Constant.Combination.PLAN2){
            if(this._currCreateEnemyTime > this.createEnemyTime * 0.9){
                const randomCombination = math.randomRangeInt(1, 3);
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.createCombination1();
                } else {
                    this.createEnemyPlane();
                }

                this._currCreateEnemyTime = 0;
            }
        } else {
            if(this._currCreateEnemyTime > this.createEnemyTime * 0.8){
                const randomCombination = math.randomRangeInt(1, 4);
                if (randomCombination === Constant.Combination.PLAN2) {
                    this.createCombination1();
                } else if (randomCombination === Constant.Combination.PLAN3) {
                    this.createCombination2();
                } else {
                    this.createEnemyPlane();
                }

                this._currCreateEnemyTime = 0;
            }
        }
    }


    public createEnemyPlane(){
        const whichEnemy = math.randomRangeInt(1, 3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;
        } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
        }

        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(this, speed);

        const randomPos = math.randomRangeInt(-25, 26);
        enemy.setPosition(randomPos, 0, -50);
    }
    public createCombination1(){
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy01);
            const element = enemyArray[i];
            element.parent = this.node;
            element.setPosition(-20 + i * 10, 0, -50);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy1Speed);
        }
    }

    public createCombination2(){
        const enemyArray = new Array<Node>(7);

        const combinationPos = [
            -21, 0, -60,
            -14, 0, -55,
            -7, 0, -50,
            0, 0, -45,
            7, 0, -50,
            14, 0, -55,
            21, 0, -60,
        ];

        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemy02);
            const element = enemyArray[i];
            element.parent = this.node;
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy2Speed);
        }
    }

    private _changePlaneMode(){
        this.schedule(this._modeChanged, 10, 3);
    }

    private _modeChanged(){
        this._combinationInterval ++;
    }
}
