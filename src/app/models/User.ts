/**
 * User interface defines the shape of every user
 */
export interface User {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];

  // The map of attributes devs can pass into Application via the mapping from LDAP, OpenID, etc.
  attributes?: {};
}
