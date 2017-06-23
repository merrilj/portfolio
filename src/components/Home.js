import React, { Component } from 'react'
import ProjectDex from './projects/ProjectDex'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            view: "",
            projectFilterTag: "All",
            projectFilterType: "All",
            showDropdown: false
        }

        this._handleChange_nav = this._handleChange_nav.bind(this)
        this._handleClickLogo = this._handleClickLogo.bind(this)
        this._dropdown = this._dropdown.bind(this)
        this._filterProjectsTag = this._filterProjectsTag.bind(this)
        this._filterProjectsType = this._filterProjectsType.bind(this)
        this._removeTag = this._removeTag.bind(this)
    }

    componentDidMount() {
        this.setState({ view: "About" });
    }

    _handleChange_nav(event) {
        this.setState({
            view: event.target.innerHTML
        })
    }

    _handleClickLogo(event) {
        this.setState ({
            view: "About"
        })
    }

    _filterProjectsTag(event) {
        this.setState({
            projectFilterTag: event.target.innerHTML
        })
        console.log(this.state.projectFilterTag)
    }

    _filterProjectsType(event) {
        this.setState({
            projectFilterType: event.target.innerHTML,
            showDropdown: false
        })
    }

    _removeTag(event) {
        this.setState({
            projectFilterTag: "All"
        })
    }

    _dropdown(event) {
        this.state.showDropdown ? this.setState({ showDropdown: false }) : this.setState({ showDropdown: true})
    }

    _renderProjectsFilter = () => {
        let toggleDropdown = this.state.showDropdown ? "dropdown-content show" : "dropdown-content"
        if(this.state.view === "Projects")
            return (
                <div>
                    <span className="nav-extra-text">
                            <a onClick={this._removeTag}>{this.state.projectFilterTag !== "All" ? <span className="filter-tag"><i className="fa fa-times" aria-hidden="true"></i> {this.state.projectFilterTag} </span>: null}</a>
                            <div className="dropdown">
                                <a onClick={this._dropdown} className="dropbtn"> {this.state.projectFilterType} <i className="fa fa-caret-down" aria-hidden="true"></i></a>
                            </div>
                            <div id="myDropdown" className={toggleDropdown}>
                                <a onClick={this._filterProjectsType}>All</a>
                                <a onClick={this._filterProjectsType}>Full-stack</a>
                                <a onClick={this._filterProjectsType}>Front-end</a>
                                <a onClick={this._filterProjectsType}>Web app</a>
                                <a onClick={this._filterProjectsType}>Mobile app</a>
                            </div>
                    </span>
                </div>
            )
        else if(this.state.view === "Resume")
        return (
            <div className="nav-extra-text">
                <a className="download-button active" href="img/Jeff-Diers-Resume.pdf" download>Download</a>
            </div>
        )
        else
            return (
                <div></div>
            )
    }



    _renderBody = () => {
        if(this.state.view === "About")

            return (
                <div className="splash-height">
                    <div className="splash-container">
                        <section className="hero">
                            <h1 className="hero-headline">
                                Merril Jeffs
                            </h1>
                            <div className="hero-copy">
                                <p>
                                    Full Stack Developer. Denver, CO.
                                </p>
                                <p>
                                    Currently looking for full-time employment. <br />
                                    I am a Full Stack Developer who combines an aesthetic sensibility with a deep understanding of the code to create applications that look as well as they work.
                                </p>
                                <p>
                                    Drop me a line <br />
                                  <a className="contactlink" href="tel:720-397-0410">720-397-0410</a> <br />
                                    <a className="contactlink" href="mailto:merrilj@zoho.com?Subject=Hello%20friend" target="_top">merrilj@zoho.com</a> <br />
                                </p>
                            </div>
                        </section>
                        <section className="bang">
                            <img className="logo" src="imgs/merril.jpg" alt="personal logo img" />
                        </section>
                    </div>
                    <section className="social-icons-row-main">
                        <a href="https://github.com/merrilj" target="_blank"><img className="social-icon float" src="img/git.svg" alt="github logo img" /></a>
                        <a href="https://www.instagram.com/" target="_blank"><img className="social-icon float" src="img/ig.svg" alt="instagram logo img" /></a>
                        <a href="https://www.linkedin.com/in/merrilj/" target="_blank"><img className="social-icon float" src="img/in.svg" alt="linkedin logo img" /></a>
                    </section>

                </div>
            )

            else if(this.state.view === "Projects")

                return ( <ProjectDex type={this.state.projectFilterType} hashtag={this.state.projectFilterTag} _filterProjectsTag={this._filterProjectsTag} _filterProjectsType={this._filterProjectsType} /> )

            else if(this.state.view === "Resume")

                return (
                   <div className="splash-height">
                        <div className="resume-container">
                            <img className="resume-img" src="img/Merril Jeffs Resume.jpg" alt="resume img"></img>
                        </div>
                    </div>
                )
    }

    render () {
        let container_style = this.state.view === "About" ? "main-container main" : "main"
        let globalnav_class = this.state.view === "About" ? "onhome" : ""

            return (
                <div>

                    <nav className={globalnav_class}>

                        <div className="globalnav-container">
                            <span className="globalnav-home">
                                <a className="globalnav-home-link" onClick={ this._handleClickLogo }>
                                    <img alt="logo" className="logonav" src="img/iconcode.svg" />
                                </a>
                            </span>
                            <div className="globalnav-slideout">

                                <a className={this.state.view === "About" ? "globalnav-item active" : "globalnav-item"} onClick={this._handleChange_nav}>About</a>
                                <a className={this.state.view === "Projects" ? "globalnav-item active" : "globalnav-item"} onClick={this._handleChange_nav}>Projects</a>
                                <a className={this.state.view === "Resume" ? "globalnav-item active" : "globalnav-item"} onClick={this._handleChange_nav}>Resume</a>

                            </div>

                            {this._renderProjectsFilter()}

                        </div>

                    </nav>

                    <main>
                        <div className={container_style}>

                            {this._renderBody()}

                        </div>
                    </main>
                    <footer>

                    </footer>
                </div>
            )

    }
}


                            // <iframe src="https://indd.adobe.com/view/f0a5f958-58b7-4320-825c-ae3b8b030e71" width="100%" height="90%" />
