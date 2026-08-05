import { FIELD_GUIDE_VERIFIED_AT } from "@/data/field-guides";

const verifiedDateLabel = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
}).format(new Date(FIELD_GUIDE_VERIFIED_AT));

export const codesAudit = {
  verifiedAt: FIELD_GUIDE_VERIFIED_AT,
  verifiedDateLabel,
  activeCodeCount: 0,
  expiredCodeCount: 0,
  redemptionEntry: {
    status: "not-observed",
    label: "Not observed",
  },
  sourceCount: 4,
} as const;
