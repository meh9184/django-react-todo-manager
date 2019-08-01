import React from 'react';

class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  toggleLoggedIn = () => this.setState(state => {
    return { isLoggedIn: !state.isLoggedIn };
  });

  onSignIn = googleUser => {
   
    this.props.onSignIn(googleUser);

  };

  renderGoogleLoginButton = () => {   
    // console.log('rendering google signin button');
    
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 250,
      height: 40,
      longtitle: true,
      theme: 'light',
      onsuccess: this.onSignIn,
      // onsuccess: this.props.onSignIn,
    });
  };

  logout = () => {
    console.log('logout');

    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2
        .signOut()
        .then(() => {
          this.toggleLoggedIn();
          console.log('Logged out successfully');
        })
        .catch(err => {
          console.log('Error while logging out', err);
        });
    } else {
      console.log('error while logging out');
    }
  };

  componentDidMount() {
    window.addEventListener('google-loaded', this.renderGoogleLoginButton);
    window.gapi && this.renderGoogleLoginButton();
  }

  render() {
    return (
      <div>
        <div id="my-signin2"></div>
        {this.state.isLoggedIn && (
          <button style={{ width: 200, height: 40, textAlign: 'center'}} onClick={this.logout}>
            Logout
          </button>
        )}
      </div>
    );
  }
}

export default GoogleLoginButton;
