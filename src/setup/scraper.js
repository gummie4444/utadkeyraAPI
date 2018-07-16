import cheerio from 'cheerio';
import request from 'request';
import http from 'http';
import { graphql } from 'graphql';

import schema from '../setup/schema/index';
import insertTripsIntoDb from './insertFromScrape';

const throttleAgent = new http.Agent({ maxSockets: 10 });

const getHtmlForUrl = url =>
  new Promise((resolve, reject) => {
    request.get(url, { agent: throttleAgent }, (err, response, html) => {
      if (err) {
        return reject(err);
      }
      return resolve(html);
    });
  });

// CONSTANTS
const tripDataObj = {
  detailUrl: '',
  type: '',
  from: '',
  to: '',
  date: '',
  time: '',
};

const tripMetaItems = Object.keys(tripDataObj);

const detailObject = {
  seats: '',
  name: '',
  phone: '',
  mobile: '',
  email: '',
  smokeStatus: '',
  notes: 'notes',
};

const detailItems = Object.keys(detailObject);

const getAllRides = () => {
  const htmlUrl = 'http://samferda.is';
  return getHtmlForUrl(htmlUrl).then((html) => {
    const $ = cheerio.load(html);
    const tripArray = [];
    $('tr').each((i, tr) => {
      const tripData = Object.assign({}, tripDataObj);
      // All tripDatas have bgColor
      const attributColor = tr.attribs.bgcolor;
      if (i > 1 && attributColor) {
        $(tr)
          .children('td')
          .each((num, td) => {
            if (num === 0) {
              const href = td.children[1].attribs.href;
              // Get the url to details
              tripData[tripMetaItems[num]] = href;

              // Get the id from the site
              const hrefSplit = href.split('/');
              tripData.id = hrefSplit[hrefSplit.length - 1];
            } else {
              tripData[tripMetaItems[num]] = td.children[0].data.replace('\n', '');
            }
          });
        tripArray.push(tripData);
      }
    });
    return tripArray;
  });
};

const getDetailsForRide = (ride) => {
  if (!ride) {
    return {}; // todo better
  }
  return getHtmlForUrl(ride.detailUrl).then((html) => {
    const $ = cheerio.load(html, { decodeEntities: false });
    const tempDetailObject = Object.assign({}, detailObject);
    $('tr').each((i, tr) => {
      if (i > 4) {
        $(tr)
          .children('td')
          .each((num, td) => {
            if (num === 1) {
              tempDetailObject[detailItems[i - 5]] = $(td).html();
            }
          });
      }
    });
    ride.details = tempDetailObject;
    return ride;
  });
};

const getDetailsForRides = (rides) => {
  // Wrap this in timeout
  const ridesWithDetail = rides.map(ride => getDetailsForRide(ride));

  return Promise.all(ridesWithDetail).then(finalRides => finalRides);
};

const insertIntoDb = (rides, db) => {
  // TODO do something smart to compare what you have in the db and the items here

  console.log(rides.length, 'Items scrapped Insert');

  insertTripsIntoDb(rides);
};

const scrapeSite = (db) => {
  console.log(new Date(), 'Scraper running');

  getAllRides()
    .then(rides => getDetailsForRides(rides))
    // .then(allRides => cleanUpRides(allRides))
    .then(finalRides => insertIntoDb(finalRides, db))
    .catch(err => console.log(err, 'ERRROR'));
};

export default (db) => {
  scrapeSite(db);
  setInterval(() => scrapeSite(db), 60000);
};
