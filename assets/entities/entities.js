/************************************************************************************/
/*                                          */
/*    a player entity                               */
/*                                          */
/************************************************************************************/
game.PlayerEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);

    // disable gravity
    this.body.gravity = 0;

    // walking & jumping speed
    this.body.setVelocity(2.5, 2.5);
    this.body.setFriction(0.4, 0.4);

    // set the display around our position
    me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

    // enable keyboard
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.UP, 'up');
    me.input.bindKey(me.input.KEY.DOWN, 'down');

    // the main player spritesheet
    var texture = new me.video.renderer.Texture({
        framewidth: 32,
        frameheight: 32
      },
      me.loader.getImage('Blank_Sprite_Sheet_4_2_by_KnightYamato')
    );

    // create a new sprite object
    this.renderable = texture.createAnimationFromName([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    // define an additional basic walking animation
    this.renderable.addAnimation('simple_walk', [0, 1, 2]);

    // set the renderable position to bottom center
    this.anchorPoint.set(0.5, 0.5);
  },

  /* -----

    update the player pos

  ------      */
  update: function(dt) {

    if (me.input.isKeyPressed('left')) {
      // update the entity velocity
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
    } else if (me.input.isKeyPressed('right')) {
      // update the entity velocity
      this.body.vel.x += this.body.accel.x * me.timer.tick;
    } else {
      this.body.vel.x = 0;
    }
    if (me.input.isKeyPressed('up')) {
      // update the entity velocity
      this.body.vel.y -= this.body.accel.y * me.timer.tick;
    } else if (me.input.isKeyPressed('down')) {
      // update the entity velocity
      this.body.vel.y += this.body.accel.y * me.timer.tick;
    } else {
      this.body.vel.y = 0;
    }

    // apply physics to the body (this moves the entity)
    this.body.update(dt);

    // handle collisions against other shapes
    me.collision.check(this);

    // check if we moved (an 'idle' animation would definitely be cleaner)
    if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
      this._super(me.Entity, 'update', [dt]);
      return true;
    }
  },

  /**
   * collision handler
   * (called when colliding with other objects)
   */
  onCollision: function(response, other) {
    // TODO: zone entry
    // Make all other objects solid
    return true;
  }
});

/**
 * a Coin entity
 */
game.CoinEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function (x, y, settings) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);

  },

  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision: function (response, other) {
    // do something when collected

    // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);

    // remove it
    me.game.world.removeChild(this);

    return false;
  }
});

game.EggEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function (x, y, settings) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);

  },

  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision: function (response, other) {
    // do something when collected

    // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);

    // remove it
    me.game.world.removeChild(this);

    return false;
  }
});

game.SnakeEntity = me.CollectableEntity.extend({
  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function (x, y, settings) {
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);

  },

  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision: function (response, other) {
    // do something when collected

    // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);

    // remove it
    me.game.world.removeChild(this);

    return false;
  }
});
