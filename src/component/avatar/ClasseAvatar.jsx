import arabic from '../../data/icons/arabic.png';
import bag from '../../data/icons/bag.png';
import deutch from '../../data/icons/deutch.png';
import draw from '../../data/icons/draw.png';
import english from '../../data/icons/english.png';
import french from '../../data/icons/franch.png';
import math from '../../data/icons/math.png';
import music from '../../data/icons/music.png';
import pc from '../../data/icons/pc.png';
import phy from '../../data/icons/phy.png';
import reading from '../../data/icons/reading.png';
import electronics from "../../data/icons/electronics.png";
import kinder from '../../data/icons/kinder.png';
import quran from '../../data/icons/quran.png';
import science from '../../data/icons/science.png';
import spain from '../../data/icons/spain.png';
import vip from '../../data/icons/vip.png';
import soroban from '../../data/icons/soroban.png';
import write from '../../data/icons/write.png';

export default function ClasseAvatar({ moduleName, height, width }) {
  if (moduleName != null){
  if (moduleName.includes("Quran")) return <img src={quran} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Arabe')) return <img src={arabic} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Français')) return <img src={french} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Anglais')) return <img src={english} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Espagnole')) return <img src={spain} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Allemand')) return <img src={deutch} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes("Turque")) return <img src={deutch} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes("Italien")) return <img src={deutch} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Math')) return <img src={math} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes("Arduino")) return <img src={electronics} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes("Électronique")) return <img src={electronics} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Physique')) return <img src={phy} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Science')) return <img src={science} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Informatique')) return <img src={pc} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Dessin')) return <img src={draw} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Musique')) return <img src={music} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Écriture')) return <img src={write} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes("Lecture")) return <img src={reading} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Maternelle')) return <img src={kinder} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('VIP')) return <img src={vip} alt="avatar" width={width} height={height} style={{  padding: 2, marginRight: 10 }} />;
  if (moduleName.includes('Soroban')) return <img src={soroban} alt="avatar" width={width} height={height} style={{ padding: 2, marginRight: 10 }} />;
   return <div></div>;}
}
