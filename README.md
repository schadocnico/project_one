# Proxy
Pour windows, ajouter dans le /etc/hosts :

#Project_one
127.0.0.1 api.local
127.0.0.1 db.local

http://host.docker.internal:3037 => lien DB
http://host.docker.internal:8081 => lien API