import React, { Component } from 'react'
import {Button,Icon} from 'semantic-ui-react'

export class StockPopup extends Component {
    render() {
        return (
            <div style={{ marginTop: '0px', backgroundImage: 'none',background:'transparent',color:'white' }} className="" id="">
                
            <div className="col-lg-12 col-md-12 col-sm-12 col-12" style={{ padding: '0px',background:'transparent'}}>
            <div style={{ padding: '0px',background:'transparent' }} className="row" >
              <div className="col-lg-7 col-md-7 col-sm-5 col-5" style={{ background:'transparent'}}>
                <h1 style={{fontSize:'3em', paddingTop:'0px',paddingBottom:'15px',paddingLeft: '15px', fontFamily: 'Raleway', fontWeight: 700, textAlign: 'left' }}>{this.props.stock.ticker}</h1>
                <h4 style={{ fontSize:'12pt',paddingTop:'0px',paddingBottom:'0px',paddingLeft: '15px', fontFamily: 'Muli', fontWeight: 600, textAlign: 'left' }}>{this.props.stock.companyName}</h4>

                <div className="col-lg-10 col-md-10 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-8">
                      <h5 style={{ paddingBottom: '0px', fontFamily: 'Muli', fontWeight: 600, textAlign: 'left' }}></h5>
                      
 
                    </div>
                    <div className="col-lg-4 col-md-4 col-4" style={{ paddingBottom: '0px' }}>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-lg-5 col-md-5 col-sm-6 col-6">
              <h1 style={{fontSize:'2em', paddingTop:'0px',paddingBottom:'15px',paddingLeft: '15px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>${this.props.stock.price}</h1>
              <div style={{ display: 'flex', float: 'left', paddingLeft: '0px' }} className="">
                      <Button style={{ float: 'left', fontSize: '24pt', padding: '0px', paddingTop: '0px', borderRadius: '100%', backgroundColor: 'transparent', color: this.props.gain ? '#1aa260' : '#de5246' }} icon><Icon name={this.props.gain ? 'caret up' : 'caret down'} /></Button>
                      <h1 style={{ paddingBottom: '10px', paddingTop: '12px', fontSize: '16pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>
                        {(this.props.stock.changes < 0) ? (((this.props.stock.changes.toString().slice(1)) / (this.props.stock.price - this.props.stock.changes.toString().slice(1)))*100).toString().slice(0, 4) :(((this.props.stock.changes) / (this.props.stock.price - this.props.stock.changes))*100).toString().slice(0, 4)} %</h1>
                    </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default StockPopup
