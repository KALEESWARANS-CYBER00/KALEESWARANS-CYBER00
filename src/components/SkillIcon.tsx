import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
  SiHtml5,
  SiMongodb,
  SiMysql,
  SiMariadb,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiLinux,
  SiKalilinux,
  SiGnubash,
  SiBurpsuite,
  SiMetasploit,
  SiWireshark,
  SiHashcat,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { FaCss3Alt, FaAws, FaWindows } from 'react-icons/fa6';
import {
  AmazonEc2,
  AwsLambda,
  AmazonSimpleStorageService,
  AmazonRds,
  AmazonDynamoDb,
  AmazonVpcLattice,
  AmazonCloudFront,
  AmazonRoute53,
  AmazonApiGateway,
  AmazonEcsAnywhere,
  AmazonEksDistro,
  AmazonCloudWatch,
  AwsCloudTrail,
  AwsIamIdentityCenter,
  AwsWaf,
  AwsKeyManagementService,
  AmazonSimpleQueueService,
  AmazonSimpleNotificationService,
  AmazonEventBridge,
  AmazonGuardDuty,
  AwsSecurityHub,
  AwsSecretsManager,
  AmazonInspector,
  AwsConfig,
  AwsCloudFormation,
  AwsElasticBeanstalk,
  AmazonEc2AutoScaling,
  AmazonEfs,
  AwsShield,
  AwsCertificateManager,
} from '@nxavis/aws-icons';
import {
  ShieldCheck,
  Swords,
  ScanSearch,
  Crosshair,
  Bug,
  SearchCode,
  Binary,
  ArrowUpCircle,
  Network,
  Users,
  Terminal,
  Radio,
  Anchor,
  Flag,
  KeyRound,
  Share2,
  Radar,
  DoorOpen,
  FolderTree,
  FileCode2,
  Database,
  Layers,
  Server,
  Zap,
  GlobeLock,
  Workflow,
  Search,
  ClipboardCheck,
  FileCheck2,
  Code2,
  GitBranch,
  Boxes,
  Lock,
  Clock,
  Gauge,
  Key,
  FolderSearch,
  Activity,
  HardDrive,
  Cpu,
} from 'lucide-react';

// Custom Authentic SVG for Nmap
export function NmapLogo({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#5E278B" />
      <circle cx="24" cy="24" r="16" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="24" cy="24" r="10" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
      <circle cx="24" cy="24" r="4" fill="#FFFFFF" />
      <path d="M24 24L38 10" stroke="#00FFA3" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 24 L34 14 A 14 14 0 0 0 24 10 Z" fill="#00FFA3" fillOpacity="0.25" />
    </svg>
  );
}

// Custom Authentic SVG for NSA Ghidra
export function GhidraLogo({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#1C1824" stroke="#DC2626" strokeWidth="4" />
      <path
        d="M26 70C26 70 34 32 60 28C74 25 82 34 78 48C74 62 60 68 46 64C36 61 34 50 42 44C50 38 58 44 54 52C50 60 40 58 40 58"
        stroke="#EF4444"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="68" cy="36" r="4" fill="#F87171" />
    </svg>
  );
}

interface SkillIconProps {
  name: string;
  className?: string;
}

export default function SkillIcon({ name, className = 'w-[18px] h-[18px]' }: SkillIconProps) {
  const norm = name.trim().toLowerCase();

  // 1. Programing Languages & Core Full-Stack
  if (norm === 'java' || norm.startsWith('java ')) {
    return <DiJava className={`${className} text-[#E76F00]`} />;
  }
  if (norm === 'javascript' || norm === 'js') {
    return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
  }
  if (norm === 'typescript' || norm === 'ts') {
    return <SiTypescript className={`${className} text-[#3178C6]`} />;
  }
  if (norm.includes('python')) {
    return <SiPython className={`${className} text-[#3776AB]`} />;
  }
  if (norm === 'c') {
    return <SiC className={`${className} text-[#A8B9CC]`} />;
  }
  if (norm === 'c++') {
    return <SiCplusplus className={`${className} text-[#00599C]`} />;
  }
  if (norm.includes('html')) {
    return <SiHtml5 className={`${className} text-[#E34F26]`} />;
  }
  if (norm.includes('css')) {
    return <FaCss3Alt className={`${className} text-[#1572B6]`} />;
  }
  if (norm.includes('react')) {
    return <SiReact className={`${className} text-[#61DAFB]`} />;
  }
  if (norm.includes('node')) {
    return <SiNodedotjs className={`${className} text-[#5FA04E]`} />;
  }
  if (norm.includes('express')) {
    return <SiExpress className={`${className} text-[#CCCCCC]`} />;
  }
  if (norm.includes('spring')) {
    return <SiSpringboot className={`${className} text-[#6DB33F]`} />;
  }
  if (norm.includes('bash')) {
    return <SiGnubash className={`${className} text-[#4EAA25]`} />;
  }
  if (norm === 'sql') {
    return <Database className={`${className} text-[#00758F]`} />;
  }

  // 2. Databases & Data Tech
  if (norm.includes('mysql')) {
    return <SiMysql className={`${className} text-[#4479A1]`} />;
  }
  if (norm.includes('mariadb')) {
    return <SiMariadb className={`${className} text-[#003545]`} />;
  }
  if (norm.includes('postgres')) {
    return <SiPostgresql className={`${className} text-[#4169E1]`} />;
  }
  if (norm.includes('mongo')) {
    return <SiMongodb className={`${className} text-[#47A248]`} />;
  }
  if (norm.includes('redis')) {
    return <SiRedis className={`${className} text-[#DC382D]`} />;
  }
  if (norm.includes('kafka')) {
    return <SiApachekafka className={`${className} text-[#E5E5E5]`} />;
  }

  // 3. DevOps & Infrastructure
  if (norm.includes('docker') || norm.includes('containerization')) {
    return <SiDocker className={`${className} text-[#2496ED]`} />;
  }
  if (norm.includes('kubernetes')) {
    return <SiKubernetes className={`${className} text-[#326CE5]`} />;
  }
  if (norm === 'git') {
    return <SiGit className={`${className} text-[#F05032]`} />;
  }
  if (norm === 'github') {
    return <SiGithub className={`${className} text-[#FFFFFF]`} />;
  }
  if (norm === 'linux' || norm.includes('linux shell') || norm === 'linux security') {
    return <SiLinux className={`${className} text-[#FCC624]`} />;
  }
  if (norm.includes('windows')) {
    return <FaWindows className={`${className} text-[#0078D6]`} />;
  }
  if (norm === 'aws' || norm.includes('aws cloud') || norm.includes('aws certified')) {
    return <FaAws className={`${className} text-[#FF9900]`} />;
  }

  // 4. Security Tools
  if (norm.includes('burp suite') || norm === 'burp') {
    return <SiBurpsuite className={`${className} text-[#FF6633]`} />;
  }
  if (norm.includes('metasploit')) {
    return <SiMetasploit className={`${className} text-[#1369AC]`} />;
  }
  if (norm.includes('wireshark')) {
    return <SiWireshark className={`${className} text-[#1679A7]`} />;
  }
  if (norm.includes('nmap')) {
    return <NmapLogo className={className} />;
  }
  if (norm.includes('ghidra')) {
    return <GhidraLogo className={className} />;
  }
  if (norm.includes('hashcat')) {
    return <SiHashcat className={`${className} text-[#E76F00]`} />;
  }
  if (norm.includes('kali')) {
    return <SiKalilinux className={`${className} text-[#557C94]`} />;
  }

  // 5. AWS Services (Official AWS Architecture Components)
  if (norm === 'ec2' || norm.includes('elastic compute')) {
    return <AmazonEc2 className={className} />;
  }
  if (norm === 's3' || norm.includes('simple storage')) {
    return <AmazonSimpleStorageService className={className} />;
  }
  if (norm === 'lambda') {
    return <AwsLambda className={className} />;
  }
  if (norm === 'rds') {
    return <AmazonRds className={className} />;
  }
  if (norm.includes('dynamodb')) {
    return <AmazonDynamoDb className={className} />;
  }
  if (norm === 'vpc') {
    return <AmazonVpcLattice className={className} />;
  }
  if (norm.includes('cloudfront')) {
    return <AmazonCloudFront className={className} />;
  }
  if (norm.includes('route 53') || norm === 'route53') {
    return <AmazonRoute53 className={className} />;
  }
  if (norm.includes('api gateway')) {
    return <AmazonApiGateway className={className} />;
  }
  if (norm === 'ecs') {
    return <AmazonEcsAnywhere className={className} />;
  }
  if (norm === 'eks') {
    return <AmazonEksDistro className={className} />;
  }
  if (norm === 'ecr') {
    return <AmazonEcsAnywhere className={className} />;
  }
  if (norm.includes('cloudwatch')) {
    return <AmazonCloudWatch className={className} />;
  }
  if (norm.includes('cloudtrail')) {
    return <AwsCloudTrail className={className} />;
  }
  if (norm === 'iam') {
    return <AwsIamIdentityCenter className={className} />;
  }
  if (norm === 'waf') {
    return <AwsWaf className={className} />;
  }
  if (norm === 'kms') {
    return <AwsKeyManagementService className={className} />;
  }
  if (norm === 'sqs') {
    return <AmazonSimpleQueueService className={className} />;
  }
  if (norm === 'sns') {
    return <AmazonSimpleNotificationService className={className} />;
  }
  if (norm.includes('eventbridge')) {
    return <AmazonEventBridge className={className} />;
  }
  if (norm.includes('guardduty')) {
    return <AmazonGuardDuty className={className} />;
  }
  if (norm.includes('security hub')) {
    return <AwsSecurityHub className={className} />;
  }
  if (norm.includes('secrets manager')) {
    return <AwsSecretsManager className={className} />;
  }
  if (norm.includes('inspector')) {
    return <AmazonInspector className={className} />;
  }
  if (norm.includes('cloudformation')) {
    return <AwsCloudFormation className={className} />;
  }
  if (norm.includes('codebuild')) {
    return <AwsConfig className={className} />;
  }
  if (norm.includes('codedeploy')) {
    return <AwsConfig className={className} />;
  }
  if (norm.includes('codepipeline')) {
    return <Workflow className={`${className} text-[#FF9900]`} />;
  }
  if (norm.includes('beanstalk')) {
    return <AwsElasticBeanstalk className={className} />;
  }
  if (norm.includes('auto scaling')) {
    return <AmazonEc2AutoScaling className={className} />;
  }
  if (norm === 'efs' || norm === 'ebs' || norm.includes('backup')) {
    return <AmazonEfs className={className} />;
  }
  if (norm === 'shield') {
    return <AwsShield className={className} />;
  }
  if (norm === 'acm') {
    return <AwsCertificateManager className={className} />;
  }
  if (norm.includes('config') || norm.includes('systems manager')) {
    return <AwsConfig className={className} />;
  }

  // 6. Security & Offensive Concepts (Lucide Icons as specified)
  if (norm === 'cybersecurity') {
    return <ShieldCheck className={`${className} text-[#dfb88e]`} />;
  }
  if (norm.includes('red team') || norm.includes('red teaming')) {
    return <Swords className={`${className} text-[#ef4444]`} />;
  }
  if (norm.includes('vapt')) {
    return <ScanSearch className={`${className} text-[#c59b6d]`} />;
  }
  if (norm.includes('penetration testing') || norm.includes('pentest')) {
    return <Crosshair className={`${className} text-[#f97316]`} />;
  }
  if (norm.includes('exploit development') || norm.includes('exploit dev')) {
    return <Bug className={`${className} text-[#ef4444]`} />;
  }
  if (norm.includes('vulnerability research') || norm.includes('vulnerability assessment')) {
    return <SearchCode className={`${className} text-[#38bdf8]`} />;
  }
  if (norm.includes('reverse engineering')) {
    return <Binary className={`${className} text-[#a855f7]`} />;
  }
  if (norm.includes('privilege escalation')) {
    return <ArrowUpCircle className={`${className} text-[#eab308]`} />;
  }
  if (norm.includes('binary exploitation')) {
    return <Binary className={`${className} text-[#ef4444]`} />;
  }
  if (norm.includes('shellcode')) {
    return <Terminal className={`${className} text-[#22c55e]`} />;
  }
  if (norm.includes('payload')) {
    return <FileCode2 className={`${className} text-[#f43f5e]`} />;
  }
  if (norm.includes('web application security') || norm.includes('web security') || norm.includes('web exploitation')) {
    return <GlobeLock className={`${className} text-[#38bdf8]`} />;
  }
  if (norm.includes('api security') || norm.includes('rest api')) {
    return <KeyRound className={`${className} text-[#c59b6d]`} />;
  }
  if (norm.includes('network security') || norm.includes('network')) {
    return <Network className={`${className} text-[#60a5fa]`} />;
  }
  if (norm.includes('active directory')) {
    return <FolderTree className={`${className} text-[#eab308]`} />;
  }
  if (norm.includes('initial access')) {
    return <DoorOpen className={`${className} text-[#f97316]`} />;
  }
  if (norm.includes('lateral movement')) {
    return <Share2 className={`${className} text-[#a855f7]`} />;
  }
  if (norm.includes('persistence')) {
    return <Anchor className={`${className} text-[#06b6d4]`} />;
  }
  if (norm.includes('command & control') || norm.includes('c2')) {
    return <Radio className={`${className} text-[#ef4444]`} />;
  }
  if (norm.includes('attack surface')) {
    return <Radar className={`${className} text-[#f43f5e]`} />;
  }
  if (norm.includes('ctf')) {
    return <Flag className={`${className} text-[#eab308]`} />;
  }
  if (norm.includes('threat modeling')) {
    return <Radar className={`${className} text-[#f97316]`} />;
  }
  if (norm.includes('security auditing') || norm.includes('security assessment')) {
    return <ClipboardCheck className={`${className} text-[#10b981]`} />;
  }
  if (norm.includes('security research') || norm.includes('research')) {
    return <Search className={`${className} text-[#38bdf8]`} />;
  }
  if (norm.includes('poc')) {
    return <Code2 className={`${className} text-[#c59b6d]`} />;
  }

  // 7. Security Tool Utilities
  if (norm.includes('john the ripper') || norm === 'john') {
    return <Key className={`${className} text-[#eab308]`} />;
  }
  if (norm.includes('hydra')) {
    return <Lock className={`${className} text-[#ef4444]`} />;
  }
  if (norm.includes('sqlmap')) {
    return <Database className={`${className} text-[#f97316]`} />;
  }
  if (norm.includes('ffuf') || norm.includes('gobuster')) {
    return <FolderSearch className={`${className} text-[#38bdf8]`} />;
  }
  if (norm.includes('netcat')) {
    return <Terminal className={`${className} text-[#22c55e]`} />;
  }
  if (norm.includes('gdb') || norm.includes('pwndbg')) {
    return <Bug className={`${className} text-[#f43f5e]`} />;
  }

  // 8. Architecture & General Tech
  if (norm.includes('microservice')) {
    return <Boxes className={`${className} text-[#a855f7]`} />;
  }
  if (norm.includes('event-driven')) {
    return <Zap className={`${className} text-[#eab308]`} />;
  }
  if (norm.includes('message queue')) {
    return <Layers className={`${className} text-[#c59b6d]`} />;
  }
  if (norm.includes('distributed system')) {
    return <Server className={`${className} text-[#60a5fa]`} />;
  }
  if (norm.includes('asynchronous')) {
    return <Clock className={`${className} text-[#38bdf8]`} />;
  }
  if (norm.includes('ci/cd')) {
    return <Workflow className={`${className} text-[#22c55e]`} />;
  }
  if (norm.includes('oop') || norm.includes('object-oriented')) {
    return <Boxes className={`${className} text-[#c59b6d]`} />;
  }
  if (norm.includes('data structure') || norm.includes('dsa')) {
    return <GitBranch className={`${className} text-[#38bdf8]`} />;
  }
  if (norm.includes('database design') || norm.includes('nosql')) {
    return <Database className={`${className} text-[#00758F]`} />;
  }
  if (norm.includes('optimization')) {
    return <Gauge className={`${className} text-[#10b981]`} />;
  }

  // Default Fallback
  return <Code2 className={`${className} text-[#c59b6d]`} />;
}
