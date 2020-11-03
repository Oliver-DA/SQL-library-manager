'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {} ;

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
       
      validate: {
        notEmpty: {
          ms: "Please provide a title"
        }
      }
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: {
          msg:"Please provide an author"
        }
      }
    },

    genre: DataTypes.STRING,

    year: DataTypes.INTEGER

  }, { sequelize });

  return Book;

};