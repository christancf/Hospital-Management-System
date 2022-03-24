import fetch from 'auth/FetchInterceptor'

const billingService = {}


billingService.addTransaction = function (jss){

  return fetch({
    url: '/transaction/add',
    method: 'post',
    data: jss

  })
}

export default billingService