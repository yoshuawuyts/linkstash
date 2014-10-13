/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var linkstash = require('./index');

/**
 * Test
 */

describe('linkstash()', function() {
  it('should assert argument types', function() {
    linkstash.bind(linkstash, 123)
      .should.throw('linkstash: nlz should be a function');
  });
});

describe('.set()', function() {
  it('should assert argument types', function() {
    var links = linkstash();
    links.set.bind(links, 123)
      .should.throw('linkstash: newLinks should be an object');

    links.set.bind(links, {})
      .should.not.throw('linkstash: newLinks should be an object');
  });

  it('should set new values', function() {
    var links = linkstash();
    links.set({
      _previous: 10,
      _next: 100
    });

    links._prev.should.eql(10);
    links._next.should.eql(100);
  });

  it('should override old values with new values', function() {
    var links = linkstash();
    links.set({
      _previous: 10,
      _next: 100
    });

    links.set({_next: 200});
    links._prev.should.eql(10);
    links._next.should.eql(200);

    links.set({_previous: 8});
    links._prev.should.eql(8);
    links._next.should.eql(200);
  });

  it('should normalize values', function() {
    var links = linkstash(function(val) {
      return parseInt(val.split('=')[1]);
    });

    links.set({
      _previous: 'foo.com/val=10',
      _next: 'foo.com/val=100'
    });

    links._prev.should.eql('foo.com/val=10');
    links._next.should.eql('foo.com/val=100');

    links.set({
      _previous: 'foo.com/val=8',
      _next: 'foo.com/val=200'
    });

    links._prev.should.eql('foo.com/val=8');
    links._next.should.eql('foo.com/val=200');
  });
});

describe('.get()', function() {
  it('should return set values', function() {
    var links = linkstash();
    links.set({
      _previous: 'foo.com/val=10',
      _next: 'foo.com/val=100'
    });

    var nw = links.get();
    nw.previous = 'foo.com/val=10';
    nw.next = 'foo.com/val=100'
  });
});
