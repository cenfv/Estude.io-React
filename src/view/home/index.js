import React, { useState, useEffect } from "react";
import "./home.css";
import banner01 from '../../assets/banner01.png';
import banner02 from '../../assets/banner02.png';
import peopleAbstract from '../../assets/people_abstract.png';
import smartphoneIlustration from '../../assets/smartphone_ilustration.png';
import lamp from '../../assets/lamp.png';
import background from "../../assets/background.png"
import NavbarDashboard from "../../components/navbar-dashboard";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="div-principal" style={{backgroundImage: `url(${background})`}}>
      <div className="header">
            <Link to="/" className="logo">Estude.io</Link> 
            <nav className="header-nav">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#about">Sobre nós</Link></li>
                    <li><Link to="#contact">Contato</Link></li>
                    <li><Link to="#support">Suporte</Link></li>
                </ul>
            </nav>
            <Link to="/login"><button className ="main-acessar">Acessar</button></Link>
        </div>
      <div className="principal-content">
        <div>
          <h3 >Bem vindo à Estude.io</h3>
          <h2 >
            <b style={{fontSize:32}}>Dê um próximo passo <br /> aos seus Estudos</b>
          </h2>
          <p >
            O Estude.io ajuda a organizar os seus estudos,
            <br />
            adicionando ferramentas que irão te auxiliar
            <br />
            em sua jornada acadêmica,
            <br />
            Cadastre-se e entre agora, é totalmente gratuito
          </p>
        </div>
        <div className="banners-content">
          <img src={banner01} className="banner01" alt="Bloco de anotação" />
          <img
            src={banner02}
            alt="Gráfico"
            className="banner02"
          />
        </div>
      </div>
      <div className="footer-text">
        <h2 style={{fontWeight:"bold",fontSize:20}}>
          Estude.io organiza seus estudos
        </h2>
      </div>
      <div className="footer-content">
        <div className="secondary__items">
          <img src={peopleAbstract}alt="Pessoa estudando" />
         
          <h2 style={{fontWeight:"bold",fontSize:20}}>
            Utilize de onde quiser
          </h2>
         
          <p>
            A Qualquer Hora, Em Qualquer Lugar
          </p>
        </div>
        <div className="secondary__items">
          <img
            src={smartphoneIlustration}
            alt="Ilustração de um smartphone"
          />
           <h2 style={{fontWeight:"bold",fontSize:20}}>
            Em breve para dispositivos móveis
          </h2>
          <p >
            O app será desenvolvido em breve <br />
            para a matéria de dispositivos móveis,
            <br />
            com o professor Shishido !.
          </p>
        </div>
        <div className="secondary__items">
          <img src={lamp} alt="Ilustração de uma lâmpada" />
          <h2 style={{fontWeight:"bold",fontSize:20}}>
            Ideias e sugestões?
          </h2>
          <p>
            Nos envie suas sugestôes atráves
            <br />
            do nosso canal de comunicação,
            <br />
            gostariamos muito de contar com <br />
            sua participação :)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
