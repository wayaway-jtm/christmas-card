{
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    class Decoration {
        /**
         * Basic decoration
         *
         * @param {*} left The "left" position for the item in the DOM
         * @param {*} top The "right" position for the item in the DOM
         */
        constructor(left, top) {
            this.left = left;
            this.top = top;
        }

        /**
         * Inline styles to set the position of the element.
         */
        getStyle() {
            return `top: ${this.top}px; left: ${this.left}px;`;
        }

        /**
         * Return the HTML that will go on the page.
         */
        toHTML() {
            return `<div class="${this.getClass()}" style="${this.getStyle()}"></div>`;
        }
    }

    class Light extends Decoration {
        /**
         * CSS class on the HTML element
         *
         * Will always have "lights", but speed will
         * be either "fast", "delayed", or "", which is normal
         */
        getClass() {
            return `lights ${this.getSpeed()}`;
        }

        /**
         * Return fast, delayed or empty (default)
         * based on random number, spread evenly
         */
        getSpeed() {
            let speed;
            // Get random number between 1 and 3
            const randNum = getRandomIntInclusive(1, 3);

            switch(randNum) {
                case 1:
                    speed = 'fast';
                    break;
                case 2:
                    speed = 'delay';
                    break;
                default:
                    speed = '';
                    break;
            }

            return speed;
        }
    }

    class Ornament extends Decoration {
        getClass() {
            return `ornament ${this.getColor()}`;
        }

        getColor() {
            let color;
            // Get random number between 1 and 3
            const randNum = getRandomIntInclusive(1, 3);

            switch(randNum) {
                case 1:
                    color = 'red';
                    break;
                case 2:
                    color = 'blue';
                    break;
                default:
                    color = 'silver';
                    break;
            }

            return color;
        }
    }

    class ChristmasTree {
        constructor() {
            this.$decorate = document.getElementById('decorate');

            /**
             * @todo Slide in when everything has been created
             *
             */
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

            while ($elements.length) {
                safeExit++;

                if (safeExit === 100) {
                    break;
                }

                /**
                 * @todo remove hidden-slide class from each element
                */
               $elements[0].classList.remove('hidden-slide');
            }
        }

        slideInLevel(level) {
            let safeExit = 0;
            let $elements = document.getElementsByClassName('hidden-slide level-' + level);

            /**
             * @todo remove hidden-slide class from each element
            */
            while ($elements.length) {
                safeExit++;

                if (safeExit === 100) {
                    break;
                }
                $elements[0].classList.remove('hidden-slide');
            }
        }

        /**
         * Slide in text
         */
        showText() {
            let $elements = document.getElementsByClassName('show-text hidden');

            while ($elements.length) {
                $elements[0].classList.remove('hidden');
            }
        }

        /**
         * Slide in star
         */
        addStar() {
            document.getElementById('star').classList.add('done');
        }

        /**
         * Add all levels of lights
         */
        addLights() {
            // Add 15 lights to first level
            this.addLevel(-25, 40, 15, 'lights');
            // Add 40 lights to second level
            this.addLevel(40, 120, 40, 'lights');
            // Add 60 lights to third level
            this.addLevel(120, 190, 60, 'lights');
        }

        /**
         * Add decorations to each level of the tree
         *
         * @param {number} min The min position on the Y-axis to add to.
         * @param {number} max The max position on the Y-axis to add to.
         * @param {number} decorations The number of decorations to add.
         * @param {string} type Type of decoration (light vs ornament)
         */
        addLevel(min, max, decorations, type) {
            /**
             * @todo Add for loop to add x amount of decorations based
             * on the `decorations` value
             */
            for (let i = 0; i < decorations; i++) {
                this.addDecoration(min, max, type);
            }
        }

        /**
         * Add all levels of ornaments
         */
        addOrnaments() {
            this.addLevel(-25, 40, 5, 'ornament');
            this.addLevel(40, 120, 10, 'ornament');
            this.addLevel(120, 190, 20, 'ornament');
        }

        /**
         * Get top and left positions based on yMin and yMax
         *
         * Will randomly calculate positions based on the range.
         *
         * @param {number} yMin
         * @param {number} yMax
         */
        getCoordinates(yMin, yMax) {
            const top = getRandomIntInclusive(yMin, yMax);

            let left;

            /**
             * @todo could probably use maths for this
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

            return { top, left };
        }

        /**
         * Add a decoration to the Christmas tree
         *
         * @param {number} min Min Y Coordinate
         * @param {number} max Max Y Coordinate
         * @param {string} type Light or Ornament
         */
        addDecoration(min, max, type) {
            let decoration;

            const { top, left } = this.getCoordinates(min, max);

            if (type === 'ornament') {
                decoration = new Ornament(left, top);
            } else {
                decoration = new Light(left, top)
            }

            const html = decoration.toHTML();

             const decorate = document.querySelector('#decorate');
             decorate.innerHTML += html;
        }
    }

    new ChristmasTree();
}
