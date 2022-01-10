class Tableau1 extends Phaser.Scene{

    preload() {
        this.load.image('carre','assets/carre.png');
        this.load.image('cercle','assets/cercle.png');
    }


    create() {
        this.hauteur = 500
        this.largeur = 1000

        this.haut = this.physics.add.image(0,0, 'carre').setOrigin(0,0);
        haut.setDisplaySize(this.largeur,20)

        this.bas = this.physics.add.image(0,480, 'carre').setOrigin(0,0);
        bas.setDisplaySize(this.largeur,20)

        this.balle = this.physics.add.image(480,230,'cercle').setOrigin(0,0);
        balle.setDisplaySize(20,20)
    }


    update() {
    }



}

