echo "Starting the server"

cd /home/ec2-user/benkyou-server
sudo npm install
npm run start:build
sudo systemctl restart node-api.service
