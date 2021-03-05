import { useMap } from 'react-leaflet';

function AdjustMap(props){
const map=useMap();
map.setView(props.center,15);
return null;
}

export default AdjustMap;