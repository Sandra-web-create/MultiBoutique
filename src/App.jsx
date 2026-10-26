import Header from './components/Header.jsx'
import './App.css';

function App() {
  return (
    <div className="application">
     <Header /> 

      <main>
        <section className="banniere" id="accueil">
          <p className="surtitre">BIENVENUE SUR MULTIBOUTIQUES</p>
          <h2>Toutes tes boutiques préférées au même endroit</h2>
          <p>
            Découvre des produits, trouve tes boutiques préférées et commande
            facilement.
          </p>
          <a className="bouton-principal" href="#boutiques">
            Découvrir les boutiques
          </a>
        </section>

        <section className="section-boutiques" id="boutiques">
          <h2>Nos boutiques</h2>
          <p>Découvre les boutiques de nos commerçants.</p>

          <div className="cartes-boutiques">
            <article className="carte">
              <div className="icone-boutique">💄</div>
              <h3>Beauté &amp; Cosmétiques</h3>
              <p>Gloss, maquillage et soins.</p>
              <button>Voir les produits</button>
            </article>

            <article className="carte">
              <div className="icone-boutique">👗</div>
              <h3>Mode &amp; Vêtements</h3>
              <p>Des articles pour tous les styles.</p>
              <button>Voir les produits</button>
            </article>

            <article className="carte">
              <div className="icone-boutique">👜</div>
              <h3>Sacs &amp; Accessoires</h3>
              <p>Découvre tes accessoires préférés.</p>
              <button>Voir les produits</button>
            </article>
          </div>
        </section>
      </main>

      <footer className="pied-page">
        <p>© 2026 MultiBoutiques — Toutes les boutiques au même endroit.</p>
      </footer>
    </div>
  );
}

export default App;