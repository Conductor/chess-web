import * as React from 'react';
import { IChessBoardCell } from '../../../../../types/chess';
import * as cx from 'classnames';

const styles: any = require('./chessBoardCell.scss');
const icons: any = require('../../../../assets/icons.scss');

interface IChessBoardCellProps extends IChessBoardCell {
    cellName: string;
}

const ChessBoardCell: (props: IChessBoardCellProps) => JSX.Element = (props) => {
    const { cellName, type, owner, isDisabled, onClick, isHighlighted } = props;
    const moveHandler: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
        e.preventDefault();
        // tslint:disable-next-line
        const target: HTMLButtonElement = e.target.hasOwnProperty('id') ? e.target as HTMLButtonElement : e.currentTarget;
        onClick && onClick(target);
    };
    const iconStyle: string = cx({
        [icons.icon]: true,
        [icons[type]]: true,
        [styles.white]: owner === 'White'
    });
    const highlightedCellStyle: string = cx({
        [styles.btn]: true,
        [styles.isHighlighted]: isHighlighted
    });
    const figuresCellStyle: string = cx({
        [styles.btn]: true,
        [styles.remove]: isHighlighted
    });


    return (
        <div className={ styles.cell }>
            {
                type &&
                <button id={ cellName } className={ figuresCellStyle } disabled={ isDisabled } onClick={ moveHandler }>
                    <i className={ iconStyle } />
                </button>
            }
            {
                isHighlighted && !type &&
                <button id={ cellName } className={ highlightedCellStyle } onClick={ moveHandler } />
            }
        </div>
    );
};

export default ChessBoardCell;