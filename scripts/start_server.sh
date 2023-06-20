echo "Starting the server"

cd /home/ec2-user/benkyou-service
sudo npm install
npm run start:build
sudo systemctl restart node-api.service
