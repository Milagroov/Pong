class Tableau1 extends Phaser.Scene{

    preload() {
        this.load.image('square','assets/carre.png');
        this.load.image('circle','assets/cercle.png');
        this.load.image('blue','assets/bleu.jpg');
        this.load.image('pink','assets/rose.jpg');
    }


    create(){

        this.hauteur = 500
        this.largeur = 1000
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'circle')
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false)

        this.haut = this.physics.add.sprite(0, 0, 'square').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);
        this.bas = this.physics.add.sprite(0, 480, 'square').setOrigin(0, 0)
        this.bas.setDisplaySize(this.largeur, 20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true);
        this.player1 = this.physics.add.sprite(50, 360, 'blue')
        this.player1.setDisplaySize(20, 100)
        this.player1.body.setAllowGravity(false)
        this.player2 = this.physics.add.sprite(920, 360, 'pink')
        this.player2.setDisplaySize(20, 100)
        this.player2.body.setAllowGravity(false)
        this.player1.setImmovable(true)
        this.player2.setImmovable(true)
        let me = this;
        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebond(me.player1)
        })
        this.physics.add.collider(this.player2, this.balle,function(){
            console.log('touche player 2')
            me.rebond(me.player2)
        })

        this.physics.add.collider(this.balle, this.bas)
        this.physics.add.collider(this.balle, this.haut)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.haut, this.player1)
        this.physics.add.collider(this.bas, this.player1)

        this.physics.add.collider(this.haut, this.player2)
        this.physics.add.collider(this.bas, this.player2)

        this.player1Speed = 0
        this.player2Speed = 0

        this.joueurGauche = new Joueur('Joueur 1','joueurGauche')
        this.joueurDroite = new Joueur('Joueur 2','joueurDroite')
        console.log(this.joueurGauche)

        this.balleAucentre();
        this.initKeyboard()
    }

    rebond(players){
        let me = this ;
        console.log(this.player1.y);
        console.log(me.balle.y);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.y - players.y);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * 50);

    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }


    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 5
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 0
                    break;
            }
        });
    }




    update(){
        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
        this.player1.y += this.player1Speed
        this.player2.y += this.player2Speed
    }



}

