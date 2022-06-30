import React ,{useContext,useState}from 'react';
import classNames from 'classnames';
import {MenuContext} from './index'
import { MenuItemProps} from './MenuItem'

interface SubMenuProps {
    index?:string
    className?:string;
    title?:string;
    children?: React.ReactNode
}

const SubMenu:React.FC<SubMenuProps> = (props) => {
    const {index,className,title,children} = props
    const context = useContext(MenuContext)
    const opendSubMenus = context.defaultSubmenu as Array<string>
    const isOpend = (index && context.mode==='vertical')? opendSubMenus?.includes(index):false
    const classes = classNames('menu-item submenu-item',className,{
        'is-active':context.index===index
    })
    const [openState,setOpen] = useState(isOpend)
    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault();
        setOpen(!openState)
    }
    let timer:any;
    const handleMouse = (e:React.MouseEvent,toggle:boolean) => {
        clearTimeout(timer)
        e.preventDefault();
        timer = setTimeout(() =>{
            setOpen(toggle)
        },300)
    }
    const clickEvent = context.mode==='vertical'?{
        onClick:handleClick
    }:{}
    const mouseClick = context.mode!=='vertical'?{
        onMouseEnter:(e:React.MouseEvent) =>{handleMouse(e,true)},
        onMouseLeave:(e:React.MouseEvent) =>{handleMouse(e,false)},

    }:{}

    const renderChildren = () => {
        const submenuClass = classNames('cursh-submenu',{
            'menu-opened':openState
        })
       const childrenComponent = React.Children.map(children,(child,i) =>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if(displayName==='MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.error('Warning:Menu has a child which is not a MenuItem component! ')
            }
        })
        return (
            <ul className={submenuClass}>
                {childrenComponent}
            </ul>
        )
    }
    return (
     <li className={classes}  {...mouseClick}>
         <div className="submenu-title menu-opened" {...clickEvent}>
             {title}
         </div>
         {renderChildren()}
     </li>
    )
}

SubMenu.displayName = 'SubMenu'
  

export default SubMenu;