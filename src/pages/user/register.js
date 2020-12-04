import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { indexPage, loginPage } from '../../config/front-routes'
import postDataToAPI from '../../helpers/postDataToAPI'

import { VscLock } from 'react-icons/vsc'
import { MdArrowBack } from 'react-icons/md'

import useStyles from './register.styles'
import { useState } from 'react'
import { registerRoute } from '../../config/api-routes'
import { Typography } from '@material-ui/core'
import Loading from '../../components/progress'
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
    const { t } = useTranslation('pages')
    const classes = useStyles();

    const [userData, setUserData] = useState({ username: "", email: "", password: "", password2: "" })
    const [registerLoading, setRegisterLoading] = useState(false)
    const [registerError, setRegisterError] = useState(null)

    function _handleInputChange(event) {
        setUserData(state => ({ ...state, [event.target.id]: event.target.value }))
    }

    function _handleSubmit(event) {
        event.preventDefault()
        setRegisterLoading(true)
        postDataToAPI({ route: registerRoute, data: userData })
            .then(res => {
                if (res.status === 200) {
                    setRegisterLoading(false)
                    setRegisterError(res.data)
                }
            }).catch(err => {
                console.log(err.response)
                setRegisterError(err.response.data)
                setRegisterLoading(false)
            })
    }

    return (
        <Grid container component="main" className={classes.MainContainer}>
            <Grid item xs={false} sm={4} md={7} className={classes.Image} />
            <Grid item xs={12} sm={8} md={5} className={classes.RightContainer}>
                <div className={classes.RightContainerInner}>
                    <div className={classes.BackButtonContainer}>
                        <Link to={indexPage}>
                            <MdArrowBack size={24} />
                        </Link>
                    </div>
                    <Avatar className={classes.Avatar}>
                        <VscLock />
                    </Avatar>
                    <Typography variant="h3" component="h1">
                        {t('user.register.title')}
                    </Typography>
                    <form className={classes.FormContainer} noValidate onSubmit={_handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label={t('user.register.inputs.username')}
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={_handleInputChange}
                            value={userData.username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t('user.common.inputs.email')}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={_handleInputChange}
                            value={userData.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('user.common.inputs.email')}
                            type="password"
                            id="password"
                            autoComplete="password"
                            onChange={_handleInputChange}
                            value={userData.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repeat_password"
                            label={t('user.register.inputs.repeat_password')}
                            type="password"
                            id="password2"
                            autoComplete="password"
                            onChange={_handleInputChange}
                            value={userData.password2}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.SubmitButton}
                            disabled={registerLoading ? true : undefined}
                        >
                            {registerLoading ? <Loading size={24} /> : t('user.register.title')}
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link to={loginPage} variant="body2">
                                    {t('user.register.buttons.have_account')}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    {registerError && registerError.message ?
                        <div className={classes.ErrorContainer}>
                            <Typography variant="body1">
                                {registerError.message}
                            </Typography>
                        </div> : ""}
                    <div className={classes.CopyrightContainer}>
                        <Typography variant="body1">
                            {process.env.REACT_APP_SITE_NAME}
                        </Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}