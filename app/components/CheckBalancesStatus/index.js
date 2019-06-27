/**
 *
 * CheckBalanceStatus
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function CheckBalancesStatus({ checkingBalanceDoneTime, checkingBalances, checkingBalancesError }) {
  // console.log(checkingBalancesError);
  if (checkingBalances) {
    return (
      <div>
        <FormattedMessage {...messages.checkingBalances} />
      </div>
    );
  }

  if (checkingBalancesError !== false) {
    return <div> {checkingBalancesError} </div>;
  }

  // const balanceCheckString = checkingBalanceDoneTime
  //   ? `balances checked on  + ${checkingBalanceDoneTime}`
  //   : 'Balances wasnt checked yet';
  return (
    <div>
      {checkingBalanceDoneTime ? (
        <FormattedMessage
          {...messages.checkSuccess}
          values={{
            time: checkingBalanceDoneTime,
          }}
        />
      ) : (
        <FormattedMessage {...messages.checkFailure} />
      )}
    </div>
  );
}

CheckBalancesStatus.propTypes = {
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export default CheckBalancesStatus;
