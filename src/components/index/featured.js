import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { animePage } from '../../config/front-routes'
import { contentHeader } from '../../config/api-routes'

import { bluray } from '../../config/theming/images'

import { Box, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Dotdotdot from 'react-dotdotdot'

const useStyles = makeStyles(theme => ({
    Container: {
        position: "relative",
        margin: "-16px -40px -20px"
    },
    HeaderImage: {
        backgroundImage: props => `url(${contentHeader("anime", props.slug)})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        width: "100%",
        height: 500
    },
    InfoContainer: {
        position: "absolute",
        zIndex: 2,
        bottom: theme.spacing(2),
        left: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        width: "40%",
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        boxShadow: theme.shadows[6]
    },
    GenresContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: theme.spacing(1),
        '& span': {
            marginRight: 5
        }
    },
    GenreBox: {
        backgroundColor: theme.palette.primary.main,
        marginRight: theme.spacing(1),
        padding: `0 ${theme.spacing(1)}px`
    },
    PremieredContainer: {
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        padding: `0 ${theme.spacing(1)}px`,
        boxShadow: theme.shadows[6]
    }
}))

export function FeaturedLoading() {
    const classes = useStyles()
    return (
        <>
            <div className={classes.Container}>
                <Skeleton variant="rect" width="100%" height={500} />
                <div className={classes.InfoContainer}>
                    <Skeleton variant="text" width="50%" height={30} animation="wave" />
                    <div className={classes.GenresContainer}>
                        <div>
                            <Skeleton variant="text" width="50px" height={20} animation="wave" />
                        </div>
                        <div>
                            <Skeleton variant="text" width="50px" height={20} animation="wave" />
                        </div>
                        <div>
                            <Skeleton variant="text" width="50px" height={20} animation="wave" />
                        </div>
                    </div>
                    <Typography variant="subtitle1">
                        <Dotdotdot clamp={5}>
                            <Skeleton variant="text" width="50%" height={14} animation="wave" />
                            <Skeleton variant="text" width="50%" height={14} animation="wave" />
                            <Skeleton variant="text" width="50%" height={14} animation="wave" />
                        </Dotdotdot>
                    </Typography>
                </div>
                <div className={classes.PremieredContainer}>
                    <Typography variant="h4">
                        <Skeleton variant="text" width="100px" height={50} animation="wave" />
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default function Featured(props) {
    const { name, synopsis, slug, premiered, genres, version } = props
    const classes = useStyles(props)
    return (
        <>
            <Link to={animePage(props.slug)}>
                <div className={classes.Container}>
                    <div className={classes.HeaderImage} slug={slug} />
                    <div className={classes.InfoContainer}>
                        <Typography variant="h2" component="h1">
                            {name}
                        </Typography>
                        <div className={classes.GenresContainer}>
                            {genres.split(",").map((g, i) => (
                                <div key={i + "featured" + g} className={classes.GenreBox}>
                                    {g}
                                </div>
                            ))}
                        </div>
                        <Typography variant="subtitle1">
                            <Dotdotdot clamp={5}>
                                {synopsis}
                            </Dotdotdot>
                        </Typography>
                    </div>
                    <div className={classes.PremieredContainer}>
                        <Typography variant="h4">
                            {premiered}
                        </Typography>
                    </div>
                </div>
            </Link>
        </>
    )
}

Featured.propTypes = {
    name: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    premiered: PropTypes.string,
    genres: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired
}