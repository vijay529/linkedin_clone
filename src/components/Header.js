import React,{useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signOutAPI } from '../actions';
import homeLogo from "../images/home-logo.svg"
import searchIcon from "../images/search-icon.svg"
import navHome from "../images/nav-home.svg"
import navNetwork from "../images/nav-network.svg"
import navJobs from "../images/nav-jobs.svg"
import navMessaging from "../images/nav-messaging.svg"
import navNotifications from "../images/nav-notifications.svg"
import navWork from "../images/nav-work.svg"
import downIcon from "../images/down-icon.svg"

const Header = (props) => {
    const [show, setShow] = useState(false)

    const handleToggleShow = ()=>{
        setShow(prev=>!prev)
    }

    return (
        <Container>
            <Content>
                <Logo >
                    <a href="/home">
                        <img src={homeLogo} alt="" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type="text" placeholder='Search' />
                    </div>
                    <SearchIcon>
                        <img src={searchIcon} alt="" />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className='active'>
                            <a >
                                <img src={navHome} alt="" />
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src={navNetwork} alt="" />
                                <span>My Network</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src={navJobs} alt="" />
                                <span>Jobs</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src={navMessaging} alt="" />
                                <span>Messaging</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src={navNotifications} alt="" />
                                <span>Notifications</span>
                            </a>
                        </NavList>
                        <User>
                            <a>
                                {props.user && props.user.photoURL?(<img src={props.user.photoURL} alt="" />):(<img src="/images/user.svg" alt="" />)}
                                <span>Me <img src={downIcon} alt="" onClick={()=>{
                                    handleToggleShow()
                                }}/>
                                </span>
                            </a>
                            <SignOut show={show} onClick={()=> props.signOut()}>
                                <a>Sign Out</a>
                            </SignOut>
                        </User>
                        <Work>
                            <a>
                                <img src={navWork} alt="" />
                                <span>Work
                                    <img src={downIcon} alt="" />
                                </span>
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}
const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    left: 0;
    padding: 0 24px;
    position: fixed;
    top: 0;
    width:100%;
    z-index: 100;
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;
`;
const Logo = styled.span`
    margin: 8px;
    font-size: 8px;
`;
const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
    & > div {
        max-width: 280px;
    }
        input {
            border: none;
            box-shadow: none;
            background-color: #eef3f8;
            border-radius: 2px;
            color: rgba(0, 0, 0, 0.9);
            width: 218px;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;
            border-color: #dce6f1;
            vertical-align: text-top;
        }
`;
const SearchIcon = styled.div`
    width: 40px;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 2px;
    border-radius: 0 2px 2px 0;
    margin: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Nav = styled.nav`
    margin-left: auto;
    display: block;
    @media (max-width: 768px){
        position: fixed;
        left: 0;
        bottom: 0;
        background: white;
        width: 100%;
    }
`;
const NavListWrap = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;

    .active {
        span:after {
            content: '';
            transform: scaleX(1);
            border-bottom: 2px solid var(--white, #fff);
            bottom: 0;
            left: 0;
            position: absolute;
            transition: transform 0.2s ease-in-out;
            width: 100%;
            border-color: rgba(0, 0, 0, 0.9);
        }
    }
`;
const NavList = styled.li`
    display: flex;
    align-items: center;
    a {
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 42px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
        span {
            color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        @media (max-width: 768px){
            min-width: 70px;
        }
    }
    &:hover, &:active{
        a{
            span {
                color: rgba(0, 0, 0, 0.9);
            }
        }
    } 
`;
const SignOut = styled.div`
        position: absolute;
        top: 45px;
        background: white;
        border-radius: 0 0 5px 5px;
        width: 100px;
        height: 40px;
        font-size: 60px;
        text-align: center;
        display: ${(props)=>(props.show?'flex':'none')};
        align-items: center;
        justify-content: center;
        @media (max-width: 768px){
            top: 0;
        }    
`;
const User = styled(NavList)`
    a > svg {
        width: 24px;
        border-radius: 50%;        
    }
    a > img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    span {
        display: flex;
        align-items: center;
    }

    &:hover {
        ${SignOut}{
            display: flex;
        }
    }
`;

const Work = styled(User)`
    border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
const mapStateToProps= (state) => {
    return {
        user: state.userState.user,
    }
}

const mapDispatchToProps = (dispatch) => ({
    signOut: ()=> dispatch(signOutAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);