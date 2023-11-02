import Phaser from '../lib/phaser.js'

export default class Bonus extends Phaser.Scene
{
    constructor() 
    {
    super('bonusLevel')
    }

    cX
    cY
    scalefactor

    onboardingHamster
    onboardingHamster2
    hand
    handanims

    winningNo = 4
    gameheight = 900
    counter

    currentPositionsTaken = [false, false, false, false, false, false, false, false]
    gameinprogress = true

    /////////// ANNE 
    /////////// DELETE COUNTING TEXT //////////////
    // countingtext
    //////////// ADD HAMSTER POSITION ARRAY
    counterHamsterPositionArray
    ////////////////

    hitzone
    dropZone
    cage

    correctSoundArray= ['excellent','great-job', 'well-done']
    incorrectSoundArray = ['keep-trying', 'not-quite', 'try-again']

    numHamstersCaught = 0
    currentTargetX
    currentTargetY
    startItemsArray = []
    endItemsArray = []
    barrier1Pos
    barrier2Pos
    barrier3Pos
    barrier4Pos
    barrier5Pos
    barrier6Pos
    barrier7Pos
    caughtArray

    hamsterDelay = 1000
    hamsterCaught = false
    animalstates = ['hidden', 'revealed', 'grabbed']
    animalArray = ['hamster', 'hamster', 'hamster', 'hamster', 'cat', 'dog', 'rabbit', 'duck']
    animalSound = ['hamstersound', 'hamstersound', 'hamstersound', 'hamstersound',  'catsound', 'dogsound', 'rabbitsound', 'ducksound']
    animalCorrect = [true, true, true, true, false, false, false, false]
    animalDepths = [2,10,6,8,4,4,2,2]
    animalDirections = [-1,-1,1,-1,1,-1,-1,1]
    currentAnimal=[]
    currentAnimalObject=[]

    init(){
       this.numHamstersCaught = 0
    }

    create()
    {

        //set up game
        this.getScale() 
        
        const cX= this.cX
        const cY= this.cY
        const scale = this.scalefactor
        this.currentTargetX = cX
        this.currentTargetY = cY

        this.barrier1Pos={x:cX, y:cY-20*scale}
        this.barrier2Pos={x:cX, y:cY+65*scale}
        this.barrier3Pos={x:cX, y:cY+115*scale}
        this.barrier4Pos={x:cX, y:cY+170*scale}
        this.barrier5Pos={x:cX, y:cY+200*scale}
        this.barrier6Pos={x:cX-525*scale, y:cY+330*scale}
        this.barrier7Pos={x:cX, y:cY-200*scale}

        //animal starting pos
        this.startItemsArray = [
            {x: cX-270*scale, y:cY-150*scale}, //pencilpot on desk
            {x: cX-430*scale, y:cY+330*scale}, //plant pot
            {x: cX+400*scale, y:cY+150*scale}, //chairs middle right
            {x: cX-460*scale, y:cY+240*scale}, //chairs bottom left
            {x: cX+350*scale, y:cY+140*scale}, // chairs top right
            {x: cX-400*scale, y:cY+140*scale}, //chairs top left
            {x: cX-80*scale, y:cY-50*scale}, //desk left
            {x: cX+140*scale, y:cY-50*scale}, //desk right

        ]
        //end up in cage

        this.caughtArray = [
            this.add.image(cX-120*scale, cY+60*scale, 'mg3-spritesheet_bonus', 'hamster.png').setScale(scale*0.8).setDepth(12).setAlpha(0),
            this.add.image(cX-40*scale, cY+60*scale, 'mg3-spritesheet_bonus', 'hamster.png').setScale(scale*0.8).setDepth(12).setAlpha(0),
            this.add.image(cX+40*scale, cY+60*scale, 'mg3-spritesheet_bonus', 'hamster.png').setScale(scale*0.8).setDepth(12).setAlpha(0),
            this.add.image(cX+120*scale, cY+60*scale, 'mg3-spritesheet_bonus', 'hamster.png').setScale(scale*0.8).setDepth(12).setAlpha(0)
        ]
        
        this.endItemsArray = [
            {x: cX-90*scale, y:cY+50*scale},
            {x: cX-30*scale, y:cY+50*scale},
            {x: cX+30*scale, y:cY+50*scale},
            {x: cX+90*scale, y:cY+50*scale},
            {x: cX-90*scale, y:cY+50*scale},
            {x: cX-30*scale, y:cY+50*scale},
            {x: cX+90*scale, y:cY+50*scale},
            {x: cX+30*scale, y:cY+50*scale},

        ]

        this.time.delayedCall(800, this.onboardingAnim, [], this)


        //Position static images
        this.add.image(cX, cY, 'mg3-backgroundBonus').setScale(scale)
///////////// ANNE - CHANGE THE NAME OF THE COUNTER FROM 'COUNTER.PNG' TO 'COUNTER_4.PNG' ////////
        this.counter = this.add.image(cX, cY-350*scale, 'mg3-spritesheet_bonus', 'counter_4.png').setScale(scale)
        
        ////////////     add the array of positions for the hamsters /////////////    
        this.counterHamsterPositionArray = [cX-120*scale, cX-40*scale, cX+40*scale, cX+120*scale]

        ///////DELETE THIS.COUNTINGTEXT //////////////
        // this.countingtext = this.add.text(cX+50*scale, cY-350*scale, '0', {fontSize: 100, color: 'black'}).setOrigin(0.5).setDepth(1).setScale(scale)
 ////////////////////////////////

 
 
        let cage = this.add.image(this.currentTargetX, this.currentTargetY, 'mg3-spritesheet_bonus', 'cage_back.png').setDepth(11).setScale(scale)
        this.hitzone = this.add.image(this.currentTargetX, this.currentTargetY, 'mg3-spritesheet_bonus', 'cage_front.png').setDepth(100).setScale(scale)

        // get drop zone 
        this.dropZone = new Phaser.Geom.Rectangle(
            cage.x - cage.displayWidth / 2,
            cage.y - cage.displayHeight / 2,
            cage.displayWidth,
            cage.displayHeight
            )
        

        for(let i=1; i<100; i++){
            this.time.addEvent({
                delay: 11000+(i*500),   
                callback: 
                function animal() {
                    this.animalLifeCycle(i)
                },   
                callbackScope: this,
                loop: true
            })
        }


        this.add.image(this.barrier1Pos.x, this.barrier1Pos.y, 'mg3-spritesheet_bonus', 'desk.png').setDepth(3).setScale(scale).setAlpha(1)
        this.add.image(this.barrier2Pos.x, this.barrier2Pos.y, 'mg3-spritesheet_bonus', 'chairs_03.png').setDepth(5).setScale(scale).setAlpha(1)
        this.add.image(this.barrier3Pos.x, this.barrier3Pos.y, 'mg3-spritesheet_bonus', 'chairs_02.png').setDepth(7).setScale(scale).setAlpha(1)
        this.add.image(this.barrier4Pos.x, this.barrier4Pos.y, 'mg3-spritesheet_bonus', 'chairs_01.png').setDepth(9).setScale(scale).setAlpha(1)
        this.add.image(this.barrier5Pos.x, this.barrier5Pos.y, 'mg3-spritesheet_bonus', 'table.png').setDepth(1).setScale(scale).setAlpha(1)
        this.add.image(this.barrier6Pos.x, this.barrier6Pos.y, 'mg3-spritesheet_bonus', 'plant_pot.png').setDepth(11).setScale(scale).setAlpha(1)
        this.add.image(this.barrier7Pos.x, this.barrier7Pos.y, 'mg3-spritesheet_bonus', 'desk_props.png').setDepth(3).setScale(scale).setAlpha(1)

        let hamstersoundplaying = false

        // Move the draggable with the pointer
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            
            if(gameObject.isHamster
                &&
                (gameObject.animalstate == 'revealed' || gameObject.animalstate == 'grabbed')

                ){
                console.log("Gotcha")
                gameObject.animalstate = 'grabbed'
                gameObject.setDepth(11)
                gameObject.x = dragX
                gameObject.y = dragY    
                
                if(hamstersoundplaying == false) {
                    this.scene.sound.play('hamstersound')       
                    hamstersoundplaying=true
                }
            } 

        })
    
        // Release the draggable
        this.input.on('dragend', (pointer, gameObject) => {

            hamstersoundplaying = false
            //match the drop zone

            const inDropZone = Phaser.Geom.Intersects.RectangleToRectangle(
                gameObject.getBounds(),
                this.dropZone
            )
    
            // If the correct draggable is dropped in the drop zone...
            if (inDropZone && gameObject.isHamster  && this.gameinprogress)
            {
                this.numHamstersCaught++
/////////// ANNE 
            ////////// DELETE COUNTING TEXT //////////////
                // this.countingtext.text = this.numHamstersCaug

             /// ADD COUNTING HAMSTERS 
            this.add.image(this.counterHamsterPositionArray[this.numHamstersCaught-1], cY-350*scale, 'mg3-spritesheet_bonus', 'counter_hamster.png').setScale(scale)




/////////////////////////
                this.sound.play('correct')
                this.time.delayedCall(800, this.playsoundright, [], this )


                this.tweens.add({
                    targets: gameObject,
                    props: {
                        alpha: {value: 0, duration: 200},
                    },
                    ease: 'Sine.easeInOut',
                })

                gameObject.destroy()
                this.tweens.add({
                    targets: this.caughtArray[this.numHamstersCaught-1],
                    props: {
                        alpha: {value: 1, duration: 200},
                    },
                    ease: 'Sine.easeInOut',
                }) 

                if(this.numHamstersCaught == this.winningNo) {
                    this.gameinprogress = false
                    this.time.delayedCall(2000, this.finalvo, [], this)
                    this.time.delayedCall(6000, this.endGame, [], this)

                }
                                    
            }
            else {
                console.log("wrong zone")
                if(this.gameinprogress){
                    this.sound.play(this.animalSound[gameObject.animalindex])
                    if(gameObject.isHamster){
                        this.sound.play('incorrect')
                    }
                    
                    this.time.delayedCall(800, this.playsoundwrong, [], this )

                }

                this.tweens.add({
                    targets: gameObject,
                    props: {
                        alpha: {value: 0, duration: 800},
                    },
                    ease: 'Sine.easeInOut',
                })

                const hide = () => {
                    gameObject.destroy()
                }  
                this.time.delayedCall(800, hide, [], this)

            }
            })

            // Onboarding
            this.onboardingHamster = this.add.image(this.startItemsArray[2].x, this.startItemsArray[2].y, 'mg3-spritesheet_bonus', 'hamster.png').setScale(this.scalefactor).setDepth(6).setAlpha(0)
            this.onboardingHamster2 = this.add.image(this.startItemsArray[2].x, this.cY+50*this.scalefactor, 'mg3-spritesheet_bonus', 'hamster.png').setScale(this.scalefactor).setDepth(30).setAlpha(0)
            this.hand = this.add.spine(this.startItemsArray[2].x, this.cY+50*this.scalefactor, 'hand').setDepth(30).setAlpha(0)
            this.handanims = this.hand.getAnimationList()

    }




        animalLifeCycle(i){


            //make animal appear in a place that has no animal
            
            this.currentAnimalObject[i] = this.addAnimal()
            
            
            if(this.currentAnimalObject[i].animalcreated){
                this.currentAnimal[i] = this.currentAnimalObject[i].animal
                this.currentAnimal[i].isHamster = this.currentAnimalObject[i].isHamster
                this.currentAnimal[i].animalindex = this.currentAnimalObject[i].index
                this.currentAnimal[i].animalstate = 'hidden'
                this.currentAnimal[i].setAlpha(0).setDepth(this.currentAnimalObject[i].animalDepth)
            }


            // //block this position so other animals can't appear there    
            this.currentPositionsTaken[this.currentAnimalObject[i].positionindex]=true
    
            // //make it pop out unless grabbed or caught
            if(this.currentAnimal[i]){
                this.popUpAnimal(this.currentAnimal[i], this.currentAnimalObject[i].yPosition)

                // const removeGameObject = () => {
                //     this.disappearSoftly(gameObject)
                // }
        
                //         this.time.delayedCall(1500, removeGameObject, [], this)

                const down = () => {
                    this.popDownAnimal(this.currentAnimal[i], this.currentAnimalObject[i].yPosition)

                }

                this.time.delayedCall(2000, down, [], this)
            }

            const disappear = () => {
                if(this.currentAnimal[i]){
                    this.hideAnimal(this.currentAnimal[i], this.currentAnimalObject[i])
                }
            }
            
            // //destroy the animal after the animation
            this.time.delayedCall(5000, disappear, [], this)

        }


        onboardingAnim() {
            this.sound.play('vo3')
            this.tweens.chain({
                targets: [this.onboardingHamster],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 0,
                        delay: 3000
                    },
                    {
                        y: this.cY+50*this.scalefactor,
                        ease: 'Sine.easeInOut',
                        duration: 1500
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 1500
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 0
                    }
                ]
            })

            const handappear = () => {
                this.hand.setAlpha(1)
            }

            const handanim = () => {
                this.hand.play(this.handanims[1], false)
            }


            this.time.delayedCall(5500, handappear, [], this)
            this.time.delayedCall(5500, handanim, [], this)
            

            this.tweens.chain({
                targets: [this.onboardingHamster2, this.hand],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 0, 
                        delay: 6000
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 0
                    },
                    {
                        x: this.cX,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 500
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 0,
                    }
                ]
            })


        }

        addAnimal(){
            let animalcreated
            let currentAnimal
            let animalindex = [(Phaser.Math.Between(0, 7))]
            let positionindex = [(Phaser.Math.Between(0, 7))]
            let isHamster = this.animalCorrect[animalindex]
            let yPosition = this.startItemsArray[positionindex].y
            let animalDepth = this.animalDepths[positionindex]
            
            if(this.currentPositionsTaken[positionindex]==false && this.gameinprogress){
                animalcreated = true
                currentAnimal = this.add.image(this.startItemsArray[positionindex].x, this.startItemsArray[positionindex].y, 'mg3-spritesheet_bonus', this.animalArray[animalindex]+'.png').setDepth(2).setScale(this.scalefactor*this.animalDirections[positionindex],this.scalefactor)
                currentAnimal.setInteractive({ draggable: true })
                currentAnimal.animalstate = 'hidden'

            } else {
                animalcreated = false 
            }
            this.currentPositionsTaken[positionindex]=true

            return {
                animalcreated: animalcreated,
                positionindex: positionindex,
                index: animalindex,
                animal: currentAnimal,
                isHamster: isHamster,
                yPosition: yPosition,
                animalDepth: animalDepth
            }
        }

        popUpAnimal(animal, currentY){
            if(animal.animalstate && animal.animalstate!='caught'  && this.gameinprogress){
                animal.animalstate = 'revealed'
                this.tweens.chain({
                    targets: [animal],
                    tweens: [
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 200
                        },
                        {
                            y: currentY - 100*this.scalefactor,
                            ease: 'Sine.easeInOut',
                            duration: 500
                        }
                    ]
                })
            }
        }

        popDownAnimal(animal, currentY){
            

                if(animal.animalstate == 'revealed'){
                    animal.animalstate = 'hidden'
                    this.tweens.chain({
                        targets: [animal],
                        tweens: [
                            {
                                y: currentY,
                                ease: 'Sine.easeInOut',
                                duration: 500,
                            },
                            {
                                alpha: 0,
                                ease: 'Sine.easeInOut',
                                duration: 100,
                            },
    
                        ]
                    })
                }  
         
        }

        hideAnimal(animal, currentAnimalObject){
            if(animal.animalstate == 'hidden'){
                this.currentPositionsTaken[currentAnimalObject.index[0]] = false
                animal.destroy()
            }
        }

        getScale() {
            let h = this.game.canvas.height;
            let w = this.game.canvas.width;
            this.cX = w / 2;
            this.cY = h / 2;
            this.scalefactor = this.game.canvas.height / this.gameheight;
        }

        playsoundright(){
            this.sound.play(this.correctSoundArray[[Phaser.Math.Between(0, 2)]])
        }

        finalvo(){
            this.sound.play('vo4')
        }   

        endGame(){
            this.scene.start('level1')
        }

        playsoundwrong(){
            this.sound.play(this.incorrectSoundArray[[Phaser.Math.Between(0, 2)]])
        }




}