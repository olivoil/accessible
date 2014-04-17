
/**
 * Expose `Accessible`.
 */

module.exports = Accessible;

/**
 * Initialize a new `Accessible`.
 *
 * Examples:
 *
 *   ```
 *   function Obj(){};
 *   Accessible(Obj);
 *   Obj.attr('name', {type: String});
 *   var obj = new Obj;
 *   obj.name('my object');
 *   obj.name(); // => 'my object'
 *   ```
 *
 * @api public
 */

function Accessible(ctor) {
  if (ctor) return mixin(ctor);
};

/**
 * Mixin the accessible properties.
 *
 * @param {Function} ctor
 * @return {Object}
 * @api private
 */

function mixin(ctor) {
  ctor.attrs = ctor.attrs || {};

  for (var key in Accessible) {
    ctor[key] = Accessible[key];
  }

  return ctor;
}

/**
 * Define attribute getter/setter with the given `name` and `options`.
 *
 * @param {String} name
 * @param {Object} options
 * @return {Function} self
 * @api public
 */

Accessible.attr = function(name, options){
  this.attrs[name] = options || {};

  this.prototype[name] = function(val){
    this.dirty = this.dirty || {};
    this.attrs = this.attrs || {};

    if (!arguments.length) return this.attrs[name];
    var prev = this.attrs[name];
    this.dirty[name] = val;
    this.attrs[name] = val;

    if (this.constructor && 'function' == typeof this.constructor.emit) {
      this.constructor.emit('change', this, name, val, prev);
      this.constructor.emit('change ' + name, this, val, prev);
    }

    if ('function' == typeof this.emit){
      this.emit('change', name, val, prev);
      this.emit('change ' + name, val, prev);
    }

    return this;
  }

  this.prototype.toJSON = function(){
    return this.attrs || {};
  }

  return this;
}
