
To deploy UI, it needs to be copied at two places - AdGainMgmt and ROOT.  
As it is just a copy in ROOT, the requests to ROOT can be diverted to AdGainMgmt  
  
  
**Via Apache:**  
  
Enable Rewrite module by uncommenting following line in httpd.conf:  
LoadModule rewrite_module modules/mod_rewrite.so  
  
Add following lines:  
  
    RewriteEngine on
    RewriteCond "%{REQUEST_URI}" !^\/(AdGainMgmt\/|inventory|common|pmp|castrum|infrastructure)
    RewriteRule /(.*) /AdGainMgmt/$1 [P]
