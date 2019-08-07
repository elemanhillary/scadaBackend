export const up = (queryInterface, Sequelize) => queryInterface.createTable('photos', {
  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
  },
});

export const down = queryInterface => queryInterface.dropTable('photos');
