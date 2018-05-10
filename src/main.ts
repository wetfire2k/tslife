import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

import jquery from 'jquery';
import ConwayLifeGame from "./conwaylifegame";

/* Esporta Conway' game of life verso il browser */
export = {
    Conway: function (id: string, width: number, height: number) {
        let world = new ConwayLifeGame(id, width, height);
        world.init();
        world.draw();
        return world;
    }
};