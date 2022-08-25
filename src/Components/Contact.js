import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import http from '../services/httpServices';
import config from '../config/config';
import { toast } from "react-toastify";

class Contact extends Component {
  state = {
    csd: [],
    httpResMessage: '',
    form: {
      contactName: '',
      contactEmail: '',
      contactSubject: '',
      contactMessage: ''
    },
    loading: false
  };

  render() {

    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">



              <form name="contactForm" onSubmit={this.onSubmit}>
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      value={this.state.form.name}
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactName"
                      name="contactName"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      value={this.state.form.email}
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      value={this.state.form.subject}
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      value={this.state.form.message}
                      style={{ resize: 'none' }}
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                      onChange={this.handleChange}
                    ></textarea>
                  </div>

                  {/* the service data */}
                  
                  <div>
                    <button className="submit">Submit</button>
                    {this.handleLoadingState()}
                  </div>
                </fieldset>
              </form>



              <div id="message-warning"> Error boy</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Address and Phone</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} <br />
                  {city}, {state} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>

              <div className="widget widget_tweets">
                
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }

  handleLoadingState = () => {
    if(this.state.loading) return (
      <img style={{ 'margin-left': '1rem'}} src="images/loader.gif"/>
    );
  }

  onSubmit = async e => {
    e.preventDefault();
    
    const formData = {...this.state.form};
    this.setState({ loading: true });
    let formObj = {};

    // making obj
    if(formData.contactSubject === '') {
      formObj = {
        name: formData.contactName,
        email: formData.contactEmail,
        message: formData.contactMessage
      };
    } else {
      formObj = {
        name: formData.contactName,
        email: formData.contactEmail,
        subject: formData.contactSubject,
        message: formData.contactMessage
      };
    }

    // calling the server
    try {
      const res = await http.post(config.serverURL()+'contact', formObj);

      if(!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Form sent successfully.");
      this.setState({ loading: false });
    } catch(err) {
      this.setState({ loading: false });
      if(err.response.status === 400) {
        toast.error(err.response.data.errMessage);
        return;
      }
      toast.error('Could not call the server!');
      return;
    }
    
  }

  componentDidMount() {
    
  }

  handleChange = ({ currentTarget: input }) => {
    const formData = {...this.state.form};
    formData[input.name] = input.value;
    this.setState({ form: formData });
  }
}

export default Contact;
