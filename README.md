# picobus
A lightweight, dependency-free event emitter for JavaScript and Node.js. Ideal for managing state transitions, building FSMs, and wiring up simple pub/sub flows.

# Features
✅ Simple .on(event, fn) and .emit(event, data) interface

✅ .once() support for one-time listeners

✅ .off() and .removeAll() for cleanup

✅ Wildcard * event support

✅ Tiny and fast (zero dependencies)

# Installation
```
npm install picobus
```
# Testing
```
npm test
```

# Usage
```js
import { EventBus } from './eventbus.js';

const bus = new EventBus();

function onFoo(data) {
  console.log('Got foo:', data);
}

bus.on('foo', onFoo);

bus.emit('foo', { msg: 'hello' });
// => Got foo: { msg: 'hello' }

bus.off('foo', onFoo);
bus.emit('foo', { msg: 'world' }); // no output
```

# API

## bus.on(event, fn)
Register a listener for a specific event.

## bus.once(event, fn)
Register a listener that fires only once.

## bus.off(event, fn)
Remove a specific listener for a given event.

## bus.emit(event, data)
Emit an event and pass optional data.

## bus.removeAll(event?)
Remove all listeners for an event. If no event is specified, removes all listeners for all events.

## bus.on('*', fn)
Wildcard support: catch all emitted events.

```js
bus.on('*', (eventName, data) => {
  console.log(`[${eventName}] ->`, data);
});
```

# License

MIT 2025