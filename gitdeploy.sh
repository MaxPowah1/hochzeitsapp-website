#!/bin/bash
echo "===== GitHub Webhook Triggered =====" >> /var/www/html/hochzeitsapp-website/php/deploy.log
echo "Timestamp: $(date)" >> /var/www/html/hochzeitsapp-website/php/deploy.log

# Ensure the script runs as root
if [ "$(whoami)" != "root" ]; then
    echo "Not running as root, restarting as root..." >> /var/www/html/hochzeitsapp-website/php/deploy.log
    exec sudo bash /var/www/html/hochzeitsapp-website/gitdeploy.sh
fi

# Navigate to the website directory
cd /var/www/html/hochzeitsapp-website || exit

# Pull latest changes
git pullforce >> /var/www/html/hochzeitsapp-website/php/deploy.log 2>&1

# Set correct permissions
chown -R www-data:www-data /var/www/html/hochzeitsapp-website
chmod -R 755 /var/www/html/hochzeitsapp-website

echo "===== Deployment Completed =====" >> /var/www/html/hochzeitsapp-website/php/deploy.log
