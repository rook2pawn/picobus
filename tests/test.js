// tests/PicoBus.test.js
import test from 'tape';
import { PicoBus } from '../picoBus.js';

test('PicoBus: basic on/emit', (t) => {
  const bus = new PicoBus();
  let result = '';
  bus.on('hello', (msg) => result = msg);
  bus.emit('hello', 'world');
  t.equal(result, 'world', 'should receive emitted event');
  t.end();
});

test('PicoBus: off()', (t) => {
  const bus = new PicoBus();
  const handler = () => t.fail('Should not be called');
  bus.on('bye', handler);
  bus.off('bye', handler);
  bus.emit('bye');
  t.pass('handler was removed');
  t.end();
});

test('PicoBus: once()', (t) => {
  const bus = new PicoBus();
  let count = 0;
  bus.once('inc', () => count++);
  bus.emit('inc');
  bus.emit('inc');
  t.equal(count, 1, 'should only fire once');
  t.end();
});

test('PicoBus: star listener (*)', (t) => {
  const bus = new PicoBus();
  let called = false;
  bus.on('*', (event, msg) => {
    called = true;
    t.equal(event, 'ping');
    t.equal(msg, 'pong');
  });
  bus.emit('ping', 'pong');
  t.ok(called, 'star listener was called');
  t.end();
});

test('PicoBus: removeAll', (t) => {
  const bus = new PicoBus();
  let calls = 0;
  const fn = () => calls++;
  bus.on('foo', fn);
  bus.on('bar', fn);
  bus.removeAll('foo');
  bus.emit('foo');
  bus.emit('bar');
  t.equal(calls, 1, 'foo listener removed, bar remains');
  bus.removeAll();
  bus.emit('bar');
  t.equal(calls, 1, 'all listeners removed');
  t.end();
});
