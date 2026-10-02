import profile from './data/profile.json';
import Avatar from './components/Avatar.jsx';
import DetailList from './components/DetailList.jsx';
import ProfileLinks from './components/ProfileLinks.jsx';
import QuoteCard from './components/QuoteCard.jsx';
import BuildFooter from './components/BuildFooter.jsx';

export default function App() {
  const skills = profile.skills ?? [];

  return (
    <main className="page">
      <header className="topline">
        <span className="eyebrow">Student Profile</span>
        <span className="topline-id">{profile.department}</span>
      </header>

      <article className="card">
        <section className="identity" aria-label="Identity">
          <Avatar src={profile.photo} name={profile.name} />
          <h1 className="name">{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <ProfileLinks links={profile.links} />
        </section>

        <section className="content">
          <DetailList profile={profile} />

          {profile.about && (
            <section className="block">
              <h2 className="block-title">About</h2>
              <p className="about">{profile.about}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="block">
              <h2 className="block-title">Skills</h2>
              <ul className="skills">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </article>

      <QuoteCard quotes={profile.quotes ?? []} />

      <BuildFooter />
    </main>
  );
}
