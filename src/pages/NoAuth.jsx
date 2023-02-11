import { useStore } from "../contexts/Store";
import warning from "../data/icons/warning.png";
export default function NoAuth() {
  const theme = useStore((state) => state.theme);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className={`p-10 text-2xl text-center ${theme.textXl}`}>Désolé vous n'avez pas accés a cette page</div>
        <img src={warning} width="150" />
      </div>
    </>
  );
}
