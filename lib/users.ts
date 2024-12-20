"use server";
import { Pool } from "pg";
import conn from "./db";
import { createSession, getUserId } from "./sessions";
import { User } from "./types";
import { createLogs } from "./logs";
import { sendMail } from "./mailsender";
import { getCurrentDate, getCurrentDatePlus15Minutes } from "./func";

export const getUser = async (token?: string) => {
  try {
    const userid = await getUserId(token);

    if (userid.status === "failed") {
      return false;
    }

    const query = `
            SELECT 
                u.id, 
                u.firstname, 
                u.lastname, 
                u.role, 
                u.email, 
                u.class,
                json_agg(
                    json_build_object(
                        'id', c.id,
                        'type', c.type
                    )
                ) AS cards
            FROM users u
            LEFT JOIN cards c ON u.id = c.userid
            WHERE u.id = $1
            GROUP BY u.id
        `;

    const result = await (conn as Pool).query(query, [userid.userid]);
    return result.rows[0] as User;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isEmailAvailable = async (email: string) => {
  try {
    const query = 'SELECT * FROM users WHERE email = $1'
    const result = await (conn as Pool).query(query, [email]);
    return result.rows.length < 1
  } catch (error) {
    return 'Error'
  }
}

type LoginResponse = {
  status: "success" | "failed";
  error?: string;
  token?: string;
};

export const loginUser = async (
  email: string,
  password: string,
  mode: "PC" | "MOBILE" = "PC"
) => {
  if (!email || !password) {
    console.log("No email or password");
    return {
      status: "failed",
      error: "No email or password",
    } as LoginResponse;
  }
  try {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const result = await (conn as Pool).query(query, [email, password]);
    if (result.rows.length < 1) {
      const ans: LoginResponse = {
        status: "failed",
        error: "Incorrect email or password",
      };
      return ans;
    }

    if (mode === "PC" && result.rows[0].role !== "Admin") {
      return {
        status: "failed",
        error: "Only for admins",
      } as LoginResponse;
    }

    const session = await createSession(result.rows[0].id, mode);

    if (session === "failed") {
      const ans: LoginResponse = {
        status: "failed",
        error: "Something wants wrong",
      };
      return ans;
    }

    const ans: LoginResponse = {
      status: "success",
      token: session,
    };
    await createLogs(`Log In`, "success", "", session);
    return ans;
  } catch (error) {
    console.log(error);
    const ans: LoginResponse = {
      status: "failed",
      error: "Something wants wrong",
    };
    return ans;
  }
};

type GetUsersResponse = {
  status: "success" | "failed";
  error?: string;
  data?: User[];
  totalRows?: number;
};

export const getUsers = async (page: number) => {
  try {
    const itemsPerPage = 50;
    const offset = (page - 1) * itemsPerPage;

    const totalCountQuery = "SELECT COUNT(*) AS total FROM users";
    const totalCountResult = await (conn as Pool).query(totalCountQuery);

    if (totalCountResult.rows.length < 1 || !totalCountResult.rows[0].total) {
      return {
        status: "failed",
        error: "No users",
      } as GetUsersResponse;
    }

    const totalRows = parseInt(totalCountResult.rows[0].total, 10);

    const usersQuery = `
            SELECT 
                u.id, 
                u.firstname, 
                u.lastname, 
                u.role, 
                u.email, 
                u.class,
                json_agg(
                    json_build_object(
                        'id', c.id,
                        'type', c.type
                    )
                ) AS cards
            FROM users u
            LEFT JOIN cards c ON u.id = c.userid
            GROUP BY u.id
            ORDER BY u.id ASC
            LIMIT $1 OFFSET $2
        `;
    const usersResult = await (conn as Pool).query(usersQuery, [
      itemsPerPage,
      offset,
    ]);

    return {
      status: "success",
      data: usersResult.rows,
      totalRows: totalRows,
    } as GetUsersResponse;
  } catch (error) {
    console.error(error);
    return {
      status: "failed",
      error: "Something went wrong",
    } as GetUsersResponse;
  }
};

type CreateUserResponse = {
  status: "success" | "failed";
  error?: string;
};

export const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  userclass?: string,
  role: string = "User"
) => {
  try {
    const query = `
        INSERT INTO users (email, password, firstname, lastname, role, class)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const values = [
      email,
      password,
      firstname,
      lastname,
      role,
      userclass || null,
    ];

    const result = await (conn as Pool).query(query, values);

    return {
      status: "success",
    } as CreateUserResponse;
  } catch (error) {
    return {
      status: "failed",
      error: "Something went wrong",
    } as CreateUserResponse;
  }
};

type DeleteUserResponse = {
  status: "success" | "failed";
  error?: string;
};

export const deleteUser = async (id: number) => {
  try {
    const query = `
        DELETE FROM users
        WHERE id = $1;
    `;

    const result = await (conn as Pool).query(query, [id]);

    return {
      status: "success",
    } as DeleteUserResponse;
  } catch (error) {
    return {
      status: "failed",
      error: "Something went wrong",
    } as DeleteUserResponse;
  }
};

type CreateUserRequestResponse = {
    status: 'success' | 'failed'
    error?: string
    key?: string | number
}

export const createUserRequest = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  userclass?: string
) => {
  try {
    const query = `
        INSERT INTO createrequest (email, password, firstname, lastname, class, key, expires)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;

    const key = Math.floor(100000 + Math.random() * 900000)
    const expires = getCurrentDatePlus15Minutes()

    const values = [
      email,
      password,
      firstname,
      lastname,
      userclass || null,
      key,
      expires,
    ];

    const result = await (conn as Pool).query(query, values);

    const mail = await sendMail(email, key, expires)

    if(mail === 'failed') {
        return {
            status: 'failed',
            error: 'Something went wrong'
        } as CreateUserRequestResponse
    }

    return {
      status: "success",
      key: key
    } as CreateUserRequestResponse;
  } catch (error) {
    console.log(error)
    return {
      status: "failed",
      error: "Something wants wrong",
    } as CreateUserRequestResponse;
  }
};

export type ValidateUserRequestResponse =
  {
  status: "success" | "failed";
  data?: any;
  error?: string
}


export const validateUserRequest = async (
  email: string,
  key: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  try {
    const query = `
    SELECT * FROM createrequest
    WHERE email = $1 AND key = $2;
  `;

  const values = [email, key];


  const result = await (conn as Pool).query(query, values);

  if (result.rows.length === 0) {
    return {
      status: "failed",
      error: "Invalid key",
    } as ValidateUserRequestResponse;
  }

  const request = result.rows[0];

  const currentDate = getCurrentDate();

  if (new Date(request.expires) <= new Date(currentDate)) {
    return {
      status: "failed",
      error: "Code has expired",
    } as ValidateUserRequestResponse;
  }


    return {
      status: "success",
    } as ValidateUserRequestResponse;
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      error: "Something went wrong",
    } as ValidateUserRequestResponse;
  }
};

type EditUserResponse = {
  status: "success" | "failed";
  error?: string;
};
export const editUser = async (
  id: number,
  email: string | undefined,
  firstname: string,
  lastname: string,
  userclass?: string,
  role: string = "User"
) => {
  try {
    let query = `
        UPDATE users
        SET firstname = $1,
            lastname = $2,
            role = $3,
            class = $4
        WHERE id = $5;
    `;

    let values = [firstname, lastname, role, userclass || null, id];

    if (email) {
      query = `
          UPDATE users
          SET email = $1,
              firstname = $2,
              lastname = $3,
              role = $4,
              class = $5
          WHERE id = $6;
      `;
      values = [email, firstname, lastname, role, userclass || null, id];
    }

    const result = await (conn as Pool).query(query, values);

    return {
      status: "success",
    } as EditUserResponse;
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      error: "Something went wrong",
    } as EditUserResponse;
  }
};

type AddCardResponse = {
  status: "failed" | "success";
  error?: string;
};

export const addCard = async (
  userid: number,
  cardid: number,
  type: "UHF" | "RFID"
) => {
  try {
    const query = `
            INSERT INTO cards (userid, id, type)
            VALUES ($1, $2, $3);
        `;

    const result = await (conn as Pool).query(query, [userid, cardid, type]);

    return {
      status: "success",
      card: result.rows[0],
    } as AddCardResponse;
  } catch (error) {
    if ((error as any).code === "23505") {
      return {
        status: "failed",
        error: "Card is already added.",
      } as AddCardResponse;
    }
    return {
      status: "failed",
      error: "Something went wrong",
    } as AddCardResponse;
  }
};

type DeleteCardResponse = {
  status: "failed" | "success";
  error?: string;
};

export const deleteCard = async (id: number, token?: string) => {
  try {
    const query = `
            DELETE FROM cards
            WHERE id = $1;
        `;

    const result = await (conn as Pool).query(query, [id]);

    if (result.rowCount === 0) {
      return {
        status: "failed",
        error: "Card not found.",
      } as DeleteCardResponse;
    }

    await createLogs("Delete card", "success", `ID: ${id}`, token);

    return {
      status: "success",
      message: "Card deleted successfully.",
    } as DeleteCardResponse;
  } catch (error) {
    return {
      status: "failed",
      error: "Something went wrong",
    } as DeleteCardResponse;
  }
};
