import male1 from '../../data/icons/male 1.png';
import male2 from '../../data/icons/male 2.png';
import male3 from '../../data/icons/male 3.png';
import male4 from '../../data/icons/male 4.png';
import female1 from '../../data/icons/female 1.png';
import female2 from '../../data/icons/female 2.png';
import female3 from '../../data/icons/female 3.png';
import female4 from '../../data/icons/female 4.png';
import tmale1 from '../../data/icons/tmale 1.png';
import tfemale1 from '../../data/icons/tfemale 1.png';
import user from '../../data/icons/user.png';



export default function RandomAvatar({ gender, height, width }) {
let avatarsMale = [male1, male2, male3, male4];
let avatarsFemale = [female1, female2, female3, female4];
let backgroundMale = ['#1cbbb4', '#ffa000', '#00c853', '#2196f3'];
let backgroundFemale = ['#935393', '#1cbbb4', '#16958f', '#c15bff'];
let randomavatarsMale = Math.floor(Math.random() * avatarsMale.length);
let randomavatarsFemale = Math.floor(Math.random() * avatarsFemale.length);
let randombackMale = Math.floor(Math.random() * backgroundMale.length);
let randombackFemale = Math.floor(Math.random() * backgroundFemale.length);

  if (gender == 'Garçon') return <img src={avatarsMale[randomavatarsMale]} className="rounded-full w-10 h-10" alt="avatar" width={width} height={height} style={{ background: backgroundMale[randombackMale] }} />;
  if (gender == 'Fille') return <img src={avatarsFemale[randomavatarsFemale]} alt="avatar" width={width} height={height} className="rounded-full w-10 h-10" style={{ background: backgroundFemale[randombackFemale] }} />;
  if (gender == 'Monsieur') return <img src={tmale1} alt="avatar" height={height} width={width} className="rounded-full w-10 h-10" style={{ background: backgroundMale[randombackMale] }} />;
  if (gender == 'Madame' ) return (
    <img
      src={tfemale1}
      alt="avatar"
      height={height}
      width={width}
      className="rounded-full w-10 h-10"
      style={{ background: backgroundFemale[randombackFemale] }}
    />
  );
  if (gender == 'Mademoiselle') return <img src={tfemale1} alt="avatar" height={height} width={width} className="rounded-full w-10 h-10" style={{ background: backgroundFemale[randombackFemale] }} />;
  return <img src={user} alt="avatar" height={height} width={width} className="rounded-full w-10 h-10" style={{ background: backgroundFemale[randombackFemale] }} />;
}
