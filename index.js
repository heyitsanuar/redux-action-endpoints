function replaceEndpointPlaceholders(params, endpoint) {
  let renewedEndpoint = endpoint;

  Object.entries(params).forEach(element => {
    const placeholder = `:${element[0]}`;

    renewedEndpoint = renewedEndpoint.replace(placeholder, element[1]);
  });

  return renewedEndpoint;
}

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

export function createRoutine(type, endpoint = '') {
  const types = typeGenerator(type);

  return {
    ...types,
    trigger: payload => actionGenerator(types.TRIGGER, payload),
    fulfill: payload => actionGenerator(types.FULFILL, payload),
    success: payload => actionGenerator(type.SUCCESS, payload),
    failure: payload => actionGenerator(types.FAILURE, payload),
    request: payload => actionGenerator(types.REQUEST, payload),
    getEndpoint: params => replaceEndpointPlaceholders(params, endpoint)
  };
}

const fetchAccountsAction = createRoutine('FETCH_ACCOUNTS', '/accounts/:id');
