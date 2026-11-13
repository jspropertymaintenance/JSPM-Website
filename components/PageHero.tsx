export default function PageHero({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {children && <p className="lead">{children}</p>}
        {actions && <div className="btn-row page-hero__actions">{actions}</div>}
      </div>
    </section>
  );
}
