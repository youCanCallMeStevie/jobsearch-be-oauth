const generateUserFromGoogle = profile => {
  const newUser = {
    googleId: profile.id,
    name: profile.name.givenName,
    surname: profile.name.familyName,
    email: profile.emails[0].value,
    profileImg: profile.picture,
    refreshTokens: [],
  };
  return newUser;
};

const generateUserFromSpotify = profile => {
  const newUser = {
    spotifyId: profile.id,
    name: profile.display_name,
    email: profile.email,
    subscription: profile.product,
    profileImg: profile.href,
    refreshTokens: [],
  };
  return newUser;
};
