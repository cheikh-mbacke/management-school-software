# management-school-software
# Matériel :

Processeur : 2 GHz ou supérieur
Mémoire vive (RAM) : 4 Go minimum, 8 Go recommandés
Espace disque : 10 Go d'espace libre minimum

# Logiciel :

Système d'exploitation : Windows, macOS ou Linux
Node.js : version LTS (Long Term Support) récente
MySQL : version 5.7 ou supérieure

# Procédure d'installation de l'application

Suivez les étapes ci-dessous pour installer le système de gestion scolaire :

==> Assurez-vous que tous les prérequis logiciels sont installés et configurés sur votre machine ou serveur.

==> Téléchargez le code source du système de gestion scolaire depuis le référentiel Git (https://github.com/cheikh-mbacke/management-school-software.git).

==> Extrayez les fichiers dans un répertoire de votre choix.

==> Ouvrez un terminal ou une invite de commande et naviguez jusqu'au répertoire où se trouvent les fichiers extraits.

==> Exécutez la commande npm install pour installer toutes les dépendances du projet. Les dépendances incluent Express.js, Sequelize, MySQL2, Bcrypt, Helmet, JSON Web Token, Multer, etc.
Via phpmyadmin, importez le fichier de la base de données fourni. Ce script se trouve dans la racine projet et est  nommé "database.sql"

==> Configurez l'application en modifiant le fichier de configuration /backend/config/db.config.js pour l’adapter si besoin. Ainsi, assurez-vous de définir les paramètres de connexion à la base de données MySQL ainsi que tout autre paramètre spécifique à votre environnement.

==> Lancez l'application en exécutant la commande npm start server.js. L'application doit maintenant être en cours d'exécution et vous pouvez exécuter via un navigateur le fichier index.html se trouvant dans /frontend  pour accéder à l’interface de l’application.

Vous pouvez tester avec les identifiants suivants : 

Pour un élève => identifiant : student, mot de passe : student
Pour un enseignant => identifiant : teacher, mot de passe : teacher
Pour un responsable de formation => identifiant : manager, mot de passe : manager

