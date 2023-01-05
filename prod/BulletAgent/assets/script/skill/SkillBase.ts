import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillBase')
export class SkillBase extends Component {
    protected _parent : Node = null;
    protected _hero : Node = null;
    protected _prefab : Prefab = null;

    constructor(parent:Node, hero:Node, prefab:Prefab){
        super();
        this._parent = parent;
        this._hero = hero;
        this._prefab = prefab;
    }

    public doSkill(){}
}


