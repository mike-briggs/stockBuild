import React, { Component } from 'react'
import _ from 'lodash'

import { Search, Label, Button, Icon } from 'semantic-ui-react'
import git from './assets/images/github.png'
import mail from './assets/images/mail.png'
import linkedin from './assets/images/linkedin.png'
import Line from './components/Line.js'
import IconC from './components/Icon.js'
import menu from './assets/images/menu.png'
import UseAnimations from "react-useanimations";

const resultRenderer = ({ ticker }) => <Label content={ticker} />
const initialState = { isLoading: false, filtered: [], filtered2: [], filtered3: [], value: '' }


export class NavBar extends Component {
    state = {
        animation: 'overlay',
        direction: 'right',
        dimmed: true,
        visible: false,
        initialState
    }

    constructor(props) {
        super(props);
        this.childLook = React.createRef();
        this.state = {
            isLoading: false,
            signButton: <></>,
            value: ''
        }


    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value: value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = (result) => re.test(result.ticker)
          if (this.state.loaded == true) {
            this.setState({
              isLoading: false,
    
              filtered: _.filter(this.state.gainerList, isMatch),
              filtered2: _.filter(this.state.loserList, isMatch),
              filtered3: _.filter(this.state.loserList, isMatch),
    
    
            })
          }
    
    
        }, 300)
    
    
      }
    
    
      stockSearch = (e, { result }) => {
        this.setState({ value: '', filtered: this.state.stockList })
        console.log(result)
        this.render()
    
      }

    render() {

        return (

            <div style={{margin:'0px'}}>
                <header style={{margin:'0px'}} className="header-area header-sticky">
                    <div style={{margin:'0px'}} className="row">
                        <div style={{margin:'0px'}} className="col-12">
                            <nav className="main-nav">
                                <div className="container">
                                    <a href="#" className="logo" style={{ display:'flex', color: 'black' }}>
                                    <UseAnimations speed={0.5} animationKey="activity" size={40} style={{ color: 'white', paddingRight: '10px' }} />

                                        <h2 style={{ color: 'rgb(10, 10, 10)', fontFamily: 'Muli', color: 'white', marginTop: '0px', fontSize: '24px', fontWeight: '600', marginTop: '0px', letterSpacing: '0' }}> Tickers</h2>
                                    </a>
                                    <div style={{ float: 'right', paddingTop: '7px' }}>
                                    {this.state.search ?<Search style={{ paddingTop: '10px', paddingBottom: '10px' }}
                        size='mini'
                        loading={this.state.isLoading}
                        onResultSelect={this.stockSearch}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                          leading: true,
                        })}
                        resultRenderer={resultRenderer}
                        results={this.state.filtered}
                        value={this.state.value}
                        fluid
                        {...this.props}
                      />:<Button style={{ marginTop:'10px',float: 'right', backgroundColor: '#203845', color: 'white' }}
                       icon circular
                     onClick={()=>this.setState({search:true})}><Icon name='search'/></Button>}
                                    </div>

                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default NavBar



