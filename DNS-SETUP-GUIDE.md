# DNS Configuration Guide for ironcodestudios.com

## 🌐 Setting up GitHub Pages with Custom Domain

Your GitHub Pages site is now configured for `ironcodestudios.com`. Follow these steps to configure your DNS settings:

### 📍 Current Status
- **Repository**: https://github.com/dillmantis/iron-code-studios-website
- **GitHub Pages URL**: https://dillmantis.github.io/iron-code-studios-website/
- **Custom Domain**: ironcodestudios.com (configured in CNAME)
- **SSL**: Will be automatically provided by GitHub once DNS is configured

## 🔧 DNS Configuration Steps

### Option 1: Using A Records (Recommended for Root Domain)

Add these **A records** for your root domain `ironcodestudios.com`:

```
Type: A
Name: @ (or blank/root)
Value: 185.199.108.153

Type: A  
Name: @ (or blank/root)
Value: 185.199.109.153

Type: A
Name: @ (or blank/root) 
Value: 185.199.110.153

Type: A
Name: @ (or blank/root)
Value: 185.199.111.153
```

### Option 2: Using CNAME (For www subdomain)

If you want to redirect www to your main domain, add:

```
Type: CNAME
Name: www
Value: dillmantis.github.io
```

### Option 3: Using CNAME for Root (if your DNS provider supports it)

Some DNS providers support CNAME flattening:

```
Type: CNAME
Name: @ (or blank/root)
Value: dillmantis.github.io
```

## 🔍 DNS Provider Specific Instructions

### Cloudflare
1. Log into Cloudflare dashboard
2. Select your domain `ironcodestudios.com`
3. Go to **DNS** tab
4. Delete any existing A records for `@`
5. Add the 4 A records listed above
6. Set Proxy status to **DNS only** (gray cloud) initially
7. After GitHub Pages SSL is working, you can enable **Proxied** (orange cloud)

### GoDaddy
1. Log into GoDaddy DNS management
2. Find your domain `ironcodestudios.com`
3. Click **Manage DNS**
4. Delete existing A records pointing to `@`
5. Add the 4 A records listed above
6. TTL can be set to 1 hour (3600 seconds)

### Namecheap
1. Log into Namecheap account
2. Go to Domain List → Manage
3. Go to **Advanced DNS** tab
4. Delete existing A records for Host `@`
5. Add the 4 A records listed above

### Route 53 (AWS)
1. Go to Route 53 console
2. Select your hosted zone for `ironcodestudios.com`
3. Delete existing A records
4. Create new A records with the 4 IP addresses listed above

## ✅ Verification Steps

### 1. Check DNS Propagation
Wait 5-15 minutes, then test:

```bash
# Check if DNS is resolving correctly
dig ironcodestudios.com

# Should show the GitHub Pages IP addresses
nslookup ironcodestudios.com
```

### 2. GitHub Pages Custom Domain Setup
1. Go to your repository: https://github.com/dillmantis/iron-code-studios-website
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Custom domain**, it should show `ironcodestudios.com`
5. Wait for the green checkmark ✅ "DNS check successful"
6. **Important**: Check "Enforce HTTPS" once DNS is working

### 3. Test the Site
Once DNS propagates (can take up to 24 hours):
- Visit: http://ironcodestudios.com
- Should redirect to: https://ironcodestudios.com
- SSL certificate should be valid

## 🚨 Troubleshooting

### 404 Error
- **Cause**: DNS not properly configured or still propagating
- **Solution**: Wait for DNS propagation (up to 24 hours)
- **Check**: Visit https://dillmantis.github.io/iron-code-studios-website/ directly

### SSL Certificate Issues
- **Cause**: GitHub hasn't issued SSL certificate yet
- **Solution**: Wait 24-48 hours after DNS configuration
- **Alternative**: Temporarily disable "Enforce HTTPS" in GitHub Pages settings

### DNS Not Propagating
- **Check globally**: https://www.whatsmydns.net/#A/ironcodestudios.com
- **TTL Issue**: Lower TTL values propagate faster
- **Cache**: Clear your local DNS cache

### Clear DNS Cache
```bash
# macOS
sudo dscacheutil -flushcache

# Windows
ipconfig /flushdns

# Linux  
sudo systemctl restart systemd-resolved
```

## 📊 Expected Timeline

- **DNS Changes**: 15 minutes to 48 hours
- **SSL Certificate**: 24-48 hours after DNS is working
- **Full Propagation**: Up to 48 hours globally

## 🔗 Helpful Tools

- **DNS Checker**: https://www.whatsmydns.net/
- **GitHub Pages Status**: https://www.githubstatus.com/
- **SSL Test**: https://www.ssllabs.com/ssltest/

## 📞 Support

If you continue having issues after 48 hours:

1. **GitHub Support**: https://support.github.com/
2. **Check Repository Issues**: https://github.com/dillmantis/iron-code-studios-website/issues
3. **DNS Provider Support**: Contact your domain registrar

---

## ✅ Quick Setup Summary

1. **Add A Records** to your DNS:
   - 185.199.108.153
   - 185.199.109.153  
   - 185.199.110.153
   - 185.199.111.153

2. **Wait** 15-60 minutes for DNS propagation

3. **Visit** https://github.com/dillmantis/iron-code-studios-website/settings/pages

4. **Verify** green checkmark next to your domain

5. **Enable** "Enforce HTTPS"

6. **Test** your site at https://ironcodestudios.com

---

**🎉 Once configured, your site will be live at https://ironcodestudios.com with automatic SSL and enterprise-grade CI/CD deployment!**
