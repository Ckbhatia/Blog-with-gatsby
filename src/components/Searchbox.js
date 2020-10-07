import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby";


const  Searchbox = () => {

    const emptyQuery = ""
    const [state, setState] = useState({
      filteredData: [],
      query: emptyQuery,
    })

    const handleInputChange = (event) => {
        const query = event.target.value
        console.log(event.target.value)
        const posts = data.allContentfulBlogPost.edges || []
        const filteredData = posts.filter(post => {
        const { title } = post.node
          return (
            title.toLowerCase().includes(query.toLowerCase()) 
          )
        })
        setState({
          query,
          filteredData, 
        })
      }

      
const data = useStaticQuery(graphql`
      query {
          allContentfulBlogPost(skip: 5, sort: { fields: published, order: DESC }) {
          edges {
            node {
              title
              slug
              topic
              published(formatString: "Do, MMMM YYYY")
            }
          }
        }
      }
    `);

       const allPosts = data.allContentfulBlogPost.edges
        const { filteredData, query } = state
        const hasSearchResults = filteredData && query !== emptyQuery
        const posts = hasSearchResults ? filteredData : allPosts

    return (
      <>
          <input
              type="text"
              aria-label="Search"
              placeholder="Type to filter posts..."
             onChange={handleInputChange}
          />
       <div style={{textAlign: 'center'}}>  

            {posts.map((edge) => {
                const { title, slug} = edge.node
                return (
                    <li key={slug} className="article-item-container">
                    <Link
                        to={`/blog/${slug}`}
                        className="article-item-link"
                    >
                        <div>
                            <div className="article-text-container">
                                <h4 >
                                {title}
                                </h4>
                            </div>
                        </div>
                    </Link>
                    </li>
                );
            })}
        </div>  
      </>
    )
  }

  export default Searchbox




