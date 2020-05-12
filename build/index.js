import * as PIXI from 'pixi.js'
const app = new PIXI.Application();
 
document.body.appendChild(app.view);
 
PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
 
    const bunny = new PIXI.Sprite(resources.bunny.texture);
 
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
 
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
 
    app.stage.addChild(bunny);
    PIXI.utils.sayHello('hellow')
    app.ticker.add(() => {
        bunny.rotation += 0.01;
    });
});
PIXI.utils.sayHello('hellos')