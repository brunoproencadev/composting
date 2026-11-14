import test from 'node:test';
import assert from 'node:assert/strict';
import {boundSticker} from '../lib/sticker-bounds.ts';
test('stickers stay fully within their field after moving and resizing',()=>{
 assert.deepEqual(boundSticker(-20,130,400,200,80),{x:10,y:80});
 assert.deepEqual(boundSticker(95,95,100,100,80),{x:60,y:60});
 assert.deepEqual(boundSticker(0,100,0,0,80),{x:50,y:50});
});
