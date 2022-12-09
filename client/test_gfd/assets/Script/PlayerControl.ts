import { _decorator, Component, Node, input, Input, EventKeyboard, Animation, KeyCode, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

//人物状态：站立、攻击
enum PlayerState{
    stand = 0,
    attack
}

@ccclass('PlayerControl')
export class PlayerControl extends Component {


    //人物状态初始为站立状态
    player_state = PlayerState.stand;

    //人物移动速度
    speed : number = 2;

    // hero移动单位偏移量，每次update时，英雄移动的偏移量等于 posOffset * posOffsetMul，posOffsetMul为0时，不移动。
    posOffsetMul: number = 0;
    //
    posOffset: Vec3 = new Vec3(0, 0, 0);


    //是否按移动方向进行移动
    is_moveLeft : boolean = false;
    is_moveRight : boolean = false;
    is_moveUp : boolean = false;
    is_moveDown : boolean = false;


    player_animation: Animation = null;
    
    //用于判断当前播放的动画,初始为站立状态
    animation_state : string ;
    //动画种类
    move_x : string = "Youmu Konpaku move_x";  // x轴移动
    move_y : string = "Youmu Konpaku move_y";  // y轴移动
    stand : string = "Youmu Konpaku stand";    // 站立状态
    attack1: string = "Youmu Konpaku attack1";  //攻击动画1
    attack2: string = "Youmu Konpaku attack2";  //攻击动画2

    //连击数
    combo : number = 0;



    start() {

    }

    onLoad() {
        //键盘监听
        input.on(Input.EventType.KEY_DOWN,this.OnKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.OnKeyUp,this);
        //人物动画
        this.player_animation = this.node.getComponent(Animation);
        this.player_animation.on(Animation.EventType.FINISHED,this.OnAnimaFinished, this);
        
        // 每 45/60 秒调用一次 onTimer 函数
        // this.schedule(this.onTimer, 45/60);

    }

   
    //监听按键
    OnKeyDown(event: EventKeyboard){
        
        var scale_x = Math.abs(this.node.getScale().x);
        var scale_y = Math.abs(this.node.getScale().y);

        if(event.keyCode == KeyCode.KEY_J){
            //按J改为攻击状态
            this.player_state = PlayerState.attack;
            this.playerAttack();
        }
        else{
            //按下为非攻击键时，改变为站立状态，重置连击combo
            this.player_state = PlayerState.stand;
            this.combo = 0;
        }


        switch(event.keyCode){
            case KeyCode.KEY_A:
                //通过判断右移为否时才进行左移
                if(!this.is_moveRight){
                    this.is_moveLeft = true;
                    //改变x轴人物朝向需改变scale的x轴值
                    this.node.setScale(-scale_x,scale_y);
                    //X轴移动动画
                    this.SetAnimation(this.move_x);
                }
                break;
            case KeyCode.KEY_D:
                //通过判断左移为否时才进行右移，面向右，右移动画
                if(!this.is_moveLeft){
                    this.is_moveRight = true;
                    this.node.setScale(scale_x,scale_y);
                    this.SetAnimation(this.move_x);
                }
                break;


            case KeyCode.KEY_W:
                //上移，根据面向状态切换上下移动动画
                if(!this.is_moveDown){
                    this.is_moveUp = true;
                    this.SetAnimation(this.move_y);
                }
                break;

            case KeyCode.KEY_S:
                //下移，根据面向状态切换上下移动动画
                if(!this.is_moveUp){
                    this.is_moveDown = true;
                    this.SetAnimation(this.move_y);
                }
                break;
        }

        //更新位置
        this.UpdatePosOffset();

        
    }

    //松开按键
    OnKeyUp(event: EventKeyboard){
        switch(event.keyCode){
            //关闭移动状态
            case KeyCode.KEY_A:
                this.is_moveLeft = false;
                break;
            case KeyCode.KEY_D:
                this.is_moveRight = false;
                break;
            case KeyCode.KEY_W:
                this.is_moveUp = false;
                break;
            case KeyCode.KEY_S:
                this.is_moveDown = false;
                break;
        }

        //松开按键后检测当前人物状态是否为站立状态
        if(this.player_state == PlayerState.stand){
            this.SetAnimation(this.stand);
        }

        this.UpdatePosOffset();
        
    }

    //设置当前播放动画
    SetAnimation(anima){
        if (this.animation_state == anima) return;
        this.animation_state = anima;
        this.player_animation.play(this.animation_state);

    }

    //连击效果
    playerAttack(){
        if(this.combo == 0){
            this.SetAnimation(this.attack1);
        }
        else if(this.combo == 1){
            this.SetAnimation(this.attack2);
        }
        
    }


    //动画播放结束后
    OnAnimaFinished( ){
        if(this.animation_state == this.attack1 || this.animation_state == this.attack2){
            
            //根据combo值选择下一击的播放动画。攻击效果结束后，combo +1 ，总共只有2连击，所以是 %2
            this.combo = (this.combo + 1) % 2;
            //攻击动画结束后进入stand状态。
            this.player_state = PlayerState.stand;
            // 进入stand状态后，1秒内没有按下攻击键，重置combo值
            setTimeout( () =>{
                if(this.player_state == PlayerState.attack) return;
                this.combo = 0;
            },1000);
            this.SetAnimation(this.stand);
        }
        
    }


    // 更新位置
    UpdatePosOffset(){

        if(this.is_moveLeft || this.is_moveRight || this.is_moveDown || this.is_moveUp){
            //有按键按下时，速度不为0控制可移动
            this.posOffsetMul = 1;

            // 根据按键情况更新方向
            if(this.is_moveLeft){
                //节点X坐标负方向移动
                this.posOffset.x = -this.speed;
            }
            else if(this.is_moveRight){
                //节点X坐标正方向移动
                this.posOffset.x = this.speed;
            }
            else{
                this.posOffset.x = 0;
            }

            // 
            if (this.is_moveUp) {
                //节点y坐标正方向移动
                this.posOffset.y = this.speed;
            } else if (this.is_moveDown) {
                //节点y坐标负方向移动
                this.posOffset.y = -this.speed;
            } else {
                this.posOffset.y = 0;
            }

        }
        else{

            this.posOffsetMul = 0;
        }

    }


    onTimer() {
        if(this.player_state == PlayerState.stand){
            this.combo = 0;
        }

    }


    update(deltaTime: number) {

        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var off = this.posOffset.clone();
        // 乘上 posOffsetMul，在不移动时，这个值为 0，乘以0后这个向量就是 0 了，就不会移动了
        off = off.multiplyScalar(this.posOffsetMul);
        //用位置偏移量更新节点位置
        this.node.setPosition(this.node.getPosition().add(off));

        

        
    }


}


