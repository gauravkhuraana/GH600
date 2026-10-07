// The subject of this code is irrelevant to the demo. Keep it that way.

export type Impact = "cosmetic" | "degraded" | "blocked";
export type Reach = "single-user" | "team" | "all-users";
export type Severity = 1 | 2 | 3 | 4;

const IMPACT_WEIGHT: Record<Impact, number> = {
  cosmetic: 0,
  degraded: 1,
  blocked: 2,
};

const REACH_WEIGHT: Record<Reach, number> = {
  "single-user": 0,
  team: 1,
  "all-users": 2,
};

/** Sev 1 is the most urgent. */
export function severity(impact: Impact, reach: Reach): Severity {
  const score = IMPACT_WEIGHT[impact] + REACH_WEIGHT[reach];

  if (score >= 4) return 1;
  if (score === 3) return 2;
  if (score >= 1) return 3;
  return 4;
}

/** First-response SLA in hours for each severity. Policy from issue #2. */
const RESPONSE_SLA_HOURS: Record<Severity, number> = {
  1: 1,
  2: 4,
  3: 24,
  4: 72,
};

export function responseSlaHours(sev: Severity): number {
  return RESPONSE_SLA_HOURS[sev];
}

export function isReleaseBlocking(impact: Impact, reach: Reach): boolean {
  return severity(impact, reach) <= 2;
}
