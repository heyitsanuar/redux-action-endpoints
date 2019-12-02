const REQUEST_STATUSES = {
  TRIGGER: 'TRIGGER',
  FULFILL: 'FULFILL',
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

const { TRIGGER, REQUEST, SUCCESS, FULFILL, FAILURE } = REQUEST_STATUSES;

function replaceEndpointPlaceholders(params) {
  const endpoint = '/accounts/:accountID/branch/:branchID';
  let renewedEndpoint = endpoint;

  Object.entries(params).forEach(element => {
    const placeholder = `:${element[0]}`;

    renewedEndpoint = renewedEndpoint.replace(placeholder, element[1]);
  });

  return renewedEndpoint;
}

const renewedEndpoint = replaceEndpointPlaceholders({
  accountID: 1,
  branchID: 3
});

function typeGenerator(type) {
  return {
    TRIGGER: `${type}_TRIGGER`,
    FULFILL: `${type}_FULFILL`,
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`
  };
}

function actionGenerator(type) {
  return function(payload) {
    return {
      type,
      payload
    };
  };
}

function createRoutine(type) {
  const types = typeGenerator(type);

  return {
    ...types,
    trigger: actionGenerator(types.TRIGGER),
    fulfill: actionGenerator(types.FULFILL),
    success: actionGenerator(type.SUCCESS),
    failure: actionGenerator(type.FAILURE),
    request: actionGenerator(type.REQUEST)
  };
}

console.log(createRoutine('FETCH_USER'));
