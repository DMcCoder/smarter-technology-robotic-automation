"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const { sort } = require("../index");

test("returns STANDARD for packages that are neither bulky nor heavy", () => {
  assert.equal(sort(10, 20, 30, 5), "STANDARD");
});

test("returns SPECIAL when package is heavy only", () => {
  assert.equal(sort(10, 20, 30, 20), "SPECIAL");
});

test("returns SPECIAL when package is bulky by volume only", () => {
  assert.equal(sort(100, 100, 100, 19.9), "SPECIAL");
});

test("returns SPECIAL when package is bulky by a single dimension", () => {
  assert.equal(sort(150, 10, 10, 5), "SPECIAL");
});

test("returns REJECTED when package is both bulky and heavy", () => {
  assert.equal(sort(100, 100, 100, 20), "REJECTED");
});

test("uses inclusive threshold checks", () => {
  assert.equal(sort(100, 100, 100, 19), "SPECIAL");
  assert.equal(sort(100, 100, 99, 20), "SPECIAL");
  assert.equal(sort(150, 149, 149, 20), "REJECTED");
});
