# Administration de Doloria

## État de cette livraison
Les fichiers sont préparés localement. L’activation du compte Pages CMS, les autorisations GitHub, la publication et un premier enregistrement réel restent à vérifier. La page admin seule ne crée pas de droits administrateur.

## Une seule installation
1. Avant toute mise à jour, conserver une copie du dépôt actuel et vérifier qu’aucun événement, photo ou texte ajouté directement sur GitHub depuis la dernière livraison ne manque dans ce dossier.
2. Publier le contenu du dossier à la racine du dépôt Doloria, en conservant les fichiers `cms-*.json`. Inclure `.pages.yml`, qui est un fichier caché sur Mac (Cmd + Maj + point pour afficher les fichiers cachés). Conserver les fichiers de domaine, les photos existantes et les autres fichiers GitHub.
3. Ouvrir https://app.pagescms.org et se connecter. Lire l’écran GitHub d’autorisation. Installer l’application uniquement sur le dépôt Doloria ; ne pas sélectionner tous les dépôts. L’autorisation d’identité et l’installation avec accès au dépôt sont des étapes distinctes.
4. Choisir le dépôt Doloria et la branche réellement publiée par GitHub Pages. Pages CMS lit automatiquement `.pages.yml`.
5. Avant de considérer l’activation terminée, créer une nouvelle de test avec « Afficher sur le site » désactivé, vérifier l’aperçu puis retirer cette nouvelle de test. Vérifier également le chargement des textes et médias en ligne.

## Au quotidien
- Textes : choisir la page, retrouver le passage grâce au libellé, modifier et enregistrer. Les champs correspondent aux morceaux existants pour conserver gras, liens et retours à la ligne. Ils ne permettent pas de reconstruire la mise en page. Les changements de texte sont publiés à l’enregistrement.
- Agenda : ajouter un élément, choisir date et horaires, lieu, public, adaptations, tarif et lien d’inscription. Enregistrer puis examiner l’aperçu avant d’activer « Afficher sur le site ». Une entrée par journée d’événement.
- Nouvelles : titre, date, récit, photo et description ; la galerie permet plusieurs photos avec chacune sa description.
- Ressources : importer l’image ou le PDF, ajouter une présentation, une version texte accessible et les sources.
- Médias : téléverser JPG, PNG, WebP ou PDF depuis le sélecteur. Les documents sont publics.

## Où voir l’aperçu
Sur le site, ouvrir `/Doloria/administration.html`. Les liens d’aperçu affichent aussi les éléments non publiés. Ce mécanisme n’est pas une protection des brouillons : GitHub et le site sont publics. Ne jamais y placer de dossier médical, de secret ou de photo sans autorisation de diffusion.

## Publication et contrôle
Pages CMS écrit dans GitHub ; GitHub Pages doit terminer sa mise à jour avant que le résultat soit visible. Recharger la page ensuite. Le site ne collecte ni réservation ni paiement : les liens d’événement ouvrent la destination choisie.

Les textes originaux restent affichés si le chargement JSON échoue. Les contenus ajoutés via CMS nécessitent JavaScript. Une panne de chargement de l’agenda ou des ressources affiche un message, pas une fausse liste vide.

Après activation, ne plus réimporter un ancien ZIP : cela pourrait remplacer les contenus publiés depuis l’administration. Les sauvegardes et retours à une version précédente passent par l’historique GitHub.

## Sécurité et accès
Le site public ne reçoit aucun mot de passe ou jeton GitHub. Les modifications sont autorisées par GitHub/Pages CMS, pas par un mot de passe intégré au HTML. La connexion à Pages CMS reste un accès confié à un service tiers. Activer la double authentification GitHub et revoir les permissions d’installation. Rien dans cette préparation ne constitue un audit complet de sécurité du service tiers.

Documentation : https://pagescms.org/docs/quick-start/ et https://pagescms.org/docs/development/authentication/
