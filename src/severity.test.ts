import { test } from "node:test";
import assert from "node:assert/strict";
import {
  severity,
  isReleaseBlocking,
  type Impact,
  type Reach,
  type Severity,
} from "./severity.js";

type SeverityCase = {
  impact: Impact;
  reach: Reach;
  expectedSeverity: Severity;
};

// Keep every combination explicit: this table documents policy rather than
// reproducing the implementation's scoring algorithm in the test.
const severityCases = [
  { impact: "cosmetic", reach: "single-user", expectedSeverity: 4 },
  { impact: "cosmetic", reach: "team", expectedSeverity: 3 },
  { impact: "cosmetic", reach: "all-users", expectedSeverity: 3 },
  { impact: "degraded", reach: "single-user", expectedSeverity: 3 },
  { impact: "degraded", reach: "team", expectedSeverity: 3 },
  { impact: "degraded", reach: "all-users", expectedSeverity: 2 },
  { impact: "blocked", reach: "single-user", expectedSeverity: 3 },
  { impact: "blocked", reach: "team", expectedSeverity: 2 },
  { impact: "blocked", reach: "all-users", expectedSeverity: 1 },
] satisfies readonly SeverityCase[];

test("maps every impact and reach combination to its severity", async (t) => {
  for (const { impact, reach, expectedSeverity } of severityCases) {
    await t.test(`${impact} / ${reach} is sev ${expectedSeverity}`, () => {
      assert.equal(severity(impact, reach), expectedSeverity);
    });
  }
});

test("blocks releases only for sev 1 and sev 2 incidents", async (t) => {
  // Exercise both sides of the sev 2 / sev 3 boundary for the full policy.
  for (const { impact, reach, expectedSeverity } of severityCases) {
    await t.test(`${impact} / ${reach}`, () => {
      assert.equal(isReleaseBlocking(impact, reach), expectedSeverity <= 2);
    });
  }
});
