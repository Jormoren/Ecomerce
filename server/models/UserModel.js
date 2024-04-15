import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UserModel = db.define ('users',{
    user_name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
});

export default UserModel;