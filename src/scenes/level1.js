import Phaser from '../lib/phaser.js'


export default class level1 extends Phaser.Scene
{
    constructor() 
    {
    super('level1')
    }

    gameheight = 900

    onboardingtime = 7500
    dispensingtime = 11000

    background
    dock

    dropZoneAnimal
    dropZoneTweezers
    dropZoneFleas
    dropZoneBandage

    // Starting positions of the draggables
    startItem1X
    startItem1Y
    startItem2X
    startItem2Y
    startItem3X
    startItem3Y

    icon1
    icon2
    icon3
    tool1
    tool2
    tool3
    
    vet
    table
    thorn
    animal

    animalsArray = ['dog', 'cat', 'rabbit']
    animalsSadArray = ['dog_01.png', 'cat_01.png', 'rabbit_01.png']
    animalsXrayArray = ['diagnostic_xray_dog.png', 'diagnostic_xray_cat.png', 'diagnostic_xray_rabbit.png']
    animalsMagArray = ['diagnostic_mag_glass_dog.png', 'diagnostic_mag_glass_cat.png', 'diagnostic_mag_glass_rabbit.png']
    animalsMediumArray = ['dog_01.png', 'diagnostic_xray_cat.png', 'rabbit_02.png']
    animalsHappyArray = ['dog_02.png', 'cat_02.png', 'rabbit_03.png']
    diagnosisArray = ['mag', 'xray', 'exam']
    treatArray = ['flea', 'bandage', 'tweezers']
    iconArray = ['icon_diagnostic_examine.png', 'icon_diagnostic_xray.png','icon_diagnostic_mag_glass.png']
    toolsArray = ['icon_treatment_flea.png', 'icon_treatment_bandage.png','icon_treatment_tweezers.png']
    backgroundArray = ['mg3-dogzoom', 'mg3-catzoom', 'mg3-rabbitzoom']

    tick
    hex1
    hex2
    hex3
    circle1
    circle2
    circle3
    circle4
    circleBig1
    circleBig2
    circleBigBandage
    circleBigFleas
    circleBigTweezers

    bandage1
    bandage2
    bandage3

    animalState = 'justArrived'

    correctSoundArray= ['excellent','great-job', 'well-done']
    incorrectSoundArray = ['keep-trying', 'not-quite', 'try-again']
    animalTreatedSoundArray = ['happydog', 'happycat', 'happyrabbit']

    animalNumber
    animalX
    animalY

    onboardingItem
    onboardingSpareDispensedItem1
    onboardingSpareDispensedItem2
    hand
    handanims
    
    

    charanims
    anims

    cX
    cY
    scalefactor
    firstLevel

    items
    tools

    animalXray
    bunnyDiagnosed


    init(data){
        this.animalState = 'justArrived'
        // this.animalNumber=2
        this.animalNumber = data.level
        this.firstLevel = data.firstLevel
    }

    create()
    {

        /////////// SET UP GAME ///////////


        //scaling
    
        this.getScale()
        const cX = this.cX
        const cY = this.cY
        const scale = this.scalefactor

        //dispensed items
        
        this.startItem1X = cX-200*scale
        this.startItem1Y = cY+300*scale
        this.startItem2X = cX
        this.startItem2Y = cY+300*scale
        this.startItem3X = cX+200*scale
        this.startItem3Y = cY+300*scale

        // animal position

        this.animalX = cX
        this.animalY = [cY+80*scale, cY+80*scale, cY+80*scale]

        // position static images 

        this.tick = this.add.image(cX+300*scale, cY, 'mg3-spritesheet-key', 'indicator_tick.png').setDepth(5).setAlpha(0).setScale(scale)
        this.circle1 = this.add.image(cX+100*scale, cY-250*scale, 'mg3-spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0).setScale(scale) // top right
        this.circle2 = this.add.image(cX-100*scale, cY, 'mg3-spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0).setScale(scale) // bottom left
        this.circle3 = this.add.image(cX-170*scale, cY-200*scale, 'mg3-spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0).setScale(scale) // top left
        this.circle4 = this.add.image(cX+100*scale, cY, 'mg3-spritesheet-key', 'indicator_circle.png').setDepth(5).setAlpha(0).setScale(scale) //bottom right
        this.circleBig1 = this.add.image(cX, cY, 'mg3-spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0).setScale(scale)
        this.circleBig2 = this.add.image(cX, cY, 'mg3-spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0).setScale(scale)
        this.circleBigFleas = this.add.image(cX, cY, 'mg3-spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0).setScale(scale)
        this.circleBigBandage = this.add.image(cX, cY, 'mg3-spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0).setScale(scale)
        this.circleBigTweezers = this.add.image(cX, cY, 'mg3-spritesheet-key', 'indicator_circle_big.png').setDepth(5).setAlpha(0).setScale(scale)
        this.bandage1 = this.add.image(cX, cY-90*this.scalefactor, 'mg3-spritesheet-diag', 'treatment_bandage_01.png').setDepth(5).setAlpha(0).setScale(scale)
        this.bandage2 = this.add.image(cX, cY-90*this.scalefactor, 'mg3-spritesheet-diag', 'treatment_bandage_02.png').setDepth(5).setAlpha(0).setScale(scale)
        this.bandage3 = this.add.image(cX, cY-90*this.scalefactor, 'mg3-spritesheet-diag', 'treatment_bandage_03.png').setDepth(5).setAlpha(0).setScale(scale)
        this.hex1 = this.add.image(cX+30*scale, cY-150*scale,'mg3-spritesheet-key', 'indicator_hex_big.png').setDepth(5).setAlpha(0).setScale(scale)
        this.hex2 = this.add.image(cX-110*scale, cY+60*scale, 'mg3-spritesheet-key', 'indicator_hex.png').setDepth(5).setAlpha(0).setScale(scale)
        this.hex3 = this.add.image(cX-120*scale, cY-30*scale, 'mg3-spritesheet-key', 'indicator_hex.png').setDepth(6).setAlpha(0).setScale(scale)
        this.thorn = this.add.image(cX+30*scale, cY-100*scale, 'mg3-spritesheet-diag', 'treatment_thorn.png').setDepth(5).setAlpha(0).setScale(scale)
        this.background = this.add.image(cX, cY, 'mg3-background').setScale(scale)

        this.vet = this.add.spine(cX+400*scale, cY+230*scale, 'mg3-vet').setScale(scale,scale)
        this.vet.setInteractive()
        this.charanims = this.vet.getAnimationList()
        this.vet.play(this.charanims[0], false)

        this.table = this.add.image(cX, cY+250*scale, 'mg3-spritesheet-key', 'table.png').setScale(scale)
        this.dock = this.add.image(cX, cY+300*scale,  'mg3-spritesheet-key', 'dock.png').setScale(scale)

        this.animal = this.add.spine(this.animalX,this.animalY[this.animalNumber], this.animalsArray[this.animalNumber]).setScale(scale)
        this.anims = this.animal.getAnimationList()
        
        //play idle, untreated animation
        this.animal.play(this.anims[0], true)
        this.animal.correctDiagnostic = this.diagnosisArray[this.animalNumber]
        this.animal.correctTool= this.treatArray[this.animalNumber]
        this.animal.beingXrayed = false
        this.animalXray =  this.add.image(this.animalX-30*scale,this.animalY[this.animalNumber]-220*scale,'mg3-spritesheet-diag',  this.animalsXrayArray[this.animalNumber]).setScale(scale).setDepth(10).setAlpha(0)
        this.bunnyDiagnosed = this.add.image(this.animalX+20*scale,this.animalY[this.animalNumber]-290*scale,'mg3-spritesheet-key',  this.animalsMediumArray[this.animalNumber]).setScale(scale).setDepth(1).setAlpha(0)
        //drop zones

        // dropZoneAnimal for x-ray, magnifying glass
        this.dropZoneAnimal = new Phaser.Geom.Rectangle(
            this.animal.x - this.animal.displayWidth / 2,
            this.animal.y - this.animal.displayHeight / 2,
            this.animal.displayWidth,
            this.animal.displayHeight
            )

        this.dropZoneFleas = new Phaser.Geom.Rectangle(
            this.circleBigFleas.x - this.circleBigFleas.displayWidth / 2,
            this.circleBigFleas.y - this.circleBigFleas.displayHeight / 2,
            this.circleBigFleas.displayWidth,
            this.circleBigFleas.displayHeight
            )
        
        this.dropZoneTweezers = new Phaser.Geom.Rectangle(
            this.circleBig2.x - this.circleBig2.displayWidth / 2,
            this.circleBig2.y - this.circleBig2.displayHeight / 2,
            this.circleBig2.displayWidth,
            this.circleBig2.displayHeight
            )
    
        this.dropZoneBandage = new Phaser.Geom.Rectangle(
            this.circleBigBandage.x - this.circleBigBandage.displayWidth / 2,
            this.circleBigBandage.y - this.circleBigBandage.displayHeight / 2,
            this.circleBigBandage.displayWidth,
            this.circleBigBandage.displayHeight
            )

        // Start the game 

        // start the onboarding animation 
        if(this.firstLevel){
            this.sound.play('vo1')
            this.time.delayedCall(this.onboardingtime, this.onboardingAnim, [], this)
            this.time.delayedCall(this.dispensingtime, this.dispenseDiagnosticTools, [], this)

        } else {
            this.time.delayedCall(800, this.dispenseDiagnosticTools, [], this)

        }

    
            
        // When the draggable is being dragged...

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX
            gameObject.y = dragY

            //when examining gloves are pulled out, show targets for exminining

            if(gameObject.equipment=='exam'){
                gameObject.setTexture('mg3-spritesheet-diag', 'diagnostic_examine.png')
                    if(this.scene.animalNumber==0){
                        this.scene.appearCircle(this.scene.circle1)
                        this.scene.appearCircle(this.scene.circle2)
                    } else if(this.scene.animalNumber==1){
                        this.scene.appearCircle(this.scene.circle3)
                        this.scene.appearCircle(this.scene.circle4)
                    } else if(this.scene.animalNumber==2){
                        this.scene.appearCircle(this.scene.circle1)
                        this.scene.appearCircle(this.scene.circle2)
                    } 

            //when x-ray machine is pulled out, show the xrayed animal by hiding the animal animation and showing the x-rayed animal

            }
            if(gameObject.equipment=='xray'){
                gameObject.setTexture('mg3-spritesheet-diag2', 'diagnostic_xray_screen.png')
                this.scene.xrayAnimal()
                this.scene.animal.setAlpha(0)
                this.scene.animalXray.setAlpha(1).setDepth(0)
            }

            //when magnifying glass is pulled out, make it larger

            if(gameObject.equipment=='mag'){
                gameObject.setScale(2*scale)
            }

            // when flea treatment is pulled out, show the target area (dog only)
            if(gameObject.tool=='flea'){
                gameObject.setTexture('mg3-spritesheet-diag', 'treatment_flea_hand.png')
                if(this.scene.animalNumber==0){
                    this.scene.appearCircle(this.scene.circleBigFleas)
                }
            }

            //when tweezers are pulled out, show the target area (rabbit only)
            if(gameObject.tool=='tweezers'){
                if(this.scene.animalNumber==2){
                this.scene.appearCircle(this.scene.circleBigTweezers)
                }
                gameObject.setTexture('mg3-spritesheet-diag', 'treatment_tweezers.png')
            }

            //when bandage is pulled out, show target area (cat only) and set depth forward to layer over thorn (rabbit)
            if(gameObject.tool=='bandage'){
                if(this.scene.animalNumber==1){
                    this.scene.appearCircle(this.scene.circleBigBandage)
                }
                gameObject.setTexture('mg3-spritesheet-diag', 'treatment_bandage_hand_01.png').setAngle(45).setDepth(10)
            }



        })

        // When the draggable is released...

        this.input.on('dragend', (pointer, gameObject) => {


        //note where the target areas are
        this.setCircleDropZones()

      // DEFINE DROP ZONES

          
        const inDropZoneAnimal = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneAnimal
        )

        const inDropZoneTweezers = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneTweezers
        )

        const inDropZoneFleas = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneFleas
        )

        const inDropZoneBandage = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneTweezers
        )

        const inDropZoneCircle1 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle1
        )

        const inDropZoneCircle2 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle2
        )

        const inDropZoneCircle3 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle3
        )

        const inDropZoneCircle4 = Phaser.Geom.Intersects.RectangleToRectangle(
            gameObject.getBounds(),
            this.dropZoneCircle4
        )
        // note where the draggable has been released
        const x = gameObject.x
        const y = gameObject.y


            // MATCH THE CORRECT DROP ZONE TO THE GAME OBJECT
        let correctDropZoneObject
        if(gameObject.equipment == 'exam') {correctDropZoneObject= inDropZoneCircle2}
        if(gameObject.equipment == 'xray') {correctDropZoneObject= inDropZoneAnimal}
        if(gameObject.equipment == 'mag') {correctDropZoneObject= inDropZoneAnimal}
        if(gameObject.tool == 'flea') {correctDropZoneObject= inDropZoneFleas}
        if(gameObject.tool == 'bandage') {correctDropZoneObject= inDropZoneBandage}
        if(gameObject.tool == 'tweezers') {correctDropZoneObject= inDropZoneTweezers}

            // MATCH THE CORRECT OBJECT TO THE ANIMAL
        let correctEquipment
        let correctTool
        if(this.animalNumber==0) {correctEquipment='mag'}  //diagnose dog
        if(this.animalNumber==0) {correctTool='flea'}   //treat dog
        if(this.animalNumber==1) {correctEquipment='xray'}  //diagnose cat
        if(this.animalNumber==1) {correctTool='bandage'}    //treat cat
        if(this.animalNumber==2) {correctEquipment='exam'} //diagnose rabbit
        if(this.animalNumber==2) {correctTool='tweezers'}  // treat rabbit


            // HANDLE WHAT TO DO WHEN AN ICON IS DROPPED

           
            //if the examining gloves are being used but in the wrong place
        if(
            (gameObject.equipment == 'exam')
            &&
            (inDropZoneCircle1 || inDropZoneCircle3 || inDropZoneCircle4)
            &&
            inDropZoneAnimal
            ) 
            {
            console.log("wrong circle")
            this.handleDropZoneIncorrect(gameObject, x, y)
            this.resetafterIncorrect(gameObject)

        }
        
        else

        // IF ITEM IS NOT DROPPED IN THE DROP ZONE, MAKE IT DISAPPEAR AND RESET ITEMS

        if(!correctDropZoneObject)
        {
            console.log("missed target")
             this.disappear(gameObject)
             this.resetafterIncorrect(gameObject)
            }
            
        // ELSE IF ITEM IS DROPPED IN THE DROP ZONE but IS THE INCORRECT ITEM FOR THAT ANIMAL, REACT ACCORDINGLY AND RESET

        else             

        if
        (
            correctDropZoneObject && (gameObject.equipment != correctEquipment && gameObject.tool != correctTool)
        )
        {
            console.log("wrong item")
            this.handleDropZoneIncorrect(gameObject, x, y)
            this.resetafterIncorrect(gameObject)
        } 

        // ELSE IF ITEM IS DROPPED IN THE CORRECT DROP ZONE and IS THE CORRECT ITEM FOR THAT ANIMAL, REACT ACCORDINGLY AND MOVE ON
     
        else 
        {
            console.log("you got it right")
            this.moveToNextAnimalState()
            this.handleDropZoneCorrect(gameObject, x, y)
        }


        })

     

                    // Place draggables
        
        this.items = this.physics.add.group()
        this.tools = this.physics.add.group()

                    // Onboarding
        this.onboardingItem = this.add.image(this.startItem1X, this.startItem1Y, 'mg3-spritesheet-key', this.iconArray[0]).setAlpha(0).setScale(this.scalefactor)
        this.onboardingSpareDispensedItem1 = this.add.image(this.startItem2X, this.startItem2Y, 'mg3-spritesheet-key', this.iconArray[1]).setAlpha(0).setScale(this.scalefactor)
        this.onboardingSpareDispensedItem2 = this.add.image(this.startItem3X, this.startItem3Y, 'mg3-spritesheet-key', this.iconArray[2]).setAlpha(0).setScale(this.scalefactor)
        this.hand = this.add.spine(this.startItem1X, this.startItem1Y-300, 'hand')
        this.handanims = this.hand.getAnimationList()
        this.hand.setAlpha(0)
        
    }

        getScale() {
            let h = this.game.canvas.height;
            let w = this.game.canvas.width;
            this.cX = w / 2;
            this.cY = h / 2;
            this.scalefactor = this.game.canvas.height / this.gameheight;
        }


        onboardingAnim() {
            
            this.hand.play(this.handanims[1], false)
            this.tweens.chain({
                targets: [this.hand, this.onboardingItem],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {

                        y: this.startItem1Y,
                        ease: 'Sine.easeInOut',
                        duration: 1000
                    },
                    {
                        x: this.cX,
                        y: this.cY-100*this.scalefactor,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },

                ]
            })
            this.tweens.chain({
                targets: [this.onboardingSpareDispensedItem1, this.onboardingSpareDispensedItem2],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 200
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 200,
                        delay: 3000
                    },

                ]
            })
        }

        startTreatmentLevel()
        {
            this.animalXray.setAlpha(0)
            this.sound.play('vo2')
            this.background.setTexture(this.backgroundArray[this.animalNumber])
            this.table.setAlpha(0)
            this.animal.setAlpha(0).setDepth(1)
            this.vet.setAlpha(0)
            this.removeEquipment()
            if(this.animalNumber==2){
                this.thorn.setAlpha(1)
                this.bunnyDiagnosed.setAlpha(0)}

        }  

        dispenseTreatmentTools(){
            this.tool1 = this.items.create(this.startItem1X, this.startItem1Y, 'mg3-spritesheet-key', this.toolsArray[0]).setInteractive({ draggable: true }).setDepth(1).setScale(this.scalefactor)
            this.tool1.startX = this.startItem1X
            this.tool1.startY = this.startItem1Y
            this.tool1.tool = 'flea'

            this.tool2 = this.items.create(this.startItem2X, this.startItem2Y, 'mg3-spritesheet-key',  this.toolsArray[1]).setInteractive({ draggable: true }).setDepth(1).setScale(this.scalefactor)
            this.tool2.startX = this.startItem2X
            this.tool2.startY = this.startItem2Y
            this.tool2.tool = 'bandage'

            this.tool3 = this.items.create(this.startItem3X, this.startItem3Y, 'mg3-spritesheet-key',  this.toolsArray[2]).setInteractive({ draggable: true }).setDepth(1).setScale(this.scalefactor)
            this.tool3.startX = this.startItem3X
            this.tool3.startY = this.startItem3Y
            this.tool3.tool = 'tweezers'
        }

        dispenseDiagnosticTools()
        {
            const scale = this.scalefactor


            this.icon1 = this.items.create(this.startItem1X, this.startItem1Y, 'mg3-spritesheet-key', this.iconArray[0]).setInteractive({ draggable: true }).setDepth(1).setScale(scale)
            this.icon1.startX = this.startItem1X
            this.icon1.startY = this.startItem1Y
            this.icon1.equipment = 'exam'

            this.icon2 = this.items.create(this.startItem2X, this.startItem2Y, 'mg3-spritesheet-key',  this.iconArray[1]).setInteractive({ draggable: true }).setDepth(1).setScale(scale)
            this.icon2.startX = this.startItem2X
            this.icon2.startY = this.startItem2Y
            this.icon2.equipment = 'xray'

            this.icon3 = this.items.create(this.startItem3X, this.startItem3Y, 'mg3-spritesheet-key',  this.iconArray[2]).setInteractive({ draggable: true }).setDepth(1).setScale(scale)
            this.icon3.startX = this.startItem3X
            this.icon3.startY = this.startItem3Y
            this.icon3.equipment = 'mag'


        }

        xrayAnimal(){
            if(this.animal.beingXrayed == false){
                this.animal.setAlpha(0)
                this.animal.beingXrayed = true
            }

        }

        appearCircle(circle){

            this.tweens.chain({
                targets: [circle],
                tweens: [
                    {
                        scale: 1,
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 100
                    }

                ]
            })
        }

        appearHex(hex){

            this.tweens.chain({
                targets: [hex],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })
        }

        
        appear(object){
            this.tweens.chain({
                targets: [object],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })   
        }

        disappear(object){
            this.sound.play('incorrect')
            this.time.delayedCall(2000, this.playsoundwrong, [], this )

            this.tweens.chain({
                targets: [object],
                tweens: [
                    {
                        scale: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })   
        }

        resetafterIncorrect(gameObject){

        // make circles disappear
        this.removeCircles()

        // after a short period, return the animal to its sad state 
        this.time.delayedCall(4000, this.resetAnimal, [], this) 

        const resetIcon = () => {

            gameObject.setAlpha(1).setScale(this.scalefactor)
            if(gameObject.equipment=='exam') {gameObject.setTexture('mg3-spritesheet-key', this.iconArray[0])}
            if(gameObject.equipment=='xray') {gameObject.setTexture('mg3-spritesheet-key', this.iconArray[1])}
            if(gameObject.equipment=='mag') {gameObject.setTexture('mg3-spritesheet-key', this.iconArray[2])}
            if(gameObject.tool=='flea') {gameObject.setTexture('mg3-spritesheet-key', this.toolsArray[0])}
            if(gameObject.tool=='bandage') {gameObject.setTexture('mg3-spritesheet-key', this.toolsArray[1])}
            if(gameObject.tool=='tweezers') {gameObject.setTexture('mg3-spritesheet-key', this.toolsArray[2])}
            this.tweens.add({
                targets: gameObject,
                props: {
                    x: {value: gameObject.startX, duration: 0},
                    y: { value: this.startItem1Y, duration: 0 },
                },
                ease: 'Sine.easeInOut',
            })
        }

        if(gameObject.equipment){this.time.delayedCall(4000, resetIcon, [], this)}
        if(gameObject.tool){this.time.delayedCall(1000, resetIcon, [], this)}


        }

        disappearHex(hex){

            this.tweens.chain({
                targets: [hex],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })
        }

        disappearSoftly(circle){
            this.tweens.chain({
                targets: [circle],
                tweens: [

                    {
                        scale: 0,
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400,
                    }

                ]
            })
        }

        removeCircles(){
            this.disappearSoftly(this.circle1)
            this.disappearSoftly(this.circle2)
            this.disappearSoftly(this.circle3)
            this.disappearSoftly(this.circle4)
            this.disappearSoftly(this.circleBigBandage)
            this.disappearSoftly(this.circleBigFleas)
            this.disappearSoftly(this.circleBigTweezers)
        }


        appearTick(tick){
            this.tweens.chain({
                targets: [tick],
                tweens: [
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {

                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        alpha: 0,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }

                ]
            })
        }

        bandageAppear(){
            this.tweens.chain({
                targets: [this.bandage1],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 600
                    }

                ]
            })
        this.time.delayedCall(1000, this.bandageNo2, [], this)
        this.time.delayedCall(1600, this.bandageNo3, [], this)

    }

        

        removeEquipment(){
            this.icon1.destroy()
            this.icon2.destroy()
            this.icon3.destroy()
        }

        startHappyAnimal(){
            this.background.setTexture('mg3-background')
            this.table.setAlpha(1)
            this.animal.setAlpha(1)
            this.vet.setAlpha(1)
            this.vet.play(this.charanims[0], true)
            this.bandage1.setAlpha(0)
            this.bandage2.setAlpha(0)
            this.bandage3.setAlpha(0)
            this.happyAnimal()

        }

        levelEnd(){
            this.animalNumber++
            const cont = this.add.image(this.cX, this.cY, 'continue').setInteractive().setDepth(3)
                if(this.animalNumber == 3) {
                    cont.once('pointerdown', () => {
                        this.scene.start('bonusLevel')
                
                })
                } else {
                    cont.once('pointerdown', () => {
                        this.scene.start('level1', {
                        level: this.animalNumber
                    })
                
                })
                }

        }

        handleDropZoneIncorrect(gameObject, x, y){
            this.sound.play('incorrect')
            this.time.delayedCall(2000, this.playsoundwrong, [], this )
         
            if(gameObject.equipment=='exam'){
                this.incorrectItemAnim(gameObject, gameObject.x)
            }
            if(gameObject.equipment=='xray'){
                
                console.log("animal xrayed")
                //display an x-rayed animal
                this.animalXray.setAlpha(1).setDepth(6)
                this.animal.setAlpha(0)
                // this.animal.setTexture('mg3-spritesheet-diag', this.animalsXrayArray[this.animalNumber]).setDepth(6)      
                gameObject.x = this.cX
                gameObject.y = this.cY-140*this.scalefactor
                this.incorrectItemAnim(gameObject, this.cX)
                this.time.delayedCall(4000, this.showanimation, [], this )
                 
            }
            if(gameObject.tool == 'bandage'){
                this.disappearSoftly(gameObject)
            }
            if(gameObject.tool == 'tweezers') {

                this.disappear(gameObject)

            }
            if(gameObject.equipment=='mag'){

                console.log("animal magnified")
                gameObject.setScale(this.scalefactor)
                gameObject.setTexture('mg3-spritesheet-diag2', this.animalsMagArray[this.animalNumber])
                this.incorrectItemAnim(gameObject,gameObject.x)               
            }
            if(gameObject.tool=='flea'){
                    this.disappearSoftly(gameObject)
            }

        }

        handleDropZoneCorrect(gameObject){
            this.sound.play('correct')
            this.time.delayedCall(2000, this.playCorrectSound, [], this)
         

            this.appearTick(this.tick)
            this.vet.play(this.charanims[3], false)
            if((this.animalState=='diagnosed')){this.removeInteractiveIcons()}
            if((this.animalState=='treated')){this.removeInteractiveTools()}
            this.removeCircles()
            if(gameObject.equipment=='exam'){
                this.animal.setAlpha(0)
                this.bunnyDiagnosed.setAlpha(1)
                this.appearHex(this.hex3)
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            angle:-35,
                            ease: 'Sine.easeInOut',
                            duration: 100
                        },
                        {
    
                            angle:35,
                            ease: 'Sine.easeInOut',
                            duration: 300
                        },
                        {
                            angle:0,
                            ease: 'Sine.easeInOut',
                            duration: 100
                        },

                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 40,
                            delay: 600
                        },

                        {
                            y: gameObject.startY,
                            x: gameObject.startX,
                            ease: 'Sine.easeInOut',
                            duration: 0
                        },
    
                    ]
                })
            }
            if(gameObject.equipment=='xray'){
                this.animal.setAlpha(0)
                this.animalXray.setAlpha(1).setDepth(5)
                gameObject.x = this.cX
                gameObject.y = this.cY-120*this.scalefactor
                this.appearHex(this.hex2)
            }
            if(gameObject.equipment=='mag'){
                gameObject.setScale(this.scalefactor)
                gameObject.setTexture('mg3-spritesheet-diag2', this.animalsMagArray[this.animalNumber])
                gameObject.x = this.animalX
                gameObject.y = this.animalY[this.animalNumber]-220*this.scalefactor
                this.appearHex(this.hex1)
            }
            if(gameObject.tool=='flea'){
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: this.cX+180*this.scalefactor,
                            y: this.cY-470*this.scalefactor,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                    ]
                })
                const drop = this.add.image(this.cX+50*this.scalefactor, this.cY-250*this.scalefactor, 'mg3-spritesheet-diag', 'treatment_flea_drop.png').setAlpha(0)
                this.tweens.chain({
                    targets: drop,
                    tweens: [
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            alpha: 1,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            y: this.cY,
                            ease: 'Sine.easeInOut',
                            duration: 1000
                        },
                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        }
                    ]
                })
                this.removeCircles()

        const removeGameObject = () => {
            this.disappearSoftly(gameObject)
        }

                this.time.delayedCall(1500, removeGameObject, [], this)


                
            }
            if(gameObject.tool=='bandage'){
                this.disappearSoftly(this.circleBigBandage)
                this.bandageAppear()
                gameObject.setTexture('mg3-spritesheet-diag', 'treatment_bandage_hand_02.png').setDepth(10)
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [

                        {
    
                            x: this.cX+150*this.scalefactor,
                            y: this.cY,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },
                        {
                            x: this.cX-100*this.scalefactor,
                            ease: 'Sine.easeInOut',
                            duration: 1000
                        },
                        {
                            x: this.cX,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        },

                        {
                            alpha: 0,
                            ease: 'Sine.easeInOut',
                            duration: 40
                        },
                    ]
                })
            }
            if(gameObject.tool=='tweezers'){
                
                this.disappearSoftly(this.circleBigTweezers)
                this.tweens.chain({
                    targets: [gameObject],
                    tweens: [
                        {
                            x: this.cX-110*this.scalefactor,
                            y: this.cY-190*this.scalefactor,
                            ease: 'Sine.easeInOut',
                            duration: 400
                        }
                    ]
                })

                const removeTreatment = () => {
                    this.disappearSoftly(gameObject)
                    this.disappearSoftly(this.thorn)
                }
                this.time.delayedCall(1000, removeTreatment, [], this)
            
            }
        }

        moveToNextAnimalState(){
            if(this.animalState=='justArrived'){
                
                // mark animal as diagnosed
                this.animalState ='diagnosed'

                // display the tools needed for treatment 
                this.time.delayedCall(4000, this.startTreatmentLevel, [], this)
                this.time.delayedCall(7000, this.dispenseTreatmentTools, [], this)
                

            } else if (this.animalState=='diagnosed'){
                this.animalState ='treated'
                 

                this.time.delayedCall(3000, this.startHappyAnimal, [], this)

                this.time.delayedCall(6000, this.levelEnd, [], this)

            } 
        }

        removeInteractiveIcons(){

            this.icon1.disableInteractive()
            this.icon2.disableInteractive()
            this.icon3.disableInteractive()
        }
        removeInteractiveTools(){
            this.tool1.disableInteractive()
            this.tool2.disableInteractive()
            this.tool3.disableInteractive()
        }

        setCircleDropZones(){
            this.dropZoneCircle1 = new Phaser.Geom.Rectangle(
                this.circle1.x - this.circle1.displayWidth / 2,
                this.circle1.y - this.circle1.displayHeight / 2,
                this.circle1.displayWidth,
                this.circle1.displayHeight
                )
    
            this.dropZoneCircle2 = new Phaser.Geom.Rectangle(
                this.circle2.x - this.circle2.displayWidth / 2,
                this.circle2.y - this.circle2.displayHeight / 2,
                this.circle2.displayWidth,
                this.circle2.displayHeight
                )
            this.dropZoneCircle3 = new Phaser.Geom.Rectangle(
                this.circle3.x - this.circle3.displayWidth / 2,
                this.circle3.y - this.circle3.displayHeight / 2,
                this.circle3.displayWidth,
                this.circle3.displayHeight
                )
            this.dropZoneCircle4 = new Phaser.Geom.Rectangle(
                this.circle4.x - this.circle4.displayWidth / 2,
                this.circle4.y - this.circle4.displayHeight / 2,
                this.circle4.displayWidth,
                this.circle4.displayHeight
                )
        }

        incorrectItemAnim(item, x){

            this.tweens.chain({
                targets: [item],
                tweens: [
                    {
                        x: x,
                        ease: 'Sine.easeInOut',
                        duration: 2000
                    },
                    {
                        x: x-50*this.scalefactor,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    },
                    {
                        x: x+50*this.scalefactor,
                        ease: 'Sine.easeInOut',
                        duration: 800
                    },
                    {
                        x: x,
                        ease: 'Sine.easeInOut',
                        duration: 400
                    }
                ]
            })
        }



        playsoundwrong(){
            console.log("TRY AGAIN")
            this.sound.play(this.incorrectSoundArray[[Phaser.Math.Between(0, 2)] ])
        }


        resetAnimal(){
           
            this.animalXray.setAlpha(0)
            this.animal.setDepth(0)
            console.log(this.animal.depth)
        }



        bandageNo2(){

            this.tweens.chain({
                targets: [this.bandage2],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 600
                    }

                ]
            })
    }
        bandageNo3(){
            this.tweens.chain({
                targets: [this.bandage3],
                tweens: [
                    {
                        alpha: 1,
                        ease: 'Sine.easeInOut',
                        duration: 600
                    }

                ]
            })
        }

        showanimation(){
            this.animal.setAlpha(1)
        }

        playCorrectSound(){
            this.sound.play(this.correctSoundArray[[Phaser.Math.Between(0, 2)] ])
        }


        happyAnimal(){
            const happysound = () => {
                this.sound.play(this.animalTreatedSoundArray[this.animalNumber])
            } 

            let delay = [200, 0, 500]

            this.time.delayedCall(delay[this.animalNumber], happysound, [], this)

            if(this.animalNumber==2){this.animal.play(this.anims[2], true)}
            else {
                this.animal.play(this.anims[1], true)
            }
        }
       
}