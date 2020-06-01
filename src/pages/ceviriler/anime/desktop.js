import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { bluray } from '../../../config/theming/images'

import {
    ContentHeader,
    ContentHeaderImage,
    ContentLeft,
    ContentImage,
    ContentMetadata,
    ContentGenres,
    ContentRight,
    ContentTitle,
    ContentTitleBadge,
    ContentRightAltTitle,
    ContentSynopsis,
    ContentEpisodesContainer,
    ContentEpisodes,
    ContentLinks,
    ContentLinksButton,
    ContentCommentsContainer,
    defaultBoxProps,
    MetadataHeader
} from '../../../components/ceviriler/components'
import WarningBox from '../../../components/warningerrorbox/warning';

import { getAnimeWatchIndex } from '../../../config/front-routes'
import { contentHeader, contentCover } from '../../../config/api-routes'


export default function AnimeIndexDesktop(props) {
    const { anime, theme, downloadLinks, releasedate } = props

    return (
        <Grid container spacing={2}>
            <ContentHeader item xs={12}>
                <Box boxShadow={2}>
                    <ContentHeaderImage>
                        <img
                            title={anime.name + " headerimage"}
                            loading="lazy"
                            alt={anime.name + " headerimage"}
                            src={contentHeader("anime", anime.slug)}
                            onError={() => {
                                document.getElementsByClassName('react-parallax')[0].style.height = "0px"
                            }}></img>
                    </ContentHeaderImage>
                </Box>
            </ContentHeader>
            <ContentLeft item>
                <ContentMetadata mb={1} boxShadow={2} display="flex" flexDirection="column">
                    <ContentImage
                        component="img"
                        title={anime.name + " Cover Art"}
                        loading="lazy"
                        alt={anime.name + " Cover Art"}
                        spacingvalue={theme.spacing(2)}
                        src={anime.cover_art}
                        mb={0} />
                    {anime.premiered || anime.version === "bd" ?
                        <ContentMetadata {...defaultBoxProps} display="flex" justifyContent="space-evenly" alignItems="center" mb="0" boxShadow={0}>
                            {anime.premiered
                                ?
                                <Typography variant="body2">{anime.premiered}</Typography>
                                :
                                null
                            }
                            {anime.version === "bd"
                                ?
                                <img title="bd-logo" loading="lazy" src={bluray} alt="bd-logo" style={{ height: "1rem" }} />
                                :
                                null}
                        </ContentMetadata>
                        : ""}
                </ContentMetadata>
                {anime.episodes.length !== 0
                    ?
                    <ContentMetadata>
                        <Link to={getAnimeWatchIndex(anime.slug)}>
                            <ContentLinksButton variant="contained" fullWidth>
                                <Typography variant="h6">İzle</Typography>
                            </ContentLinksButton>
                        </Link>
                    </ContentMetadata>
                    :
                    null}
                <MetadataHeader variant="body2">Çevirmen</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {anime.translators.length !== 0 ?
                        anime.translators.map(data =>
                            <Typography variant="body2" key={data + "translator"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Çevirmen bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Encoder</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {anime.encoders.length !== 0 ?
                        anime.encoders.map(data =>
                            <Typography variant="body2" key={data + "encoder"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Encoder bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Stüdyo</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    {anime.studios.length !== 0 ?
                        anime.studios.map(data =>
                            <Typography variant="body2" key={data + "stüdyo"}>{data}</Typography>)
                        :
                        <Typography variant="body2">Stüdyo bulunamadı.</Typography>
                    }
                </ContentMetadata>
                <MetadataHeader variant="body2">Çıkış Zamanı</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    <Typography variant="body2">
                        {anime.release_date ?
                            releasedate
                            :
                            <Typography variant="body2">Çıkış tarihi bulunamadı.</Typography>
                        }
                    </Typography>
                </ContentMetadata>
                <MetadataHeader variant="body2">Türler</MetadataHeader>
                <ContentMetadata {...defaultBoxProps}>
                    <ContentGenres bgcolor={theme.palette.primary.main} textcolor={theme.palette.primary.contrastText}>
                        {anime.genres.length !== 0 ?
                            anime.genres.map(data =>
                                <li key={data + "genre"}>
                                    <Typography variant="body2">
                                        {data}
                                    </Typography>
                                </li>)
                            :
                            <Typography variant="body2">Tür bulunamadı.</Typography>}
                    </ContentGenres>
                </ContentMetadata>
                {anime.mal_link ?
                    <ContentMetadata>
                        <a href={anime.mal_link} target="_blank" rel="noopener noreferrer">
                            <ContentLinksButton variant="contained" fullWidth>
                                <Typography variant="h6">MyAnimeList Konusu</Typography>
                            </ContentLinksButton>
                        </a>
                    </ContentMetadata>
                    :
                    null}
            </ContentLeft>
            <ContentRight item xs={12} md>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <ContentTitle theme={theme} variant="h1" gutterBottom>
                        {anime.name}
                    </ContentTitle>
                </Grid>
                <Box mb={2}>
                    <ContentSynopsis variant="body1">
                        {anime.synopsis ? anime.synopsis : "Konu bulunamadı."}
                    </ContentSynopsis>
                </Box>
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <ContentEpisodesContainer item xs={12}>
                            <ContentRightAltTitle variant="h4" aftercolor={theme.palette.text.primary}>İndirme Linkleri</ContentRightAltTitle>
                            <ContentEpisodes spacing={theme.spacing(1)}>
                                {downloadLinks.length !== 0 ?
                                    downloadLinks :
                                    <WarningBox>İndirme linki bulunamadı.</WarningBox>}
                            </ContentEpisodes>
                        </ContentEpisodesContainer>
                    </Grid>
                </Box>
                {process.env.REACT_APP_DISQUS_SHORTNAME
                    ?
                    <>
                        <Box>
                            <ContentCommentsContainer
                                config={{
                                    identifier: 'anime/' + anime.id,
                                    title: `${anime.name} - ${process.env.REACT_APP_SITENAME} Anime`,
                                }} />
                        </Box>
                    </>
                    :
                    ""}
            </ContentRight>
        </Grid>
    )
}