import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");
const firebaseConstant = require('../../constants/firebase');
firebase.initializeApp(firebaseConstant.FIREBASE_CONFIG);

import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from '../../charts/Chart';
import { getData } from "../../charts/utils"

import axios from 'axios';

import './stocks.styl';
import colors from '../../styles/colors';

const alphaVantage = require('../../constants/alphaVantage');
const newsConstants = require('../../constants/newsConstants');

const candlesAppearance = {
    wickStroke: "#000000",
    fill: function fill(d) {
        return d.close > d.open ? "rgba(196, 205, 211, 0.8)" : "rgba(22, 22, 22, 0.8)";
    },
    stroke: "#000000",
    candleStrokeWidth: 1,
    widthRatio: 0.8,
    opacity: 1,
}

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName: 'TSLA',
            stockPrice: '',
            newsGurdianData: [],
            newsWebHoseData: [],
            newsNewsApiData: [],
            stock: 'Sample here',
            data: []
        };
        this.key = alphaVantage.USER_KEY;
    }
    componentWillMount() {
        // getData("//rrag.github.io/react-stockcharts/data/MSFT.tsv").then(data => {
        //     this.setState({ data })
        // })
    }
    parseAlphaVantageData(dataItems) {
        if (dataItems != null && Object.keys(dataItems).length > 0) {
            let dataTemp = [];
            Object.keys(dataItems).forEach((item) => {
                // console.log(item);
                // console.log(new Date(item).getTime());
                dataTemp.push({
                    date: new Date(item),
                    open: dataItems[item]['1. open'],
                    high: dataItems[item]['2. high'],
                    low: dataItems[item]['3. low'],
                    close: dataItems[item]['4. close'],
                    volume: dataItems[item]['5. volume'],
                });
            });
            let close = dataTemp[0].close;
            dataTemp.reverse();
            this.setState({ data: dataTemp, stockPrice: close });
        }
    }
    getTickerPrice() {
        // axios.get(`https://www.alphavantage.co/` +
        //     `query?function=BATCH_STOCK_QUOTES&symbols=${this.state.stockName}&apikey=${this.key}`)
        //     .then((response) => {
        //         // do something with response data
        //         this.setState({ stockPrice: response.data["Stock Quotes"][0]['2. price'] });
        //         // console.log(response.data["Stock Quotes"][0]['2. price']);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.stockName}&apikey=${this.key}`)
            .then((response) => {
                // do something with response data
                // this.setState({ stockPrice: response.data["Stock Quotes"][0]['2. price'] });
                // console.log(response.data["Time Series (Daily)"]);
                this.parseAlphaVantageData(response.data["Time Series (Daily)"]);
                // response.data["Stock Quotes"]
                // this.setState({ data: response.data })
            })
            .catch((error) => {
                // console.log(error);
            });
    }
    formatDateCustom(date) {
        var options = { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString("en-US", options)
    }
    getTickerNews() {
        // Guardian
        // var url = `https://content.guardianapis.com/search?api-key=${gurdianKey.GURDIAN_KEY}`;
        var url = `http://content.guardianapis.com/search?q=${this.state.stockName}&order-by=newest&show-fields=all&page-size=6&api-key=${newsConstants.GURDIAN_KEY}`;
        axios.get(url)
            .then((response) => {
                // console.log(response.data.response.results);
                let dataTemp = [];
                response.data.response.results.forEach((item) => {
                    // sectionId: item.sectionId,
                    //     type: item.type,
                    if ((item.sectionId == "business" || item.sectionId == "technology" || item.sectionId == "money") && item.type == "article") {
                        let date = this.formatDateCustom(item.webPublicationDate);
                        dataTemp.push({
                            id: item.id,
                            title: item.webTitle,
                            text: item.fields.bodyText,
                            author: item.fields.byline,
                            date: date,
                            image: item.fields.main.split("<img src=")[1].split('"', 2)[1],

                        });
                    }
                });
                this.setState({ newsGurdianData: dataTemp });
            })
            .catch((error) => {
                // console.log(error);
            });


        // Webhose
        // var url = `http://webhose.io/filterWebContent?` +
        //     `token=2cca99b5-e175-45eb-80a0-db2978ef957d&format=json&ts=1524367530408&` +
        //     `sort=social.facebook.shares&q=${this.state.stockName}`;
        var url = `http://webhose.io/filterWebContent?token=${newsConstants.WEBHOSE_KEY}&` +
            `format=json&ts=1524287646897&sort=relevancy&q=${this.state.stockName}%20language%3Aenglish`;
        // `sort=relevancy&q=${this.state.stockName}`;
        axios.get(url)
            .then((response) => {
                // console.log(response);
                let dataTemp = [];
                response.data.posts.forEach((item) => {
                    // let date = new Date(item.published).toDateString();
                    let date = this.formatDateCustom(item.published);
                    dataTemp.push({
                        id: item.uuid,
                        text: item.text,
                        title: item.title,
                        publishedDate: date,
                        image: item.thread.main_image
                    });
                });
                this.setState({ newsWebHoseData: dataTemp });
            })
            .catch((error) => {
                // console.log(error);
            });

        // NewsAPI
        var url = 'https://newsapi.org/v2/everything?' +
          `q=${this.state.stockName}&` +
        //   'from=2018-05-06&' +
          'sortBy=popularity&' +
          `apiKey=${newsConstants.NEWSAPI_KEY}`;
        axios.get(url)
            .then((response) => {
                console.log(response.data.articles);
                let dataTemp = [];
                response.data.articles.forEach((item) => {
                    // let date = new Date(item.published).toDateString();
                    let date = this.formatDateCustom(item.publishedAt);
                    dataTemp.push({
                        id: item.publishedAt,
                        text: item.description,
                        title: item.title,
                        source: item.source.name,
                        author: item.author,
                        publishedDate: date,
                        image: item.urlToImage
                    });
                });
                this.setState({ newsNewsApiData: dataTemp });
            })
            .catch((error) => {
                // console.log(error);
            });
    }
    getInfo() {
        this.getTickerPrice();
        this.getTickerNews();
    }
    render() {
        return (
            <div className="parentClear" style={{ margin: 'auto' }}>
                {this.state.data.length > 0 &&
                    <div>
                        <TypeChooser>
                            {type => <Chart type={type} data={this.state.data} tickerName={this.state.stockName} />}
                        </TypeChooser>
                    </div>
                }
                <div style={{ float: 'left', backgroundColor: colors.bloodOrange, padding: '5px' }}>
                    <input
                        value={this.state.stockName}
                        placeholder='Enter ticker of Stock'
                        onChange={(e) => this.setState({ stockName: e.target.value })}
                        type="text"
                    />
                    <button
                        className="buttonStyle"
                        onClick={this.getInfo.bind(this)}>
                        Get Price and News
                    </button>
                    {this.state.stockPrice != '' && <div>Lastest Stock Price: {this.state.stockPrice}</div>}
                </div>
                <div style={{ float: 'left' }}>
                    <div className="news-block">
                        <div className="testStyle">Guardian</div>
                        {this.state.newsGurdianData.length != 0 ?
                            <div style={{ overflow: 'auto', maxHeight: '500px' }}>
                                {this.state.newsGurdianData.map((story) =>
                                    <div key={story.id}>
                                        {/* {story.language == 'english' && */}
                                        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                                            {story.image != null && story.image != '' ?
                                                <img src={story.image} style={{ width: '100px', height: '100px' }} />
                                                :
                                                <div>
                                                </div>
                                            }
                                            {/* <div>{story.main}</div> */}
                                            {/* <br /> */}
                                            <div>{story.title}</div>
                                            <br />
                                            <div>{story.author}</div>
                                            <br />
                                            <div>Date: {story.date}</div>
                                            <br />
                                            <div className="long-text">{story.text}</div>
                                        </div>
                                        {/* } */}
                                    </div>
                                )}
                            </div>
                            :
                            <div>
                                <h5>Noting Selected at the moment.</h5>
                            </div>

                        }
                    </div>
                    <div className="news-block">
                        <div className="testStyle">WebHose</div>
                        {this.state.newsWebHoseData.length != 0 ?
                            <div style={{ overflow: 'auto', maxHeight: '500px' }}>
                                {this.state.newsWebHoseData.map((story) =>
                                    <div key={story.id}>
                                        {/* {story.language == 'english' && */}
                                        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                                            {story.image != null && story.image != '' ?
                                                <img src={story.image} style={{ width: '100px', height: '100px' }} />
                                                :
                                                <div>
                                                </div>
                                            }
                                            <div>{story.title}</div>
                                            <br />
                                            <div>{story.publishedDate}</div>
                                            <br />
                                            <div className="long-text">{story.text}</div>
                                        </div>
                                        {/* } */}
                                    </div>
                                )}
                            </div>
                            :
                            <div>
                                <h5>Noting Selected at the moment.</h5>
                            </div>

                        }
                    </div>
                    <div className="news-block">
                        <div className="testStyle">NewsApi</div>
                        {this.state.newsNewsApiData.length != 0 ?
                            <div style={{ overflow: 'auto', maxHeight: '500px' }}>
                                {this.state.newsNewsApiData.map((story) =>
                                    <div key={story.id}>
                                        {/* {story.language == 'english' && */}
                                        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                                            {story.image != null && story.image != '' ?
                                                <img src={story.image} style={{ width: '100px', height: '100px' }} />
                                                :
                                                <div>
                                                </div>
                                            }
                                            <div>{story.title}</div>
                                            <br />
                                            <div>{story.publishedDate}</div>
                                            <br />
                                            <div className="long-text">{story.text}</div>
                                        </div>
                                        {/* } */}
                                    </div>
                                )}
                            </div>
                            :
                            <div>
                                <h5>Noting Selected at the moment.</h5>
                            </div>

                        }
                    </div>
                </div>
                {/* <div style={{ clear: 'both' }}></div> */}
            </div>
        );
    }
}

export default Stocks;
