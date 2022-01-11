const Util = {
    inherits(child, parent) {
        function Surrogate() {};
        Surrogate.prototype = parent.prototype;

        child.prototype = new Surrogate();
        child.prototype.constructor = child;
    },

    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
      // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },

    dist(posX, posY) {
        let x = posX;
        let y = posY;
        return Math.sqrt(((x[0] - y[0]) ** 2) + ((x[1] - y[1]) ** 2))
    },
    
    norm(vec) {
        return Util.dist([0, 0], vec);
    },
    
    dir(vec) {
        const norm = Util.norm(vec);
        return Util.scale(vec, 1 / norm);
    }
    };



module.exports = Util;