import React, { Component, PropTypes } from 'react';

import './Presets.css';

import Select from '../controls/Select';
import Item from '../Item';

import mining from './mining.json';
import ports from './ports.json';

function toVal (val) {
  return { name: val, value: val };
}

function mix (a, b) {
  if (typeof a !== 'object' || typeof b !== 'object') {
    return b || a;
  }

  Object.keys(a).forEach(key => {
    a[key] = mix(a[key], b[key]);
  });

  return a;
}

const presets = {
  'None': null,
  'Defaults': null,
  'Mining': mining,
  'Non-standard Ports': ports
  // 'Low Bandwidth': bandwidth
  // Pruned Node
  // Raspberry Pi https://github.com/MrChrisJ/fullnode/blob/master/Setup_Guides/bitcoin.conf
  // Tor Node     https://gist.github.com/MrChrisJ/1098de03ef9588943fc7
  // Testnet node
  // Regtest node
  // Non-syncing node
};

class Presets extends Component {

  static propTypes = {
    preset: PropTypes.string,
    defaults: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    preset: 'None'
  };

  change = (preset) => {
    if (preset === 'None') {
      return;
    }

    if (this.props.preset === 'None') {
      if (!window.confirm('Do you want to overwrite current config?')) {
        this.forceUpdate();
        return;
      }
    }

    const data = mix(clone(this.props.defaults), clone(presets[preset] || {}));
    this.props.onChange(preset, data);
  };

  render () {
    const {preset} = this.props;

    return (
      <div className='presets'>
        <Item title={''} description={'Load predefined config.'}>
          <Select
            onChange={this.change}
            value={preset}
            values={Object.keys(presets).map(toVal)}
            id={'presets'}
            disabled={false}
            />
        </Item>
      </div>
    );
  }
}

function clone (val) {
  return JSON.parse(JSON.stringify(val));
}

export default Presets;
