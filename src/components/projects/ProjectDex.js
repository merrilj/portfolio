import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


export class ProjectDex extends Component {


    static propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool,
            error: React.PropTypes.object,
            Projects: React.PropTypes.object,
        }).isRequired,
    }

    _intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }

    render() {
        console.log(this.props.data.allProjects)
        if (this.props.data.loading) {
            return (
                <div>
                </div>
            )
        }

        if (this.props.data.error) {
            console.log(this.props.data.error)
            return (<div>An unexpected error occurred</div>)
        }

        const porjectItems = this.props.data.allProjects.map((project) => {

            let tagsArray = []
            project.tags.map((tag, index) => {
                return tag.techTags !== 'All' ? tagsArray.push(<a key={index} onClick={this.props._filterProjectsTag} className="tags">{tag.techTags}</a>) : null
            })
            tagsArray = this._intersperse(tagsArray, ", ")

            return (
                    <div key={project.id}>
                        <article className="project-list">
                            <section className="project-image-container">
                                <img className="project-img" src={project.file.url} alt="img of project" />
                            </section>
                            <section className="description-container">
                                <h1 className="description-title hero-headline">
                                    {project.title}
                                </h1>
                                <div className="description-copy">
                                    <p>
                                        {project.description}
                                    </p>
                                    <div className="tags-container">
                                        <i className="fa fa-tag" aria-hidden="true"></i>
                                        <span className="grey-text">
                                            {tagsArray}
                                        </span>
                                    </div>
                                    <div className="project-buttons-container">
                                        <a className="project-button" href={project.gitHubUrl} target="_blank"><i className="fa fa-github fa-fw"></i>View Github</a>
                                        {project.projectUrl === null ? null : <a className="project-button" href={project.projectUrl} target="_blank"><i className="fa fa-link fa-fw"></i>View Live</a>}
                                    </div>
                                </div>
                            </section>
                        </article>
                        <hr className="project-divider"/>
                    </div>
            )

        })

        return (
            <div className="projects-height">
                <div className="projects-container">
                    {porjectItems}
                    <section className="social-icons-row-projects">
                        <a href="https://github.com/merrilj" target="_blank"><img className="social-icon float" src="img/git.svg" alt="github logo img" /></a>
                        <a href="https://www.instagram.com/" target="_blank"><img className="social-icon float" src="img/ig.svg" alt="instagram logo img" /></a>
                        <a href="https://www.linkedin.com/in/merrilj/" target="_blank"><img className="social-icon float" src="img/in.svg" alt="linkedin logo img" /></a>
                    </section>
                </div>
            </div>
        )
    }

}

const ProjectQuery = gql`
    query ProjectQuery($hashtag: String!, $type: String!) {
        allProjects(filter: {
            tags_some: {
                techTags: $hashtag
            }
            types_some: {
                name: $type
            }
        }, orderBy: orderBy_ASC) {
            title
            id
            imgUrl
            projectUrl
            gitHubUrl
            description
            tags {
                id
                techTags
            }
            file {
                id
                url
            }
        }
    }`

 const ProjectDexWithData = graphql(ProjectQuery, {
        options: (ownProps) => ({
            variables: {
                hashtag: ownProps.hashtag,
                type: ownProps.type
            }
        })
    })(ProjectDex)

export default ProjectDexWithData


// border img div
// {/*<div className="border img-container">
//     <div className="project-img" style={{backgroundImage: "url(" + project.imgUrl + ")"}}></div>
// </div>*/}
