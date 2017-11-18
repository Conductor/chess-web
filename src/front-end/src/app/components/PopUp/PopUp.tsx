import * as React from 'react';
import { observer } from 'mobx-react';
import PopUpStore from './PopUpStore';
import Button from '../Button/Button';
import RenderIf from '../RenderIf';

const styles: any = require('./popup.scss');

const Popup: () => JSX.Element = () => (
    <div className={ styles.popupWrapper } onClick={ () => PopUpStore.close(false) }>
        <div className={ [styles.popup, PopUpStore.containerClassName].join(' ') }
             onClick={ (e) => e.stopPropagation() }>
            <div className={ styles.popupHeader }>
                <RenderIf condition={!!PopUpStore.title}>
                    <h3>{ PopUpStore.title }</h3>
                </RenderIf>
                <RenderIf condition={PopUpStore.showCloseButton}>
                    <Button buttonClass={ [styles.popupBtn, styles.popupBtnClose].join(' ') }
                            onClick={ (e) => PopUpStore.close(false, e) }>
                        <i className='icon ic-close' />
                    </Button>
                </RenderIf>
            </div>
            <RenderIf condition={!!PopUpStore.content}>
                <div className={ styles.popupBody } style={ PopUpStore.bodyStyle }>
                    { PopUpStore.content }
                </div>
            </RenderIf>
            <RenderIf condition={PopUpStore.showFooter}>
                <div className={ styles.popupFooter }>
                    <Button buttonClass={ [styles.popupBtn, styles.popupBtnOk].join(' ') }
                            onClick={ (e) => PopUpStore.close(true, e) }>
                        { PopUpStore.successText }
                    </Button>
                    <RenderIf condition={PopUpStore.showCancelButton}>
                        <Button buttonClass={ styles.popupBtn }
                                onClick={(e) => PopUpStore.close(false, e) }>
                            { PopUpStore.cancelText }
                        </Button>
                    </RenderIf>
                </div>
            </RenderIf>
        </div>
    </div>
);

export default observer(Popup);
