import BoutiqueItem from "../BoutiqueItem/BoutiqueItem";

import "./BoutiquesList.scss";

export default function BoutiquesList({ boutiques = [] }) {
  return (
    <ul className="boutiques-list">
      {boutiques.map((boutique) => (
        <li key={boutique._id}>
          <BoutiqueItem boutique={boutique} />
        </li>
      ))}
    </ul>
  );
}
