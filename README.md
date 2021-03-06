﻿# OpenDataNantes

Projet universitaire dans le cadre du cours de Technologies pour la production de 
logiciels (M4105C). Ce travail a été fait par le groupe Groupe_2-04 : Alan Le Grand, 
Étienne Lécrivain et Maxence Dominici.

## Objectif

L'objectif est de créer une application web, utilisant JavaScript, reposant sur
l'[OpenData de Nantes](https://data.nantesmetropole.fr/pages/home/), et en
particulier les installations sportives des Pays de la Loire.
Il y a deux parties dans ce projet :
- Serveur : offre d'un service RESTFUL respectant l'architecture MVC.
- Client : utilisation du serveur pour afficher les données de manières
pratiques aux utilisateurs.

## Deploiement

Pour exécuter le serveur et le client sur une même machine, nous vous
conseillons d'ouvrir deux terminaux, un sera placé dans le répertoire client, et l'autre
dans le répertoire serveur.

### Serveur

Il faut d'abord se déplacer dans le répertoire serveur.
```
cd ./serveur/
```
Ensuite il s'agit d'installer les packages nécessaires au fonctionnement du serveur.
Pour cela, nous utilisons npm.
```
npm install
```
Une fois la commande précédente terminée, vous avez plusieurs options :
- Soit vous lancez le serveur tout en initialisant la base de données :
```
npm run startDB
```
- Soit vous lancez le serveur simplement (ne marche pas si la base de données n'a jamais été initialisée) :
```
npm run start
```
Vous devriez voir alors
```
Server listening on port : 3000
Connected to my database.
```

### Client

Pour le client, il faut se déplacer dans le répertoire client.
```
cd ./client/
```
Là encore, il faut installer les packages nécessaires au fonctionnement du client.
```
npm install
```
Une fois que la commande est terminée, vous avez deux possibilités : lancer le serveur 
en mode développement, ou en mode production (plus rapide).

#### Mode développement

Nous ne conseillons pas forcément d'utiliser ce mode. En effet, le lancement est plus long
et l'exécution est plus lente. Si vous souhaitez quand même le lancer dans ce mode,
il suffit de faire cette commande :
```
npm run serve
```

#### Mode production

C'est le mode que nous vous conseillons. Il est plus rapide.

Si le répertoire dist n'existe pas dans le répertoire client, il faut d'abord faire
la commande qui suit (elle sert à produire un dossier prêt pour la production).
```
npm run build
```
Cette commande prend du temps, c'est normal.

Une fois finie, vous devriez voir un dossier `./dist/` dans la partie client.
Ce dossier `./dist/` est prêt à être déployé sur un serveur HTTP.

Si vous n'avez pas de serveur HTTP classique, il existe un paquet npm très pratique.
```
sudo npm install -g serve //attention à bien le lancer en administrateur
```
Une fois installé, vous n'avez plus qu'à lancer le serveur de production.
```
serve -s ./dist/
```
L'utilitaire vous donnera l'adresse sur laquelle vous connecter avec votre navigateur.
