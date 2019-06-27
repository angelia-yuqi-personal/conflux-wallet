/*
 * DeployContractCode Messages
 *
 * This contains all the text for the DeployContractCode component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.DeployContractCode';

export default defineMessages({
  codeTitle: {
    id: `${scope}.codeTitle`,
    defaultMessage: 'Contract Bytecode',
  },
  codeTitle2: {
    id: `${scope}.codeTitle2`,
    defaultMessage: 'Call Contract Bytecode',
  },
});
