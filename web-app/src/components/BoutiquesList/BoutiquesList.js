import BoutiqueItem from "../BoutiqueItem/BoutiqueItem";

import "./BoutiquesList.scss";

const block = "boutiques-list";

export default function BoutiquesList({ boutiques = [] }) {
  return (
    <ul className={block}>
      {boutiques.map((boutique) => (
        <li key={boutique._id} className={`${block}__item`}>
          <BoutiqueItem boutique={boutique} />
        </li>
      ))}
    </ul>
  );
}
