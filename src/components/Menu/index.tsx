import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './MenuItem'

type ModeType = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void
 export interface MenuProps {
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback
    defaultIndex?: string;
    mode?: ModeType;
    children?: React.ReactNode,
    defaultSubmenu?:string[]
}
interface IMenuContext {
    index?: string;
    onSelect?: SelectCallback,
    mode?: ModeType,
    defaultSubmenu?:string[]
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
const Menu: React.FC<MenuProps> = (props) => {
    const { className, style, defaultIndex, mode, children, onSelect ,defaultSubmenu} = props;
    const [activeIndex, setActive] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal':mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: activeIndex ? activeIndex : '0',
        onSelect: handleClick,
        mode,
        defaultSubmenu
    }
    //判断child是否是MenuItem组件类型
    const renderItem = () =>{
       return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if(displayName === 'MenuItem'||displayName==='SubMenu'){
                return React.cloneElement(childElement,{//在一个实例上添加新的属性，返回新的实例
                    index:index.toString()
                })
            }else{
                console.error('Warning:Menu has a child which is not a MenuItem component! ')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {renderItem()}
            </MenuContext.Provider>

        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: "horizontal"
}

export default Menu;