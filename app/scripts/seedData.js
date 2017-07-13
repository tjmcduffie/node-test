#!/usr/bin/env node

const args = require('args');
const chalk = require('chalk');
const City = require('~/app/lib/models/City');
const CityData = require('~/app/scripts/stubs/CityData');
const mongoose = require('mongoose');

const DB_NAME = 'grimlock-city-living';
const exitStatus = {
  SUCCESS: 0,
  ERROR: 1,
};

args
  .option('create', 'Create seed data')
  .option('remove', 'Remove tables')
  .option('reset', 'Remove tables and recreate seed data');

const flags = args.parse(process.argv);

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://localhost/${DB_NAME}`);

    mongoose.connection.on('error', function(err) {
      console.error(
        chalk.red(`Failed to connect to DB ${DB_NAME} on startup`),
        err
      );
      reject(err);
    });

    mongoose.connection.on('connected', function(ref) {
      console.log(chalk.blue(`Connected to ${DB_NAME} DB!`));
      resolve();
    });
  });
}

const create = () => {
  const cityDocuments = CityData.map(city => {
    return new Promise((resolve, reject) => {
      City.create(city, (err, cityDoc) => {
        if (err) {
          return reject(err);
        }
        console.log(chalk.yellow(` - created ${city.name}, ${city.state}`));
        resolve();
      })
    });
  });
  return Promise.all(cityDocuments);
}

const remove = () => {
  return new Promise((resolve, reject) => {
    City.remove({}, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

const closeConnection = (status = 0) => {
  mongoose.connection.close(function () {
    console.log(chalk.blue(`Connection to ${DB_NAME} is closed`));
    process.exit(status);
  });
}

process
  .on('SIGINT', closeConnection)
  .on('SIGTERM', closeConnection);


console.log('>> Creating seed data');
connect()
  .then(() => {
    if (flags.reset) {
      remove()
        .catch(err => {
          console.log(
            chalk.red(` >>> Failed to remove seed data, ${err} `)
          );
          closeConnection(exitStatus.ERROR)
        })
        .then(() => {
          console.log(chalk.yellow(`>>> Seed data removal complete`));
          create()
            .catch(err => {
              console.log(chalk.red(`>>> Failed to create: ${err}`));
              closeConnection(exitStatus.ERROR)
            })
            .then(() => {
              console.log(chalk.yellow(`>>> Seed data creation complete`));
              closeConnection(exitStatus.SUCCESS)
            });
        });
    } else if (flags.remove) {
      remove()
        .catch(err => {
          console.log(chalk.red(` >>> Failed to remove seed data, ${err} `));
          closeConnection(exitStatus.ERROR)
        })
        .then(() => {
          console.log(chalk.yellow(`>>> Seed data removal complete`));
          closeConnection(exitStatus.SUCCESS)
        });
    } else if (flags.create) {
      create()
        .catch(err => {
          console.log(chalk.red(` >>> Failed to create: ${err} `));
          closeConnection(exitStatus.ERROR)
        })
        .then(() => {
          console.log(chalk.yellow(`>>> Seed data creation complete`));
          closeConnection(exitStatus.SUCCESS)
        });
    } else {
      console.log(chalk.red(` >>> Unrecognized option `));
      closeConnection(exitStatus.ERROR)
    }
  })
  .catch(err => {
    console.log(chalk.red(` >>> Failed to connect: ${err} `));
    closeConnection(exitStatus.ERROR)
  });
