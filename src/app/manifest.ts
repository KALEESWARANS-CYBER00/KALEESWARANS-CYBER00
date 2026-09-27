import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KALEESWARAN S | Cybersecurity, Cloud & Full-Stack Engineer',
    short_name: 'Kaleeswaran S',
    description:
      'Official portfolio of Kaleeswaran S — Red Team Security Specialist, Cloud Security Architect, and Full-Stack Software Engineer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/hero-portrait.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
