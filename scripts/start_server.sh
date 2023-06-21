echo "Starting the server"

nvm install 16;
sudo -s

cd /home/ec2-user/benkyou-service

npm install
npm run start:build

exit

pm2 restart all
