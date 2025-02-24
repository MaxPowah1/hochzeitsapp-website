#!/bin/bash
echo "===== GitHub Webhook Triggered =====" >> /var/www/html/hochzeitsapp-website/php/deploy.log
echo "Timestamp: $(date)" >> /var/www/html/hochzeitsapp-website/php/deploy.log

# Navigate to your website directory
cd /var/www/html/hochzeitsapp-website || exit

# Pull the latest changes using the custom alias
git pullforce >> /var/www/html/hochzeitsapp-website/php/deploy.log 2>&1

# Set correct permissions
chown -R www-data:www-data /var/www/html/hochzeitsapp-website
chmod -R 755 /var/www/html/hochzeitsapp-website

echo "===== Deployment Completed =====" >> /var/www/html/hochzeitsapp-website/php/deploy.log
