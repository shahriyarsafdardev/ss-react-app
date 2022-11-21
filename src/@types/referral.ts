export type ReferralHistory = {
  date: Date;
  description: string;
  status: string;
};

export type ReferralCount = {
  enrolled_referrals_count: number;
  total_referrals_count: number;
};

export type Referral = {
  referrals_count: ReferralCount;
  referrals_details: ReferralHistory[];
  credit_balance: number;
};
