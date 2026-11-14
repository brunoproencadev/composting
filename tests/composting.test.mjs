import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyMaterial,guides,materials} from '../lib/composting.ts';
test('material guidance distinguishes citrus in a garden from a worm bin',()=>{
 assert.equal(classifyMaterial('citrus','garden').status,'Depende');
 assert.equal(classifyMaterial('citrus','worms').status,'Evite');
 assert.equal(classifyMaterial('unknown','garden'),null);
});
test('unsafe domestic inputs are excluded for both methods',()=>{
 for(const method of ['garden','worms']) for(const id of ['meat','oil']) assert.equal(classifyMaterial(id,method).status,'Evite');
 assert.equal(new Set(materials.map(m=>m.id)).size,materials.length);
 assert.equal(guides.garden.steps.length,4);assert.equal(guides.worms.steps.length,4);
});
