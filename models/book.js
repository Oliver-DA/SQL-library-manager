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
          msg: "Please provide a title"
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

    genre: {
      type:DataTypes.STRING,

      validate: {
        notEmpty: {
          msg: "Please provide a genre"
        }
      }
    },

    year: {
      type: DataTypes.INTEGER,

      validate: {
        notEmpty: {
          msg: "Please provide a year"
        }, 

        min: {
          args:"1",
          msg: "The year needs to be greather or equal to 1"
        },

        isNumeric: {
          msg: "The value for year needs to be numeric"
        }
      } 
    }

  }, { sequelize });

  return Book;

};