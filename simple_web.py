import os
import signal
from http.server import HTTPServer, CGIHTTPRequestHandler

mypid = os.getpid()
with open("cgi-bin\\exit_tmp.py", "r") as f:
    file_content = f.read()

file_content = file_content.replace("xxxxx", str(mypid))

with open("cgi-bin\\exit.py", "w") as f:
    f.write(file_content)


def receive_signal(signum, stack):
    print('Received signal: ', signum)
    global some_global_var_that_my_request_controller_will_set
    some_global_var_that_my_request_controller_will_set = False


signal.signal(signal.SIGBREAK, receive_signal)

some_global_var_that_my_request_controller_will_set = True


def keep_running():
    global some_global_var_that_my_request_controller_will_set
    return some_global_var_that_my_request_controller_will_set


server_address = ("", 8000)
httpd = HTTPServer(server_address, CGIHTTPRequestHandler)
# httpd.serve_forever()
while keep_running():
    print("start  handle request")
    httpd.handle_request()
    print("finish handle request")

os.kill(mypid, signal.SIGTERM)