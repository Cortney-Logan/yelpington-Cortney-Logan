import { useMap } from "react-leaflet";

// since maps in leaflet are immutable, allows map to adjust to center on brewery once breweryDetails are loaded
function AdjustMap(props) {
  const map = useMap();
  map.setView(props.center, 15);
  return null;
}

export default AdjustMap;
