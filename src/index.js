import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home.js'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, browserHistory } from 'react-router'
import './index.css'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj0mobpesyaic01029ibai5u4' })
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={Home} />
    </Router>
  </ApolloProvider>
),
  document.getElementById('root')
)
