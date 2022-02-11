import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
    if(isSignedIn & route!='register'){
        return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}
                    className='dt w-100 mw8 center'>
                    <p onClick={() => onRouteChange('signout')} 
                    className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba pointer'
                >Sign out</p>
                </nav>
            );
    } else if(!isSignedIn & route!='register') {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}
                className='dt w-100 mw8 center'>
                <p onClick={() => onRouteChange('register')} 
                    className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba pointer'
                    >Register</p>
            </nav>
            );
        } else {
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}
                className='dt w-100 mw8 center'>
                    <p onClick={() => onRouteChange('signin')} 
                    className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba pointer'
                >Sign in</p>
            </nav>
            );
        }
}

export default Navigation