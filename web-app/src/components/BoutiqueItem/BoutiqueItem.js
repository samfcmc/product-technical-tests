import { useMemo } from "react";
import "./BoutiqueItem.scss";

const block = "boutique-item";

export default function BoutiqueItem({ boutique }) {
  const { name, logo, description } = boutique;
  const { url: logoUrl } = logo;

  const nameInitials = useMemo(
    () =>
      name
        .split(/\s+/)
        .map((namePart) => namePart.charAt(0))
        .join(" "),
    [name]
  );

  return (
    <article className={block}>
      <div className={`${block}__logo-container`}>
        {logoUrl && <img className={`${block}__logo`} src={logoUrl}></img>}
        {!logoUrl && (
          <div className={`${block}__logo ${block}__logo--empty`}>
            {nameInitials}
          </div>
        )}
      </div>
      <div className={`${block}__info`}>
        <h2 className={`${block}__name`}>{name}</h2>
        <p className={`${block}__description`}>{description}</p>
      </div>
    </article>
  );
}
