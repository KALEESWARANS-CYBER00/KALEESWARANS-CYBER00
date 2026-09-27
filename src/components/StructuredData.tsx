export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kaleeswaran-tech.vercel.app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'KALEESWARAN S | Cybersecurity, Cloud & Full-Stack Engineer',
        description:
          'Official portfolio of Kaleeswaran S — Red Team Security Specialist, Penetration Tester, Cloud Security Architect, and Full-Stack Software Engineer. TryHackMe Top 4% Global.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${baseUrl}/#webpage`,
        url: baseUrl,
        name: 'KALEESWARAN S — Personal Portfolio & Technical Archive',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#person` },
        mainEntity: { '@id': `${baseUrl}/#person` },
        description:
          'Comprehensive technical portfolio, security research, open-source projects, and engineering credentials of Kaleeswaran S.',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Kaleeswaran S',
        givenName: 'Kaleeswaran',
        familyName: 'S',
        alternateName: ['KALEESWARANS-CYBER00', 'kaleeswarans25', 'kalees'],
        gender: 'Male',
        jobTitle: [
          'Red Team Security Specialist',
          'Cybersecurity Engineer',
          'Cloud Security Specialist',
          'Full-Stack Software Engineer',
          'Penetration Tester',
          'Vulnerability Researcher',
          'Bug Bounty Researcher',
          'Exploit Developer',
        ],
        description:
          'Kaleeswaran S is a cybersecurity engineer, red team security specialist, cloud infrastructure practitioner, and full-stack developer ranked in the Top 4% globally on TryHackMe. He specializes in penetration testing, vulnerability research, exploit development, and architecting resilient cloud systems.',
        url: baseUrl,
        image: `${baseUrl}/hero-portrait.png`,
        email: 'mailto:kaleeswaran.bcy24@rathinam.in',
        telephone: '+916374892220',
        sameAs: [
          'https://www.linkedin.com/in/kaleeswarans25/',
          'https://github.com/KALEESWARANS-CYBER00',
          'https://tryhackme.com/p/kalees',
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Rathinam College of Arts and Science',
        },
        memberOf: {
          '@type': 'Organization',
          name: 'DEF CON Group Coimbatore (DCG91422)',
        },
        knowsAbout: [
          'Cybersecurity',
          'Offensive Security',
          'Red Team Operations & Adversary Emulation',
          'Penetration Testing (Network & Web)',
          'Vulnerability Assessment & Research',
          'Exploit Development Fundamentals',
          'Bug Bounty Hunting',
          'Cloud Security Architecture',
          'Container Security & Docker Hardening',
          'AWS Cloud Infrastructure',
          'Full-Stack Software Engineering',
          'Linux Kernel Telemetry & Systems Programming',
          'Endpoint Detection & Response (EDR)',
          'Python',
          'Java',
          'Bash Scripting',
          'Next.js & React',
          'Node.js & Express',
          'RESTful API Security',
          'OWASP Top 10 Auditing',
          'Data Structures & Algorithms',
        ],
        award: [
          'TryHackMe Top 4% Global Cybersecurity Ranking',
          'TryHackMe 114-Day Continuous Lab Streak',
          'LeetCode 281 Data Structures & Algorithms Problems Solved',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Google Cybersecurity Professional Certificate',
            credentialCategory: 'Professional Certificate',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Google',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Linux Tools for Developers',
            credentialCategory: 'Professional Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: 'The Linux Foundation',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'AWS: Compute, Storage and Containers',
            credentialCategory: 'Cloud Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Whizlabs',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Web Security, Social Engineering & External Attacks',
            credentialCategory: 'Security Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Packt',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Connect and Protect: Networks and Network Security',
            credentialCategory: 'Professional Certificate',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Google',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Java (Basic) Certification',
            credentialCategory: 'Developer Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: 'HackerRank',
            },
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/#projects`,
        name: 'Engineered Systems & Security Projects by Kaleeswaran S',
        itemListElement: [
          {
            '@type': 'SoftwareSourceCode',
            name: 'RedAlert EDR',
            description:
              'Offline Endpoint Detection & Response engine for host-level behavioral telemetry, anomalous process identification, and automated threat isolation on Linux.',
            codeRepository: 'https://github.com/KALEESWARANS-CYBER00/redalert-edr',
            programmingLanguage: ['Python', 'Linux Kernel'],
          },
          {
            '@type': 'SoftwareSourceCode',
            name: 'ClickTrap',
            description:
              'Adversary simulation and social engineering awareness platform demonstrating file camouflage, payload masquerading, and human vulnerability surfaces.',
            codeRepository: 'https://github.com/KALEESWARANS-CYBER00/clicktrap',
            programmingLanguage: ['React', 'JavaScript'],
          },
          {
            '@type': 'SoftwareSourceCode',
            name: 'SQLi-Report',
            description:
              'Automated command-line vulnerability assessment tool conducting heuristic database injection analysis, blind verification, and structured reporting.',
            codeRepository: 'https://github.com/KALEESWARANS-CYBER00/sqli-report',
            programmingLanguage: ['Python'],
          },
          {
            '@type': 'SoftwareSourceCode',
            name: 'DNS Lab',
            description:
              'Containerized DNS testbed for investigating resolution poisoning, recursive query caching anomalies, and network packet telemetry.',
            codeRepository: 'https://github.com/KALEESWARANS-CYBER00/dns-lab',
            programmingLanguage: ['Docker', 'Shell'],
          },
          {
            '@type': 'SoftwareSourceCode',
            name: 'Authify',
            description:
              'Hardened identity verification architecture implementing time-based OTP workflows, cryptographically signed JWT sessions, and rate-limited endpoints.',
            codeRepository: 'https://github.com/KALEESWARANS-CYBER00/authify',
            programmingLanguage: ['Node.js', 'Express', 'JavaScript'],
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
