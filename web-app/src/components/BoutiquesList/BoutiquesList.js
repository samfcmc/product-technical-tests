import BoutiqueItem from "../BoutiqueItem/BoutiqueItem";

import "./BoutiquesList.scss";

const block = "boutiques-list";

export default function BoutiquesList({ boutiques = [] }) {
  const isEmpty = boutiques.length === 0;

  return (
    <>
      {isEmpty && (
        <div className={`${block} ${block}--empty`}>
          <h3>There are no boutiques available</h3>
        </div>
      )}
      <ul className={block}>
        {boutiques.map((boutique) => (
          <li key={boutique._id} className={`${block}__item`}>
            <BoutiqueItem boutique={boutique} />
          </li>
        ))}
      </ul>
    </>
  );
}
