import { action, computed, observable } from 'mobx';
import { IPopUp } from './PoupDefaultOptions';

class PopUpStore {
    @observable
    public isOpen: boolean = false;

    @observable
    private _options: IPopUp;

    @action
    public open: (props?: IPopUp) => void = (props?) => {
        this._options = Object.assign(new IPopUp(), props ? props : {});
        this.isOpen = true;
        document.body.classList.add('opened');
    };
    @action
    public close: (closeType?: boolean, e?: any) => any = (closeType = false, e) => {
        if (e) {
            e.stopPropagation();
        }
        this.isOpen = false;
        document.body.classList.remove('opened');

        if (closeType && this._options.onSuccessHandler) {
            return this._options.onSuccessHandler();
        } else if (!closeType && this._options.onCancelHandler) {
            return this._options.onCancelHandler();
        }
    };

    @computed
    public get title (): string {
        return this._options.title;
    }

    @computed
    public get containerClassName (): string {
        return this._options.containerClassName;
    }

    @computed
    public get content (): JSX.Element | string {
        return this._options.content;
    }

    @computed
    public get cancelText (): string {
        return this._options.cancelText;
    }

    @computed
    public get successText (): string {
        return this._options.successText;
    }

    @computed
    public get showFooter(): boolean {
        return this._options.showFooter;
    }

    @computed
    public get showCloseButton(): boolean {
        return this._options.showCloseButton;
    }

    @computed
    public get showCancelButton(): boolean {
        return this._options.showCancelButton;
    }

    @computed
    public get bodyStyle(): { [key: string]: string } {
        return this._options.bodyStyle;
    }
}
const popupStore: PopUpStore  = new PopUpStore();
export default popupStore;
