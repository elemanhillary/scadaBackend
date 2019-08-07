export default (sequelize, DataTypes) => {
  const photos = sequelize.define('photos', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  photos.associate = (models) => {
    photos.belongsTo(models.users, { foreignKey: 'userId' });
  };
  return photos;
};
