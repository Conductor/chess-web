import * as React from 'react';
import { IChessBoardCell } from '../../../../../types/chess';
import * as cx from 'classnames';

const styles: any = require('./chessBoardCell.scss');
const icons: any = require('../../../../assets/icons.scss');

interface IChessBoardCellProps extends IChessBoardCell {
    cellName: string;
}

const ChessBoardCell: (props: IChessBoardCellProps) => JSX.Element = (props) => {
    const { cellName, type, owner, isHighlighted } = props;
    const iconStyle: string = cx({
        [icons.icon]: true,
        [icons[type]]: true,
        [styles.white]: owner === 'White'
    });

    return (
        <div className={ styles.cell }>
            {
                type && <button className={ styles.btn }>
                    <i className={ iconStyle } />
                </button>
            }
        </div>
    );
};

export default ChessBoardCell;