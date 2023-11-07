import { useState, useEffect } from 'react';
import { getArticleApi } from '../actions';
import styled from 'styled-components';
import PostModal from './PostModal';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

const Main = (props) => {
    const [showModal, setShowModal] = useState('close'); 
    useEffect(() => {
        props.getArticle();
    }, [])
    


    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        switch (showModal) {
            case 'open':
                setShowModal('close');
                break;
            case 'close':
                setShowModal('open');
                break;
            default:
                setShowModal('close');
        }
    }
    let src;
    if(props.user && props.user.photoURL){
         src = props.user.photoURL;
    }else{
         src = '/images/user.svg'
    }
    return(
    <>
        <Container>
            <SharedBox>
                <div>
                    <img src={src} alt="" />
                    <button onClick={handleClick} disabled={props.loading?true:false}>Start a post</button>
                </div>

                <div>
                    <button>
                        <img src="/images/photo-icon.svg" alt="" />
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src="/images/video-icon.svg" alt="" />
                        <span>Video</span>
                    </button>
                    <button>
                        <img src="/images/event-icon.svg" alt="" />
                        <span>Event</span>
                    </button>
                    <button>
                        <img src="/images/article-icon.svg" alt="" />
                        <span>Write article</span>
                    </button>
                </div>
            </SharedBox>
        { props.articles.length === 0?(<p>No post uploaded</p>):(
            <Content>
                {
                    props.loading && <img src='/images/Eclipse-1s-200px.svg' alt='img'/>
                }
                {props.articles.length > 0 && 
                props.articles.map((article, key)=>(                
                <Article key={key}>
                    <SharedAfter>
                        <a href='/'>
                            <img src={article.actor.image} alt="" />
                            <div>
                                <span>{article.actor.title}</span>
                                <span>{article.actor.description}</span>
                                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img src="/images/ellipsis.png" alt="ellipsis" />
                        </button>
                    </SharedAfter>
                    <Description>
                        {article.description}
                    </Description>
                    <SharedImage>
                        <a href='/'>
                            {!article.sharedImg && article.video? (<ReactPlayer width={'100%'} url={article.video}/>):(<img src={article.sharedImg} alt='img'/>)}
                        </a>
                    </SharedImage>
                    <SocialCounts>
                        <li>
                            <button>
                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" />
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a href='/'>{`${article.comments} comments`}</a>
                        </li>
                    </SocialCounts>
                    <SocialActions>
                        <button>
                            <img src="/images/like-button.svg" alt="button" />
                            <span>Like</span>
                        </button>
                        <button>
                            <img src = '/images/comment.svg' alt='img'/>
                            <span>Comments</span>
                        </button>
                        <button>
                            <img src = '/images/instagram-share.svg' alt='img'/>
                            <span>Share</span>
                        </button>
                        <button>
                            <img src = '/images/right-side.svg' alt='img'/>
                            <span>Send</span>
                        </button>
                    </SocialActions>
                </Article>
                ))}
            </Content>
        )
        }

            <PostModal showModal={showModal} handleClick={handleClick}/>
        </Container>
    </>
)
}

const Container = styled.div`
    grid-area: main;
`;

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const SharedBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.7);
    margin: 0 0 8px;
    background: white;
    div {
        button {
            outline: none;
            color: rgba(0, 0, 0, 0.6 );
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 8px 16px;
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            padding-bottom: 4px;

            button {
                img{
                    margin: 0 4px 0 -2px;
                }
                span {
                    color: #74b5f9;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;

`;

const SharedAfter = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;
                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }
                &:nth-child(n + 1){
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
    button {
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        img {
            width: 1.8rem;
        }
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`;

const SharedImage = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    li {
        margin-right: 5px;
        font-size: 12px;
        button {
            display: flex;
            border: none;
            background-color: white;
        }
    }
`;

const SocialActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        border-radius: none;
        border: none;
        background-color: white;
        color: #0a66c2;
        img {
            width: 16px;
            height: 18px;
        }
        &:first-child {
            img {
                width: 20px;
            }
        }
        @media (min-width: 768px){
            span{
                margin-left: 8px;
            }
        }
    }

`;

const Content = styled.div`
    text-align: center;
    &>img{
        width: 30px;
    }
`

const mapStateToProps = (state)=>{
    return{
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    }
}

const mapDispatchToProps = (dispatch)=>({
    getArticle:()=> dispatch(getArticleApi()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);