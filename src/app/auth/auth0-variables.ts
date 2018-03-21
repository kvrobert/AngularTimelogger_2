interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  silentCallbackURL: string;
  audience: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '0c05KR1B4B9kG2D23jrL8U16BfL3LC75',
  domain: 'prosperobert.eu.auth0.com',
  callbackURL: 'http://localhost:4200/spinner',
  silentCallbackURL: 'http://localhost:3001/silent',
  audience: '', // ha megaom az audience-t 'timeloggoer.com' ...akkor egy JWT accesstokent kapok vissza
  apiUrl: 'http://localhost:8080'   //audience nélkül csak egy olyan access tokent amivel lekérhezem az infót URL user info-ról
};
