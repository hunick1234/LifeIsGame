export const GET_USERINFO = "http://127.0.0.1:8080/api/v1/user/userInfo";

export const GET_GAMES = "http://127.0.0.1:8080/api/v1/games";
export const GET_GAME_INFO = "http://127.0.0.1:8080/api/v1/games/"; //+id

export const GET_USER_GAMES = "http://127.0.0.1:8080/api/v1/user/games";
export const POST_GAME = (gameID) => {
  return `http://127.0.0.1:8080/api/v1/user/edit/${gameID}`;
};
export const DELET_GAME = "http://127.0.0.1:8080/api/v1/user/edit/"; //+id

export const GET_Levels = (gameid) => {
  return `http://127.0.0.1:8080/api/v1/user/${gameid}/levels`;
};
export const POST_Level = (levelID, gameID) => {
  return `http://127.0.0.1:8080/api/v1/user/edit/${gameID}/${levelID}`;
};
export const DELET_Level = (levelID, gameID) => {
  return `http://127.0.0.1:8080/api/v1/user/edit/${gameID}/${levelID}`;
};

export const GET_SCENES = (levelID) => {
  return `http://127.0.0.1:8080/api/v1/user/level/${levelID}/scenes`;
};
export const POST_SCENE = (sceneID, levelID) => {
  return `http://127.0.0.1:8080/api/v1/user/edit/levels/${levelID}/${sceneID}`;
};
export const DELET_SCENE = (sceneID, levelID) => {
  return `http://127.0.0.1:8080/api/v1/user/edit/levels/${levelID}/${sceneID}`;
};

export const LOGIN = "http://127.0.0.1:8080/api/v1/login";
export const SIGNUP = "http://127.0.0.1:8080/api/v1/singin";
export const LOGOUT = "http://127.0.0.1:8080/api/v1/user/logout";

export const PLAY_GAME = "http://127.0.0.1:8080/api/v1/player/play";