import { _decorator, Component, Node, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

export enum SoundType {
    SoundFly = 0,
    SoundScore,
    SoundDie,
    SoundStart
}

@ccclass('AudioControl')
export class AudioControl extends Component {

    @property(AudioClip)
    flySound : AudioClip;

    @property(AudioClip)
    scoreSound : AudioClip;

    @property(AudioClip)
    dieSound : AudioClip;

    @property(AudioClip)
    startSound : AudioClip;

    start() {

    }
    
    playSound(type : SoundType){
        if (type === SoundType.SoundFly) {
            this.flySound.
        }else if (type === SoundType.SoundScore){

        }else if (type === SoundType.SoundStart){

        }else if (type === SoundType.SoundDie){

        }
    }

    update(deltaTime: number) {
        
    }
}


