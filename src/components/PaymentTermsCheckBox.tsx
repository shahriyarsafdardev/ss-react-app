import { Link, Typography } from '@material-ui/core';

export default function PaymentTermsCheckBox() {
  return (
    <Typography
      style={{ fontSize: '12px', color: '#6d747f', margin: '10px 0px' }}
      data-testid="terms-conditions"
    >
      By providing your payment information, you accept Sphere Inc.'s{' '}
      <Link
        noWrap
        target="_blank"
        data-testid="service-link"
        style={{ fontSize: '12px' }}
        href="https://sphere-public.s3.eu-west-2.amazonaws.com/terms_and_conditions.html"
      >
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link
        noWrap
        target="_blank"
        data-testid="policy-link"
        style={{ fontSize: '12px' }}
        href="https://sphere-public.s3.eu-west-2.amazonaws.com/privacy_policy.html"
      >
        Privacy Policy
      </Link>
    </Typography>
  );
}
