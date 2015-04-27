
To deploy UI, it needs to be copied at two places - AdGainMgmt and ROOT.  
As it is just a copy in ROOT, the requests to ROOT can be diverted to AdGainMgmt  
  
  
**Via Apache:**  
  
Enable Rewrite module by uncommenting following line in httpd.conf:  
LoadModule rewrite_module modules/mod_rewrite.so  
  
Add following lines:  
  
    RewriteEngine on
    RewriteCond "%{REQUEST_URI}" !^\/(ui\/|AdGainMgmt\/|inventory|common|pmp|castrum|infrastructure)
    RewriteRule /(.*) /ui/$1 [P]