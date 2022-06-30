import React from 'react';
import {fireEvent, render} from '@testing-library/react'
import Button,{ButtonType,ButtonSize,ButtonProps} from './index'

const defaultProps:ButtonProps = {
  onClick:jest.fn(),
}

const testProps:ButtonProps = {
  btnType:ButtonType.Primary,
  size:ButtonSize.Large,
  className:'klass'
}

const disableProps:ButtonProps = {
  disabled: true,
  onClick:jest.fn()
}

// test('first react',()=>{
//   const view = render(<Button>Nice</Button>)
//   // eslint-disable-next-line testing-library/prefer-screen-queries
//   const element = view.queryByText('Nice')
//   expect(element).toBeTruthy()
// })

describe('Button component',()=>{
  it('should render the correct default button',()=>{
    const view = render(<Button {...defaultProps}>Nice</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = view.getByText('Nice') as HTMLButtonElement
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct button based on different props',()=>{
    const view = render(<Button {...testProps}>Nice</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = view.getByText('Nice')
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
    
  })
  it('should render a link when btyType equals link and href is provided',()=>{
    const view = render(<Button btnType={ButtonType.Link} href="http://baidu.com">Link</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = view.getByText('Link')
    expect(element.tagName).toEqual('A')

    
  })
  it('should render disabled button when disabled set to true',()=>{
    const view = render(<Button {...disableProps}>Nice</Button>) 
     // eslint-disable-next-line testing-library/prefer-screen-queries
     const element = view.getByText('Nice') as HTMLButtonElement
     expect(element.disabled).toBeTruthy()
     fireEvent.click(element)//触发click
     expect(disableProps.onClick).not.toHaveBeenCalled()//onClick没有被调用
  })
})