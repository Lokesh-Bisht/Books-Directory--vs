import { getConnection } from 'typeorm';
import { UserInfo } from '../controller/UsersController';
import { User } from '../entity/User';


/**
 * Class for interacting with the Users table in the database.
 * 
 * This class makes use of User entity which represents a row in the
 * Users table.
 */
export class UsersRepository {
  
  constructor() {}

  /**
   * Adds a new user to the Users table
   * @param userInfo 
   * @returns 
   */
  async addUser(userInfo: UserInfo) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values ([
        {
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password
        }
      ])
      .execute();
    } catch(error) {
      return error;
    }
  }


  /**
   * Returns User { userID, username, password} from the Users table
   * where username === userInfo.username
   * 
   * @param userInfo 
   * @returns User, undefined or SQL error
   */
  async findUser(userInfo: UserInfo) : Promise<User | undefined | unknown> {
    const { username, email, password } = userInfo 
    console.log(userInfo);

    try {
      return await getConnection()
      .createQueryBuilder()
      .select(["user.userID", "user.username", "user.password"])
      .from(User, "user")
      .where("user.username = :username", { username: username })
      .getOne();
    } catch(error) {
      return error;
      // console.log(error);
      // return "An error occurred while processing request.";
    }
  }



  /**
   * Returns User { username, email} from the Users table
   * where userID === userInfo.userID
   * @param userID 
   * @returns User, undefiend or SQL error
   */
  async getUserById(userID: string) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .select(["user.username", "user.email"])
      .from(User, "user")
      .where("user.userID = :userID", { userID: userID })
      .getOne();
    } catch (error) {
      return error;
    } 
  }


  /**
   * Returns email if the email address is present in the Users table.
   * @param email 
   * @returns email, undefined or SQL error
   */
  async checkIfEmailExists(email: string) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .select(["user.email"])
      .from(User, "user")
      .where("user.email = :email", { email: email })
      .getOne();
    } catch (error) {
      return error;
    }
  }


  /**
   * Returns username if the username is present in the Users table.
   * @param username 
   * @returns username, undefined or SQL error
   */
  async checkIfUsernameExists(username: string) {
    try {
      return await getConnection()
      .createQueryBuilder()
      .select(["user.username"])
      .from(User, "user")
      .where("user.username = :username", { username: username })
      .getOne();
    } catch (error) {
      return error;
    }
  }
}