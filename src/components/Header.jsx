function Header() {
  return (
    <header className="entete">
      <h1>MultiBoutiques</h1>

      <nav>
        <a href="#accueil">Accueil</a>
        <a href="#boutiques">Boutiques</a>
        <a href="#produits">Produits</a>
      </nav>

      <button className="bouton-panier">Mon panier 🛍️</button>
    </header>
  );
}

export default Header;