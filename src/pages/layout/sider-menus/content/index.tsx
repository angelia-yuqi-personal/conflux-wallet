import React, { Component } from 'react'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
import OperationCode from './operation-code/index'
import OperationDaochu from './operation-daochu/index'
import OperationFuzhi from './operation-fuzhi/index'
import OperationRecord from './operation-record/index'
import MenuList from './menu-list/index'
import { I18NHOC } from '@/utils/tools/react'
import { I18NProps } from '@/i18n/context'
import Snackbar from '@material-ui/core/Snackbar'
type IProps = I18NProps & {
  closeAction?: () => void
  lockStatus: boolean
  /** 钱包地址 */
  currentAccountAddress: string
  /**privateKey */
  currentAccountPrivateKey: string
  width?: Breakpoint
}
interface IState {
  openFuzhiMsg?: boolean
}
class SiderContent extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    openFuzhiMsg: false,
  }
  handleCloseFuzhiMsg() {
    this.setState({
      openFuzhiMsg: false,
    })
  }
  render() {
    const cWidth = this.props.width
    const { openFuzhiMsg } = this.state
    const { lockStatus, currentAccountAddress, currentAccountPrivateKey, I18N } = this.props
    return (
      <>
        <div className={styles.siderMenusWrap}>
          <div className={styles.siderMenusTop}>
            <div className={styles.userInfo}>
              <div className={styles.userPicWrap}>
                <img src={Images.user} alt="" className={styles.userPic} />
              </div>
              <p className={styles.userCode}>{currentAccountAddress}</p>
            </div>
            <div className={styles.operationWrap}>
              <OperationFuzhi
                copied={() => {
                  this.setState({
                    openFuzhiMsg: true,
                  })
                }}
                lockStatus={lockStatus}
                currentAccountAddress={currentAccountAddress}
                I18N={I18N}
              />
              <OperationCode
                lockStatus={lockStatus}
                currentAccountAddress={currentAccountAddress}
                I18N={I18N}
              />
              <OperationDaochu
                lockStatus={lockStatus}
                currentAccountPrivateKey={currentAccountPrivateKey}
                I18N={I18N}
              />
              <OperationRecord lockStatus={lockStatus} I18N={I18N} />
            </div>
            <MenuList
              I18N={I18N}
              lockStatus={lockStatus}
              closeAction={() => {
                this.props.closeAction()
              }}
            />
          </div>
          <div className={styles.siderMenusBottom}>
            <p className={styles.official}>
              {lockStatus ? (
                'Conflux'
              ) : (
                <a href="https://www.conflux-chain.org/" target="_blank" rel="noopener noreferrer">
                  Conflux
                </a>
              )}
            </p>
            <p className={styles.official}>
              {lockStatus ? (
                'Explorer'
              ) : (
                <a href="http://www.confluxscan.io/" target="_blank" rel="noopener noreferrer">
                  Explorer
                </a>
              )}
            </p>
            {/* <p className={styles.official}>Bounty</p> */}
            <p className={styles.copyText}>Copyright © 2019 Conflux. All Rights Reserved</p>
          </div>
        </div>
        <Snackbar
          className={styles.snackbar}
          anchorOrigin={{
            vertical: isWidthUp('sm', cWidth) ? 'top' : 'bottom',
            horizontal: isWidthUp('sm', cWidth) ? 'left' : 'center',
          }}
          open={openFuzhiMsg}
          autoHideDuration={20000}
          onClose={() => {
            this.handleCloseFuzhiMsg()
          }}
          message={<span>{I18N.Layout.OperationFuzhi.copied}</span>}
        />
      </>
    )
  }
}
export default I18NHOC(withWidth()(SiderContent)) as any
