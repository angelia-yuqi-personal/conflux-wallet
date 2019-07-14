import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import SendCfxModal from '../send-cfx-modal/index'
import SendFail from '../send-fail/index'
import SendSuccess from '../send-success/index'
import { ICFX } from '../typings'
import { I18NProps } from '@/i18n/context'
interface ISendCfxData {
  toAddress: string
  sendAmount: string
  gasPrice: string
}
interface IProps extends ICFX, Partial<I18NProps> {
  lockStatus?: boolean
  updateCfxAction?: () => void
  closeFailedModal?: () => void
  closeSuccessedModal?: () => void
  onSendCfx?: (data: ISendCfxData) => void
}
interface IState {
  showModal: boolean
}
class ContentCfx extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    showModal: false,
  }
  hideModal() {
    this.setState({
      showModal: false,
    })
  }
  onSendCfx(data) {
    this.props.onSendCfx(data)
  }
  // 关闭send失败模态框
  closeFailedModal() {
    this.props.closeFailedModal()
  }
  // 关闭send成功模态框
  closeSuccessedModal() {
    this.props.closeSuccessedModal()
  }
  render() {
    const { showModal } = this.state
    const { lockStatus, cfxBalance, cfxSendFailed, cfxSendSuccessed, I18N } = this.props
    return (
      <div className={styles.cardContent}>
        <div className={styles.infoBox}>
          <div className={styles.infoBoxTop}>
            <div className={styles.walletHeader}>
              <svg aria-hidden="true" className={styles.walletImg}>
                <use xlinkHref="#iconCFX" />
              </svg>
              <p className={styles.walletName}>CFX</p>
            </div>
            <div className={styles.walletBalance}>
              <p className={styles.walletBalanceTitle}>{I18N.Wallet.MyWallet.totalBalance}</p>
              <p className={styles.walletBalanceTotal}>{cfxBalance}</p>
            </div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <Button
            disabled={lockStatus}
            variant="contained"
            color="primary"
            className={styles.btn}
            onClick={() => {
              this.props.updateCfxAction()
              this.setState({
                showModal: true,
              })
            }}
          >
            {I18N.Wallet.MyWallet.sendBtn}
          </Button>
          <SendCfxModal
            {...this.props}
            isShow={showModal}
            onSendCfx={sendData => {
              this.onSendCfx({
                ...sendData,
                callback: () =>
                  this.setState({
                    showModal: false,
                  }),
              })
            }}
            updateAction={() => {
              this.props.updateCfxAction()
            }}
            onClose={() => {
              this.hideModal()
            }}
          />
          <Button variant="outlined" color="primary" className={styles.btn} disabled={lockStatus}>
            {I18N.Wallet.MyWallet.receiveBtn}
          </Button>
        </div>
        <SendFail
          I18N={I18N}
          openDialog={cfxSendFailed}
          onClose={() => {
            this.closeFailedModal()
          }}
        />
        <SendSuccess
          I18N={I18N}
          openDialog={cfxSendSuccessed}
          onClose={() => {
            this.closeSuccessedModal()
          }}
        />
      </div>
    )
  }
}
export default ContentCfx
