import Phaser from '../lib/phaser.js'

export default class Title extends Phaser.Scene

{

constructor()
{
super('title')
}


preload()
{

  this.load.setPath('./src/assets/')

  //key assets
    this.load.atlas(
        'mg3-spritesheet-key',
        'level_01/spritesheet_vet_key_assets.png',
        'level_01/spritesheet_vet_key_assets.json'
      )
 
  //diagnostic and treatment assets
      this.load.atlas(
        'mg3-spritesheet-diag',
        'level_01/spritesheet_vet_diag_treat.png',
        'level_01/spritesheet_vet_diag_treat.json'
      )

  //more diagnostic and treatment assets
      this.load.atlas(
        'mg3-spritesheet-diag2',
        'level_01/spritesheet_vet_diag_treat_big.png',
        'level_01/spritesheet_vet_diag_treat_big.json'
      )

  //bonus level assets
      this.load.atlas(
        'mg3-spritesheet_bonus',
        'bonus/spritesheet_vet_bonus.png',
        'bonus/spritesheet_vet_bonus.json'
      )


  //large images
    this.load.image('mg3-background', 'level_01/00_key_assets/bg_01.png')
    // this.load.image('background', 'level_01/ref/ref.jpg')
    this.load.image('mg3-backgroundBonus', 'bonus/bg.png')
    
    this.load.image('mg3-dogzoom', 'level_01/02_treatment/bg_dog_zoom.png')
    this.load.image('mg3-catzoom', 'level_01/02_treatment/bg_cat_zoom.png')
    this.load.image('mg3-rabbitzoom', 'level_01/02_treatment/bg_rabbit_zoom.png')


    // animations 

  
    this.load.spine("hand","anim/hand/onboarding_hand.json","anim/hand/onboarding_hand.atlas")
    this.load.spine("mg3-vet","level_01/vet/char_vt_big.json","level_01/vet/char_vt_big.atlas")
    this.load.spine("dog","anim/dog/vt_dog_big.json","anim/dog/vt_dog_big.atlas")
    this.load.spine("rabbit","anim/rabbit/vt_rabbit_big.json","anim/rabbit/vt_rabbit_big.atlas")


    //HI ANNE! SPINE ANIMATION LOADING FIX FOR DODGY CAT ANIMATION HERE!!
    this.load.spine("cat","anim/cat/vt_cat_big.json","anim/cat/vt_cat_big.atlas")
    // this.load.spine("cat","anim/cat/vt_cat_big.json","anim/cat/vt_cat_big.atlas", true)

    //sounds
    this.load.audio('correct', 'sounds/correct.mp3')
    this.load.audio('incorrect', 'sounds/cartoonbubblepop.mp3')
    this.load.audio('excellent', 'sounds/answering/correct/excellent.mp3')
    this.load.audio('great-job', 'sounds/answering/correct/great-job.mp3')
    this.load.audio('well-done', 'sounds/answering/correct/well-done.mp3')
    this.load.audio('keep-trying', 'sounds/answering/incorrect/keep-trying.mp3')
    this.load.audio('not-quite', 'sounds/answering/incorrect/not-quite.mp3')
    this.load.audio('try-again', 'sounds/answering/incorrect/try-again.mp3')
    this.load.audio('vo1', 'sounds/vo/vet-p01a.mp3')
    this.load.audio('vo2', 'sounds/vo/vet-p01b.mp3')
    this.load.audio('vo3', 'sounds/vo/vet-p02a.mp3')
    this.load.audio('vo4', 'sounds/vo/vet-p02b.mp3')
    this.load.audio('happydog', 'sounds/animalnoises/v01_bark.mp3')
    this.load.audio('happycat', 'sounds/animalnoises/v02_meow.mp3')
    this.load.audio('happyrabbit', 'sounds/animalnoises/v03_rabbit.mp3')
    this.load.audio('dogsound', 'sounds/animalnoises/v04_bl_bark.mp3')
    this.load.audio('hamstersound', 'sounds/animalnoises/v05_bl_hamster.mp3')
    this.load.audio('rabbitsound', 'sounds/animalnoises/v06_bl_rabbit.mp3')
    this.load.audio('catsound', 'sounds/animalnoises/v07_bl_cat.mp3')
    this.load.audio('ducksound', 'sounds/animalnoises/v08_bl_duck.mp3')

    //buttons

    this.load.image('playagain', 'buttons/playagain.png')
    this.load.image('continue', 'buttons/continue.png')
   
}

create()
{

  // this.scene.start('level1', {
  //     level: 0,
  //     firstLevel: true
  // })

  this.scene.start('bonusLevel')



}

}