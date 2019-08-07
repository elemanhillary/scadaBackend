export const up = (queryInterface, Sequelize) => queryInterface.createTable('tokens', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'valid',
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

export const down = queryInterface => queryInterface.dropTable('tokens');
