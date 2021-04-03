# import cgitb
# cgitb.enable()
# import http.server
# import socketserver

# PORT = 8000

# Handler = http.server.SimpleHTTPRequestHandler

# with socketserver.TCPServer(("", PORT), Handler) as httpd:
    # print("serving at port", PORT)
    # httpd.serve_forever()

import os
from http.server import HTTPServer, CGIHTTPRequestHandler

mypid = os.getpid()
f = open("cgi-bin\exit_tmp.py", "r")
file_content = f.read()
file_content = file_content.replace("xxxxx", str(mypid))
f.close()

f = open("cgi-bin\exit.py", "w")
f.write(file_content)
f.close()

some_global_var_that_my_request_controller_will_set = True

def keep_running():
    global some_global_var_that_my_request_controller_will_set
    return some_global_var_that_my_request_controller_will_set


server_address = ("", 8000)
httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
# httpd.serve_forever()
while keep_running():
    httpd.handle_request()
    