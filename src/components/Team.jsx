import { teamMembers } from '../data/team';

const WantedCard = ({ name, image, imageLoading }) => (
  <article className="operator-card">
    <div className="operator-card__frame">
      <img src={image} alt={name} loading={imageLoading} decoding="async" fetchPriority="low" width="560" height="560" />
    </div>
    <div className="operator-card__details">
      <h3>{name}</h3>
    </div>
  </article>
);

const Team = () => {
  return (
    <section id="team" className="team-section container">
      <div className="section-heading">
        <p>02 / active cell</p>
        <h2><span>/</span> OPERATORS</h2>
      </div>
      <div className="operator-grid">
        {teamMembers.map((member) => <WantedCard key={member.name} {...member} />)}
      </div>
    </section>
  );
};

export default Team;
