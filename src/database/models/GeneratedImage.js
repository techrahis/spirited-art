// models/GeneratedImage.js
export default (sequelize, DataTypes) => {
  const GeneratedImage = sequelize.define(
    "GeneratedImage",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      givenImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      generatedImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      style: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "success",
      },
    },
    {
      timestamps: true,
    }
  );

  return GeneratedImage;
};
