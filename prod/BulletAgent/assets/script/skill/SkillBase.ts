import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillBase')
export class SkillBase extends Component {
    // 技能挂载的父节点
    protected _parent : Node = null;
    protected _hero : Node = null;
    protected _prefab : Prefab = null;
    protected _level : number = 0;
    protected _damage : number = 0;
    protected _skillInterval: number = 1;
    protected _isRepeatedSkill: boolean = false;


    public init(parent:Node, hero:Node, prefab:Prefab, skillInterval=1, repeat=false, damage=1){
        this._parent = parent;
        this._hero = hero;
        this._prefab = prefab;
        this._isRepeatedSkill = repeat;
        this._skillInterval = skillInterval;
        this._damage = damage;
    }

    // 技能逻辑
    public doSkill(){}

    // 技能升级
    public levelUp(){}

    public getLevel() : number {
        return this._level;
    }

    public isRepeatedSkill() : boolean {
        return this._isRepeatedSkill;
    }

    protected setSkillRepead(isRepeated:boolean) : boolean{
        this._isRepeatedSkill = isRepeated;
        return this.isRepeatedSkill();
    }
    
    public getDamage() : number {
        return this._damage;
    }

    public getSkillInterval() : number {
        return this._skillInterval;
    }

    // 重复释放技能
    public doSkillRepeat(){
        if (this.isRepeatedSkill()){
            this.schedule(function() {
                this.doSkill();
            }, this.getSkillInterval());
        }
    }
}


