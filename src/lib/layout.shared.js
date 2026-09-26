import { Logo } from '@/components/logo';

export const GITHUB_URL = 'https://github.com/Moreallure/ccc-guide';

export function baseOptions() {
  return {
    nav: {
      title: <Logo className="text-2xl" />,
    },
  };
}
