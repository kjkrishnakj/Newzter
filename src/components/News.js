import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import ScrollToTop from 'react-scroll-to-top';
export default class extends Component {


    static defaultProps = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    articles = [];
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0

        }
        document.title = (`Newzter - ${this.props.category}`)
    }
    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{ margin : '35px 0px',marginTop : '90px'}}>Newzter's - Today's top {this.props.category} headlines</h2>
                <div className="text-center">
                    {this.state.loading && <Spinner />}
                </div>


                <div className="row">
                    {this.state.articles.map((e) => {
                        return <div className="col-md-4" key={e.url}>

                            <NewsItem title={e.title ? e.title.slice(0, 45) : ""} description={e.description ? e.description.slice(0, 88) : ""} imgurl={e.urlToImage} source={e.source.name} newsUrl={e.url} author={e.author} time={e.publishedAt} />
                        </div>
                    })}
                </div>

                <div className="container  my-2 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button " className="btn mx-3 btn-primary" onClick={async () => {
                        this.props.setProgress(10);

                        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
                        this.setState({ loading: true });
                        let data = await fetch(url);
                        let parsedData = await data.json();
                        this.setState({
                            page: this.state.page - 1,
                            articles: parsedData.articles,
                            loading: false,
                        })
                        this.props.setProgress(100);
                        <ScrollToTop smooth />
                        
                    }}>&larr; Prev</button>
                    <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn mx-3 btn-primary" onClick={async () => {
                        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
                            this.props.setProgress(10);

                            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
                            this.setState({ loading: true });
                            let data = await fetch(url);
                            let parsedData = await data.json();
                            this.setState({
                                page: this.state.page + 1,
                                articles: parsedData.articles,
                                loading: false,
                                totalResults: parsedData.totalResults
                            })
                            this.props.setProgress(100);
                            
                           
                        }
                    }}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
