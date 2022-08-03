import "./Error.scss";

const block = "error";

function Error({ children, cta }) {
  return (
    <article className={block}>
      <div className={`${block}__content`}>{children}</div>
      <div className={`${block}__cta`}>{cta}</div>
    </article>
  );
}

export default Error;
