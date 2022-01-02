import React from 'react';
import './App.css';

import { createInstance, OptimizelyFeature, OptimizelyProvider, withOptimizely }
  from '@optimizely/react-sdk';
const optimizely = createInstance({ sdkKey: '<<SDK KEY>>' });


class PurchaseButton extends React.Component {
  onClick = () => {
    const { optimizely } = this.props
    // after we’ve confirmed purchase completed
    optimizely.track('purchase')
  }

  render() {
    return (
      <button onClick={this.onClick}>
        Purchase
      </button>
    )
  }
}

const WrappedPurchaseButton = withOptimizely(PurchaseButton);


function App() {
  return (
    <OptimizelyProvider
      optimizely={optimizely}
      user={{
        id: (Math.floor(Math.random() * 999999) + 100000).toString(),
      }}
    >
      <div className="App">
        <header className="App-header">
          <OptimizelyFeature feature="discountnew">
            {(enabled, variables) => `Got a discount of $${variables.amount}`}
          </OptimizelyFeature>
          <WrappedPurchaseButton />
        </header>
      </div>
    </OptimizelyProvider>
  );
}

export default App;
