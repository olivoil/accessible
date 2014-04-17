
var assert = require('assert');
var Accessible = require('./index');
var Model;

describe('Accessible', function(){

  beforeEach(function(){
    Model = function Model(){};
  });

  it('returns the constructor', function(){
    assert.equal(Accessible(Model), Model);
  });

  it('stores attributes definition on the constructor', function(){
    Accessible(Model);
    Model.attr('name', {type: String});
    assert.equal(Model.attrs['name'].type, String);
  });

  it('defines getters/setters on the prototype', function(){
    Accessible(Model);
    Model.attr('lastName');
    var model = new Model;
    model.lastName('Doe');
    assert.equal(model.lastName(), 'Doe');
  });

});
