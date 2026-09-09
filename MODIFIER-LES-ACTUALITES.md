# Ajouter un atelier, une nouvelle ou des photos

La page « La vie de Doloria » lit le fichier `contenus-doloria.js`. Elle n’a pas d’espace administrateur : les ajouts se font dans ce fichier sur GitHub, ou en demandant à Codex de les préparer. Les visiteurs ne peuvent pas modifier les contenus.

Dans GitHub, ouvrez ce fichier, cliquez sur le crayon et complétez les deux listes. Conservez les crochets, les guillemets et les virgules. Les dates s’écrivent année-mois-jour. Les exemples ci-dessous sont fictifs : remplacez-les avant publication.

## Exemple complet
```javascript
window.DOLORIA_CONTENUS = {
  evenements: [
    {
      date: "2027-04-15",
      heure: "14:00 – 16:00",
      titre: "Titre de votre atelier",
      lieu: "Lieu et adresse à renseigner",
      description: "Présentez le rendez-vous en quelques phrases.",
      public: "Pour qui est ce rendez-vous ?",
      accessibilite: "Précisez les possibilités d’accès, de repos et les adaptations prévues.",
      tarif: "Indiquez le prix ou la gratuité une fois confirmés.",
      lien: "contact.html",
      lienTexte: "Nous écrire pour participer"
    }
  ],
  nouvelles: [
    {
      date: "2027-04-16",
      titre: "Un moment partagé",
      texte: "Votre récit. Pour changer de paragraphe, utilisez \n\n entre les phrases.",
      photo: "photos/rencontre-avril.jpg",
      descriptionPhoto: "Décrivez brièvement ce que montre la photo."
    }
  ]
};
```

Pour ajouter plusieurs éléments, séparez les blocs `{ ... }` par une virgule. Les champs de détails sont facultatifs ; date et titre sont nécessaires. Sans photo, retirez les lignes `photo` et `descriptionPhoto`. Utilisez une date par journée d’événement ; pour plusieurs journées, ajoutez une entrée pour chacune.

## Ajouter une photo
Créez un dossier `photos` à la racine du dépôt et téléversez-y vos JPG, PNG ou WebP. Reprenez exactement le nom du fichier dans `photo`. Préférez des noms simples sans espaces et des photos compressées pour un chargement rapide. Publiez uniquement les images dont vous avez l’autorisation de diffusion, notamment pour les enfants.

## Vérifier
Après avoir enregistré vos changements sur GitHub, attendez la mise à jour du site puis rechargez « La vie de Doloria ». Vérifiez la date dans l’agenda, les informations, les liens et les photos. Le calendrier s’ouvre sur le mois actuel ; la liste présente tous les rendez-vous à venir. Cliquez sur une date pour voir ses événements, puis sur « Tous les rendez-vous à venir » pour revenir à la liste complète.

Le site ne gère ni réservation ni paiement. Le bouton d’un événement dirige vers l’adresse que vous indiquez, par exemple la page contact ou votre formulaire d’inscription.
