import { _decorator } from 'cc';
const { ccclass } = _decorator;

@ccclass('skillConfig')
export class skillConfig{
    static content = [
        {
            skillName:'rocket', 
            config:{
                damage: 1,
                skillInterval: 1,
                isRepeatedSkill: true,
                name: "火箭发射器",
                intro: "发射一枚可以爆炸的火箭弹"
            }
        },
        {
            skillName:'rocket', 
            config:{
                damage: 10,
                skillInterval: 0.8,
                isRepeatedSkill: true,
                name: "迅雷5",
                intro: "闪电五连鞭"
            }
        },
        {
            skillName:'rocket', 
            config:{
                damage: 1,
                skillInterval: 1,
                isRepeatedSkill: false,
                name: "风火轮",
                intro: "大鸟转转转"
            }
        }
    ]
}


