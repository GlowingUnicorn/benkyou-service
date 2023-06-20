echo "Stopping the server"

systemctl stop node-api.service
sudo rm -rf /home/ec2-user/benkyou-service
