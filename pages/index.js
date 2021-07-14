import React from 'react'
//import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const user = 'eliciojunior'
  const pessoaslista = [
    'filipedeschamps',
    'juunegreiros',
    'omariosouto',
    'rafaballerini',
    'gabrielfroes',
    'badtuxx'
  ]
  const [comunidade, setComunidade] = React.useState([{
    id: '1983-05-22T12:50:16.970Z',
    nome: 'Eu odeio acordar cedo',
    capa: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  //const comunidade = ['Alurakut']
  return (
    <>
    {/* Menu superior */}
    <AlurakutMenu />
    {/* Container principal */}
    <MainGrid>
      {/* Coluna do perfil do usuário */}
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSideBar githubUser={user} />
      </div>
      
      {/* Coluna central (Aviso/Form) */}
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem Vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h4 className="subTitle">
            O que você deseja fazer?
          </h4>
          <form onSubmit={function handleComunity(e){ //No submit do form captura o evento
            e.preventDefault() //Previne o form de atualizar a tela (comportamento default)
            const dadosForm = new FormData(e.target)
            const comunidadeForm = {
              id: new Date().toISOString(),
              nome: dadosForm.get('comunityname'),
              capa: dadosForm.get('comunityimage')
              //capa: 'http://placehold.it/300x300'
            }
            const comunidadeatual = [...comunidade, comunidadeForm] //Variável que faz o spreed da variavel
            //comunidade atual (espalhar cada um dos itens do array) e faz o push de mais uma comunidade
            setComunidade(comunidadeatual) //Invoca o hook do React.useState para salvar o novo array
            //alert(comunidade)
          }}>
            <div>
              <input 
                type="text"
                name="comunityname"
                placeholder="Qual será o nome da sua comunidade?"
                aria-label="Qual será o nome da sua comunidade?"
              />
            </div>
            <div>
              <input 
                name="comunityimage"
                placeholder="URL da capa da comunidade"
                aria-label="URL da capa da comunidade"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      
      {/* Coluna de atividades (Amigos/Grupos) */}
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidade ({pessoaslista.length})
          </h2>

          <ul>
          {pessoaslista.map((user) => {
            return (
                <li key={user}>
                  <a href={`/users/${user}`} key={user}>
                    <img src={`https://github.com/${user}.png`} />
                    <span>{user}</span>
                  </a>
                </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
            Comunidades ({comunidade.length})
          </h2>
        <ul>
          {comunidade.map((community) => {
            return (
                <li key={community.id}>
                  <a href={`/community/${community.nome}`} key={community.id}>
                    <img src={community.capa} />
                    <span>{community.nome}</span>
                  </a>
                </li>
            )
          })}
          </ul>
      </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
