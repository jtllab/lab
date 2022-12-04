import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
import { GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;



@ccclass('audio_control')
export class audio_control extends Component {

    @property(AudioSource)
    Sound_gameover: AudioSource;

    @property(AudioSource)
    Sound_gameplay: AudioSource;


    isplay_soundgameplay:boolean = true;
    isplay_soundgameover:boolean = true;

    start() {

    }


    


    update(deltaTime: number) {

        if(GameStatus.gamestate == GameState.GamePlaying && this.isplay_soundgameplay ){
            console.info(this.isplay_soundgameplay)
            this.Sound_gameplay.play();
            this.isplay_soundgameplay = false;
            this.isplay_soundgameover = true;
            
        }

        if(GameStatus.gamestate == GameState.GameOver && this.isplay_soundgameover){
            
            this.Sound_gameplay.stop();
            this.Sound_gameover.play();
            
            this.isplay_soundgameplay = true;
            this.isplay_soundgameover = false;
            
        }
        
    }
}


