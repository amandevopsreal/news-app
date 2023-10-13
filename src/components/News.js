import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from '../Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let res = await fetch(url)
        props.setProgress(30)
        let data = await res.json()
        props.setProgress(70)
        setArticles(data.articles)
        setTotalResults(data.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = capitalizeFirstLetter(props.category) + " RMANews"
        updateNews()
    }, [])


    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let res = await fetch(url)

        let data = await res.json()

        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
    };

    return (
        <>

            <div style={{ marginTop: "90px" }} className='container'><h2>{`${capitalizeFirstLetter(props.category)} top headlines`}</h2></div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>


                    <div className='row'>
                        {articles.map(article => {
                            return (
                                <div key={article.url} className='col-md-4'>
                                    <NewsItem source={article.source.name} author={article.author ? article.author : "Unknown"} date={article.publishedAt} newsUrl={article.url} title={article.title} description={article.description} imageUrl={article.urlToImage} />
                                </div>
                            )
                        })}


                    </div>
                </div>
            </InfiniteScroll>

        </>

    )
}
News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News