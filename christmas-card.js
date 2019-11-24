{
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    class Decoration {
        constructor(left, top) {
            this.left = left;
            this.top = top;
        }

        getStyle() {
            return `top: ${this.top}px; left: ${this.left}px;`;
        }

        toHTML() {
            return `<div class="${this.getClass()}" style="${this.getStyle()}"></div>`;
        }
    }

    class Light extends Decoration  {
        getClass() {
            return `lights ${this.getSpeed()}`;
        }

        getSpeed() {
            let number = getRandomIntInclusive(1, 3);

            switch (number) {
                case 1:
                    return 'fast';
                case 2:
                    return 'delayed';
                case 3:
                    return '';
            }
        }
    }

    class Ornament extends Decoration {
        getClass() {
            return `ornament ${this.getColor()}`;
        }

        getColor() {
            const color = getRandomIntInclusive(1, 3);

            switch (color) {
                case 1:
                    return 'red';
                case 2:
                    return 'blue';
                case 3:
                    return 'silver';
            }
        }
    }

    class ChristmasTree {
        constructor() {
            this.$decorate = document.getElementById('decorate');

            setTimeout(_ => this.slideInRoot(), 1000);
            setTimeout(_ => this.slideInLevel(3), 2000);
            setTimeout(_ => this.slideInLevel(2), 3000);
            setTimeout(_ => this.slideInLevel(1), 4000);
            setTimeout(_ => this.addStar(), 6000);
            setTimeout(_ => this.addOrnaments(), 8000);
            setTimeout(_ => this.addLights(), 9000);
            setTimeout(_ => this.showText(), 11000);
        }

        slideInRoot() {
            let safeExit = 0;
            let $elements = document.getElementsByClassName('hidden-slide root');

            while($elements.length) {
                safeExit++;

                if ( safeExit === 100 ) {
                    break;
                }
                $elements[0].classList.remove('hidden-slide');
            }
        }

        slideInLevel(level) {
            let safeExit = 0;
            let $elements = document.getElementsByClassName('hidden-slide level-' + level);

            while($elements.length) {
                console.log($elements);
                safeExit++;

                if ( safeExit === 100 ) {
                    break;
                }
                $elements[0].classList.remove('hidden-slide');
            }
        }

        showText() {
            let $elements = document.getElementsByClassName('show-text hidden');
            console.log($elements);
            while($elements.length) {
                $elements[0].classList.remove('hidden');
            }
        }

        addStar() {
            document.getElementById('star').classList.add('done');
        }

        addLights() {
            this.addLevel(-25, 40, 15, 'lights');
            this.addLevel(40, 120, 40, 'lights');
            this.addLevel(120, 190, 60, 'lights');
        }

        addLevel(min, max, lights, type) {
            for (let i = 0; i < lights; i++) {
                this.addDecoration(min, max, type);
            }
        }

        addOrnaments() {
            this.addLevel(-25, 40, 5, 'ornament');
            this.addLevel(40, 120, 10, 'ornament');
            this.addLevel(120, 190, 20, 'ornament');
        }

        getCoordinates(yMin, yMax) {
            const top = getRandomIntInclusive(yMin, yMax);

            let left;

            /**
             * @todo could probably use math for this
             */
            if (top < -25) {
                left = getRandomIntInclusive(-2, 2);
            }

            else if (top < -15) {
                left = getRandomIntInclusive(-10, 10);
            }

            else if (top < 0) {
                left = getRandomIntInclusive(-18, 18);
            }

            else if (top < 25) {
                left = getRandomIntInclusive(-18, 18);
            }

            else if (top < 50) {
                left = getRandomIntInclusive(-25, 25);
            }

            else if (top < 100) {
                left = getRandomIntInclusive(-30, 30);
            }

            else if (top < 120) {
                left = getRandomIntInclusive(-45, 45);
            }

            else if (top < 150) {
                left = getRandomIntInclusive(-55, 55);
            }

            else if (top <= 190) {
                left = getRandomIntInclusive(-60, 60);
            }

            return {top, left};
        }

        addDecoration(min, max, type) {
            let decoration;

            const {top, left} = this.getCoordinates(min, max);
            console.log(top, left);

            if ( type === 'ornament' ) {
                decoration = new Ornament(left, top);
            } else {
                decoration = new Light(left, top)
            }

            document.getElementById('decorate').innerHTML += decoration.toHTML();
        }
    }

    new ChristmasTree();
}
