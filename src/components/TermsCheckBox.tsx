import { Link, Stack, Checkbox, Typography } from '@material-ui/core';

export default function TermsCheckBox({ value, onChange }: { value: boolean; onChange: Function }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Checkbox onChange={(e) => onChange(e.target.checked)} value={value} />
      <Typography variant="body2" data-testid="terms-conditions">
        I hereby accept ScholarSite's{' '}
        <Link
          noWrap
          target="_blank"
          data-testid="service-link"
          variant="body2"
          href="https://www.scholarsite.io/pages/terms-conditions"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          noWrap
          target="_blank"
          data-testid="policy-link"
          variant="body2"
          href="https://www.scholarsite.io/pages/privacy"
        >
          Privacy Policy
        </Link>
      </Typography>
    </Stack>
  );
}
