import cities from './dataset/cities.json';

import AG from './dataset/data/AG.json';
import BD from './dataset/data/BD.json';
import BDD from './dataset/data/BDD.json';
import BG from './dataset/data/BG.json';
import BK from './dataset/data/BK.json';
import BL from './dataset/data/BL.json';
import BN from './dataset/data/BN.json';
import BP from './dataset/data/BP.json';
import BTH from './dataset/data/BTH.json';
import BTR from './dataset/data/BTR.json';
import CB from './dataset/data/CB.json';
import CM from './dataset/data/CM.json';
import CT from './dataset/data/CT.json';
import DDB from './dataset/data/DDB.json';
import DDL from './dataset/data/DDL.json';
import DDN from './dataset/data/DDN.json';
import DDT from './dataset/data/DDT.json';
import DNA from './dataset/data/DNA.json';
import DNO from './dataset/data/DNO.json';
import GL from './dataset/data/GL.json';
import HB from './dataset/data/HB.json';
import HD from './dataset/data/HD.json';
import HG from './dataset/data/HG.json';
import HGI from './dataset/data/HGI.json';
import HN from './dataset/data/HN.json';
import HNA from './dataset/data/HNA.json';
import HP from './dataset/data/HP.json';
import HT from './dataset/data/HT.json';
import HY from './dataset/data/HY.json';
import KG from './dataset/data/KG.json';
import KH from './dataset/data/KH.json';
import KT from './dataset/data/KT.json';
import LA from './dataset/data/LA.json';
import LCA from './dataset/data/LCA.json';
import LCH from './dataset/data/LCH.json';
import LDD from './dataset/data/LDD.json';
import LS from './dataset/data/LS.json';
import NA from './dataset/data/NA.json';
import NB from './dataset/data/NB.json';
import NDD from './dataset/data/NDD.json';
import NT from './dataset/data/NT.json';
import PT from './dataset/data/PT.json';
import PY from './dataset/data/PY.json';
import QB from './dataset/data/QB.json';
import QNA from './dataset/data/QNA.json';
import QNG from './dataset/data/QNG.json';
import QNI from './dataset/data/QNI.json';
import QT from './dataset/data/QT.json';
import SG from './dataset/data/SG.json';
import SL from './dataset/data/SL.json';
import ST from './dataset/data/ST.json';
import TB from './dataset/data/TB.json';
import TG from './dataset/data/TG.json';
import TH from './dataset/data/TH.json';
import TN from './dataset/data/TN.json';
import TNI from './dataset/data/TNI.json';
import TQ from './dataset/data/TQ.json';
import TTH from './dataset/data/TTH.json';
import TV from './dataset/data/TV.json';
import VL from './dataset/data/VL.json';
import VP from './dataset/data/VP.json';
import VT from './dataset/data/VT.json';
import YB from './dataset/data/YB.json';

const cityData: any = {
  cities,
}
const wardData: any = {
  AG,
  BD,
  BDD,
  BG,
  BK,
  BL,
  BN,
  BP,
  BTH,
  BTR,
  CB,
  CM,
  CT,
  DDB,
  DDL,
  DDN,
  DDT,
  DNA,
  DNO,
  GL,
  HB,
  HD,
  HG,
  HGI,
  HN,
  HNA,
  HP,
  HT,
  HY,
  KG,
  KH,
  KT,
  LA,
  LCA,
  LCH,
  LDD,
  LS,
  NA,
  NB,
  NDD,
  NT,
  PT,
  PY,
  QB,
  QNA,
  QNG,
  QNI,
  QT,
  SG,
  SL,
  ST,
  TB,
  TG,
  TH,
  TN,
  TNI,
  TQ,
  TTH,
  TV,
  VL,
  VP,
  VT,
  YB,
};

export const getCities = () => {
  let result = [];
  
  for(let item in cityData.cities) {
    result.push({
      ...cityData.cities[`${item}`],
      name: item,
    });
  }
  return result;
};

export const getWards = (code: string) => {
  const data = wardData[`${code}`]
  return data.district;
};
