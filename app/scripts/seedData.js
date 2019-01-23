#!/usr/bin/env node

const args = require('args');
const chalk = require('chalk');
const Location = require('~/app/lib/models/Location');
const LocationData = require('~/app/scripts/stubs/LocationData');
const mongoose = require('mongoose');

const DB_NAME = 'relocatr';
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
    mongoose.connect(`mongodb://localhost/${DB_NAME}`, {useNewUrlParser: true});

    mongoose.connection.on('error', function(err) {
      console.error(
        chalk.red(`Failed to connect to DB ${DB_NAME} on startup`),
        err
      );
      reject(err);
    });

    mongoose.connection.on('connected', function() {
      console.log(chalk.blue(`Connected to ${DB_NAME} DB!`));
      resolve();
    });
  });
}

const create = () => {
  const locationDocuments = LocationData.map(location => {
    return new Promise((resolve, reject) => {
      Location.create(location, (err, locationDoc) => {
        if (err) {
          return reject(err);
        }
        console.log(
          chalk.yellow(` - created ${locationDoc.city}, ${locationDoc.state}`)
        );
        resolve();
      })
    });
  });
  return Promise.all(locationDocuments);
}

const remove = () => {
  return new Promise((resolve, reject) => {
    Location.remove({}, err => {
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
