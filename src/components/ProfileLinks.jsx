import { ArrowIcon, GitHubIcon, LinkedInIcon } from './icons.jsx';

const LINKS = [
  { key: 'github', label: 'GitHub', Icon: GitHubIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
];

// Only links with a value in profile.json are shown.
export default function ProfileLinks({ links = {} }) {
  const visible = LINKS.filter(({ key }) => links[key]);
  if (visible.length === 0) return null;

  return (
    <ul className="links">
      {visible.map(({ key, label, Icon }) => (
        <li key={key}>
          <a href={links[key]} target="_blank" rel="noreferrer">
            <Icon />
            <span>{label}</span>
            <ArrowIcon className="link-arrow" />
          </a>
        </li>
      ))}
    </ul>
  );
}
