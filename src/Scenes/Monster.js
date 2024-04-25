class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;


        // Define the locations of the smile and hands relative to the
        // main body location. This way, if we change the main body
        // location, the other values update too.
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 20;

        this.fangX = this.bodyX;
        this.fangY = this.bodyY + 20;

        this.leftEyeX = this.bodyX - 50;
        this.leftEyeY = this.bodyY - 20;

        this.rightEyeX = this.bodyX + 50;
        this.rightEyeY = this.bodyY - 20;

        this.leftArmX = this.bodyX - 105;
        this.leftArmY = this.bodyY + 20;

        this.rightArmX = this.bodyX + 105;
        this.rightArmY = this.bodyY + 20;

        this.leftLegX = this.bodyX - 50;
        this.leftLegY = this.bodyY + 150;

        this.rightLegX = this.bodyX + 50;
        this.rightLegY = this.bodyY + 150;

        this.headaccessory1X = this.bodyX - 50;
        this.headaccessory1Y = this.bodyY - 50;

        this.headaccessory2X = this.bodyX + 50;
        this.headaccessory2Y = this.bodyY - 60;

        this.headaccessory3X = this.bodyX + 10;
        this.headaccessory3Y = this.bodyY - 100;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas body
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        //Load sprite atlase eyes
        this.load.atlasXML("monsterlefteye", "spritesheet_default.png", "spritesheet_default.xml")
        this.load.atlasXML("monsterrighteye", "spritesheet_default.png", "spritesheet_default.xml")

        //Load sprite atlas mouths
        this.load.atlasXML("monstersmile", "spritesheet_default.png", "spritesheet_default.xml")
        this.load.atlasXML("monsterfangs", "spritesheet_default.png", "spritesheet_default.xml")

        //Load sprite atlas head accessories
        this.load.atlasXML("monsterheadaccessory1", "spritesheet_default.png", "spritesheet_default.xml")
        this.load.atlasXML("monsterheadaccessory2", "spritesheet_default.png", "spritesheet_default.xml")
        this.load.atlasXML("monsterheadaccessory3", "spritesheet_default.png", "spritesheet_default.xml")

        //Load sprite atlas arms
        this.load.atlasXML("monsterleftarm", "spritesheet_default.png", "spritesheet_default.xml")
        this.load.atlasXML("monsterrightarm", "spritesheet_default.png", "spritesheet_default.xml")

        //Load sprite atlas legs
        this.load.atlasXML("monsterleftleg", "spritesheet_default.png", "spritesheet_default.xml")
        this.load.atlasXML("monsterrightleg", "spritesheet_default.png", "spritesheet_default.xml")
        



        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite = {
            body : this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_darkA.png"),

            // Create the two sprites, one for each type of smile
            smile : this.add.sprite(this.smileX, this.smileY, "monstersmile", "mouthE.png"),

            fang : this.add.sprite(this.fangX, this.fangY, "monsterfangs", "mouth_closed_fangs.png"),
            

            // Create the two sprites, one for each type of eye
            lefteye : this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterlefteye", "eye_dead.png"),
            righteye : this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterrighteye", "eye_angry_red.png"),

            // Create the sprite arms
            leftarm : this.add.sprite(this.leftArmX, this.leftArmY, "monsterleftarm", "arm_darkA.png"),
            rightarm : this.add.sprite(this.rightArmX, this.rightArmY, "monsterrightarm", "arm_darkB.png"),

            // Create the two sprite head acessories
            headaccessory1 : this.add.sprite(this.headaccessory1X, this.headaccessory1Y, "monsterheadaccessory1", "detail_white_horn_small.png"),
            headaccessory2 : this.add.sprite(this.headaccessory2X, this.headaccessory2Y, "monsterheadaccessory2", "detail_white_horn_large.png"), 
            headaccessory3 : this.add.sprite(this.headaccessory3X, this.headaccessory3Y, "monsterheadaccessory2", "detail_white_antenna_large.png"),

        //Create the sprite legs
            leftleg : this.add.sprite(this.leftLegX, this.leftLegY, "monsterleftleg", "leg_darkB.png"),
            rightleg : this.add.sprite(this.rightLegX, this.rightLegY, "monsterrightleg", "leg_darkA.png"),
        }
        my.sprite.fang.visible = false;
        my.sprite.smile.visible = true;
        my.sprite.leftarm.flipX = true;
        my.sprite.leftleg.flipX = true;


        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            smile: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            fangs: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
        };
    







        
    }

    update() {
        let my = this.my;
    
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            // Move all sprites in my.sprite to the left
            for (let key in my.sprite) {
                my.sprite[key].x -= 1;  // Adjust speed here as needed
            }
        }
    
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            // Move all sprites in my.sprite to the right
            for (let key in my.sprite) {
                my.sprite[key].x += 1;  // Adjust speed here as needed
            }
        }
    
        // Toggle visibility of fangs and smiles
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S))) {
            my.sprite.smile.visible = true;
            my.sprite.fang.visible = false;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F))) {
            my.sprite.smile.visible = false;
            my.sprite.fang.visible = true;
        }
    }
    
    

}