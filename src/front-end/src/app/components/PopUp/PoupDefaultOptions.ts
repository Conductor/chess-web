export class IPopUp {
    public title?: string = '';
    public containerClassName?: string = '';
    public content?: JSX.Element | string = '';
    public showCloseButton?: boolean = true;
    public showCancelButton?: boolean = true;
    public showFooter?: boolean = true;
    public onCancelHandler?: () => void;
    public onSuccessHandler?: () => void;
    public cancelText?: string = 'cancel';
    public successText?: string = 'accept';
    public bodyStyle?: { [key: string]: string } = {};
}
