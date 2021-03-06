// Check correct result set when bounds each match different multikeys SERVER-958

t = db.jstests_indexk;
t.drop();

t.insert({a:[1,10]});

assert.eq( 1, t.count({a: {$gt:2, $lt:5}}) );
assert.eq( 1, t.count({a: {$gt:2}}) );
assert.eq( 1, t.count({a: {$lt:5}}) );

assert.eq( 1, t.count({a: {$gt:5, $lt:2}}) );
assert.eq( 1, t.count({a: {$gt:5}}) );
assert.eq( 1, t.count({a: {$lt:2}}) );

t.ensureIndex({a:1});

// Check that only one constraint limits the index range for a multikey index.
// The constraint used is arbitrary, but testing current behavior here.

assert.eq( 1, t.count({a: {$gt: 2, $lt:5}}) );
// NEW QUERY EXPLAIN
var count = t.find({a: {$gt: 2, $lt:5}}).itcount();
/* NEW QUERY EXPLAIN
assert.eq( 1, e.nscanned );
*/
// NEW QUERY EXPLAIN
assert.eq( 1, count );
/* NEW QUERY EXPLAIN
assert.eq( 2, e.indexBounds.a[ 0 ][ 0 ] );
*/
// Check that upper bound is large ( > 5 ).
/* NEW QUERY EXPLAIN
assert.lt( 1000, e.indexBounds.a[ 0 ][ 1 ] );
*/

assert.eq( 1, t.count({a: {$lt: 5, $gt:2}}) );
count = t.find({a: {$lt: 5, $gt:2}}).itcount();
/* NEW QUERY EXPLAIN
assert.eq( 1, e.nscanned );
*/
assert.eq( 1, count );
// Check that upper bound is low ( < 2 ).
/* NEW QUERY EXPLAIN
assert.gt( -1000, e.indexBounds.a[ 0 ][ 0 ] );
*/
/* NEW QUERY EXPLAIN
assert.eq( 5, e.indexBounds.a[ 0 ][ 1 ] );
*/

// Now check cases where no match is possible with a single key index.

assert.eq( 1, t.count({a: {$gt: 5, $lt:2}}) );
count = t.find({a: {$gt: 5, $lt:2}}).itcount();
/* NEW QUERY EXPLAIN
assert.eq( 1, e.nscanned );
*/
assert.eq( 1, count );
/* NEW QUERY EXPLAIN
assert.eq( 5, e.indexBounds.a[ 0 ][ 0 ] );
*/
// Check that upper bound is low ( < 2 ).
/* NEW QUERY EXPLAIN
assert.lt( 1000, e.indexBounds.a[ 0 ][ 1 ] );
*/

assert.eq( 1, t.count({a: {$lt: 2, $gt:5}}) );
count = t.find({a: {$lt: 2, $gt:5}}).itcount();
/* NEW QUERY EXPLAIN
assert.eq( 1, e.nscanned );
*/
assert.eq( 1, count );
// Check that upper bound is large ( > 5 ).
/* NEW QUERY EXPLAIN
assert.gt( -1000, e.indexBounds.a[ 0 ][ 0 ] );
*/
/* NEW QUERY EXPLAIN
assert.eq( 2, e.indexBounds.a[ 0 ][ 1 ] );
*/

assert.eq( 1, t.count({a: {$gt: 2}}) );
assert.eq( 1, t.count({a: {$lt: 5}}) );

// Check good performance of single key index
