import React from 'react'

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {




    return (
        <div className='my-3'><div className="card" >
            <img src={imageUrl ? imageUrl : "https://media.istockphoto.com/id/1264074047/vector/breaking-news-background.jpg?s=612x612&w=0&k=20&c=C5BryvaM-X1IiQtdyswR3HskyIZCqvNRojrCRLoTN0Q="} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title} <h3><span class="badge bg-secondary">{source}</span></h3></h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">Credits {author} {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div></div>
    )

}

export default NewsItem