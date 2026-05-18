export default function PageHero({ badge, title, titleEm, description }) {
  return (
    <div className="page-hero">
      {badge && <div className="page-hero-badge">{badge}</div>}
      <h1>
        {titleEm && <em>{titleEm} </em>}
        {title}
      </h1>
      {description && <p>{description}</p>}
    </div>
  );
}
