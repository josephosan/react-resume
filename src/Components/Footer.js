import React, { Component } from "react";
import Fade from "react-reveal";

class Footer extends Component {
  render() {
    if (!this.props.data) return null;

    const networks = this.props.data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className}></i>
          </a>
        </li>
      );
    });

    return (
      <footer>
        <div className="row" style={{ color: 'white' }}>
          <Fade bottom>
            <div className="twelve columns">
              <ul className="social-links">{networks}</ul>

              <ul className="copyright">
                <li>&copy; Copyright 2022 Josephosan</li>
                <li>
                  Design by{" Joseph.o "}
                  <a title="page" href="https://josephosan.info/">
                    -this page
                  </a>
                </li>
              </ul>
            </div>
          </Fade>

          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
