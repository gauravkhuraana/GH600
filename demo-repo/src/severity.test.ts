import { test } from "node:test";
import assert from "node:assert/strict";
import { severity, isReleaseBlocking } from "./severity.js";

test("blocked for all users is sev 1", () => {
  assert.equal(severity("blocked", "all-users"), 1);
});

test("blocked for a team is sev 2", () => {
  assert.equal(severity("blocked", "team"), 2);
});

test("cosmetic for a single user is sev 4", () => {
  assert.equal(severity("cosmetic", "single-user"), 4);
});

test("degraded for a team is sev 3", () => {
  assert.equal(severity("degraded", "team"), 3);
});

test("sev 1 and sev 2 block the release", () => {
  assert.equal(isReleaseBlocking("blocked", "all-users"), true);
  assert.equal(isReleaseBlocking("blocked", "team"), true);
});

test("sev 3 and sev 4 do not block the release", () => {
  assert.equal(isReleaseBlocking("degraded", "team"), false);
  assert.equal(isReleaseBlocking("cosmetic", "single-user"), false);
});
