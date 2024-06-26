import util from './util.mjs';
import util_regression from './util_regression.mjs';

/**
 * Constructor of RidgeRegXpln object,
 * this object allow to perform ridge regression
 * @constructor
 */
const RidgeRegXpln = function() {
  this.init();
};

/**
 * Initialize new arrays and initialize Kalman filter.
 */
RidgeRegXpln.prototype.init = util_regression.InitRegression

/**
 * Add given data from features
 * @param {Array} features - features where extract data to add
 * @param {Object} screenPos - The current screen point
 * @param {Object} type - The type of performed action
 */
RidgeRegXpln.prototype.addData = function(features, screenPos, type) {
  if (!features) return;
  if (type === 'click') {
    this.screenXClicksArray.push([screenPos[0]]);
    this.screenYClicksArray.push([screenPos[1]]);
    this.eyeFeaturesClicks.push(features);
    delete this.xCoef;
    delete this.yCoef;
  } else if (type === 'move') {
    throw new Error('Not implemented!!!');
  }
};

/**
 * Try to predict coordinates from pupil data
 * after apply linear regression on data set
 * @param {Array} features - The current user features features
 * @returns {Object}
 */
RidgeRegXpln.prototype.predict = function(features) {
  if (!features || this.eyeFeaturesClicks.length === 0) {
    return null;
  }

  var screenXArray = this.screenXClicksArray.data;
  var screenYArray = this.screenYClicksArray.data;
  var eyeFeatures = this.eyeFeaturesClicks.data;

  if (!this.xCoef) this.xCoef = util_regression.ridge(screenXArray, eyeFeatures, this.ridgeParameter);
  if (!this.yCoef) this.yCoef = util_regression.ridge(screenYArray, eyeFeatures, this.ridgeParameter);

  var predictedX = 0;
  for(var i=0; i< features.length; i++){
    predictedX += features[i] * this.xCoef[i];
  }
  var predictedY = 0;
  for(var i=0; i< features.length; i++){
    predictedY += features[i] * this.yCoef[i];
  }

  return {
    x: Math.floor(predictedX),
    y: Math.floor(predictedY)
  };
};

RidgeRegXpln.prototype.setData = function() {
  throw new Error('Not implemented!!!');
};

/**
 * Return the data
 * @returns {Array.<Object>|*}
 */
RidgeRegXpln.prototype.getData = function() {
  throw new Error('Not implemented!!!');
};

/**
 * The RidgeRegXpln object name
 * @type {string}
 */
RidgeRegXpln.prototype.name = 'ridgeXpln';

export default RidgeRegXpln;
