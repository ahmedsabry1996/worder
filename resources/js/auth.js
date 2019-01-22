export function currentUser() {

    const USER = localStorage.getItem('current_user');

    if (!USER) {
        return null;
    }
    return JSON.parse(USER);

}

export function currentUserProfile() {

    const USER_PROFILE = localStorage.getItem('current_user_profile');

    if (!USER_PROFILE) {
        return null;
    }
    return JSON.parse(USER_PROFILE);
}

export function currentUserTopics() {

    const USER_TOPICS = localStorage.getItem('current_user_topics');

    if (!USER_TOPICS) {
        return null;
    }
    return JSON.parse(USER_TOPICS);
}


export function userToken() {
  const USER_TOKEN= localStorage.getItem('access_token');

  if (!USER_TOKEN) {
      return "null";
  }
  return (USER_TOKEN);
}
export function isVerified() {
  const IS_VERIFIED= localStorage.getItem('is_verified');

  if (!IS_VERIFIED) {
      return "0";
  }
  return IS_VERIFIED;
}

export function verificationCode() {

    const VERIFICATION_CODE = localStorage.getItem("verification_code");
    if (!VERIFICATION_CODE) {
        return null;
    }
    return VERIFICATION_CODE;
}

export function userId() {
    const USER_ID = localStorage.getItem('user_id');
    if (!USER_ID) {
        return null;
    }
    return USER_ID;
}
export function hasProfile() {
    const HAS_PROFILE = localStorage.getItem("has_profile");

    if (!HAS_PROFILE) {
        return  "0";
    }
    return HAS_PROFILE;
}

export function email() {
  const EMAIL = localStorage.getItem('email');
  if (!EMAIL) {
      return null;
  }

  return EMAIL;
}
export function password() {
  const PASSWORD = localStorage.getItem('password');

  if (!PASSWORD) {
      return null;
  }
  return PASSWORD;
}

export function newTrend(){
  const TREND  = localStorage.getItem('trend');

  if (!TREND) {

      return null;
  }

  return JSON.parse(TREND);
}
