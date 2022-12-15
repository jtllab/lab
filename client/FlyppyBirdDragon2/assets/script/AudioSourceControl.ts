import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

export enum SoundType {
    SoundFly = 0,
    SoundScore,
    SoundDie,
    SoundStart
}

@ccclass('AudioSourceControl')
export class AudioSourceControl extends Component {

    @property(AudioClip)
    flySound : AudioClip;

    @property(AudioClip)
    scoreSound : AudioClip;

    @property(AudioClip)
    dieSound : AudioClip;

    @property(AudioClip)
    startSound : AudioClip;

    @property(AudioSource)
    audioSource : AudioSource;

    start() {

    }
    
    playSound(type : SoundType){
        // if (type === SoundType.SoundFly) {
        //     this.audioSource.playOneShot(this.flySound);
        // }else if (type === SoundType.SoundScore){
        //     this.audioSource.playOneShot(this.scoreSound);
        // }else if (type === SoundType.SoundStart){
        //     this.audioSource.playOneShot(this.startSound);
        // }else if (type === SoundType.SoundDie){
        //     this.audioSource.playOneShot(this.dieSound);
        // }
    }

    update(deltaTime: number) {
        
    }
}


