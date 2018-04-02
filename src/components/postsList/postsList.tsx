import * as React from "react"
import { Component } from "react"
import TagsLine from "../tagsLine/tagsLine"
import PostHeader from "../postHeader/postHeader"
import Image from "../image/image"
import styled from "styled-components"
import { ThemeProvider } from "styled-components"
import { theme, GatsbyLink, PostTitle, Date, CasualText } from "../../theme"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 55% 5% 40% ;
  margin-top: 5%;

  @media (max-width: ${(props) => props.theme.screen.px700}) {
    grid-template-columns: 63% 4% 33% ;
  }

`

const Box = styled.div`
  @media (max-width: ${(props) => props.theme.screen.px1500}) {
    margin-bottom: 30px;
  }
  
`

const BlogPosts = styled.div`
  padding-right: ${(props) => props.theme.grid.paddingRight}
  @media (max-width: ${(props) => props.theme.screen.px1000}) {
    padding-left: ${(props) => props.theme.grid.paddingLeft}
  }
`
const BlogPostsPreview = styled.div`
  
`

export default class PostList extends React.Component {
  constructor({ posts }) {
    super(posts);
    this.state = {posts: posts, width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const {posts, width, height} = this.state

    return (
      <ThemeProvider theme={theme} >
      <BlogPosts>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <BlogPostsPreview key={post.id}>
              <PostHeader post={post} />
              <Wrapper>
    
                <Box>
                  <CasualText>{width < 700 ? post.shortExcerpt : post.longExcerpt}</CasualText>
                </Box>
                <Box></Box>
                <Box>
                  <Image featuredImage = {post.frontmatter.featuredImage}/>
                </Box>
    
              </Wrapper>
            </BlogPostsPreview>
          ))}
      </BlogPosts>
      </ThemeProvider>
    )
  }
  
}