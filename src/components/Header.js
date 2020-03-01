import React, { Component } from 'react'
import Chart from "react-apexcharts";
import _ from 'lodash'
import './App.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/font-awesome.css'
import sketch from '../assets/images/sketch.png'
import python from '../assets/images/python.png'
import java from '../assets/images/java.png'
import react from '../assets/images/react.png'

import arrow from '../assets/images/arrow.png'
import StockPopup from './StockPopup.js'
import { Button, Item, Modal } from 'semantic-ui-react'

import ReactTypingEffect from 'react-typing-effect'
import { Search, Loader, Dimmer, Label, Icon, Table, Menu } from 'semantic-ui-react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const initialState = { isLoading: false, filtered: [], filtered2: [], filtered3: [], value: '' }

const resultRenderer = ({ ticker }) => <Label content={ticker} />

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      openModal: false, currentStock: {
        "ticker": "FB",
        "changes": "2.72",
        "price": "192.47",
        "changesPercentage": "(1.43%)",
        "companyName": "Facebook Inc."
      }, graph: false,
      filteredChart: [], moving: [], gain: true, quoteState: false, quote: [], chartData: [], value: '', loserList: [], gainerList: [], filtered: [], filtered2: [], filtered3: [], stockList: [{ symbol: "AAPL", price: "220.89" }, { symbol: "AMZN", price: "1883.83" }, { symbol: "ENB", price: "38.07" }], loaded: true, initialState, stocks: [], options: {
        chart: {
          type: 'line'
        },
        series: [{
          name: 'close',
          data: []
        }],
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ],
    }

    this.openModal(this.state.currentStock)
    this.setState({ resultList: { title: this.state.stockList.symbol, price: this.state.stockList.price } })
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.stockSearch = this.stockSearch.bind(this);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://financialmodelingprep.com/api/v3/stock/gainers", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);

        this.setState({
          stockList: json.mostGainerStock,
          filtered: json.mostGainerStock,
          results: this.state.stockList,
          loaded: true
        });

        this.setState({
          isLoading: false,
          filtered: json.mostGainerStock

        });

        console.log(this.state.stockList)

      })/*LRW1AD2THUOR3DYR*/
    fetch("https://financialmodelingprep.com/api/v3/stock/gainers", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);

        this.setState({
          gainerList: json.mostGainerStock,
          filtered: json.mostGainerStock,
          results: this.state.stockList,
          loaded: true
        });

        this.setState({
          isLoading: false,
          filtered: json.mostGainerStock

        });

        console.log(this.state.stockList)

      })

    fetch("https://financialmodelingprep.com/api/v3/stock/losers", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);

        this.setState({
          loserList: json.mostLoserStock,
          filtered2: json.mostLoserStock,
          loaded: true
        });

        this.setState({
          isLoading: false,

        });

        console.log(this.state.stockList)

      })

    fetch("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);

        this.setState({
          chartData: json.historical,

        });

        this.setState({
          isLoading: false,
          chartData: json.historical

        });

        console.log(this.state.chartData)

      })
    fetch("https://financialmodelingprep.com/api/v3/stock/actives", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);

        this.setState({
          moving: json.mostActiveStock

        });


        console.log(this.state.stockList)

      })



    var i;
    var count = 0;
    for (i = 0; i < this.state.chartData.length; i++) {
      if (count > 20) {
        this.setState({ filteredChartDate: this.state.filteredChartDate.date.concat(this.state.chartData.date[i]) })
        this.setState({ filteredChartClose: this.state.filteredChartClose.date.concat(this.state.chartData.close[i]) })
        this.setState({
          options: {
            chart: {
              type: 'line'
            },
            series: [{
              name: 'close',
              data: this.state.chartData.close
            }],
            xaxis: {
              categories: this.state.chartData.date
            }
          },
          series: [
            {
              name: "series-1",
              data: this.state.filteredChartDate
            }
          ]
        })
        count = 0;
      }
      count++;
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



  closeModal = () => this.setState({ openModal: false })
  openModal = (data) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    this.setState({ currentStock: data, openModal: false })
    fetch("https://financialmodelingprep.com/api/v3/quote/" + data.ticker, requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);

        this.setState({
          quote: json,

        });

        this.setState({
          isLoading: false,
          chartData: json.historical

        });
        console.log(this.state.quote[0].changesPercentage)
        if (this.state.quote[0].changesPercentage < 0) {
          this.setState({ quoteGain: false })
        } else {
          this.setState({ quoteGain: true })
        }

        console.log(json)

      })
  }

  gain = (state) => {

    if (state === "gain") {
      this.setState({ gain: true })
      this.setState({ filtered: this.state.gainerList })
    } else if (state === "lose") {
      this.setState({ gain: false })
      this.setState({ filtered: this.state.loserList })
    }
  }

  render() {
    const { isLoading, value, results, filtered, openModal, currentStock, graph, gain } = this.state
    const config: LineConfig = {
      height: 400,
      title: {
        visible: true,
        text: 'Stock Price',
      },
      description: {
        visible: true,
        text: 'Stock Price Desc.',
      },
      padding: 'auto',
      forceFit: true,
      xField: 'date',
      yField: 'close',
      label: {
        visible: true,
        type: 'point',
      },
      point: {
        visible: true,
        size: 5,
        border: 'none',
        stroke: 'none'
      },
      xAxis: {
        tickCount: 10,
      },
      data: this.state.chartData,
    }
    const data = [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ]

    const axes =
      [
        { primary: true, type: 'linear', position: 'bottom', color: 'white' },
        { type: 'linear', position: 'left', color: 'white' }
      ]

    const stockCard = {
      cursor: 'pointer', transitionDuration: '0.6s', display: 'flex', transitionDuration: '0.5s',
      margin: '10px', borderWeight: '10px', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.04)', backgroundColor: this.state.hovering ? this.props.color : '#203845', color: 'white', borderRadius: this.state.hovering ? '20px' : '0px'

    };
    var stockL = <></>;
    if (this.state.gain) {
      stockL = this.state.filtered.map(item => (
        <div style={stockCard} onClick={() => this.openModal(item)} className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-3">

            <h1 style={{ paddingBottom: '10px', paddingTop: '10px', fontSize: '12pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>{item.ticker}</h1>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
            <h1 style={{ paddingBottom: '10px', paddingTop: '10px', fontSize: '12pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>{item.price} </h1>
          </div>
          <div style={{ display: 'flex', float: 'right', paddingLeft: '0px' }} className="col-lg-5 col-md-5 col-sm-5 col-5">
            <Button style={{ float: 'right', fontSize: '12pt', padding: '0px', paddingTop: '0px', borderRadius: '100%', backgroundColor: 'transparent', color: 'green' }} icon><Icon name='caret up' /></Button>
            <h1 style={{ paddingBottom: '10px', paddingTop: '12px', fontSize: '9pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>
              {item.changes}</h1>
          </div>
        </div>

      ))
    } else if (this.state.lose) {
      this.state.filtered2.map(item => (
        <div style={stockCard} onClick={() => this.openModal(item)} className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-3">

            <h1 style={{ paddingBottom: '10px', paddingTop: '10px', fontSize: '12pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>{item.ticker}</h1>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
            <h1 style={{ paddingBottom: '10px', paddingTop: '10px', fontSize: '12pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>{item.price} </h1>
          </div>
          <div style={{ display: 'flex', float: 'right', paddingLeft: '0px' }} className="col-lg-5 col-md-5 col-sm-5 col-5">
            <Button style={{ float: 'right', fontSize: '12pt', padding: '0px', paddingTop: '0px', borderRadius: '100%', backgroundColor: 'transparent', color: 'green' }} icon><Icon name='caret up' /></Button>
            <h1 style={{ paddingBottom: '10px', paddingTop: '12px', fontSize: '9pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>
              {item.changes}</h1>
          </div>
        </div>

      ))
    }

    return (
      <div style={{ marginTop: '0px', backgroundImage: 'none' }} className="" id="">
        <Modal open={openModal} onClose={this.closeModal} style={{ width: '100%', padding: '30px', backgroundColor: '#172730' }} >
          <Modal.Content scrolling style={{ maxHeight: '100%', background: 'transparent', color: 'white' }}>
            <Button style={{ float: 'right', backgroundColor: '#203845', color: 'white' }}
              onClick={this.closeModal} icon circular
            ><Icon name='x' />

            </Button>
            <StockPopup stock={this.openModal ? this.state.currentStock : null} gain={this.state.quoteGain} />
          </Modal.Content>
        </Modal>
        <div className="">
          <div style={{ padding: '0px' }} className="row" >

            <div className="col-lg-4 col-md-4 col-sm-12 col-12 " style={{ paddingTop: '100px' }}>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                {/*<div className="row">
                  <div style={{ paddingLeft: '15px' }} className="col-lg-5 col-md-5 col-sm-12 col-12">
                    <h1 style={{ paddingBottom: '0px', fontSize: '16pt', paddingTop: '0px', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left', color: 'white' }}>Search</h1>

                    <h4 style={{ paddingBottom: '10px', fontFamily: 'Muli', lineHeight: '20pt', fontSize: '10pt', fontWeight: '400', letterSpacing: '0.1pt', color: 'white' }} className="">Symbols on the TSX.</h4>

                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                    <a style={{ paddingBottom: '20px' }}>
                        <Button onClick={() => { this.scroll("#fiscal") }} className="main-button-slider" style={{ float: 'right', fontFamily: 'Muli', fontWeight: 600, backgroundColor: '#1a73e8', color: 'white' }}>Continue</Button>
                      </a>
                    <div style={{ display: 'flex' }}>
                      <Search style={{ paddingTop: '20px', paddingBottom: '30px' }}
                        size='small'
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
                      />
                    </div>
                  </div>

                </div>*/}
              </div>
            </div>

          </div>
          <div className="row">
            <div style={{ padding: '15px', paddingTop: '0px' }} className="col-lg-4 col-md-4 col-sm-12 col-12">

              <div style={{ margin: "15px" }} className=""><StockPopup stock={this.openModal ? this.state.currentStock : null} gain={this.state.quoteGain} /></div>
              <div style={{ margin: "15px" }} className="">
                {this.state.quote.map((item) => (
                  <Table fluid style={{
                    cursor: 'pointer', border: 'none', marginRight: '15px', transitionDuration: '0.6s', transitionDuration: '0.5s',
                    margin: '10px', borderWeight: '10px', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.04)', color: 'white', borderRadius: '0px'

                  }}>


                    <Table.Body fluid>
                      {/*<Table.Row>
              <Table.Cell>Price</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>% Change</Table.Cell>
              <Table.Cell>{item.changesPercentage}</Table.Cell>
            </Table.Row>*/}
                      <Table.Row style={{ backgroundColor: '#203845' }}>
                        <Table.Cell>Day High/Low</Table.Cell>
                        <Table.Cell>$ {item.dayHigh} / $ {item.dayLow}</Table.Cell>
                      </Table.Row>
                      <Table.Row style={{ backgroundColor: '#26414f' }}>
                        <Table.Cell>Year High/Low</Table.Cell>
                        <Table.Cell>$ {item.yearHigh} / $ {item.yearLow}</Table.Cell>
                      </Table.Row>
                      <Table.Row style={{ backgroundColor: '#203845' }}>
                        <Table.Cell>Market Cap</Table.Cell>
                        <Table.Cell>$ {item.MarketCap}</Table.Cell>
                      </Table.Row>
                      <Table.Row style={{ backgroundColor: '#26414f' }}>
                        <Table.Cell>Open</Table.Cell>
                        <Table.Cell>$ {item.open}</Table.Cell>
                      </Table.Row>
                      <Table.Row style={{ backgroundColor: '#203845' }}>
                        <Table.Cell>$ Previous Close</Table.Cell>
                        <Table.Cell>{item.previousClose}</Table.Cell>
                      </Table.Row>
                      <Table.Row style={{ backgroundColor: '#26414f' }}>
                        <Table.Cell>EPS</Table.Cell>
                        <Table.Cell>{item.eps}</Table.Cell>
                      </Table.Row>
                      <Table.Row style={{ backgroundColor: '#203845' }}>
                        <Table.Cell>P / E</Table.Cell>
                        <Table.Cell>{item.pe}</Table.Cell>
                      </Table.Row>

                    </Table.Body>
                  </Table>
                ))}</div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="row">
                <div style={{ padding: '15px' }} className="col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <h1 style={{ paddingBottom: '0px', margin: '15px', marginRight: '40px', fontSize: '12pt', paddingTop: '0px', paddingBottom: '0px', paddingRight: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left', color: 'white' }}>{this.state.gain ? 'Top Gainers' : 'Top Losers'}</h1>

                    </div>
                    <div display="flex" className="col-lg-6 col-md-6">
                      <Button onClick={() => this.gain("gain")} style={{ float: 'right', marginLeft: '0px', marginRight: '15px', backgroundColor: this.state.gain ? '#1aa260' : '#203845', color: this.state.gain ? '#203845' : '#1aa260' }} icon><Icon name='caret up' /></Button>
                      <Button onClick={() => this.gain("lose")} style={{ float: 'right', borderRadius: '10%', marginLeft: '0px', marginRight: '15px', backgroundColor: this.state.gain ? '#203845' : '#de5246', color: this.state.gain ? '#de5246' : '#203845' }} icon><Icon name='caret down' /></Button>

                    </div></div>
                  {this.state.filtered.slice(1, this.state.filtered.length).map(item => (

                    <div style={stockCard} onClick={() => this.openModal(item)} className="row">

                      <div className="col-lg-3 col-md-3 col-sm-3 col-3">

                        <h1 style={{ paddingBottom: '10px', paddingTop: '20px', fontSize: '12pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>{item.ticker}</h1>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <h1 style={{ paddingBottom: '10px', paddingTop: '20px', fontSize: '11pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>$ {item.price} </h1>
                      </div>
                      <div display="flex" style={{ textAlign: 'right', paddingLeft: '0px' }} className="col-lg-4 col-md-4 col-sm-4 col-4">
                        <p style={{ float: 'right', paddingBottom: '20px', marginBottom: '0px', paddingTop: '20px', fontSize: '9pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>
                          {(item.changes < 0) ? (((item.changes.toString().slice(1)) / (item.price - item.changes.toString().slice(1))) * 100).toString().slice(0, 4) : (((item.changes) / (item.price - item.changes)) * 100).toString().slice(0, 4)} %</p>
                        <Button style={{ float: 'right', fontSize: '12pt', padding: '0px', paddingTop: '20px', borderRadius: '100%', backgroundColor: 'transparent', color: this.state.gain ? '#1aa260' : '#de5246' }} icon><Icon name={this.state.gain ? 'caret up' : 'caret down'} /></Button>
                      </div>
                    </div>
                  ))}
                  

                </div>


              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
            <h1 style={{ paddingBottom: '0px', margin: '15px', marginRight: '40px', fontSize: '12pt', paddingTop: '0px', paddingBottom: '0px', paddingRight: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left', color: 'white' }}>Top Movers</h1>

                    {this.state.moving.map(item => (

                      <div style={stockCard} onClick={() => this.openModal(item)} className="row">

                        <div className="col-lg-3 col-md-3 col-sm-3 col-3">

                          <h1 style={{ paddingBottom: '10px', paddingTop: '20px', fontSize: '12pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>{item.ticker}</h1>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                          <h1 style={{ paddingBottom: '10px', paddingTop: '20px', fontSize: '11pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>$ {item.price} </h1>
                        </div>
                        <div display="flex" style={{ textAlign: 'right', paddingLeft: '0px' }} className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <p style={{ float: 'right', paddingBottom: '20px', marginBottom: '0px', paddingTop: '20px', fontSize: '9pt', paddingLeft: '0px', fontFamily: 'Muli', fontWeight: 700, textAlign: 'left' }}>
                            {(item.changes < 0) ? (((item.changes.toString().slice(1)) / (item.price - item.changes.toString().slice(1))) * 100).toString().slice(0, 4) : (((item.changes) / (item.price - item.changes)) * 100).toString().slice(0, 4)} %</p>
                          <Button style={{ float: 'right', fontSize: '12pt', padding: '0px', paddingTop: '20px', borderRadius: '100%', backgroundColor: 'transparent', color: this.state.gain ? '#1aa260' : '#de5246' }} icon><Icon name={this.state.gain ? 'caret up' : 'caret down'} /></Button>
                        </div>
                      </div>
                    ))}
                  </div>


          </div>
        </div>

      </div >
    )
  }
}

export default Header
