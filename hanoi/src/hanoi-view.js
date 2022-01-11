class HanoiView {
    constructor(game, $el) {
        this.game = game;
        this.$el = $el;
        this.setupTowers();
        this.render();

        this.fromTowerIdx = null;

        $('ul').on("click" , this.clickTower.bind(this));

        
    }

    clickTower(event) {
        
        const $towerIdx = $(event.currentTarget).index();

        if (this.fromTowerIdx === null) {
            $(event.currentTarget).toggleClass("clicked");
            this.fromTowerIdx = $towerIdx;
        } else {
            if (!this.game.move(this.fromTowerIdx, $towerIdx)) {
                alert("Invalid Move! Try again!")
            };
            this.fromTowerIdx = null;

            this.render();
        }

        if (this.game.isWon()) {
            this.$el.off('click');
            $(event.currentTarget).children().toggleClass('winner');
            alert("Great Job!");
           
        }

    }

    setupTowers() {
        for (let i = 0; i < 3; i++) {
            const ul$ = $('<ul></ul>');
            this.$el.append(ul$);

            for (let j = 0; j < 3; j++) {
                const li$ = $('<li></li>');
                ul$.append(li$);
            }
        }

    }

    render() {
        const $towers = $('ul');
        $towers.removeClass();
        this.game.towers.forEach((disks, towerIdx) => {
            const $disks = $towers.eq(towerIdx).children();
            $disks.removeClass();
      
            disks.forEach((diskWidth, diskIdx) => {
              /*
              Since our disks are stacked from bottom to top
              as [3, 2, 1], we have to select from the back
              of our jQuery object, using negative indices.
              */
              $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);
            });
        });
        
        
    }
}

module.exports = HanoiView;