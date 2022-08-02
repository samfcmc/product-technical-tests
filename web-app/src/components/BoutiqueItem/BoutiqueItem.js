import "./BoutiqueItem.scss";

export default function BoutiqueItem({ boutique }) {
  const { name } = boutique;
  return <div className="boutique-item">Boutique: {name}</div>;
}
