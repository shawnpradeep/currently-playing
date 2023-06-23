const dotenv = require("dotenv");

dotenv.config();

const _getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

const TOKEN = _getToken();

const _getCurrentlyPlaying = async (token) => {
  const token2 = await token;
  console.log(token2);
  const result = await fetch("https://api.spotify.com/v1/me/", {
    method: "GET",
    headers: { Authorization: "Bearer " + token2 },
  });

  const data = await result.json();
  console.log(data);
};

getCurrentlyPlaying(TOKEN);
