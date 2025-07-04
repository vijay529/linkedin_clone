import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { postArticleAPI } from '../actions';
import closePng from '../images/close.png'
import userSvg from '../images/user.svg'
import galleryPng from '../images/gallery.png'
import ytPng from '../images/youtube.png'
import commentPng from '../images/comment.png'


const PostModal = (props) => {
    const [editorText, setEditorText] = useState(''); 
    const [sharedImage, setSharedImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    const modalRef = useRef(null)

    useEffect(()=>{
        if(props.progress==="100"){
            const fakeEvent = {
                target:modalRef.current,
                currentTarget:modalRef.current,
                preventDefault:()=>{console.log("");}
            }
            reset(fakeEvent)
        }
    },[props.progress])

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image === '' || image === undefined){
            alert(`not an image, the file is a ${typeof image}`);
            return;
        }
        setSharedImage(image);
    };

    const switchAssetArea = (area) => {
        setSharedImage('');
        setVideoLink('');
        setAssetArea(area);
    }

    const postArticle = async(e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: sharedImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        props.postArticle(payload);
        
        if(payload.image===""){reset(e);}

    }
    


    const reset = (e) => {
        setEditorText('');
        setSharedImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);
    }
    return (
    <>
        { props.showModal === 'open' &&
        <Container ref={modalRef}>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick = {(event) => reset(event)}>
                        <img src={closePng} alt="" onClick = {(event) => reset(event)}/>
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {props.user.photoURL ? (<img src={props.user.photoURL} alt='user'/>) :
                        (<img src={userSvg} alt="" />)}
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                    <textarea value={editorText} onChange={(e)=> setEditorText(e.target.value)} placeholder = 'What do you want to talk about?' autoFocus={true} />
                    { assetArea === 'image' ? (
                    <UploadImage>
                        <input type='file' accept='image/gif, image/jpg, image/png, image/jpeg' id='file' style={{display: 'none'}} onChange={handleChange}/>
                        <p><label htmlFor="file">Select an image </label></p>
                        <p>{props.progress}</p>
                        {sharedImage && <img src={URL.createObjectURL(sharedImage)} alt=''/>}
                    </UploadImage>)
                        :
                    (    assetArea === 'media' && (
                    <>
                        <input type="text" placeholder='Please upload a video link' value={videoLink} onChange={ (e) => setVideoLink(e.target.value) }/>
                        {videoLink && <ReactPlayer width={'100%'} url={videoLink}/>}
                    </>
                    ))
                    }
                    </Editor>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => switchAssetArea('image')}>
                            <img src={galleryPng} alt="" />
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea('media')}>
                            <img src={ytPng} alt="" />
                        </AssetButton>
                    </AttachAssets>
                    <ShareComment>
                        <AssetButton>
                            <img src={commentPng} alt="" />
                            Anyone
                        </AssetButton>
                    </ShareComment>
                    <PostButton disabled={!editorText ? true : false} onClick={(event)=> postArticle(event)}>Post</PostButton>
                </ShareCreation>
            </Content>
        </Container>
        }
    </>
)    
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    color: blue;
    background-color: rgba(0, 0, 0, 0.4);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.15);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.1);
        img, svg {
            position: relative;
            top: 1px;
            width: 25px;
        }
    }
`;
const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, 
    img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;


const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    img {
        width: 22px;
    }

`;

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
    }
`;

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
        img {
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.8)' : '#0a66c2')};
    color: ${(props) => (props.disabled ? 'rgba(1, 1, 1, 0.2)' : 'white')};
    &:hover {
        background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#004182')};
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }

    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img{
        width: 100%;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        progress: state.articleState.progress
    }
};
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);