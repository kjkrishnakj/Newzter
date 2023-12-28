import React, { Component } from 'react'

export default class extends Component {
  
    render() {
        let { title, description, imgurl, newsUrl,time,author,source } = this.props;
        return (
            <>
            <div className="container my-3">

                <div className="card shadow-lg bg-body rounded">
                    <img src={imgurl?imgurl:"https://images.moneycontrol.com/static-mcnews/2023/12/market_flat-9-770x433.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title? title +"...":"No preview" }</h5>
                        <p className="card-text">{description}...</p>
                        <span className="badge text-bg-danger">{source}</span>

                        <p className='card-text'><small className='text-muted'>By {author? author:"Unknown"} Last updated on {time}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Explore</a>
                    </div>


                </div>
            </div>

              
            </>
        )
    }
}
