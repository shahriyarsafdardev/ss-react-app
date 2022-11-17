export type ReferralHistory = {
  date: Date;
  description: string;
};

export type ReferralCount = {
  enrolled_referrals_count: Number;
  total_referrals_count: Number;
};

export type ReferralDetails = {
  transactions: ReferralHistory[];
  invites: ReferralHistory[];
  enrolled_referrals: ReferralHistory[];
};

export type Referral = {
  referrals_count: ReferralCount;
  referrals_details: ReferralDetails;
  credit_balance: Number;
};
