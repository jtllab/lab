import { _decorator, Component, instantiate, Node, Prefab, Animation, Vec3, Scheduler , View, repeat } from 'cc';
import { enemyBorn } from '../enemy/enemyBorn';
import { enemyControl } from '../enemy/enemyControl';
import { SkillBase } from './SkillBase';
const { ccclass, property } = _decorator;

@ccclass('Thunder')
export class Thunder extends SkillBase {
    init(parent:Node, hero:Node, prefab:Prefab, skillInterval:number, repeat=true){
        let damage = 10;
        super.init(parent, hero, prefab, skillInterval, repeat, damage);
    }

    doSkill() {
        let visibleSize = View.instance.getVisibleSize();
        let pos = this._hero.getWorldPosition();

        let enemyBornNode:Node = null;
        for (const c of this._parent.children) {
            if (c.getComponent(enemyBorn)){
                enemyBornNode = c;
                break;
            }
        }

        // 获取视野内敌人
        let enemiesInView : Array<Node> = new Array<Node>(); 
        
        enemyBornNode.children.forEach(c => {
            if (c.getComponent(enemyControl)){
                let c_pos = c.getWorldPosition();
                let distance = new Vec3();
                Vec3.subtract(distance, pos, c_pos);
                distance.x = Math.abs(distance.x);
                distance.y = Math.abs(distance.y);

                if (distance.x <= visibleSize.x/2 && distance.y <= visibleSize.y/2){
                    enemiesInView.push(c)
                }
            }
        });


        // 找到最近的敌人并攻击
        if (enemiesInView.length > 0) {
            let thunder:Node = instantiate(this._prefab);
            this._parent.addChild(thunder);

            let nearestEnemy:Node = enemiesInView[0];
            let minPos  = new Vec3();
            Vec3.subtract(minPos, pos, nearestEnemy.worldPosition);

            enemiesInView.forEach(e => {
                let e_pos = e.getWorldPosition();
                let distance = new Vec3();
                Vec3.subtract(distance, pos, e_pos);

                if (Vec3.len(distance) < Vec3.len(minPos)) {
                    minPos = distance;
                    nearestEnemy = e;
                }
            });
            let thunderAni = thunder.getComponent(Animation);
            thunder.setWorldPosition(nearestEnemy.worldPosition);
            thunderAni.play();

            // 杀伤范围内敌人
            let radius = 100;
            enemiesInView.forEach(e => {
                let distance = new Vec3();
                let e_pos = e.getWorldPosition();
                Vec3.subtract(distance, e_pos, nearestEnemy.worldPosition);

                if (Vec3.len(distance) < radius) {
                    // 敌人扣血
                    e.getComponent(enemyControl).getHurt(this.getDamage());
                }
            });

            this.scheduleOnce(() => {
                thunder.destroy();
            }, 0.5);
        }
    }

    onDestroy(){

    }
}


