import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json";
import UserCard from '../components/UserCard';

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary['900']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}
            </style>
        </>
    );
}

function Subtitle(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.primary['600']};
                    font-size: 18px;
                    font-weight: 600;
                }
            `}
            </style>
        </>
    );
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('EduardoEspiritoSantoBorges');
    const [userName, setUserName] = React.useState('');
    const [userBio, setUserBio] = React.useState('');
    const [userRepos, setUserRepos] = React.useState();
    const [userFollowers, setUserFollowers] = React.useState();
    const [userCompany, setUserCompany] = React.useState();
    const [userUrl, setUserUrl] = React.useState();
    const [userPhoto, setUserPhoto] = React.useState();
    const roteamento = useRouter();

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${username}`).then(async (response) => {
            let userData = await response.json();
            const userBio = userData.bio;
            const userName = userData.name;
            const userRepos = userData.public_repos;
            const userFollowers = userData.followers;
            const userCompany = userData.company;
            const userUrl = userData.html_url;
            const userPhoto = userData.avatar_url;
            setUserBio(userBio);
            setUserName(userName);
            setUserRepos(userRepos);
            setUserFollowers(userFollowers);
            setUserCompany(userCompany);
            setUserUrl(userUrl);
            setUserPhoto(userPhoto);
        });
    });

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                    backgroundColor: appConfig.theme.colors.primary['800a'],
                    backgroundImage: 'url(https://githubuniverse.com/hero-logo.webp)',
                    backgroundSize: '100%'
                    
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '800px',
                        borderRadius: '15px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals['999'],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log('Alguém submeteu o form');
                            { username.length > 2 && userPhoto != null ? roteamento.push(`/chat?username=${username}`) : roteamento.push('/404') };
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">GitHub Finder</Title>
                        <Subtitle tag="h3">Pesquise por um usuário do GitHub</Subtitle>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            required
                            placeholder='Digite o seu usuário do GitHub...'
                            value={username}
                            onChange={function (event) {
                                console.log('usuario digitou', event.target.value);
                                const valor = event.target.value;
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals['700a'],
                                },
                            }}
                        />
                      {/*  <Button
                            type='submit'
                            label='Detalhes'
                            fullWidth
                            styleSheet={{ marginBottom: '32px' }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[700],
                            }}
                        />*/}
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <UserCard
                        username={username}
                        bgColor={appConfig.theme.colors.neutrals['800']}
                    />
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );

}
