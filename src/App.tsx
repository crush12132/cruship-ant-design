import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import Button,{ButtonType,ButtonSize} from './components/Button'
import Menu from './components/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
export default function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faCoffee}/>
      <Menu onSelect={(index)=>{alert(index)}} mode="vertical" defaultSubmenu={['2']}>
          <MenuItem>cool link1</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <SubMenu title='main-line'>
            <MenuItem>main -1</MenuItem>
            <MenuItem>main -2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>


        </Menu>
       
       <Button>Default</Button>
       <Button  size={ButtonSize.Small}> small</Button>
       <Button  size={ButtonSize.Large}> large</Button>
       <Button  btnType={ButtonType.Primary}> Primary </Button>&nbsp;&nbsp;
       <Button  btnType={ButtonType.Danger}> Danger </Button>&nbsp;&nbsp;
       <Button disabled> disabled</Button>
       <Button  btnType={ButtonType.Link} href='xxx'>Baidu Link</Button>&nbsp;&nbsp;
       <Button disabled btnType={ButtonType.Link} href='xxx'>Disabled Link</Button>
       



        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

 