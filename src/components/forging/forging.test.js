import React from 'react';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Forging from './forging';

chai.use(sinonChai);

describe('Forging', () => {
  let wrapper;
  const props = {
    account: {
      delegate: {},
      isDelegate: true,
    },
    peers: {},
    statistics: {},
    forgedBlocks: [],
    onForgingStatsUpdated: sinon.spy(),
    onForgedBlocksLoaded: sinon.spy(),
  };
  let account;

  describe('For a delegate account', () => {
    beforeEach(() => {
      account = {
        delegate: {},
        isDelegate: true,
      };

      wrapper = mount(<Forging {...props} account={account} />);
    });

    it('should render ForgingTitle', () => {
      expect(wrapper.find('ForgingTitle')).to.have.lengthOf(1);
    });

    it('should render ForgingStats', () => {
      expect(wrapper.find('ForgingStats')).to.have.lengthOf(1);
    });

    it('should render DelegateStats', () => {
      expect(wrapper.find('DelegateStats')).to.have.lengthOf(1);
    });

    it('should render ForgedBlocks', () => {
      expect(wrapper.find('ForgedBlocks')).to.have.lengthOf(1);
    });
  });

  describe('For a non delegate account', () => {
    beforeEach(() => {
      account = {
        delegate: {},
        isDelegate: false,
      };

      wrapper = mount(<Forging {...props} account={account} />);
    });

    it('should render only a "not delegate" message if !props.account.isDelegate', () => {
      expect(wrapper.find('ForgedBlocks')).to.have.lengthOf(0);
      expect(wrapper.find('DelegateStats')).to.have.lengthOf(0);
      expect(wrapper.find('p')).to.have.lengthOf(1);
    });

    // TODO: make these tests work
    it.skip('should call props.onForgingStatsUpdate', () => {
      expect(props.onForgingStatsUpdate).to.have.been.calledWith();
    });

    it.skip('should call props.onForgedBlocksLoaded', () => {
      expect(props.onForgedBlocksLoaded).to.have.been.calledWith();
    });
  });
});
