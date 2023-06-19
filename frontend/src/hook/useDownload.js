import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";

const UseDowload = () => {
  const games = useLiveQuery(() => db.Games.toArray(), []);
  return games;
};
export default UseDowload;
