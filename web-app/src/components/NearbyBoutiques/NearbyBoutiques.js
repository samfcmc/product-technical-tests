import BoutiquesList from "../BoutiquesList/BoutiquesList";
import Spinner from "../ui/Spinner/Spinner";

function NearbyBoutiques({ boutiques, isFetching, isLocating }) {
  return (
    <div>
      <Spinner show={isFetching}>Getting nearby boutiques</Spinner>
      <Spinner show={isLocating}>Getting your location</Spinner>
      <BoutiquesList boutiques={boutiques} />
    </div>
  );
}

export default NearbyBoutiques;
