class Tableau1 extends Phaser.Scene{

    preload() {
        this.load.image('carre','assets/carre.png');
        this.load.image('cercle','assets/cercle.png');
    }


    create() {
        this.hauteur = 500
        this.largeur = 1000

// barre du haut
        this.haut = this.physics.add.image(0,0, 'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

// barre du bas
        this.bas = this.physics.add.image(0,480, 'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

// balle
        this.balle = this.physics.add.image(480,230,'cercle').setOrigin(0,0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1,1);
        this.balle.setVelocityX(Phaser.Math.Between(200,-200));
        this.balle.setVelocityY(Phaser.Math.Between(200,-200));
        this.balle.body.setMaxVelocity(500,500);


        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);
        this.initKeyboard();

    }


    initKeyboard(){

    }


    update() {

        if(this.balle.x > this.largeur) {
            this.balle.x = 0
        if(this.balle.y > this.hauteur) {
            this.balle.y = this.hauteur
        }}
    }



}

