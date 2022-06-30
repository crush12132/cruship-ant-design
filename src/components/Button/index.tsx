import React from 'react';
import classNames from 'classnames'

export enum ButtonSize {
 Large = 'lg',
 Small = 'sm'
}
export enum ButtonType {
 Primary = 'primary',
 Default = 'default',
 Danger = 'danger',
 Link= 'link'
}

interface IButtonProps{
    className?:string,
    disabled?: boolean,
    btnType?: ButtonType,
    size?: ButtonSize,
    children:React.ReactNode,
    href?:string
}

type NativeButtonType = React.ButtonHTMLAttributes<HTMLElement> & IButtonProps;
type AnchorButtonType = React.AnchorHTMLAttributes<HTMLElement> & IButtonProps;
export type ButtonProps = Partial<NativeButtonType&AnchorButtonType>

const Button:React.FC<ButtonProps> = (props)=>{
    const {
        disabled,
        className,
        btnType,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn',className,{
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType===ButtonType.Link) && disabled,
    })
    if(btnType===ButtonType.Link && href) {
        return (
            <a 
              href={href}
              className={classes} 
              {...restProps}
            >
                {children}
            </a>
        )
    }else{
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps={
    disabled: false,
    btnType:ButtonType.Default
}

export default Button