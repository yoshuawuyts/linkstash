/**
 * Module dependencies.
 */

var assert = require('assert');

/**
 * `Stash` prototype.
 */

var stash = Stash.prototype;

/**
 * Expose `updateLinks()`.
 */

module.exports = Stash;

/**
 * Update the API links object. Diffs the prev
 * timestamp in links and updates if
 * it exceeds the timestamp threshold.
 *
 * @param {String} prev
 * @param {String} next
 * @api private
 */

function Stash(nlz) {
  if (!(this instanceof Stash)) return new Stash(nlz);

  nlz = nlz || function(val) {return val};
  assert.equal(typeof nlz, 'function', 'linkstash: nlz should be a function');

  this._prev = null;
  this._next = null;
  this._nlz = nlz;

  return this;
}

/**
 * Set.
 *
 * @param {Object} newLinks
 * @return {Object}
 */

stash.set = function(newLinks) {
  assert.equal(typeof newLinks, 'object', 'linkstash: newLinks should be an object');

  var prev = this._prev;
  var next = this._next;
  var nlz = this._nlz;

  var nwPrev = newLinks._previous || newLinks.previous;
  var nwNext = newLinks._next || newLinks.next;

  if (undefined == prev) this._prev = prev = nwPrev;
  if (undefined == next) this._next = next = nwNext;

  if (nlz(nwPrev) <= nlz(prev)) this._prev = nwPrev;
  if (nlz(nwNext) >= nlz(next)) this._next = nwNext;
};

/**
 * Get.
 *
 * @return {Object}
 * @api public
 */

stash.get = function() {
  return {
    previous: this._prev,
    next: this._next
  }
};
