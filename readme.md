# ⚽️ Générateur de Coupon de Paris Sportifs – JavaScript Vanilla

Cette application simule un système de **paris sportifs combinés**, permettant à l’utilisateur de **sélectionner des cotes**, de **voir son gain potentiel** en temps réel selon sa mise, et de **gérer son coupon** dynamiquement.

---

## 🎯 Objectifs pédagogiques

- Gérer dynamiquement des **données JSON** avec `fetch()`
- Travailler la **manipulation du DOM** via des événements imbriqués
- Utiliser **localStorage**, le **dark mode**, et des **backgrounds aléatoires**
- Implémenter un système d’**accumulation de cotes**
- Mettre à jour dynamiquement le **calcul de gains potentiels**
- Implémenter une logique d’ajout/suppression de paris

---

## 🔧 Fonctionnalités principales

- Chargement de **matchs et cotes depuis un fichier JSON**
- Sélection de cotes par simple **clic sur les boutons**
- Ajout automatique au **coupon de paris**
- Calcul dynamique des **cotes cumulées**
- Calcul automatique du **gain potentiel** selon la mise
- Possibilité de **supprimer un pari** du coupon
- Un seul "choix par ligne" de pari
- Liaison entre la liste de gauche et ce qu'il y a dans le coupon
- Interface en **dark mode**
- **Fond d’écran aléatoire** à chaque chargement

---

## 🧪 Données JSON (extrait)

```json
{
  "matchs": [
    {
      "match_id": 1,
      "hometeam": "Real Madrid",
      "awayteam": "Barcelona",
      "home_odd": 2.1,
      "draw_odd": 3.2,
      "away_odd": 2.9
    },
    ...
  ]
}
