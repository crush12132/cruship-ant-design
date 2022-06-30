import React from 'react';
import {render, RenderResult,fireEvent,cleanup,waitFor} from '@testing-library/react';
import Menu,{MenuProps} from './index';
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const testProps:MenuProps={
   defaultIndex:'0',
   onSelect:jest.fn(),
   className:'test'

}
const testVesProps:MenuProps={
    mode:'vertical',
    defaultIndex:'0',
    onSelect:jest.fn(),

}

const handleMenu = (props:MenuProps) =>{
    return (
        <Menu {...props}>
          <MenuItem >active</MenuItem>
          <MenuItem disabled >disabled</MenuItem>
          <MenuItem >xyz</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>drop</MenuItem>
          </SubMenu>
        
        </Menu>
    )
}
const handleSubMenu = () =>{
    const cssFile:string = `
    .cursh-submenu{
        display:none;
    }
    .cursh-submenu.menu-opened{
        display:block;
    }
    `
   const style = document.createElement('style')
   style.innerHTML=cssFile
   return style

}

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement;

describe('Menu and MenuItem component',()=>{
    beforeEach(()=>{
        // eslint-disable-next-line testing-library/no-render-in-setup
        wrapper = render(handleMenu(testProps))
        wrapper.container.append(handleSubMenu())// wrapper.container指的是html元素，在html元素添加style标签
        // eslint-disable-next-line testing-library/prefer-screen-queries
        menuElement = wrapper.getByTestId('test-menu')
        // eslint-disable-next-line testing-library/prefer-screen-queries
        activeElement = wrapper.getByText('active')
        // eslint-disable-next-line testing-library/prefer-screen-queries
        disabledElement = wrapper.getByText('disabled')

    })
    it('should render correct Menu and MenuItem based on default props',()=>{
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test')
        // eslint-disable-next-line testing-library/no-node-access
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        // eslint-disable-next-line testing-library/no-node-access
        expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback',()=>{
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const thirdElement = wrapper.getByText('xyz');
        fireEvent.click(thirdElement)
        expect(thirdElement).toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
        
    })
    it('should render vertical mode when mode is set to vertical',()=>{
        cleanup()//再次调用render函数，需要清除下
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const wrapper = render(handleMenu(testVesProps))   
         // eslint-disable-next-line testing-library/prefer-screen-queries
         const menuElement = wrapper.getByTestId('test-menu')
         expect(menuElement).toHaveClass('menu-vertical')
    })
    it('shoule show dropdown items when hover on subMenu',async ()=>{
        //queryByText 通过text来查找对应的dom【html元素】，如果没有找到则返回null
        //getByText 通过text来查找对应的dom，如果没有找到则直接报错
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(wrapper.queryByText('drop')).not.toBeVisible()//这里默认是horizontal,display是none，按道理来说是文本没有显示
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const dropdownElement = wrapper.getByText('dropdown')//hover 触碰的是整个dropdownElement,里面的itemMenu也会被触发
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const dropElement = wrapper.getByText('drop')//click 点击的是里面的itemMenu
        
        fireEvent.mouseEnter(dropdownElement)
        // eslint-disable-next-line testing-library/no-wait-for-empty-callback
        await waitFor(()=>{
            // eslint-disable-next-line testing-library/prefer-screen-queries
            expect(wrapper.queryByText('drop')).toBeVisible()//定时器延迟300毫秒，所以报错找不到下拉文本列表
        })
        
        fireEvent.click(dropElement)
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

        fireEvent.mouseLeave(dropdownElement)
        // eslint-disable-next-line testing-library/no-wait-for-empty-callback
        await waitFor(()=>{
            // eslint-disable-next-line testing-library/prefer-screen-queries
            expect(wrapper.queryByText('drop')).not.toBeVisible()
        })
    })
    it('should show vertical mode when mode is set to vertical',()=>{
        cleanup()//再次调用render函数，需要清除下
        //设置为垂直模式
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const wrapper = render(handleMenu(testVesProps))   
         // eslint-disable-next-line testing-library/prefer-screen-queries
         const menuElement = wrapper.getByTestId('test-menu')
         expect(menuElement).toHaveClass('menu-vertical')

         //垂直时点击submenu
         // eslint-disable-next-line testing-library/prefer-screen-queries
         const dropElement = wrapper.getByText('drop')
         fireEvent.click(dropElement)
         expect(testVesProps.onSelect).toHaveBeenCalledWith('3-0')

        //默认打开submenu
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const dropdownElement = wrapper.getByText('dropdown')
        // eslint-disable-next-line testing-library/no-node-access
        expect(dropdownElement).toHaveClass('menu-opened')

    })
   
})